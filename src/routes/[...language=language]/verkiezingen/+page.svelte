<script lang="ts">
    import type { ElectionGroup } from "$lib/Election";
	import { Group } from "$lib/Person";
    import "chance";
	import { Chance } from "chance";

    export let data: {
        electionGroups: ElectionGroup[],
        translations: any
    }
</script>


<div class="container space-y-12 py-12">
    <div class="grid grid-cols-2 gap-6">
        <p class="font-serif font-bold text-5xl col-span-2">{data.translations.elections.title}</p>
        <p>{Chance().paragraph()}</p>
        <p>{Chance().paragraph()}</p>
    </div>
    {#each data.electionGroups as group}
        <div class="space-y-6">
            <div class="space-y-2">
                <p class="text-4xl font-serif font-bold">{group.title}</p>
                <p>{group.about}</p>
            </div>

            <div class="grid grid-cols-2 gap-12">
                {#each group.elections as election}
                    <div class="flex flex-col">
                        <p class="font-semibold text-lg">{election.title}</p>
                        <p>{election.about}</p>
                        {#if election.document_link}
                            <div class="grow"></div>
                            <a href={election.document_link} class="flex items-center gap-2 px-4 py-2 bg-primary rounded-full text-white w-fit mt-4">
                                <img src="/icons/document.png" alt="Document Icon" class="h-4 w-4">
                                <p>Infofiche</p>
                            </a>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
