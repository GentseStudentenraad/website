<script lang="ts">
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import type { Prisma } from "@prisma/client";
    import type { PageData } from "./$types";

    type QuestionCategoryJoined = Prisma.QuestionCategoryGetPayload<{
        include: { questions: true };
    }>;

    let selected: QuestionCategoryJoined | null;

    $: {
        if (browser && selected) {
            goto(`#${selected.slug}`);
            selected = null;
        }
    }

    export let data: PageData;
</script>

<div
    class="grid grid-cols-3 relative h-[60vh] items-center text-white bg-neutral-900 m-12 rounded-lg overflow-clip max-h-[500px]"
>
    <img
        class="col-span-2 h-[60vh] object-cover w-full max-h-[500px]"
        src="https://unsplash.com/photos/NboyPdtHqFc/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY5Mzk2NjE4&force=true&w=1920"
        style="object-position: 50% 75%;"
        alt="Books in a library."
    />
    <div class="space-y-3 p-12">
        <p class="text-4xl font-serif font-bold shadow">{@html data.i18n.get("faq-title")}</p>
        <p>{@html data.i18n.get("faq-about")}</p>
        <div class="pt-1">
            <select bind:value={selected}>
                <option value={null}>{@html data.i18n.get("faq-selector")}</option>
                {#each data.faq as category}
                    <option value={category}>{category.title}</option>
                {/each}
            </select>
        </div>
    </div>
</div>

<div class="container pb-12 space-y-12">
    {#each data.faq as category}
        <div class="space-y-4">
            <p
                id={category.slug}
                class="font-bold text-4xl font-serif"
                style="scroll-margin-top: 75px"
            >
                {category.title}
            </p>
            <div class="grid grid-cols-2 gap-6">
                <div class="space-y-6">
                    {#each category.questions as questionAnswer, i}
                        {#if i % 2 === 0}
                            <div class="space-y-1 bg-white p-6 rounded-md">
                                <p class="text-primary decoration-2 font-bold text-xl">
                                    {questionAnswer.question}
                                </p>
                                <p>{@html questionAnswer.answer}</p>
                            </div>
                        {/if}
                    {/each}
                </div>
                <div class="space-y-6">
                    {#each category.questions as questionAnswer, i}
                        {#if i % 2 === 1}
                            <div class="space-y-1 bg-white p-6 rounded-md">
                                <p class="text-primary decoration-2 font-bold text-xl">
                                    {questionAnswer.question}
                                </p>
                                <p>{@html questionAnswer.answer}</p>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    {/each}

    <p class="text-center opacity-75 font-medium font-lg">{@html data.i18n.get("faq-not-found")}</p>
</div>

<style lang="postcss">
    select {
        @apply text-center font-medium px-5;
        appearance: none;
        background-color: rgb(61, 61, 61);
        border: transparent;
        text-indent: 5px;
        padding: 4px;
        margin: 0;
        width: 50%;
    }
</style>
