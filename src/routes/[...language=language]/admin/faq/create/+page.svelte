<script lang="ts">
    import type { PageData } from "./$types";
    import NewButton from "$lib/components/admin/NewButton.svelte";
    import { goto } from "$app/navigation";
    import { Question } from "@prisma/client";
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";

    export let data: PageData;

    async function post() {
        const res = await fetch(`/api/faq_category/`, {
            method: "POST",
            body: JSON.stringify(data.category),
            headers: {
                "content-type": "application/json",
            },
        });

        const category = await res.json();

        if (res.status === 200) {
            await goto(`/admin/faq/${category.id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="space-y-4">
    <TextField description="Titel" bind:value={data.category.title} />

    <LongTextField description="Beschrijving" bind:value={data.category.description} />

    <TextField description="Slug" bind:value={data.category.slug} />

    <TextField description="Sorteerindex" bind:value={data.category.sort_index} number={true} />

    <ActionButton action={post} />
</div>
