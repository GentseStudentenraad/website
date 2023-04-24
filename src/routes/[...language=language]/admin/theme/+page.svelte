<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import type { PageData } from "./$types";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";

    export let data: PageData;

    async function put() {
        await fetch(`/api/configuration/${data.configuration.id}`, {
            method: "PUT",
            body: JSON.stringify(data.configuration),
            headers: {
                "content-type": "application/json",
            },
        });
    }
</script>

<svelte:head>
    <style>
        :root {
            @apply bg-neutral-100;
        }
    </style>
</svelte:head>

<div class="space-y-6">
    <div class="w-fit flex gap-2 items-center">
        <ColorPicker bind:hex={data.configuration.brand_color_primary} label="" />
        <p>Primaire kleur: {data.configuration.brand_color_primary}</p>
    </div>

    <div class="w-fit flex gap-2 items-center">
        <ColorPicker bind:hex={data.configuration.brand_color_secondary} label="" />
        <p>Secundaire kleur: {data.configuration.brand_color_secondary}</p>
    </div>

    <ActionButton action={put} />
</div>
