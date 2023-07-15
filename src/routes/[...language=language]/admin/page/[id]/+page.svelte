<script lang="ts">
    import type { PageData } from "./$types";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import Checkbox from "$lib/components/admin/Checkbox.svelte";
    import DatePicker from "$lib/components/admin/DatePicker.svelte";
    import ImageUploader from "$lib/components/admin/ImageUploader.svelte";
    import { goto } from "$app/navigation";

    async function put() {
        const res = await fetch(`/api/page/${data.page.id}`, {
            method: "PUT",
            body: JSON.stringify(data.page),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            await goto("/admin/page/");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function remove() {
        const res = await fetch(`/api/page/${data.page.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            await goto("/admin/page");
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
    <div>
        <p class="text-[12px] opacity-50 font-semibold uppercase">Type</p>
        <select class="px-3 py-2">
            <option>MARKDOWN</option>
            <option>PLAIN_TEXT</option>
        </select>
    </div>
    <TextField bind:value={data.page.slug} description="Slug" />
    <TextField bind:value={data.page.nav_name_dutch} description="Titel (NL)" />
    <TextField bind:value={data.page.nav_name_english} description="Titel (EN)" />
    <LongTextField bind:value={data.page.content_dutch} description="Inhoud (NL)" />
    <LongTextField bind:value={data.page.content_english} description="Inhoud (EN)" />
    <LongTextField bind:value={data.page.config} description="Configuratie" />
    <ActionButton action={put} {remove} />
</div>
