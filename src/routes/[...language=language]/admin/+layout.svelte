<script lang="ts">
	import SideBarIcon from '$lib/components/admin/SideBarIcon.svelte';
</script>

<template lang="pug">
    .flex.gap-12
        .space-y-4.p-8.bg-neutral-50.shadow-md
            a(href="/admin")
                p.text-3xl.font-semibold Administratie

            .space-y-1
                p.category Algemeen
                SideBarIcon(icon="info-circle" value="Informatie" link="/admin/about")
                SideBarIcon(icon="brush" value="Thema" link="/admin/theme")
                SideBarIcon(icon="globe" value="Sociale Media" link="/admin/media")
                SideBarIcon(icon="toggles" value="Optionele Functies" link="/admin/features")
                SideBarIcon(icon="translate" value="Vertalingen" link="/admin/i18n")

            div(class="h-[1px] w-full bg-neutral-300")

            .space-y-1
                p.category Interne structuur
                SideBarIcon(icon="person" value="Personen" badgeNeutral=42 link="/admin/people")
                SideBarIcon(icon="people" value="Groepen" badgeNeutral=42 link="/admin/groups")

            div(class="h-[1px] w-full bg-neutral-300")

            .space-y-1
                p.category Inhoud
                SideBarIcon(icon="newspaper" value="Nieuwsberichten" badgeNeutral=9 link="/admin/nieuws")
                SideBarIcon(icon="question-circle" value="FAQ" link="/admin/faq")
                SideBarIcon(icon="broadcast" value="Projecten" link="/admin/projects")

            div(class="h-[1px] w-full bg-neutral-300")

            .space-y-1
                p.category Vakfeedback
                SideBarIcon(icon="chat" value="Feedback" badgeImportant=9 link="/admin/feedback")

        .w-full.p-12
            slot
</template>

<style lang="sass">
    .category
        @apply text-xs font-semibold opacity-75
</style>
