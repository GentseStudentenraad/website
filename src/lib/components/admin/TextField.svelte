<script lang="ts">
    export let placeholder = "";
    export let value: string | null = "";
    export let description: string;
</script>

<template>
    <div class="">
        {#if description !== null}
            <p class="text-[12px] opacity-50 font-semibold uppercase">{description}</p>
        {/if}
        <input type="text" class="textfield" {placeholder} bind:value />
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
