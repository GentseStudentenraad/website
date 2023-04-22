<script lang="ts">
	import TextField from '$lib/components/admin/TextField.svelte';
	import LongTextField from '$lib/components/admin/LongTextField.svelte';
	import ActionButton from '$lib/components/admin/ActionButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container space-y-4">
    <div>
        <p class="text-[12px] opacity-50 font-semibold uppercase">Type</p>
        <select>
            <option>MARKDOWN</option>
            <option>PLAIN_TEXT</option>
        </select>
    </div>
    <TextField description="Identificatie" bind:value={data.text.key}></TextField>
    <LongTextField description="Nederlands" bind:value={data.text.dutch}></LongTextField>
    <LongTextField description="Engels" bind:value={data.text.english}></LongTextField>
    <ActionButton></ActionButton>
</div>

<style lang="sass">
</style>
