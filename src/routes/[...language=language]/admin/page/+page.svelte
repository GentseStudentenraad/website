<script lang="ts">
    import type { PageData } from "./$types";
    import { Page } from "@prisma/client";
    import NewButton from "$lib/components/admin/NewButton.svelte";

    export let data: PageData;

    async function remove(page: Page) {
        const res = await fetch(`/api/page/${page.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            location.reload();
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />
    <style>
        :root {
            @apply bg-neutral-100;
        }
    </style>
</svelte:head>

<div class="space-y-4">
    <table class="table-auto">
        <thead>
            <tr>
                <th>
                    <div class="flex items-center">
                        <p>Title</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <p>Slug</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <p>Content</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody>
            {#each data.pages as page}
                <tr>
                    <td>
                        {page.nav_name_dutch}
                    </td>
                    <td>
                        {page.slug}
                    </td>
                    <td>
                        {page.content_dutch.slice(0, 50)}
                    </td>
                    <td>
                        <a href="/admin/page/{page.id}">
                            <i class="bi bi-pencil-square" />
                        </a>
                    </td>
                    <td>
                        <button on:click={() => remove(page)}>
                            <i class="bi bi-trash3-fill" />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <NewButton href="/admin/page/create" />
</div>

<style lang="sass">
    table
        @apply w-full

    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
