<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { PersonGroup, Prisma } from "@prisma/client";

    export let data: PageData;
    let newGroup: Prisma.PersonGroupUncheckedCreateInput = {
        name: "",
        description: "",
        organization: data.configuration.organization,
        sort_index: 0,
    };

    async function post() {
        const res = await fetch(`/api/group/`, {
            method: "POST",
            body: JSON.stringify(newGroup),
            headers: {
                "content-type": "application/json",
            },
        });

        const group: PersonGroup = await res.json();

        if (res.status === 200) {
            await goto(`/admin/groups/${group.id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="container space-y-4">
    <TextField description="Naam" bind:value={newGroup.name} />
    <LongTextField description="Beschrijving" bind:value={newGroup.description} />
    <TextField description="Sorteerindex" bind:value={newGroup.sort_index} />
    <ActionButton action={post} />
</div>

<style lang="sass">

</style>
