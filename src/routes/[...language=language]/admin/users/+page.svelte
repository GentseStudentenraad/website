<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<table class="table-auto text-left w-full">
    <thead>
        <tr>
            <th>
                <div class="flex items-center">
                    <p>Email</p>
                    <div class="grow" />
                    <i class="bi bi-chevron-down" />
                </div>
            </th>
            <th>
                <p>Student</p>
            </th>
            <th>
                <p>Admin</p>
            </th>
        </tr>
    </thead>

    <tbody>
        {#each data.users as user}
            <tr>
                <td>
                    <p>{user.email}</p>
                </td>
                <td>
                    <p>{user.student ? "True" : "False"}</p>
                </td>
                <td>
                    <p>{user.admin.length > 0 ? "True" : "False"}</p>
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
