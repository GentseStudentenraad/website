<script lang="ts">
	import { Course } from '@prisma/client';
	import { Chance } from 'chance';
	let text = '';

	export let data;
	let course: Course | null;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
	/>
	<style>
		:root {
			@apply bg-neutral-100;
		}
	</style>
</svelte:head>

<img
	class="h-[50vh] w-full object-cover"
	src="https://unsplash.com/photos/s9CC2SKySJM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY5MzkzNDI5&force=true&w=1920"
/>

<div class="container py-16 space-y-8">
	<p class="font-serif font-bold text-6xl col-span-2">Vakfeedback</p>

	<div class="grid grid-cols-2 gap-16 items-center">
		<div class="space-y-16">
			<div class="order-0 space-y-1 h-fit">
				<p class="title"><i class="bi bi-piggy-bank pr-2" /> Jouw mening is goud waard</p>
				<div class="bg-neutral-200 w-full h-[2px]" />
				<p>{new Chance().paragraph().substring(0, 300)}</p>
			</div>

			<div class="order-2 space-y-1">
				<p class="title"><i class="bi bi-lock-fill pr-2" /> Het blijft tussen ons</p>
				<div class="bg-neutral-200 w-full h-[2px]" />
				<p>{new Chance().paragraph().substring(0, 300)}</p>
			</div>
		</div>

		<div class="space-y-4">
			<select class="w-full p-2 rounded-md font-bold" bind:value={course}>
				<option value={null}>Selecteer jouw richting</option>
				{#each data.courses as course}
					<option value={course}>{course.name}</option>
				{/each}
			</select>
			<select class="w-full p-2 rounded-md font-bold">
				<option>Kies een vak</option>
				{#if course}
					{#each course.subjects as subject}
						<option>{subject.subject.name} ({subject.subject_code})</option>
					{/each}
				{/if}
			</select>
			<textarea
				class="order-1 row-span-2"
				type="text"
				rows="10"
				bind:value={text}
				placeholder="Vul hier jouw bericht in."
			/>

			<p
				class="w-full py-4 font-bold rounded-md text-center text-white"
				style:background-color={data.configuration.brand_color_primary}
			>
				<i class="bi bi-send-fill pr-2" /> Verzenden
			</p>
		</div>
	</div>
</div>

<style>
	.title {
		@apply font-semibold text-lg;
	}

	textarea {
		@apply w-full rounded-lg shadow-md overflow-hidden p-4;
	}
</style>
