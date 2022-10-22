<script lang="ts">
	import type { PageData } from './$types';
	import NewsItemVertical from '$lib/components/NewsItemVertical.svelte';
	import NewsItemRow from '$lib/components/NewsItemRow.svelte';

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

<div class="container space-y-8 py-12">
	<div class="flex items-center text-xl font-bold gap-1 child:opacity-75">
		<a href="/admin">admin</a>
		<p>/</p>
		<a href="/admin/nieuws">nieuws</a>
		<p>/</p>
		<p class="opacity-100">bericht</p>
	</div>

	<div class="space-y-1">
		<p class="font-semibold text-xl">Titel</p>
		<input type="text" class="textfield" placeholder="Titel" bind:value={data.news_item.title} />
	</div>

	<div class="space-y-1">
		<p class="font-semibold text-xl">Synopsis</p>
		<p class="opacity-50 text-xs">
			Een zeer korte beschrijving. Wordt gebruikt bij het linken naar jouw nieuwsbericht.
		</p>
		<input
			type="text"
			class="textfield"
			placeholder="Synopsis"
			bind:value={data.news_item.synopsis}
		/>
	</div>

	<div class="space-y-1">
		<p class="font-semibold text-xl">Inhoud</p>
		<p class="opacity-50 text-xs">Je kan gebruik maken van MarkDown, inclusief in-line HTML.</p>
		<textarea
			type="text"
			class="w-full"
			rows="10"
			placeholder="Inhoud"
			bind:value={data.news_item.content}
		/>
	</div>

	<div class="space-y-1">
		<p class="font-semibold text-xl">Auteur</p>
		<input type="text" class="textfield" placeholder="Auteur" bind:value={data.news_item.author} />
	</div>

	<div class="space-y-1">
		<p class="font-semibold text-xl">Gepubliceerd op</p>
		<p class="opacity-50 text-xs">Vanaf dit moment wordt jouw bericht publiek.</p>
		<input
			type="date"
			class="textfield"
			placeholder="Auteur"
			bind:value={data.news_item.published_at}
		/>
	</div>

	<div class="">
		<div class="flex items-center gap-2">
			<input
				id="default-checkbox"
				type="checkbox"
				value=""
				class="check"
				bind:checked={data.news_item.published}
			/>
			<p class="font-semibold text-xl">Publiek</p>
		</div>
		<p class="text-sm">Je kan jouw bericht verbergen door deze optie uit te schakelen.</p>
	</div>

	<button
		on:click={() => post()}
		class="w-full col-span-2 p-4 text-center text-white bg-neutral-700 rounded-md text-lg font-bold hover:cursor-pointer"
		style:background-color={data.configuration.brand_color_primary}
	>
		Sla wijzigingen op
	</button>

	<div class="space-y-2">
		<p class="font-semibold text-xl">Kolomweergave</p>
		<div class="grid grid-cols-5 gap-4">
			{#each [0, 0, 0, 0, 0] as index}
				<NewsItemVertical news_item={data.news_item} />
			{/each}
		</div>
	</div>

	<div>
		<p class="font-semibold text-xl">Rijweergave</p>
		<NewsItemRow news_item={data.news_item} />
	</div>
</div>

<style>
	.check {
		@apply w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600;
	}

	textarea {
		@apply bg-white px-4 py-2 rounded-md w-full border-neutral-200 border-[1px];
	}

	.textfield {
		@apply bg-white px-4 py-2 rounded-md w-full border-neutral-200 border-[1px];
	}
</style>
