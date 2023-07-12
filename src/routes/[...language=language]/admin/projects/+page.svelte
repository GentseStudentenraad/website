<script lang="ts">
    import type { PageData } from "./$types";
    import NewButton from "$lib/components/admin/NewButton.svelte";

    export let data: PageData;
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
                    <p>Afbeelding</p>
                </th>

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
            {#each data.projects as project}
                <tr>
                    <td>
                        <img
                            class="h-16 aspect-square object-contain"
                            src={project.image}
                            alt="Project Logo"
                        />
                    </td>

                    <td>
                        <p class="font-medium">{project.title}</p>
                        <p class="opacity-75 text-xs truncate">{project.about.slice(0, 100)}</p>
                    </td>
                    <td>
                        <a href="/admin/projects/{project.id}">
                            <i class="bi bi-pencil-square" />
                        </a>
                    </td>
                    <td>
                        <i class="bi bi-trash3-fill" />
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <NewButton href="/admin/projects/create" />
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
