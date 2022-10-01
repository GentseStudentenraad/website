<script lang="ts">
	import type { NewsItem } from '$lib/NewsItem';

	export let news_item: NewsItem;
</script>

<a href="/nieuws/{news_item.id}" class="transition hover:scale-[1.01]">
	<img
		src={news_item.banner_image}
		class="object-cover overflow-hidden aspect-square w-full rounded-md mb-2"
		alt={news_item.banner_image_alt}
	/>
	<p class="font-bold text-xs opacity-90">NIEUWS - {news_item.published_at.toLocaleDateString()}</p>
	<p class="font-semibold text-lg">{news_item.title}</p>
	<p class="text-sm opacity-75">{news_item.synopsis}</p>
</a>
