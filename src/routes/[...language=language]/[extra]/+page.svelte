<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#if data.banner}
    <img
        src={data.banner}
        class="w-full max-h-[600px] h-[50vh] object-cover"
        alt={data.banner_alt}
    />
{/if}

<div class="container md py-24">
    <p>{@html data.contents}</p>
</div>
