<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";

    export let data: PageData;

    async function put() {
        const res = await fetch(`/api/group/${data.group.id}`, {
            method: "PUT",
            body: JSON.stringify(data.group),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            await goto("/admin/groups");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function remove() {
        const res = await fetch(`/api/group/${data.group.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            await goto("/admin/groups");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="container space-y-4">
    <TextField description="Naam" bind:value={data.group.name} />
    <LongTextField description="Beschrijving" bind:value={data.group.description} />
    <TextField description="Sorteerindex" bind:value={data.group.sort_index} />
    <ActionButton action={put} {remove} />
</div>

<style lang="sass">

</style>
