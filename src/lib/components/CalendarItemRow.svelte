<script lang="ts">
    import type { CalendarItem } from "$lib/CalendarItem";

    export let calendar_item: CalendarItem;
</script>

<div class="bg-white rounded p-4 space-y-2 shadow-sm">
    <p class="text-lg font-semibold text-primary truncate">{calendar_item.title}</p>
    <p class="text-sm truncate">{calendar_item.contents}</p>

    <div class="flex flex-wrap gap-2 items-end font-medium text-sm opacity-75">
        <div
            class="flex items-center gap-2 bg-white border-2 border-neutral-200 px-3 py-1 rounded-full text-xs"
        >
            <p class="">{calendar_item.calendarName}</p>
        </div>

        <div
            class="flex items-center gap-2 bg-white border-2 border-neutral-200 px-3 py-1 rounded-full text-xs"
        >
            <i class="bi bi-calendar-event" />
            <p class="">{calendar_item.start_time.toLocaleDateString()}</p>
        </div>

        <div
            class="flex items-center gap-2 bg-white border-2 border-neutral-200 px-3 py-1 rounded-full text-xs"
        >
            <i class="bi bi-clock" />
            <p class="truncate">
                {calendar_item.start_time.toLocaleTimeString()} - {calendar_item.end_time.toLocaleTimeString()}
            </p>
        </div>

        {#if calendar_item.location !== ""}
            <div
                class="flex items-center gap-2 bg-white border-2 border-neutral-200 px-3 py-1 rounded-full text-xs"
            >
                <i class="bi bi-geo-alt" />
                <p class="truncate">{calendar_item.location.slice(0, 50)}</p>
            </div>
        {/if}
    </div>
</div>
