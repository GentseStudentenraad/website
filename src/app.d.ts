import { Configuration } from "@prisma/client";
import { Language } from "$lib/Language";

declare global {
    declare namespace App {
        interface Locals {
            language: Language;
            configuration: Configuration;
            user: string | null;
        }
        // interface PageData {}
        // interface PageError {}
        // interface Platform {}
    }
}
