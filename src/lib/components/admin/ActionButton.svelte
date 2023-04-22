<script lang="ts">
    export let action: () => void;
    export let text = "Sla wijzigingen op";
</script>

<div class="grid grid-cols-2 gap-4">
    <button class="action-button text-black bg-neutral-300"> Annuleer </button>

    <button on:click={action} class="action-button text-white bg-neutral-900">
        {text}
    </button>
</div>

<style lang="postcss">
    .action-button {
        @apply p-4 text-center rounded-xl font-medium hover:cursor-pointer w-full;
    }
</style>
