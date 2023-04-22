<script lang="ts">
	import type { PageData } from './$types';
	import ActionButton from '$lib/components/admin/ActionButton.svelte';
	import TextField from '$lib/components/admin/TextField.svelte';
	import LongTextField from '$lib/components/admin/LongTextField.svelte';
	import ImageUploader from '$lib/components/admin/ImageUploader.svelte';

	async function post() {
		await fetch(`/admin/projects/${data.project.id}`, {
			method: 'PUT',
			body: JSON.stringify(data.project),
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	export let data: PageData;
</script>

<svelte:head>
	<style>
		:root {
			@apply bg-neutral-100;
		}
	</style>
</svelte:head>

<div class="space-y-6">
	<TextField bind:value={data.project.title} description="Titel" />

    <LongTextField bind:value={data.project.about} description="Beschrijving" />

	<ImageUploader
		description="Coverfoto"
		source="{data.project.image}"
	/>

	<ActionButton action={post} />
</div>
