<script lang="ts">
	export let action = () => {};
	export let text = 'Sla wijzigingen op';
	export let color: string;
</script>

<div class="grid grid-cols-2 gap-4">
	<button on:click={() => {}} class="action-button text-black"> Annuleer </button>

	<button on:click={action} class="action-button text-white" style:background-color={color}>
		{text}
	</button>
</div>

<style lang="postcss">
	.action-button {
		@apply shadow-md p-4 text-center bg-neutral-200 rounded-md text-lg font-bold hover:cursor-pointer w-full;
	}
</style>
