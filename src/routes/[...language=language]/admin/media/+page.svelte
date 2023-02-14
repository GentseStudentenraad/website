<script lang="ts">
	import TextField from "$lib/components/Admin/TextField.svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div>
    <h4>Sociale Media</h4>

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
</div>
