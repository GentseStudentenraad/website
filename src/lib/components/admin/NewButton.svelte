<script lang="ts">
    export let href: string;
    export let text = "Nieuw element";
</script>

<a {href} class="action-button bg-neutral-800 text-white">
    <i class="bi bi-plus" />
    {text}
</a>

<style lang="postcss">
    .action-button {
        @apply w-fit flex items-center gap-2 px-4 py-2 text-center rounded-lg text-sm font-semibold;
    }
</style>
