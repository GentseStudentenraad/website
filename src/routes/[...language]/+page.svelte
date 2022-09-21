<script lang="ts">
    import type { CalendarItem } from "$lib/CalendarItem";
	import CalendarItemRow from "$lib/components/CalendarItemRow.svelte";
    import type { Host } from "$lib/Host";
	import type { Language } from "$lib/Language";

    export let data: {
        language: Language,
        host: Host,
        calendar: CalendarItem[]
    }
</script>

<div>
    <h2>Kalender</h2>
    <p>We organiseren frequent gebeurtenissen waar iedereen aan mag deelnemen.</p>
</div>

<div class="flex flex-col divide-y-2">
    {#each data.calendar.slice(0, 10) as calendar_item}
    <CalendarItemRow calendar_item={calendar_item} />
    {/each}
</div>

