<script lang="ts">
    import type { PageData } from "./$types";
    import NewButton from "$lib/components/admin/NewButton.svelte";
    import { goto } from "$app/navigation";
    import { Question } from "@prisma/client";
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";

    export let data: PageData;

    async function put() {
        const res = await fetch(`/api/faq_category/${data.category.id}`, {
            method: "POST",
            body: JSON.stringify(data.category),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            await goto(`/admin/faq/`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function remove() {
        const res = await fetch(`/api/faq_category`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            await goto("/api/faq");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function removeQuestion(question: Question) {
        const res = await fetch(`/api/faq/${question.id}`, {
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
    <TextField description="Titel" bind:value={data.category.title} />

    <LongTextField description="Beschrijving" bind:value={data.category.description} />

    <TextField description="Slug" bind:value={data.category.slug} />

    <TextField description="Sorteerindex" bind:value={data.category.sort_index} number={true} />

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
                        <button on:click={() => removeQuestion(question)}>
                            <i class="bi bi-trash3-fill" />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <NewButton href="/admin/faq/{data.categoryId}/create" />
</div>

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
