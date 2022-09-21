<script>
	// @ts-ignore
    import { NewsItem } from "$lib/NewsItem";

    export /**
	* @type {{ news: NewsItem[]; }}
	*/
    let data;
</script>

<div class="container space-y-8">

    <div class="space-y-4">
        <div>
            <h2>Nieuws</h2>
            <p>Ontdek hier alles wat nieuw is bij de Gentse Studentenraad.</p>
        </div>

        <div class="grid grid-cols-4 gap-6">
            <img
                src={data.news[0].banner_image}
                class="col-span-2 object-cover overflow-hidden w-full aspect-video rounded-lg mb-2"
                alt={data.news[0].banner_image_alt}
            >

            <div class="col-span-2 self-center">
                <h6>NIEUWS - {data.news[0].published_at.toLocaleDateString()}</h6>
                <h2>{data.news[0].title}</h2>
                <h5>{data.news[0].synopsis}</h5>
            </div>

            {#each data.news.slice(1, 5) as news_item}
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
            {/each}


        </div>
    </div>

    <div class="space-y-1">
        <h4>Archief</h4>

        <div class="flex flex-col border-t-2 border-b-2 divide-y-2">
            {#each data.news.slice(5) as news_item}
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
            {/each}
        </div>
    </div>

</div>
