<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<table class="table-auto text-left w-full">
    <thead>
        <tr>
            <th>
                <div class="flex items-center">
                    <p>Naam</p>
                    <div class="grow"></div>
                    <i class="bi bi-chevron-down" />
                </div>
            </th>
            <th>
                <div class="flex items-center">
                    <p>Beschrijving</p>
                    <div class="grow"></div>
                    <i class="bi bi-chevron-down" />
                </div>
            </th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each data.groups as group}
        <tr>
            <td>{group.name}</td>
            <td>{group.description?.slice(0, 100)}</td>
            <td>
                <a href="/admin/groups/{group.id}">
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

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
