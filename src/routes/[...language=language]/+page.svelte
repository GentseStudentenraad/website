<script lang="ts">
	import CalendarItemRow from '$lib/components/CalendarItemRow.svelte';
	import NewsItemVertical from '$lib/components/NewsItemVertical.svelte';
	import 'chance';
	import { Chance } from 'chance';
	import SeparatedBanner from '$lib/components/SeparatedBanner.svelte';
	import type { PageData } from './$types';

	export let data: PageData
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
		class="object-cover w-full h-[60vh]"
		alt="Scenery of Ghent"
		style="object-position: 50% 75%"
	/>

	<div class="space-y-6 pt-12">
		<div class="container md space-y-1">
            {@html data.i18n.get('home-about')}
		</div>

		<div class="grid grid-cols-4 items-center container py-6 w-full gap-4">
			{#each data.news.slice(0, 4) as news_item}
				<NewsItemVertical {news_item} />
			{/each}
		</div>

		<div class="grid grid-cols-2 gap-4 items-center container">
			<div
				class="aspect-square bg-neutral-200 rounded-md flex items-center justify-center shadow-sm"
			>
				TODO: calendar view
			</div>

			<div class="space-y-4 w-full overflow-scroll">
				<p class="font-medium text-lg">Gebeurtenissen</p>

				{#each data.calendar.slice(0, 3) as calendar_item}
					<CalendarItemRow {calendar_item} />
				{/each}
			</div>
		</div>

		<SeparatedBanner
			title={Chance().sentence({ words: 6 })}
			body={Chance().paragraph()}
			imageUrl="https://www.ugent.be/img/dcom/logos/ugentflag.jpg"
			imageAlt="UGent Flag"
			css="bg-neutral-900 text-white"
			imagePosition="left"
		/>

		<div class="container py-12 space-y-2">
			<div class="gap-10 grid grid-cols-2">
				<div>
					<p class="font-bold font-serif text-2xl opacity-90">{Chance().sentence({ words: 3 })}</p>
					<p class="opacity-75">{Chance().paragraph()}</p>
				</div>
				<div>
					<p class="font-bold font-serif text-2xl opacity-90">{Chance().sentence({ words: 3 })}</p>
					<p class="opacity-75">{Chance().paragraph()}</p>
				</div>
				<div>
					<p class="font-bold font-serif text-2xl opacity-90">{Chance().sentence({ words: 3 })}</p>
					<p class="opacity-75">{Chance().paragraph()}</p>
				</div>
				<div>
					<p class="font-bold font-serif text-2xl opacity-90">{Chance().sentence({ words: 3 })}</p>
					<p class="opacity-75">{Chance().paragraph()}</p>
				</div>
			</div>
		</div>

		<SeparatedBanner
			title={Chance().sentence({ words: 6 })}
			body={Chance().paragraph()}
			imageUrl="https://unsplash.com/photos/ewGMqs2tmJI/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjJ8fHVuaXZlcnNpdHl8ZW58MHx8fHwxNjYzNzYzMzI3&force=true&w=1920"
			imageAlt="Classroom"
			css="text-white"
			color={data.configuration.brand_color_primary}
			imagePosition="right"
		/>
	</div>
</main>
