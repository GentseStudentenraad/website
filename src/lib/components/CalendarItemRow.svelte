<script lang="ts">
	import type { CalendarItem } from '$lib/CalendarItem';

	export let calendar_item: CalendarItem;
</script>

<div class="flex py-3 items-center justify-between">
	<div class="w-1/2 pr-6">
		<p class="text-lg font-semibold text-primary">{calendar_item.title}</p>
		<p class="">{calendar_item.contents}</p>
	</div>

	<div class="flex flex-col gap-1 items-end font-medium text-sm opacity-75">
		<div class="flex items-center gap-2">
			<p class="">{calendar_item.start_time.toLocaleDateString()}</p>
			<img class="h-4 w-4" src="/icons/calendar.png" alt="Date icon" />
		</div>

		<div class="flex items-center gap-2">
			<p class="">
				{calendar_item.start_time.toLocaleTimeString()} - {calendar_item.end_time.toLocaleTimeString()}
			</p>
			<img class="h-4 w-4" src="/icons/clock.png" alt="Date icon" />
		</div>

		<div class="flex items-center gap-2">
			<p class="">{calendar_item.location}</p>
			<img class="h-4 w-4" src="/icons/map.png" alt="Date icon" />
		</div>
	</div>
</div>
