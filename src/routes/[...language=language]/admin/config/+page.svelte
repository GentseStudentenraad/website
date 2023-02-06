<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import type { PageData } from './$types';
	import TextField from '$lib/components/Admin/TextField.svelte';
	import ActionButton from '$lib/components/Admin/ActionButton.svelte';
	import Checkbox from '$lib/components/Admin/Checkbox.svelte';

	export let data: PageData;

	async function post() {
		const res = await fetch('/admin/config', {
			method: 'POST',
			body: JSON.stringify(data.configuration),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.status === 200) {
			window.location.href = '/admin';
		} else {
			console.log(res);
		}
	}
</script>

<svelte:head>
	<style>
		:root {
			@apply bg-neutral-100;
		}
	</style>
</svelte:head>

<div class="container space-y-12 py-12">
	<div class="space-y-2">
		<p class="font-medium text-lg">Optionele functies</p>
		<Checkbox bind:value={data.configuration.active} label="Website is publiek" description={null} />
		<Checkbox bind:value={data.configuration.news_section} label="Nieuwssectie" description={null} />
		<Checkbox bind:value={data.configuration.who_section} label="Wie-sectie" description={null} />
		<Checkbox bind:value={data.configuration.faq_section} label="FAQ-sectie" description={null} />
		<Checkbox bind:value={data.configuration.opinions_section} label="Standpuntensectie" description={null} />
		<Checkbox bind:value={data.configuration.i18n} label="Vertalingen" description={null} />
	</div>

	<div class="space-y-2">
		<p class="font-medium text-lg">Vormgeving</p>

		<div class="flex gap-4 w-full">
			<ColorPicker
				bind:hex={data.configuration.brand_color_primary}
				label="Primaire kleur ({data.configuration.brand_color_primary})"
			/>
			<ColorPicker
				bind:hex={data.configuration.brand_color_secondary}
				label="Secundaire kleur ({data.configuration.brand_color_secondary})"
			/>
		</div>

		<TextField
			placeholder="Gentse Studentenraad"
			bind:value={data.configuration.name}
			description="Organisatienaam"
		/>

		<TextField
			placeholder=""
			bind:value={data.configuration.short_description}
			description="Korte beschrijving"
		/>
	</div>

	<div>
		<p class="font-medium text-lg">Contactgegevens</p>
		<TextField
			placeholder="Straatnaam 1, 9000 Gent"
			bind:value={data.configuration.adres}
			description="Adres"
		/>
		<TextField
			placeholder="091234567"
			bind:value={data.configuration.phone}
			description="Telefoonnummer"
		/>
		<TextField
			placeholder="hello@example.com"
			bind:value={data.configuration.email_adres}
			description="E-mailadres"
		/>

		<TextField
			placeholder="https://facebook.com"
			bind:value={data.configuration.facebook_url}
			description="Facebook"
		/>

		<TextField
			placeholder="https://twitter.com"
			bind:value={data.configuration.twitter_url}
			description="Twitter"
		/>

		<TextField
			placeholder="https://instagram.com"
			bind:value={data.configuration.instagram_url}
			description="Instagram"
		/>

        <TextField
            placeholder="https://tiktok.com"
            bind:value={data.configuration.tiktok_url}
            description="TikTok"
        />

        <TextField
            placeholder="https://discord.com"
            bind:value={data.configuration.discord_url}
            description="Discord"
        />

        <TextField
            placeholder="https://discord.com"
            bind:value={data.configuration.linkedin_url}
            description="LinkedIn"
        />
	</div>

	<ActionButton action={post} color={data.configuration.brand_color_primary} />
</div>
