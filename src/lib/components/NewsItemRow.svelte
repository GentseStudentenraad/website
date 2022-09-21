<script lang="ts">
	import type { NewsItem } from "$lib/NewsItem";


    export let news_item: NewsItem
</script>

<div class="flex col-span-full items-center gap-6 py-4">
    <img
        src={news_item.banner_image}
        class="object-cover overflow-hidden aspect-video h-24 rounded-md flex-none"
        alt={news_item.banner_image_alt}
    >
    <div>
        <h6>NIEUWS - {news_item.published_at.toLocaleDateString()}</h6>
        <h4 class="font-semibold">{news_item.title}</h4>
        <p>{news_item.synopsis}</p>
    </div>
</div>
