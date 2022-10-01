<script lang="ts">
	import '../app.css';
	import { Language } from '$lib/Language';
	import { page } from '$app/stores';

	export let data: {
		language: Language;
		routes: [String, String];
		organization: String;
		configuration: any;
		translations: any;
	};
</script>

<div class="flex flex-col justify-between w-full min-h-[100vh]">
	<nav
		class="sticky top-0 shadow-md w-full z-[100] p-3 flex items-center gap-6 text-white"
		style:background-color={data.configuration.brand_color_primary}
	>
		<a href="/{data.translations.meta.language_code}">
			<img src={data.configuration.logo_url} class="h-8" alt="Logo" />
		</a>

		{#each data.routes as route}
			<a class="font-medium" href={route[1]}>{route[0]}</a>
		{/each}

		<div class="grow" />

		<div>{data.organization}</div>

		{#if data.configuration.i18n}
			<div class="flex items-center gap-2">
				<img src="/icons/translation.png" class="h-4 w-4" alt="Translation Icon" />
				<a
					href="/{$page.routeId?.replace(
						'[...language=language]',
						data.language === Language.DUTCH ? 'en' : 'nl'
					)}"
				>
					{data.language === Language.DUTCH ? 'English' : 'Dutch'}
				</a>
			</div>
		{/if}
	</nav>

	<slot />

	<footer class="bg-neutral-900 py-20 p-3 text-white">
		<div class="container-big grid grid-cols-4 gap-12">
			<div class="flex flex-col gap-2">
				<p class="font-semibold">Social Media</p>
				<div class="w-full h-[2px] bg-white/20" />

				{#if data.configuration.facebook_url}
					<a href={data.configuration.facebook_url}>
						<div class="flex gap-2 items-center">
							<img src="/icons/facebook.png" alt="Facebook Logo" class="h-4 w-4" />
							<p class="">Facebook</p>
						</div>
					</a>
				{/if}

				{#if data.configuration.twitter_url}
					<a href={data.configuration.twitter_url}>
						<div class="flex gap-2 items-center">
							<img src="/icons/twitter.png" alt="Twitter Logo" class="h-4 w-4" />
							<p class="">Twitter</p>
						</div>
					</a>
				{/if}

				{#if data.configuration.instagram_url}
					<a href={data.configuration.instagram_url}>
						<div class="flex gap-2 items-center">
							<img src="/icons/instagram.png" alt="Instagram Logo" class="h-4 w-4" />
							<p class="">Instagram</p>
						</div>
					</a>
				{/if}
			</div>

			<div class="space-y-2">
				<p class="font-semibold">Contact</p>
				<div class="w-full h-[2px] bg-white/20" />

				{#if data.configuration.adres}
					<p class="">{data.configuration.adres}</p>
				{/if}

				{#if data.configuration.phone}
					<p class="">{data.configuration.phone}</p>
				{/if}

				<p>{data.configuration.email_adres}</p>
			</div>

			<div class="space-y-2">
				<p class="font-semibold">Varia</p>
				<div class="w-full h-[2px] bg-white/20" />
				<p class="">RSS feed</p>
				<p class="">Ontdek jouw FSR</p>
				<p class="">Klachten</p>
			</div>

			<img class="m-auto" src="https://gentsestudentenraad.be/static/persistent/images/logo.png" />
		</div>
	</footer>
</div>
