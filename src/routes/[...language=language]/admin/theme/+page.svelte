<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import type { PageData } from './$types';
	import TextField from '$lib/components/admin/TextField.svelte';
	import ActionButton from '$lib/components/admin/ActionButton.svelte';
	import Checkbox from '$lib/components/admin/Checkbox.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<style>
		:root {
			@apply bg-neutral-100;
		}
	</style>
</svelte:head>

<div class="space-y-4">
    <h4>Vormgeving</h4>

    <div class="w-fit flex gap-2 items-center">
        <ColorPicker
            bind:hex={data.configuration.brand_color_primary}
            label=""
        />
        <p>Primaire kleur: {data.configuration.brand_color_primary}</p>
    </div>
    <div class="w-fit flex gap-2 items-center">
        <ColorPicker
            bind:hex={data.configuration.brand_color_secondary}
            label=""
        />
        <p>Secundaire kleur: {data.configuration.brand_color_secondary}</p>
    </div>

</div>
