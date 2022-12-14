<script lang="ts">
  import type {News} from '@prisma/client';

  import NewsItemVertical from '$lib/components/NewsItemVertical.svelte';
  import NewsItemRow from '$lib/components/NewsItemRow.svelte';
  import NewsItemBig from '$lib/components/NewsItemBig.svelte';

  export let data: {
		news: News[];
		translations: any;
	};
</script>

<svelte:head>
	<style>
		:root {
			@apply bg-neutral-100;
		}
	</style>
</svelte:head>

<div class="container space-y-8 py-12">
	<div class="space-y-12">
		<div class="space-y-2">
			<div>
				<p class="font-serif text-6xl font-bold lowercase">{data.translations.news.title}</p>
				<p>{data.translations.news.subtitle}</p>
			</div>
			<NewsItemBig news_item={data.news[0]} />
		</div>


		<div class="grid grid-cols-4 gap-4">
			{#each data.news.slice(1, 5) as news_item}
				<NewsItemVertical {news_item} />
			{/each}
		</div>

		<div class="space-y-2">
			<h4>{data.translations.news.archive}</h4>

			<div class="flex flex-col gap-4">
				{#each data.news.slice(5) as news_item}
					<NewsItemRow {news_item} />
				{/each}
			</div>
		</div>
	</div>
</div>
