<script lang="ts">
    import SideBarIcon from "$lib/components/admin/SideBarIcon.svelte";
</script>

<div class="flex gap-12">
    <div class="space-y-4 p-8 bg-neutral-50 shadow-md">
        <a href="/admin">
            <p class="text-3xl font-semibold">Administratie</p>
        </a>
        <div class="space-y-1">
            <p class="category">Algemeen</p>
            <SideBarIcon icon="info-circle" value="Informatie" link="/admin/about" />
            <SideBarIcon icon="brush" value="Thema" link="/admin/theme" />
            <SideBarIcon icon="globe" value="Sociale Media" link="/admin/media" />
            <SideBarIcon icon="toggles" value="Optionele Functies" link="/admin/features" />
            <SideBarIcon icon="translate" value="Vertalingen" link="/admin/i18n" />
        </div>
        <div class="h-[1px] w-full bg-neutral-300" />
        <div class="space-y-1">
            <p class="category">Interne structuur</p>
            <SideBarIcon icon="person" value="Personen" badgeNeutral="42" link="/admin/people" />
            <SideBarIcon icon="people" value="Groepen" badgeNeutral="42" link="/admin/groups" />
        </div>
        <div class="h-[1px] w-full bg-neutral-300" />
        <div class="space-y-1">
            <p class="category">Inhoud</p>
            <SideBarIcon
                icon="newspaper"
                value="Nieuwsberichten"
                badgeNeutral="9"
                link="/admin/nieuws"
            />
            <SideBarIcon icon="question-circle" value="FAQ" link="/admin/faq" />
            <SideBarIcon icon="broadcast" value="Projecten" link="/admin/projects" />
        </div>
        <div class="h-[1px] w-full bg-neutral-300" />
        <div class="space-y-1">
            <p class="category">Vakfeedback</p>
            <SideBarIcon icon="chat" value="Feedback" badgeImportant="9" link="/admin/feedback" />
        </div>
    </div>
    <div class="w-full p-12">
        <slot />
    </div>
</div>

<style lang="sass">
    .category
        @apply text-xs font-semibold opacity-75
</style>
