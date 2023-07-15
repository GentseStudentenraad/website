<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { Prisma } from "@prisma/client";

    export let data: PageData;

    let newI18n: Prisma.i18nCreateInput = {
        key: "",
        dutch: "",
        english: "",
        markup: "PLAIN_TEXT",
        organization: data.configuration.organization,
    };

    async function post() {
        const res = await fetch(`/api/i18n/`, {
            method: "POST",
            body: JSON.stringify(newI18n),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            await goto("/admin/i18n");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="container space-y-4">
    <div>
        <p class="text-[12px] opacity-50 font-semibold uppercase">Type</p>
        <select class="px-3 py-2">
            <option>MARKDOWN</option>
            <option>PLAIN_TEXT</option>
        </select>
    </div>
    <TextField description="Identificatie" bind:value={newI18n.key} />
    <LongTextField description="Nederlands" bind:value={newI18n.dutch} />
    <LongTextField description="Engels" bind:value={newI18n.english} />
    <ActionButton action={post} />
</div>
