<script lang="ts">
	export let title: string;
	export let body: string;
	export let imageUrl: string;
	export let imageAlt = '';
	export let css = '';
	export let imagePosition: 'left' | 'right';
	export let color: string = '';
</script>

<div class="grid grid-cols-5 items-center {css}" style:background-color={color}>
	{#if imagePosition == 'left'}
		<img class="col-span-3" src={imageUrl} alt={imageAlt} />
	{/if}
	<div class="col-span-2 p-12 space-y-2">
		<p class="font-bold font-serif text-4xl opacity-90">{title}</p>
		<div class="w-full bg-white/50 h-[2px]" />
		<p class="opacity-75">{body}</p>
	</div>
	{#if imagePosition == 'right'}
		<img class="col-span-3" src={imageUrl} alt={imageAlt} />
	{/if}
</div>
