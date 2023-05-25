<script lang="ts">
    import type { PageData } from "./$types";
    import TextField from "$lib/components/admin/TextField.svelte";
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
    <TextField
        placeholder="https://facebook.com"
        bind:value={data.configuration.facebook_url}
        description="Facebook"
    />

    <TextField
        placeholder="https://twitter.com"
        bind:value={data.configuration.twitter_url}
        description="Twitter"
    />

    <TextField
        placeholder="https://instagram.com"
        bind:value={data.configuration.instagram_url}
        description="Instagram"
    />

    <TextField
        placeholder="https://tiktok.com"
        bind:value={data.configuration.tiktok_url}
        description="TikTok"
    />

    <TextField
        placeholder="https://discord.com"
        bind:value={data.configuration.discord_url}
        description="Discord"
    />

    <TextField
        placeholder="https://discord.com"
        bind:value={data.configuration.linkedin_url}
        description="LinkedIn"
    />

    <TextField
        placeholder="https://github.com"
        bind:value={data.configuration.github_url}
        description="GitHub"
    />

    <ActionButton action={put} />
</div>
