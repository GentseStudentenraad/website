<script lang="ts">
	import type { NewsItem } from "$lib/NewsItem";

    export let news_item: NewsItem
</script>

<div>
    <img
        src={news_item.banner_image}
        class="object-cover overflow-hidden aspect-square w-full rounded-md mb-2"
        alt={news_item.banner_image_alt}
    >
    <h6>NIEUWS - {news_item.published_at.toLocaleDateString()}</h6>
    <h4>{news_item.title}</h4>
    <p>{news_item.synopsis}</p>
</div>
