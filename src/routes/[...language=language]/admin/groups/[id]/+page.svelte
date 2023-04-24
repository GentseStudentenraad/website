<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    async function put() {
        await fetch(`/api/group/${data.group.id}`, {
            method: "PUT",
            body: JSON.stringify(data.group),
            headers: {
                "content-type": "application/json",
            },
        });
    }
</script>

<div class="container space-y-4">
    <TextField description="Naam" bind:value={data.group.name} />
    <LongTextField description="Beschrijving" bind:value={data.group.description} />
    <TextField description="Sorteerindex" bind:value={data.group.sort_index} />
    <ActionButton action={put} />
</div>

<style lang="sass">

</style>
