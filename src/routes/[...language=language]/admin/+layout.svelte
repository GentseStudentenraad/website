<script lang="ts">
	import SideBarIcon from '$lib/components/admin/SideBarIcon.svelte';
</script>

<template lang="pug">
    .flex.container.gap-12.py-12
        .space-y-4
            a(href="/admin")
                p.text-3xl.font-semibold Administratie

            div(class="h-[1px] w-full bg-neutral-300")

            .space-y-1
                p.category Algemeen
                SideBarIcon(icon="building" value="Informatie" link="/admin/about")
                SideBarIcon(icon="brush" value="Thema" link="/admin/config")
                SideBarIcon(icon="globe" value="Sociale Media" link="/admin/media")
                SideBarIcon(icon="toggles" value="Optionele Functies" link="/admin/account")

            div(class="h-[1px] w-full bg-neutral-300")

            .space-y-1
                p.category Interne structuur
                SideBarIcon(icon="person" value="Personen" badgeNeutral=42 link="/admin/people")
                SideBarIcon(icon="people" value="Groepen" badgeNeutral=42 link="/admin/people")

            div(class="h-[1px] w-full bg-neutral-300")

            .space-y-1
                p.category Nieuws
                SideBarIcon(icon="newspaper" value="Nieuwsberichten" badgeNeutral=9)

            div(class="h-[1px] w-full bg-neutral-300")

            .space-y-1
                p.category Vakfeedback
                SideBarIcon(icon="chat" value="Feedback" badgeImportant=9)

        slot
</template>

<style lang="sass">
    .category
        @apply text-xs font-semibold opacity-75
</style>
