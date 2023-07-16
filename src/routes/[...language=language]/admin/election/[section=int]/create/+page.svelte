<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { Prisma, Question } from "@prisma/client";
    import Checkbox from "$lib/components/admin/Checkbox.svelte";

    export let data: PageData;

    async function post() {
        const res = await fetch(`/api/election/`, {
            method: "POST",
            body: JSON.stringify(data.election),
            headers: {
                "content-type": "application/json",
            },
        });

        const result = await res.json();

        if (res.status === 200) {
            await goto(`/admin/election/${result.election_group_id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="container space-y-4">
    <TextField description="Titel" bind:value={data.election.title} />
    <LongTextField description="Beschrijving" bind:value={data.election.description} />
    <TextField description="Document" bind:value={data.election.document} />
    <TextField description="Sorteerindex" bind:value={data.election.sort_index} number={true} />
    <Checkbox label="Publiek" bind:value={data.election.public} description="Opties" />
    <ActionButton action={post} />
</div>

<style lang="sass">

</style>
