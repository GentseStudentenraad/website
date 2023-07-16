<script lang="ts">
    import type { PageData } from "./$types";
    import { ElectionGroup } from "@prisma/client";
    import NewButton from "$lib/components/admin/NewButton.svelte";

    export let data: PageData;

    async function remove(element: ElectionGroup) {
        const res = await fetch(`/api/election_group/${element.id}`, {
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
    <table class="table-auto text-left w-full">
        <thead>
            <tr>
                <th>
                    <div class="flex items-center">
                        <p>Naam/Beschrijving</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <p>Sorteerindex</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody>
            {#each data.electionGroups as group}
                <tr>
                    <td>
                        <p class="font-medium">{group.name}</p>
                        <p class="opacity-75 text-xs truncate">{group.description}</p>
                    </td>
                    <td>{group.sort_index}</td>

                    <td>
                        <a href="/admin/election/{group.id}">
                            <i class="bi bi-chevron-right" />
                        </a>
                    </td>
                    <td>
                        <button on:click={() => remove(group)}>
                            <i class="bi bi-trash3-fill" />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <NewButton href="/admin/election/create" />
</div>

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
