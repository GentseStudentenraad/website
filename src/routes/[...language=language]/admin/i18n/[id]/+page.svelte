<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";

    export let data: PageData;

    async function put() {
        const res = await fetch(`/api/i18n/${data.text.id}`, {
            method: "PUT",
            body: JSON.stringify(data.text),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            goto("/admin/i18n");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="container space-y-4">
    <div>
        <p class="text-[12px] opacity-50 font-semibold uppercase">Type</p>
        <select>
            <option>MARKDOWN</option>
            <option>PLAIN_TEXT</option>
        </select>
    </div>
    <TextField description="Identificatie" bind:value={data.text.key} />
    <LongTextField description="Nederlands" bind:value={data.text.dutch} />
    <LongTextField description="Engels" bind:value={data.text.english} />
    <ActionButton action={put} />
</div>

<style lang="sass">

</style>
