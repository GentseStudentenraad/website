<script lang="ts">
  import NewsItemVertical from '$lib/components/NewsItemVertical.svelte';
  import type {News} from '@prisma/client';

  // State
	export let data: {
		news_item: News;
		news: News[];
		configuration: any;
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">

	<style>
		:root {
			@apply bg-white;
		}
	</style>
</svelte:head>

<div class="container py-12 space-y-8">
	<div class="max-w-[800px] m-auto md:text-center flex flex-col md:items-center space-y-4">
		<p class="text-5xl font-semibold font-serif">{data.news_item.title}</p>
		<div class="flex items-center opacity-75 text-sm font-semibold space-x-1">
			<i class="bi bi-calendar-event"></i>
			<p class="pr-2">
				{data.news_item.published_at.toLocaleString()}
			</p>
			<i class="pl-2 bi bi-person-circle"></i>
			<p class="">
				Auteur
			</p>
		</div>
	</div>

	<img
		class="overflow-hidden w-full object-cover aspect-video max-w-[900px] m-auto"
		src="https://gentsestudentenraad.be/static/persistent/images/{data.news_item.banner_image}"
		alt={data.news_item.banner_image_alt}
		width={1000}
	/>

	<div class="max-w-[800px] m-auto">
		<article
			class="
				prose prose-neutral
                prose-lis list-disc
				max-w-none prose-p:text-neutral-900 text-left prose-img:w-full
				prose-img:rounded-md prose-img:overflow-hidden  prose:text-white
				prose-headings:text-black
				space-y-4
				prose-blockquote:text-lg md:prose-blockquote:text-2xl
				prose-headings:m-0
				prose-h1:text-2xl prose-h2:text-1xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-[16px] prose-h6:text-sm
				md:prose-h1:text-2xl md:prose-h2:text-1xl md:prose-h3:text-xl md:prose-h4:text-lg md:prose-h5:text-[16px] md:prose-h6:text-sm
			"
		>
			{@html data.news_item.content}
		</article>
	</div>
</div>

<div class="bg-neutral-100 py-12">
	<div class="max-w-[800px] mx-auto space-y-2">
		<p class="text-xl font-bold ">Lees verder</p>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
			{#each data.news.filter((e) => e.id !== data.news_item.id).slice(0, 3) as news_item}
				<NewsItemVertical {news_item} />
			{/each}
		</div>
	</div>
</div>
