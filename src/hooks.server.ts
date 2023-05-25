import { type Handle } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import { Language } from "$lib/Language";
import { XMLParser } from "fast-xml-parser";
import jwt from "jsonwebtoken";

const secret = "insecure";

export const handle = (async ({ event, resolve }) => {
    const start = new Date();

    // Authentication
    const token = event.cookies.get("jwt");
    const ticket = event.url.searchParams.get("ticket");

    if (token) {
        try {
            const decoded = jwt.verify(token, secret) as { email: string };
            event.locals.user = decoded.email;
        } catch (e) {
            // TODO: notify user that login has failed.
        }
    }

    if (ticket) {
        try {
            const res = await fetch(
                `https://login.ugent.be/serviceValidate?service=https://localhost:8080&ticket=${ticket}`,
            );
            const xml = await res.text();
            const result = new XMLParser().parse(xml);
            const email =
                result["cas:serviceResponse"]["cas:authenticationSuccess"]["cas:attributes"][
                    "cas:mail"
                ];

            // Set current user to this specific email.
            event.locals.user = email;

            // Set cookie to keep user online.
            const encoded = jwt.sign({ email: email }, secret, { expiresIn: "1h" });
            event.cookies.set("jwt", encoded, { path: "/" });
        } catch (e) {
            // TODO: notify user that login has failed.
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
