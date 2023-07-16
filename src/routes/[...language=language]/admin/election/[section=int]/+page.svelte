<script lang="ts">
    import type { PageData } from "./$types";
    import NewButton from "$lib/components/admin/NewButton.svelte";
    import { goto } from "$app/navigation";
    import { Election, Question } from "@prisma/client";
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";

    export let data: PageData;

    async function put() {
        const res = await fetch(`/api/election_group/${data.group.id}`, {
            method: "POST",
            body: JSON.stringify(data.group),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            await goto(`/admin/election/`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function remove() {
        const res = await fetch(`/api/election_group/${data.group.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            await goto("/api/election_group");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function removeElection(election: Election) {
        const res = await fetch(`/api/election/${election.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            location.reload();
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="space-y-4">
    <TextField description="Naam" bind:value={data.group.name} />
    <LongTextField description="Beschrijving" bind:value={data.group.description} />
    <TextField description="Sorteerindex" bind:value={data.group.sort_index} number={true} />
    <ActionButton action={put} {remove} />

    <div class="h-4" />

    <table class="w-full table-auto">
        <thead>
            <tr>
                <th>
                    <div class="flex items-center">
                        <p>Titel/Beschrijving</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody>
            {#each data.elections as election}
                <tr>
                    <td>
                        <p class="font-medium">{election.title}</p>
                        <p class="opacity-75 text-xs truncate">
                            {election.description?.slice(0, 100)}
                        </p>
                    </td>
                    <td>
                        <a href="/admin/election/{election.election_group_id}/{election.id}">
                            <i class="bi bi-pencil-square" />
                        </a>
                    </td>
                    <td>
                        <button on:click={() => removeElection(election)}>
                            <i class="bi bi-trash3-fill" />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <NewButton href="/admin/election/{data.group.id}/create" />
</div>

<style lang="sass">
    table
        word-break: break-word

    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
