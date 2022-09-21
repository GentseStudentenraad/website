<script lang="ts">
	import type { NewsItem } from "$lib/NewsItem";

    export let news_item: NewsItem
</script>

<div class="flex bg-neutral-100">
    <img
        src={news_item.banner_image}
        class="object-cover overflow-hidden h-[60vh] w-1/2"
        alt={news_item.banner_image_alt}
    >

    <div class="self-center w-1/2 p-12 space-y-4">
        <div class="space-y-1">
            <p class="font-bold font-serif text-4xl">{news_item.title}</p>
            <p class="font-medium font-lg">{news_item.synopsis}</p>
            <p class="font-semibold opacity-75 text-sm">GEPUBLICEERD OP {news_item.published_at.toLocaleDateString().toUpperCase()}</p>
        </div>
        <div class="flex gap-4 items-center bg-primary w-fit rounded-full pr-8">
            <img src="https://unsplash.com/photos/RGKdWJOUFH0/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjYzNzc4MTYx&force=true&w=640" alt="Author Portrait" class="rounded-full h-12 w-12 object-cover">
            <div class="font-medium text-white">
                <p class="text-xs font-bold">FUNCTIE</p>
                <p class="text-sm">Voornaam Achternaam</p>
            </div>
        </div>
    </div>
</div>
