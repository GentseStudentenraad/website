import { Configuration } from "@prisma/client";
import { Language } from "$lib/Language";
import { User } from "@prisma/client";

declare global {
    declare namespace App {
        interface Locals {
            language: Language;
            configuration: Configuration;
            user: User | null;
            admin: boolean;
        }
        // interface PageData {}
        // interface PageError {}
        // interface Platform {}
    }
}
