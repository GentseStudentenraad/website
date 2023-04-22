<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

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
        {#each data.questions as question}
            <tr>
                <td>{question.question}</td>
                <td>{question.answer.slice(0, 200)}..</td>
                <td>{question.sort_index}</td>

                <td>
                    <a href="/admin/faq/{question.question_category_id}/{question.id}">
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
