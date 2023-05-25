<script lang="ts">
    import Tag from "$lib/components/Tag.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#if data.opinionGroups.filter((e) => e.opinions.length > 0).length > 0}
    <div class="container py-12 space-y-24">
        {#each data.opinionGroups as group}
            {#if group.opinions.length > 0}
                <div class="space-y-4">
                    <div>
                        <p class="font-serif font-bold text-4xl">{group.name}</p>
                        {#if group.about}
                            <p>{group.about}</p>
                        {/if}
                    </div>

                    <div class="space-y-8">
                        {#each group.opinions as opinion}
                            <div class="grid grid-cols-3 bg-white rounded-md overflow-clip">
                                <div class="space-y-3 col-span-2 p-6 flex flex-col justify-center">
                                    <p class="text-primary decoration-2 font-bold text-xl">
                                        {opinion.title}
                                    </p>
                                    {#if opinion.about}
                                        <p>{opinion.about}</p>
                                    {/if}
                                    <div class="flex gap-4">
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
                                <img
                                    class="w-full h-full object-cover"
                                    src="https://unsplash.com/photos/oPDToLOwlqw/download?ixid=MnwxMjA3fDB8MXxhbGx8M3x8fHx8fDJ8fDE2Nzk3Mzg0MTI&force=true&w=640"
                                    alt="Bookshelves"
                                />
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{:else}
    <div class="container">
        <p class="text-3xl font-bold">TODO</p>
        <p>Voor dit jaar zijn nog geen standpunten vrijgegeven.</p>
        <a href="/standpunten/2021" class="fat-link">klik hier</a>
    </div>
{/if}
