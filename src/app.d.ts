declare namespace App {
	interface Locals {
		organization: import('@prisma/client').Organization;
		language: import('./lib/Language').Language;
		configuration: import('@prisma/client').Configuration;
	}
	// interface PageData {}
	// interface PageError {}
	// interface Platform {}
}
