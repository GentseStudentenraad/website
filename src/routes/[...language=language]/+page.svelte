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

		<div class="grid grid-cols-4 container py-6 w-full gap-4">
			{#each data.news.slice(0, 4) as news_item}
				<NewsItemVertical {news_item} />
			{/each}
		</div>


		<div class="grid grid-cols-2 gap-4 container">
            <p class="font-medium text-lg col-span-2">Gebeurtenissen</p>

			<div
				class="gap-4 bg-neutral-200 rounded-md grid grid-cols-7 items-center justify-center shadow-sm p-24"
			>
                {#each ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'] as day}
                    <p class="cal-day">{day}</p>
                {/each}

                {#each Array.from(Array(30).keys()) as i}
                    <p class="text-center font-medium text-sm w-8 h-8 pt-[5px] rounded-full hover:bg-neutral-500 transition {Math.random() < 0.25 ? 'bg-neutral-400/50': ''}">{i}</p>
                {/each}
			</div>

			<div class="space-y-4 w-full overflow-scroll h-[500px]">

				{#each data.calendar as calendar_item}
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

<style lang="postcss">
    .cal-day {
        @apply  text-center font-bold text-sm w-8 h-8 pt-[5px] rounded-full hover:bg-neutral-500 transition;
    }
</style>
