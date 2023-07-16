<script lang="ts">
    import "chance";
    import type { PageData } from "./$types";
    import Tag from "$lib/components/Tag.svelte";

    export let data: PageData;
</script>

<div class="container space-y-6 py-12">
    {@html data.i18n.get("elections-title")}

    {#each data.electionGroups as group}
        <div>
            <div class="space-y-1">
                <p class="text-4xl font-serif font-bold">{group.name}</p>
                {#if group.description}
                    <p>{group.description}</p>
                {/if}
            </div>

            <div class="columns-2 gap-6">
                {#each group.elections as election}
                    <div class="space-y-1 bg-white mt-6 p-6 rounded-md break-inside-avoid">
                        <p class="font-semibold text-lg">{election.title}</p>
                        {#if election.description}
                            <p>{election.description}</p>
                        {/if}
                        {#if election.document}
                            <div class="pt-2">
                                <Tag value="Infofiche" icon="file" link={election.document} />
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
