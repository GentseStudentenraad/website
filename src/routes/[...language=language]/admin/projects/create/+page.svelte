<script lang="ts">
    import type { PageData } from "./$types";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ImageUploader from "$lib/components/admin/ImageUploader.svelte";
    import { goto } from "$app/navigation";
    import { Project } from "@prisma/client";

    async function post() {
        const res = await fetch(`/api/project/`, {
            method: "POST",
            body: JSON.stringify(newProject),
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

    export let data: PageData;

    let newProject: Partial<Project> = {
        organization: data.configuration.organization,
        sort_index: 0,
        title: "",
        image: "",
        about: "",
    };
</script>

<svelte:head>
    <style>
        :root {
            @apply bg-neutral-100;
        }
    </style>
</svelte:head>

<div class="space-y-6">
    <TextField bind:value={newProject.title} description="Titel" />

    <LongTextField bind:value={newProject.about} description="Beschrijving" />

    <ImageUploader description="Coverfoto" source={newProject.aimage} />

    <ActionButton action={post} />
</div>
