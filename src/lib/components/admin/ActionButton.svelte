<script lang="ts">
    export let action: () => void;
    export let remove: () => void | null = null;
    export let text = "Sla wijzigingen op";
</script>

<div class="flex flex-wrap gap-4">
    <button on:click={action} class="action-button bg-neutral-800 text-white">
        <i class="bi bi-save" />
        {text}
    </button>

    {#if remove}
        <button on:click={remove} class="action-button bg-neutral-300 text-black">
            <i class="bi bi-trash" /> Verwijderen
        </button>
    {/if}
</div>

<style lang="postcss">
    .action-button {
        @apply flex items-center gap-2 px-4 py-2 text-center rounded-lg text-sm font-semibold;
    }
</style>
