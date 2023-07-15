<script lang="ts">
    import type { PageData } from "./$types";
    import NewButton from "$lib/components/admin/NewButton.svelte";
    import { i18n } from "@prisma/client";

    export let data: PageData;

    async function remove(element: i18n) {
        const res = await fetch(`/api/i18n/${element.id}`, {
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
                        <p>Tag</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <p>Type</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th>Nederlands</th>
                <th>Engels</th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody>
            {#each data.texts as text}
                <tr>
                    <td>{text.key}</td>
                    <td>{text.markup}</td>
                    <td>{text.dutch?.substring(0, 50)}</td>
                    <td>{text.english?.substring(0, 50)}</td>
                    <td>
                        <a href="/admin/i18n/{text.id}">
                            <i class="bi bi-pencil-square" />
                        </a>
                    </td>
                    <td>
                        <button on:click={() => remove(text)}>
                            <i class="bi bi-trash3-fill" />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <NewButton href="/admin/i18n/create" />
</div>

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
