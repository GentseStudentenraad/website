<script lang="ts">
  export let placeholder: String
  export let value: String
  export let description: String?
</script>

<template>
  <div class="py-2">
    {#if description !== null}
      <p class="text-[12px] opacity-50 font-semibold uppercase">{description}</p>
    {/if}
    <textarea
      type="text"
      class="w-full"
      rows="10"
      placeholder={placeholder}
      bind:value={value}
    />
  </div>
</template>

<style>
    textarea {
        @apply bg-white px-4 py-2 rounded-md w-full border-neutral-200 border-[1px];
    }
</style>