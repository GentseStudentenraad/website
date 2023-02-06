<script lang="ts">
	export let placeholder = '';
	export let value: Date;
	export let description: string | null;
</script>

<template>
	<div class="py-2">
		{#if description !== null}
			<p class="text-[12px] opacity-50 font-semibold uppercase">{description}</p>
		{/if}
		<input type="date" class="textfield" placeholder="Auteur" bind:value />
	</div>
</template>

<style>
	input {
		margin-top: 0px !important;
	}
	.textfield {
		@apply bg-white px-4 py-2 rounded-md w-full border-neutral-200 border-[1px];
	}
</style>
