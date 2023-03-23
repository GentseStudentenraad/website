<script lang="ts">
	import { page } from '$app/stores';

	export let icon: string;
	export let value: string;
	export let badgeNeutral: number | null = null;
	export let badgeImportant: number | null = null;
	export let link: string;
</script>

<template lang="pug">
    a(href="{link}" class="btn" class:active="{$page.url.pathname.includes(link)}")
        i.bi(class="bi-{icon}")
        p {value}
        +if('badgeNeutral')
            .grow
            .opacity-50.text-xs {badgeNeutral}
        +if('badgeImportant')
            .grow
            p.badge {badgeImportant}
</template>
