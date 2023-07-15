<script lang="ts">
    export let placeholder = "";
    export let value: string | number | null = "";
    export let description: string;

    export let number = false;
</script>

<template>
    <div class="">
        {#if description !== null}
            <p class="text-[12px] opacity-50 font-semibold uppercase">{description}</p>
        {/if}
        {#if number}
            <input type="number" class="textfield" {placeholder} bind:value />
        {:else}
            <input type="text" class="textfield" {placeholder} bind:value />
        {/if}
    </div>
</template>

<style lang="postcss">
    input {
        margin-top: 0 !important;
    }
    .textfield {
        @apply bg-white px-4 py-2 rounded-md w-full border-neutral-200 border-[1px];
    }
</style>
