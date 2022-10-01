<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { Configuration, Prisma, Question } from '@prisma/client'

	type QuestionCategoryJoined = Prisma.QuestionCategoryGetPayload<{
		include: { questions: true }
	}>

	let selected: QuestionCategoryJoined | null;

	$: {
		if (browser && selected) {
			console.log(selected?.slug);
			goto(`#${selected!.slug}`);
			selected = null;
		}
	}

	export let data: {
		faq: QuestionCategoryJoined[];
		configuration: Configuration;
		translations: any;
	};
</script>

<div class="grid grid-cols-3 relative h-[60vh] items-center text-white bg-neutral-900">
	<div class="p-12 space-y-4">
		<div class="space-y-1">
			<p class="text-5xl font-serif font-bold shadow">{data.translations.faq.title}</p>
			<p>{data.translations.faq.subtitle}</p>
		</div>
		<select bind:value={selected}>
			<option value={null}>{data.translations.faq.selector}</option>
			{#each data.faq as category}
				<option value={category}>{category.title}</option>
			{/each}
		</select>
	</div>
	<img
		class="col-span-2 h-[60vh] object-cover w-full"
		src="https://unsplash.com/photos/4V1dC_eoCwg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjYzODQ4NDU0&force=true&w=1920"
		style="object-position: 50% 75%;"
	/>
</div>

<div class="container py-12 space-y-24">
	{#each data.faq as category}
		<div class="space-y-2">
			<p id={category.slug} class="font-bold text-4xl font-serif" style="scroll-margin-top: 75px">
				{category.title}
			</p>
			<div
				class="h-[3px] opacity-50"
				style:background-color={data.configuration.brand_color_primary}
			/>
			<div class="grid grid-cols-2 gap-12">
				{#each category.questions as questionAnswer}
					<div>
						<p class="font-semibold text-lg">{questionAnswer.question}</p>
						<p class="opacity-90">{@html questionAnswer.answer}</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<p class="text-center opacity-75 font-medium font-lg">{@html data.translations.faq.not_found}</p>
</div>

<style>
	select {
		@apply text-center font-medium px-5;
		appearance: none;
		background-color: rgb(39, 39, 39);
		border: transparent;
		text-indent: 5px;
		padding: 4px;
		margin: 0;
		width: 50%;
	}
</style>
