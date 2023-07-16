<script lang="ts">
    import TextField from "$lib/components/admin/TextField.svelte";
    import LongTextField from "$lib/components/admin/LongTextField.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import DatePicker from "$lib/components/admin/DatePicker.svelte";
    import Checkbox from "$lib/components/admin/Checkbox.svelte";
    import ImageUploader from "$lib/components/admin/ImageUploader.svelte";

    export let data: PageData;

    async function put() {
        const res = await fetch(`/api/opinion/${data.opinion.id}`, {
            method: "PUT",
            body: JSON.stringify(data.opinion),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            await goto(`/admin/opinion/${data.opinion.opinion_group_id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }

    async function remove() {
        const res = await fetch(`/api/opinion/${data.opinion.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            await goto(`/admin/opinions/${data.opinion.opinion_group_id}`);
        } else {
            alert(JSON.stringify(res, null, 2));
        }
    }
</script>

<div class="container space-y-4">
    <TextField description="Vraag" bind:value={data.opinion.title} />
    <LongTextField description="Antwoord" bind:value={data.opinion.about} />
    <TextField description="Document" bind:value={data.opinion.document_link} />
    <ImageUploader description="Afbeelding" source={data.opinion.image} />
    <TextField description="Afbeelding" bind:value={data.opinion.image} />
    <DatePicker description="Publicatiedatum" bind:value={data.opinion.published_at} />
    <Checkbox label="Publiek" bind:value={data.opinion.published} description="Opties" />
    <ActionButton action={put} {remove} />
</div>

<style lang="sass">

</style>
