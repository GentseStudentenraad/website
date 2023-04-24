<script lang="ts">
    import type { PageData } from "./$types";
    import Checkbox from "$lib/components/admin/Checkbox.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";

    export let data: PageData;

    async function put() {
        await fetch(`/api/configuration/${data.configuration.id}`, {
            method: "PUT",
            body: JSON.stringify(data.configuration),
            headers: {
                "content-type": "application/json",
            },
        });
    }
</script>

<div class="space-y-6">
    <Checkbox
        bind:value={data.configuration.active}
        label="Website is publiek"
        description={null}
    />
    <Checkbox
        bind:value={data.configuration.news_section}
        label="Nieuwssectie"
        description={null}
    />
    <Checkbox bind:value={data.configuration.who_section} label="Wie-sectie" description={null} />
    <Checkbox bind:value={data.configuration.faq_section} label="FAQ-sectie" description={null} />
    <Checkbox
        bind:value={data.configuration.opinions_section}
        label="Standpuntensectie"
        description={null}
    />
    <Checkbox bind:value={data.configuration.i18n} label="Vertalingen" description={null} />
    <ActionButton action={put} />
</div>
