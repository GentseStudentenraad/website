<script lang="ts">
    import type { CalendarItem } from "$lib/CalendarItem";
	import CalendarItemRow from "$lib/components/CalendarItemRow.svelte";
    import type { Host } from "$lib/Host";
	import type { Language } from "$lib/Language";
	import type { NewsItem } from "$lib/NewsItem";
    import NewsItemVertical from "$lib/components/NewsItemVertical.svelte";
    import "chance"
	import { Chance } from "chance";

    export let data: {
        language: Language,
        host: Host,
        calendar: CalendarItem[],
        news: NewsItem[],
        translations: any,
        configuration: any
    }
</script>

<main>
    <img
        src="https://unsplash.com/photos/G96J64iNrHo/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjYzNzczMzUy&force=true&w=1920"
        class="object-cover w-full h-[60vh]"
        alt="Scenery of Ghent"
        style="object-position: 50% 75%"
    >

    <div class="">
        <div class="container pt-12 pb-6 space-y-2">
            <p class="col-span-2 text-6xl font-serif font-bold lowercase">{data.translations.home.greeting}</p>
            <div class="w-full h-[4px] opacity-50" style:background-color={data.configuration.brand_color_primary}></div>
            <p class="col-span-3 text-justify">{data.translations.home.introduction}</p>
        </div>

        <div class="grid grid-cols-6 items-center container py-6">
            <div class="col-span-4 grid grid-cols-3 gap-6 py-12">
                {#each data.news.slice(0, 3) as news_item}
                    <NewsItemVertical news_item={news_item} />
                {/each}
            </div>

            <a href="/nieuws" class="flex flex-col col-span-2 text-right">
                <p class="text-8xl font-serif font-bold transition hover:scale-[1.01] lowercase">{data.translations.home.news}</p>
            </a>
        </div>

        <div class="grid grid-cols-6 items-center container py-6 lowercase">
            <p class="text-7xl font-serif font-bold w-fit col-span-2">{data.translations.home.calendar}</p>

            <div class="col-span-4 flex flex-col divide-y-2">
                {#each data.calendar.slice(0, 3) as calendar_item}
                    <CalendarItemRow calendar_item={calendar_item} />
                {/each}
            </div>
        </div>


        <div class="grid grid-cols-5 items-center bg-neutral-900 text-white">
            <img
                class="col-span-3"
                src="https://www.ugent.be/img/dcom/logos/ugentflag.jpg"
                alt="UGent Flag"
            >
            <div class="col-span-2 p-12 space-y-2">
                <p class="font-bold font-serif text-4xl opacity-90">{Chance().sentence({words: 6})}</p>
                <div class="w-full bg-white/50 h-[2px]"></div>
                <p class="opacity-75">{Chance().paragraph()} </p>
            </div>
        </div>

        <div class="container py-12 space-y-2">
            <div class="gap-10 grid grid-cols-2">
                <div>
                    <p class="font-bold font-serif text-2xl opacity-90">{Chance().sentence({words: 3})}</p>
                    <p class="opacity-75">{Chance().paragraph()} </p>
                </div>
                <div>
                    <p class="font-bold font-serif text-2xl opacity-90">{Chance().sentence({words: 3})}</p>
                    <p class="opacity-75">{Chance().paragraph()} </p>
                </div>
                <div>
                    <p class="font-bold font-serif text-2xl opacity-90">{Chance().sentence({words: 3})}</p>
                    <p class="opacity-75">{Chance().paragraph()} </p>
                </div>
                <div>
                    <p class="font-bold font-serif text-2xl opacity-90">{Chance().sentence({words: 3})}</p>
                    <p class="opacity-75">{Chance().paragraph()} </p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-5 items-center" style:background-color={data.configuration.brand_color_primary}>
            <div class="col-span-2  text-white p-12 space-y-2">
                <p class="font-bold font-serif text-4xl">{Chance().sentence({words: 6})}</p>
                <div class="w-full bg-white/50 h-[2px]"></div>
                <p class="">{Chance().paragraph()} </p>
            </div>
            <img
            class="col-span-3"
            src="https://unsplash.com/photos/ewGMqs2tmJI/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjJ8fHVuaXZlcnNpdHl8ZW58MHx8fHwxNjYzNzYzMzI3&force=true&w=1920"
            alt="UGent Flag"
            >
        </div>

    </div>
</main>