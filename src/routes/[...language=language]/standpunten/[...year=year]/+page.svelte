<script lang="ts">
    import Tag from "$lib/components/Tag.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";

    export let data: PageData;

    let selected = 2023;
</script>

{#if data.opinionGroups.filter((e) => e.opinions.length > 0).length > 0}
    <div class="container pt-12 space-y-24">
        {#each data.opinionGroups as group}
            {#if group.opinions.length > 0}
                <div class="space-y-4">
                    <div>
                        <p class="font-bold text-3xl">{group.name}</p>
                        {#if group.about}
                            <p>{group.about}</p>
                        {/if}
                    </div>

                    <div class="space-y-8">
                        {#each group.opinions as opinion}
                            <div class="flex bg-white rounded-md overflow-clip justify-between">
                                <div class="p-6 flex flex-col justify-center space-y-1">
                                    <p class="text-primary decoration-2 font-bold text-xl">
                                        {opinion.title}
                                    </p>
                                    {#if opinion.about}
                                        <p>{opinion.about}</p>
                                    {/if}
                                    <div class="flex gap-4 pt-2">
                                        <Tag
                                            icon="calendar"
                                            value={opinion.published_at.toLocaleDateString()}
                                        />
                                        <Tag
                                            icon="file-earmark-richtext"
                                            value="Download"
                                            link={opinion.document_link}
                                        />
                                    </div>
                                </div>
                                {#if opinion.image}
                                    <img
                                        class="w-96 h-full object-cover"
                                        src={opinion.image}
                                        alt="Bookshelves"
                                    />
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}

        <div class="flex items-center justify-center gap-4 pb-12">
            <p>Bekijk historische data:</p>
            <select
                name="year"
                id="year"
                bind:value={selected}
                on:change={() => goto(`/standpunten/${selected}`)}
            >
                {#each data.years as year}
                    <option value={year}>{year}</option>
                {/each}
            </select>
        </div>
    </div>
{:else}
    <div class="grow" />
    <div class="flex items-center gap-6 justify-center w-full h-full">
        <i class="bi bi-file-earmark-x text-8xl" />
        <div>
            <p class="text-xl font-bold">Te vroeg!</p>
            <p class="mb-2">Voor dit jaar zijn nog geen standpunten vrijgegeven.</p>
            <Tag link="/standpunten/2021" value="Bekijk academiejaar 2021-2022" />
        </div>
    </div>
    <div class="grow" />
{/if}
