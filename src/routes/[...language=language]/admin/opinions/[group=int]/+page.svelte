<script lang="ts">
    import type { PageData } from "./$types";
    import NewButton from "$lib/components/admin/NewButton.svelte";
    import { goto } from "$app/navigation";
    import { Opinion, Question } from "@prisma/client";
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";

    export let data: PageData;

    async function put() {
        const res = await fetch(`/api/opinion_group/${data.group.id}`, {
            method: "PUT",
            body: JSON.stringify(data.group),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            await goto(`/admin/opinions/`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function remove() {
        const res = await fetch(`/api/opinion_group`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            await goto("/api/opinions");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function removeOpinion(opinion: Opinion) {
        const res = await fetch(`/api/opinion/${opinion.id}`, {
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
    <TextField description="Titel" bind:value={data.group.name} />

    <LongTextField description="Beschrijving" bind:value={data.group.about} />

    <TextField description="Sorteerindex" bind:value={data.group.sort_index} number={true} />

    <ActionButton action={put} {remove} />

    <div class="h-4" />

    <table class="table-auto text-left w-full">
        <thead>
            <tr>
                <th>
                    <div class="flex items-center">
                        <p>Vraag</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <p>Antwoord</p>
                        <d iv class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody>
            {#each data.opinions as opinion}
                <tr>
                    <td>{opinion.title}</td>
                    <td>{opinion.about}..</td>

                    <td>
                        <a href="/admin/opinions/{data.group.id}/{opinion.id}">
                            <i class="bi bi-pencil-square" />
                        </a>
                    </td>
                    <td>
                        <button on:click={() => removeOpinion(opinion)}>
                            <i class="bi bi-trash3-fill" />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <NewButton href="/admin/opinions/{data.group.id}/create" />
</div>

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
