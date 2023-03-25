<script lang="ts">
	export let icon: string | null = null;
	export let value: string;
	export let position: 'left' | 'right' = 'left';
	export let color: 'grey' | 'white' | 'black' = 'grey';
	export let link: string | null = null;

	export let classes = () => {
		switch (color) {
			case 'grey':
				return `bg-neutral-50 border-neutral-200 text-black`;
			case 'white':
				return 'bg-white border-neutral-50 text-black';
			case 'black':
				return 'bg-neutral-800 text-white border-neutral-700/50';
		}
	};
</script>

<a class="widget {classes()}" href={link}>
	{#if icon !== null && position == 'left'}
		<i class="bi bi-{icon}" />
	{/if}
	<p>{value}</p>
	{#if icon !== null && position == 'right'}
		<i class="bi bi-{icon}" />
	{/if}
	{#if link !== null}
		<i class="bi bi-chevron-right text-[10px] -ml-1 opacity-50" />
	{/if}
</a>

<style lang="postcss">
	.widget {
		@apply flex gap-2 items-center text-xs border-2 w-fit px-3 py-1 rounded-full font-medium transition;
	}
</style>
