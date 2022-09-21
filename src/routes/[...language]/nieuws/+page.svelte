<script>
	// @ts-ignore
    import { NewsItem } from "$lib/NewsItem";
    import NewsItemVertical from "$lib/components/NewsItemVertical.svelte"
	import NewsItemRow from "$lib/components/NewsItemRow.svelte";
	import NewsItemBig from "$lib/components/NewsItemBig.svelte";

    export /**
	* @type {{ news: NewsItem[]; }}
	*/
    let data;
</script>


<NewsItemBig news_item={data.news[0]} />

<div class="container space-y-8 py-12">
    <div class="space-y-4">
        <div>
            <p class="font-serif text-6xl font-bold">nieuws</p>
            <p>Ontdek hier wat relevant en actueel is bij de studentenraad.</p>
        </div>

        <div class="grid grid-cols-4 gap-6">
            {#each data.news.slice(1, 5) as news_item}
                <NewsItemVertical news_item={news_item} />
            {/each}
        </div>
    </div>

    <div class="space-y-1">
        <h4>Archief</h4>

        <div class="flex flex-col border-t-2 border-b-2 divide-y-2">
            {#each data.news.slice(5) as news_item}
                <NewsItemRow news_item={news_item} />
            {/each}
        </div>
    </div>

</div>
