<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { Prisma, Question } from "@prisma/client";

    export let data: PageData;

    let newQuestion: Partial<Question> = {
        question: "",
        answer: "",
        question_category_id: data.category.id,
        sort_index: 0,
        organization: data.configuration.organization,
    };

    async function post() {
        const res = await fetch(`/api/faq/`, {
            method: "POST",
            body: JSON.stringify(newQuestion),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            goto(`/admin/faq/${data.category.id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="container space-y-4">
    <TextField description="Vraag" bind:value={newQuestion.question} />
    <LongTextField description="Antwoord" bind:value={newQuestion.answer} />
    <TextField description="Sorteerindex" bind:value={newQuestion.sort_index} />
    <ActionButton action={post} />
</div>

<style lang="sass">

</style>
