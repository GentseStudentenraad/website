<script lang="ts">
    export let action: () => void;
    export let text = "Sla wijzigingen op";
</script>

<div class="flex flex-wrap gap-4">
    <button on:click={action} class="action-button bg-neutral-800 text-white">
        <i class="bi bi-save" />
        {text}
    </button>

    <button class="action-button bg-neutral-300 text-black opacity-50" disabled>
        <i class="bi bi-trash" /> Ongedaan maken
    </button>
</div>

<style lang="postcss">
    .action-button {
        @apply flex items-center gap-2 px-4 py-2 text-center rounded-lg text-sm font-semibold;
    }
</style>
