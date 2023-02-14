<script lang="ts">
	import { page } from '$app/stores';

	export let icon: string;
	export let value: string;
	export let badgeNeutral: number | null = null;
	export let badgeImportant: number | null = null;
	export let link: string;
</script>

<template lang="pug">
    a(href="{link}" class="btn" class:active="{$page.url.pathname === link}")
        i.bi(class="bi-{icon}")
        p {value}
        +if('badgeNeutral')
            .grow
            .opacity-50.text-xs {badgeNeutral}
        +if('badgeImportant')
            .grow
            p.badge {badgeImportant}
</template>

<style lang="sass">
    .btn
        @apply flex rounded-md -ml-4 px-4 py-2 gap-2 font-medium text-sm w-64 items-center opacity-75 cursor-pointer

    .btn.active
            @apply bg-neutral-100 opacity-100

    .badge
        @apply rounded-full bg-red-600 text-white w-6 h-6 flex items-center justify-center text-xs -mr-1
</style>
