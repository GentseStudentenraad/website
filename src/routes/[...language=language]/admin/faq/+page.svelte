<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

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
                    <i class="bi bi-trash3-fill" />
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
