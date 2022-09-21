<script lang="ts">
    import type { CalendarItem } from "$lib/CalendarItem";
    import type { Host } from "$lib/Host";
	import type { Language } from "$lib/Language";

    export let data: {
        language: Language,
        host: Host,
        calendar: CalendarItem[]
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        crossorigin=""
    />
</svelte:head>

<div>
    <h2>Kalender</h2>
    <p>We organiseren frequent gebeurtenissen waar iedereen aan mag deelnemen.</p>
</div>

<div class="flex flex-col divide-y-2">
    {#each data.calendar.slice(0, 10) as calendar_item}
        <div class="flex py-3 items-center justify-between">
            <div class="w-1/2 pr-6">
                <p class="text-lg font-medium text-primary">{calendar_item.title}</p>
                <p class="">{calendar_item.contents}</p>
            </div>

            <div class="flex flex-col gap-1 items-end">
                <div class="flex items-center gap-2">
                    <p class="">{calendar_item.start_time.toLocaleDateString()}</p>
                    <img class="h-4 w-4" src="/icons/calendar.png" alt="Date icon">
                </div>


                <div class="flex items-center gap-2">
                    <p class="">{calendar_item.start_time.toLocaleTimeString()} - {calendar_item.end_time.toLocaleTimeString()}</p>    
                    <img class="h-4 w-4" src="/icons/clock.png" alt="Date icon">
                </div>

                <div class="flex items-center gap-2">
                    <p class="">{calendar_item.location}</p>
                    <img class="h-4 w-4" src="/icons/map.png" alt="Date icon">
                </div>
            </div>
        </div>
    {/each}
</div>

