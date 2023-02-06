<script lang="ts">
	export let placeholder: string = "";
	export let value: string;
	export let description: string | null = null;
</script>

<template>
	<div class="py-2">
		{#if description !== null}
			<p class="text-[12px] opacity-50 font-semibold uppercase">{description}</p>
		{/if}
		<textarea class="w-full" rows="10" {placeholder} bind:value />
	</div>
</template>

<style lang="postcss">
	textarea {
		@apply bg-white px-4 py-2 rounded-md w-full border-neutral-200 border-[1px];
	}
</style>
