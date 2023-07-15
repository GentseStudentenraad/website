<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";

    export let data: PageData;

    async function put() {
        const res = await fetch(`/api/faq/${data.question.id}`, {
            method: "PUT",
            body: JSON.stringify(data.question),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            await goto(`/admin/faq/${data.question.question_category_id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function remove() {
        const res = await fetch(`/api/faq/${data.question.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            await goto(`/admin/faq/${data.question.question_category_id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="container space-y-4">
    <TextField description="Vraag" bind:value={data.question.question} />
    <LongTextField description="Antwoord" bind:value={data.question.answer} />
    <TextField description="Sorteerindex" bind:value={data.question.sort_index} number={true} />
    <ActionButton action={put} {remove} />
</div>

<style lang="sass">

</style>
