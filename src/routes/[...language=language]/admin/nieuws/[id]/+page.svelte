<script lang="ts">
	import type { PageData } from './$types';
	import NewsItemVertical from '$lib/components/NewsItemVertical.svelte';
	import NewsItemRow from '$lib/components/NewsItemRow.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import ActionButton from '$lib/components/Admin/ActionButton.svelte';
	import NewsItemBig from '$lib/components/NewsItemBig.svelte';
	import TextField from '$lib/components/Admin/TextField.svelte';
	import LongTextField from '$lib/components/Admin/LongTextField.svelte';
	import Checkbox from '$lib/components/Admin/Checkbox.svelte';
	import DatePicker from '$lib/components/Admin/DatePicker.svelte';
	import ImageUploader from '$lib/components/Admin/ImageUploader.svelte';

	async function post() {
		const res = await fetch(`/admin/nieuws/${data.news_item!.id}`, {
			method: 'POST',
			body: JSON.stringify(data.news_item),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.status === 200) {
			window.location.href = `/admin/nieuws/${data.news_item!.id}`;
		} else {
			console.log(res);
		}
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

<div class="container space-y-4 py-12">
	<TextField bind:value={data.news_item.title} description="Titel" />

	<TextField bind:value={data.news_item.synopsis} description="Synopsis" />

	<ImageUploader
		description="Coverfoto"
		source="https://gentsestudentenraad.be/static/persistent/images/{data.news_item.banner_image}"
	/>

	<LongTextField bind:value={data.news_item.content} description="Inhoud" />

	<TextField bind:value={data.news_item.author} description="Auteur" />

	<DatePicker description="Publicatiedatum" bind:value={data.news_item.published_at} />

	<Checkbox label="Publiek" bind:value={data.news_item.published} description="Opties" />

	<Divider text="Voorbeelden" />

	<NewsItemBig news_item={data.news_item} />

	<div class="grid grid-cols-4 gap-4">
		{#each [0, 0, 0, 0] as index}
			<NewsItemVertical news_item={data.news_item} />
		{/each}
	</div>

	<NewsItemRow news_item={data.news_item} />

	<ActionButton action={post} color={data.configuration.brand_color_primary} />
</div>
