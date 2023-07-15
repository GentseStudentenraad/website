<script lang="ts">
    import type { PageData } from "./$types";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ImageUploader from "$lib/components/admin/ImageUploader.svelte";
    import { goto } from "$app/navigation";

    async function post() {
        const res = await fetch(`/api/project/${data.project.id}`, {
            method: "PUT",
            body: JSON.stringify(data.project),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            goto("/admin/projects");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function remove() {
        const res = await fetch(`/api/project/${data.project.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            await goto("/admin/projects");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    export let data: PageData;
</script>

<svelte:head>
    <style>
        :root {
            @apply bg-neutral-100;
        }
    </style>
</svelte:head>

<div class="space-y-6">
    <TextField bind:value={data.project.title} description="Titel" />

    <LongTextField bind:value={data.project.about} description="Beschrijving" />

    <ImageUploader description="Coverfoto" source={data.project.image} />

    <ActionButton action={post} {remove} />
</div>
