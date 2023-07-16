<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";

    export let data: PageData;

    async function post() {
        const res = await fetch(`/api/election_group/`, {
            method: "POST",
            body: JSON.stringify(data.group),
            headers: {
                "content-type": "application/json",
            },
        });

        const result = await res.json();

        if (res.status === 200) {
            await goto(`/admin/election/${result.id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="space-y-4">
    <TextField description="Naam" bind:value={data.group.name} />
    <LongTextField description="Beschrijving" bind:value={data.group.description} />
    <TextField description="Sorteerindex" bind:value={data.group.sort_index} number={true} />
    <ActionButton action={post} />
</div>
