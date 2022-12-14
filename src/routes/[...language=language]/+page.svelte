<script lang="ts">
  import type {CalendarItem} from '$lib/CalendarItem';
  import CalendarItemRow from '$lib/components/CalendarItemRow.svelte';
  import type {News} from '@prisma/client';
  import NewsItemVertical from '$lib/components/NewsItemVertical.svelte';
  import 'chance';
  import {Chance} from 'chance';
  import SeparatedBanner from '$lib/components/SeparatedBanner.svelte';

  export let data: {
		calendar: CalendarItem[];
		news: News[];
		translations: any;
		configuration: any;
	};
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

	<div class="">
		<div class="container pt-12 pb-6 space-y-2">
			<p class="col-span-2 text-6xl font-serif font-bold lowercase">
				{data.translations.home.greeting}
			</p>
			<div
				class="w-full h-[4px] opacity-50"
				style:background-color={data.configuration.brand_color_primary}
			/>
			<p class="col-span-3 text-justify">{data.translations.home.introduction}</p>
		</div>

		<div class="grid grid-cols-6 items-center container py-6">
			<div class="col-span-4 grid grid-cols-3 gap-6 py-12">
				{#each data.news.slice(0, 3) as news_item}
					<NewsItemVertical {news_item} />
				{/each}
			</div>

			<a href="/nieuws" class="flex flex-col col-span-2 text-right">
				<p class="text-8xl font-serif font-bold transition hover:scale-[1.01] lowercase">
					{data.translations.home.news}
				</p>
			</a>
		</div>

		<div class="grid grid-cols-6 items-center container py-6 lowercase">
			<p class="text-7xl font-serif font-bold w-fit col-span-2">
				{data.translations.home.calendar}
			</p>

			<div class="col-span-4 flex flex-col divide-y-2">
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
