<script lang="ts">
	import type { NewsItem } from '$lib/NewsItem';
	import NewsItemVertical from '$lib/components/NewsItemVertical.svelte';

	// State
	export let data: {
		news_item: NewsItem;
		news: NewsItem[];
	};
</script>

<div class="container py-12 space-y-8">
	<div class="max-w-[800px] m-auto md:text-center flex flex-col md:items-center space-y-1">
		<p class="opacity-75 text-sm md:text-[16px]">
			Gepubliceerd op {data.news_item?.published_at.toLocaleDateString()}
		</p>
		<p class="text-2xl md:text-4xl font-bold font-serif">{data.news_item.title}</p>
		<p class="text-[16px] md:text-lg opacity-90">{data.news_item.synopsis}</p>
	</div>

	<img
		class="rounded-md overflow-hidden w-full object-cover aspect-video"
		src={data.news_item.banner_image}
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

	<div class="h-[3px] max-w-[800px] m-auto bg-primary/50" />

	<div class="max-w-[800px] mx-auto space-y-2">
		<p class="text-xl font-bold ">Lees verder</p>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
			{#each data.news.filter((e) => e.id !== data.news_item.id).slice(0, 3) as news_item}
				<NewsItemVertical {news_item} />
			{/each}
		</div>
	</div>
</div>
