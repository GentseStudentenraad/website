<script lang="ts">
	import type { NewsItem } from "$lib/NewsItem";

    export let news_item: NewsItem
</script>

<div class="grid grid-cols-2 gap-6">
    <img
        src={news_item.banner_image}
        class="object-cover overflow-hidden aspect-video w-full rounded-lg mb-2"
        alt={news_item.banner_image_alt}
    >

    <div class="self-center">
        <h6>NIEUWS - {news_item.published_at.toLocaleDateString()}</h6>
        <h2>{news_item.title}</h2>
        <h5>{news_item.synopsis}</h5>
    </div>
</div>
