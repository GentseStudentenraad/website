<script lang="ts">
    import NewsItemVertical from "$lib/components/NewsItemVertical.svelte";
    import NewsItemRow from "$lib/components/NewsItemRow.svelte";
    import NewsItemBig from "$lib/components/NewsItemBig.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />
    <style>
        :root {
            @apply bg-neutral-100;
        }
    </style>
</svelte:head>

<div class="container py-12 space-y-4">
    <NewsItemBig news_item={data.news[0]} />

    <div class="grid grid-cols-3 gap-4">
        {#each data.news.slice(1, 4) as news_item}
            <NewsItemVertical {news_item} />
        {/each}
    </div>

    <div class="flex flex-col gap-4">
        {#each data.news.slice(4) as news_item}
            <NewsItemRow {news_item} />
        {/each}
    </div>
</div>
