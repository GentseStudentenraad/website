import { error, type Handle } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import { Language } from "$lib/Language";
import { XMLParser } from "fast-xml-parser";
import jwt from "jsonwebtoken";
import type { Prisma, User } from "@prisma/client";

const secret = "insecure";

export const handle = (async ({ event, resolve }) => {
    const start = new Date();

    // Authentication
    const token = event.cookies.get("jwt");
    const ticket = event.url.searchParams.get("ticket");

    if (token) {
        try {
            const decoded = jwt.verify(token, secret) as { username: string };
            event.locals.user = await prisma.user.findUniqueOrThrow({
                where: {
                    username: decoded.username,
                },
            });
        } catch (e) {
            // TODO: notify user that login has failed.
            console.error(e);
        }
    }

    if (ticket) {
        try {
            // Validate against CAS
            const res = await fetch(
                `https://login.ugent.be/serviceValidate?service=${event.url.origin}&ticket=${ticket}`,
            );

            // Parse XML as User
            const xml = await res.text();
            console.log(xml);
            const result = new XMLParser().parse(xml)["cas:serviceResponse"][
                "cas:authenticationSuccess"
            ]["cas:attributes"];
            const user: Prisma.UserCreateInput = {
                email: result["cas:mail"],
                student: result["cas:objectClass"].includes("ugentStudent"),
                surname: result["cas:surname"],
                username: result["cas:uid"],
                given_name: result["cas:givenname"],
            };

            // Retrieve all the user's features from the database
            event.locals.user = await prisma.user.upsert({
                create: user,
                update: user,
                where: {
                    username: user.username,
                },
            });

            // Set JWT to keep user online.
            const encoded = jwt.sign({ username: user.username }, secret, { expiresIn: "1h" });
            event.cookies.set("jwt", encoded, { path: "/" });
        } catch (e) {
            // TODO: notify user that login has failed.
            console.error(e);
        }
    }

    // Retrieve the selected organization based on:
    // 1. A URL query such as `?host=gentsestudentenraad.be`, for development purposes.
    // 2. The hostname contained in the request headers.
    const requestedHost = event.url.searchParams.get("host") || event.url.hostname;

    const configuration = await prisma.configuration.findFirstOrThrow({
        where: {
            hostnames: {
                has: requestedHost,
            },
        },
    });

    const language = event.params.language === "en" ? Language.ENGLISH : Language.DUTCH;

    event.locals.configuration = configuration;
    event.locals.language = language;

    // Authorisation
    if (event.locals.user) {
        const count = await prisma.admin.count({
            where: {
                OR: [{ organization: configuration.organization }, { organization: "COMMON" }],
                user_id: event.locals.user.id,
            },
        });
        event.locals.admin = count > 0;
    }

    if (event.url.pathname.startsWith("/api")) {
        if (!event.locals.user) {
            throw error(401, "Unauthorized");
        } else if (!event.locals.admin) {
            throw error(403, "Forbidden");
        }
    }

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html.replace("%lang%", event.params.language ?? "en"),
    });

    console.log(
        `${start.toISOString()} ${event.request.method} ${event.url} ${
            Date.now() - start.valueOf()
        }ms ${response.status}`,
    );

    return response;
}) satisfies Handle;
