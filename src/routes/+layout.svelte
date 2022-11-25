<script lang="ts">
  import '../app.css';
  import {Language} from '$lib/Language';
  import {page} from '$app/stores';
  // @ts-ignore geen idee waarom deze import een TS fout genereert.
  import type {PageData} from './$types';

  let showLinks = false;

	export let data: PageData;
</script>

<div class="flex flex-col justify-between w-full min-h-[100vh]">
	<nav
		class="sticky top-0 w-full z-[100]"
		style:background-color={data.configuration.brand_color_primary}
	>
		<div class=" shadow-md p-3 flex items-center gap-6 text-white">
			<i
				class="bi bi-list -mr-4 hover:cursor-pointer text-lg"
				on:click={() => (showLinks = true)}
			/>

			<a href="/{data.translations.meta.language_code}">
				<img src={data.configuration.logo_url} class="h-8" alt="Logo" />
			</a>

			{#each data.routes as route}
				<a class="font-medium" href={route[1]}>{route[0]}</a>
			{/each}

			<div class="grow" />

			{#if data.configuration.facebook_url}
				<a href={data.configuration.facebook_url}>
					<img src="/icons/facebook.png" alt="Facebook Logo" class="h-4 w-4" />
				</a>
			{/if}

			{#if data.configuration.twitter_url}
				<a href={data.configuration.twitter_url}>
					<img src="/icons/twitter.png" alt="Twitter Logo" class="h-4 w-4" />
				</a>
			{/if}

			{#if data.configuration.instagram_url}
				<a href={data.configuration.instagram_url}>
					<img src="/icons/instagram.png" alt="Instagram Logo" class="h-4 w-4" />
				</a>
			{/if}

			{#if data.configuration.i18n}
				<a
					href="/{$page.routeId?.replace(
						'[...language=language]',
						data.language === Language.DUTCH ? 'en' : 'nl'
					)}"
				>
					<img src="/icons/translation.png" class="h-4 w-4" alt="Translation Icon" />
				</a>
			{/if}
		</div>

		{#if showLinks}
			<div class="absolute panel-contents" on:mouseleave={() => (showLinks = false)}>
				{#each data.configs as config}
					<a href={config.hostnames[0]} class="panel-link flex items-center justify-start gap-4">
						<img class="invert h-8 w-16 object-contain" src={config.logo_url} />
						<div class="-space-y-1">
							<p class="m-0 text-lg font-bold">{config.name}</p>
							<p class="m-0 opacity-75 text-sm">{config.short_description}</p>
						</div>
					</a>
				{/each}
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

<style>
	.panel-contents {
		@apply grid grid-cols-4 p-4 bg-neutral-200 gap-4 w-[100vw];
	}

	.panel-link {
		@apply rounded-md p-4 bg-neutral-100 w-full h-24;
	}
</style>
