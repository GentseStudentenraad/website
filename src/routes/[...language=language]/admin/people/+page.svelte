<script lang="ts">
    import type { PageData } from "./$types";
    import NewButton from "$lib/components/admin/NewButton.svelte";
    import { Person } from "@prisma/client";
    export let data: PageData;

    async function remove(person: Person) {
        const res = await fetch(`/api/person/${person.id}`, {
            method: "delete",
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
                <th>Portret</th>
                <th>
                    <div class="flex items-center">
                        <p>Naam</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <p>Email</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th />
                <th />
            </tr>
        </thead>

        <tbody>
            {#each data.people as person}
                <tr>
                    <td>
                        {#if person.image}
                            <img
                                src={person.image}
                                alt="Portrait of {person.name}"
                                class="h-12 w-12 rounded-full"
                            />
                        {:else}
                            <div class="h-12 w-12 rounded-full bg-neutral-200 text-center">
                                null
                            </div>
                        {/if}
                    </td>
                    <td>
                        <p>{person.name}</p>
                    </td>
                    <td class:opacity-50={person.mail === null}>{person.mail}</td>
                    <td>
                        <a href="/admin/people/{person.id}">
                            <i class="bi bi-pencil-square" />
                        </a>
                    </td>
                    <td>
                        <button on:click={() => remove(person)}>
                            <i class="bi bi-trash3-fill" />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <NewButton href="/admin/people/create" />
</div>

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
