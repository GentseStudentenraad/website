<script lang="ts">
    import NewsItemVertical from "$lib/components/NewsItemVertical.svelte";
    import "chance";
    import { Chance } from "chance";
    import SeparatedBanner from "$lib/components/SeparatedBanner.svelte";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import * as FullCalendar from "fullcalendar";
    import iCalendarPlugin from "@fullcalendar/icalendar";

    export let data: PageData;

    // Initialize the interactive calendar
    onMount(async () => {
        if (data.calendars.length > 0) {
            const calendarEl = document.getElementById("calendar");
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "dayGridMonth",
                plugins: [iCalendarPlugin],
                eventSources: data.calendars.map((cal) => {
                    return {
                        url: `${data.origin}/api/calendar/${cal.id}`,
                        format: "ics",
                    };
                }),
            });
            calendar.render();
        }
    });
</script>

<svelte:head>
    <style>
        :root {
            @apply bg-neutral-100;
        }
    </style>
</svelte:head>

<main>
    <img
        src="https://unsplash.com/photos/G96J64iNrHo/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjYzNzczMzUy&force=true&w=1920"
        class="object-cover w-full h-[60vh] max-h-[500px]"
        alt="Scenery of Ghent"
        style="object-position: 50% 75%"
    />

    <div class="space-y-12 py-12">
        <div class="container md space-y-1">
            {@html data.i18n.get("home-about")}
        </div>

        {#if data.calendars.length > 0}
            <div class="container">
                <div id="calendar" class="h-[600px]" />
            </div>
        {/if}

        <p class="container">{Chance().paragraph()}</p>

        <SeparatedBanner
            title={Chance().sentence({ words: 6 })}
            body={Chance().sentence({ words: 30 })}
            imageUrl="https://www.ugent.be/img/dcom/logos/ugentflag.jpg"
            imageAlt="UGent Flag"
            css="bg-neutral-900 text-white"
            imagePosition="left"
        />

        <div class="container space-y-2">
            <div class="gap-10 grid grid-cols-2">
                <div>
                    <p class="font-bold text-xl opacity-90">{Chance().sentence({ words: 3 })}</p>
                    <p class="opacity-75">{Chance().paragraph()}</p>
                </div>
                <div>
                    <p class="font-bold text-xl opacity-90">{Chance().sentence({ words: 3 })}</p>
                    <p class="opacity-75">{Chance().paragraph()}</p>
                </div>
                <div>
                    <p class="font-bold text-xl opacity-90">{Chance().sentence({ words: 3 })}</p>
                    <p class="opacity-75">{Chance().paragraph()}</p>
                </div>
                <div>
                    <p class="font-bold text-xl opacity-90">{Chance().sentence({ words: 3 })}</p>
                    <p class="opacity-75">{Chance().paragraph()}</p>
                </div>
            </div>
        </div>

        <SeparatedBanner
            title={Chance().sentence({ words: 6 })}
            body={Chance().sentence({ words: 30 })}
            imageUrl="https://unsplash.com/photos/ewGMqs2tmJI/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjJ8fHVuaXZlcnNpdHl8ZW58MHx8fHwxNjYzNzYzMzI3&force=true&w=1920"
            imageAlt="Classroom"
            css="text-white"
            color={data.configuration.brand_color_primary}
            imagePosition="right"
        />

        <p class="container">{Chance().paragraph()}</p>

        <div class="grid grid-cols-4 container w-full gap-4">
            {#each data.news.slice(0, 4) as news_item}
                <NewsItemVertical {news_item} />
            {/each}
        </div>
    </div>
</main>
