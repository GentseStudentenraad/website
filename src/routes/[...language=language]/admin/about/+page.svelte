<script lang="ts">
	import type { PageData } from './$types';
	import TextField from '$lib/components/admin/TextField.svelte';
	import LongTextField from '$lib/components/admin/LongTextField.svelte';
	import ActionButton from '$lib/components/admin/ActionButton.svelte';

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

<div class="space-y-6">
    <TextField
        placeholder="Gentse Studentenraad"
        bind:value={data.configuration.name}
        description="Organisatienaam"
    />

    <LongTextField
        placeholder=""
        bind:value={data.configuration.short_description}
        description="Korte beschrijving"
    />

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

    <ActionButton />
</div>
