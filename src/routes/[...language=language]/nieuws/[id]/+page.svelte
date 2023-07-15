<script lang="ts">
    import NewsItemVertical from "$lib/components/NewsItemVertical.svelte";
    import NewsItemBig from "$lib/components/NewsItemBig.svelte";
    import type { PageData } from "./$types";

    // State
    export let data: PageData;
</script>

<div class="container py-12">
    <NewsItemBig news_item={data.news_item} />
</div>

<div class="bg-white py-12">
    <div class="container">
        <div class="md m-auto">
            {@html data.news_item.content}
        </div>
    </div>
</div>

<div class="container py-12 space-y-12">
    <div class="space-y-2">
        <p class="text-xl font-bold">Lees verder</p>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {#each data.news.filter((e) => e.id !== data.news_item.id).slice(0, 3) as news_item}
                <NewsItemVertical {news_item} />
            {/each}
        </div>
    </div>
</div>
