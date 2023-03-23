<script lang="ts">
	import TextField from '$lib/components/admin/TextField.svelte';
	import LongTextField from '$lib/components/admin/LongTextField.svelte';
	import ActionButton from '$lib/components/admin/ActionButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<template lang="pug">
    .container.py-12
        p(class="text-[12px] opacity-50 font-semibold uppercase") Type
        select
            option MARKDOWN
            option PLAIN_TEXT
        TextField(description="Identificatie" bind:value!="{data.text.key}")
        LongTextField(description="Nederlands" bind:value!="{data.text.dutch}")
        LongTextField(description="Engels" bind:value!="{data.text.english}")
        ActionButton
</template>

<style lang="sass">

</style>
