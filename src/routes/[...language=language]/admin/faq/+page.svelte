<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { QuestionCategory } from "@prisma/client";
    import NewButton from "$lib/components/admin/NewButton.svelte";

    export let data: PageData;

    async function remove(category: QuestionCategory) {
        const res = await fetch(`/api/faq_category/${category.id}`, {
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
                        <p>Naam</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <p>URL slug</p>
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
                <th>
                    <div class="flex items-center">
                        <p>Beschrijving</p>
                        <div class="grow" />
                        <i class="bi bi-chevron-down" />
                    </div>
                </th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody>
            {#each data.faq as group}
                <tr>
                    <td>{group.title}</td>
                    <td>{group.slug}</td>
                    <td>{group.sort_index}</td>
                    <td>{group.description}</td>

                    <td>
                        <a href="/admin/faq/{group.id}">
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

    <NewButton href="/admin/faq/create" />
</div>

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
