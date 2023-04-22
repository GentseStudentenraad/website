<script lang="ts">
    import Tag from "$lib/components/Tag.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<template>
    <div class="container space-y-4 py-12">
        <div class="text-5xl font-serif font-bold">Projecten</div>
        <p>
            Naast het vertegenwoordigen van studenten, ondersteunt de Gentse Studentenraad
            verschillende grote en kleine projecten ten voordele van de studenten van de UGent. Een
            verzoek om financiële ondersteuning wordt voorgelegd aan de Algemene Vergadering die
            beslist over het bedrag en de modaliteiten van de ondersteuning. Een aanvraag moet
            voldoen aan de voorwaarden opgesomd in het reglement voor financiële ondersteuning van
            projecten en kan worden ingediend via financien@gentsestudentenraad.be.
        </p>
        <div class="space-y-4">
            {#each data.projects as project}
                <div class="bg-white grid grid-cols-3 items-center rounded-md overflow-clip">
                    <img
                        class="aspect-square object-contain w-full p-6"
                        src={project.image}
                        alt="Project Logo"
                    />
                    <div class="p-6 col-span-2 space-y-1">
                        <p class="text-2xl font-semibold">{project.title}</p>
                        <p>{project.about}</p>
                        <div class="flex gap-4 pt-2">
                            <Tag link="/" value="Email" icon="mailbox" />
                            <Tag link="/" value="Website" icon="globe" />
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</template>
