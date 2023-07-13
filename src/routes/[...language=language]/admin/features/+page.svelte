<script lang="ts">
    import type { PageData } from "./$types";
    import Checkbox from "$lib/components/admin/Checkbox.svelte";
    import ActionButton from "$lib/components/admin/ActionButton.svelte";
    import { goto } from "$app/navigation";

    export let data: PageData;

    async function put() {
        const res = await fetch(`/api/configuration/${data.configuration.id}`, {
            method: "PUT",
            body: JSON.stringify(data.configuration),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.status === 200) {
            goto("/admin");
        } else {
            alert(JSON.stringify(res, null, 2));
        }
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
    <Checkbox
        bind:value={data.configuration.feedback_section}
        label="Vakfeedback"
        description={null}
    />
    <Checkbox
        bind:value={data.configuration.project_section}
        label="Projectensectie"
        description={null}
    />
    <Checkbox bind:value={data.configuration.who_section} label="Wie-sectie" description={null} />
    <Checkbox bind:value={data.configuration.faq_section} label="FAQ-sectie" description={null} />
    <Checkbox
        bind:value={data.configuration.elections_section}
        label="Verkiezingensectie"
        description={null}
    />
    <Checkbox
        bind:value={data.configuration.opinions_section}
        label="Standpuntensectie"
        description={null}
    />
    <Checkbox bind:value={data.configuration.i18n} label="Vertalingen" description={null} />
    <ActionButton action={put} />
</div>
