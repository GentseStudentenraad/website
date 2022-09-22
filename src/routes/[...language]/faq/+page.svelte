<script lang="ts">
	import { goto } from "$app/navigation";
    import type { QuestionCategory } from "$lib/FAQ";
    import { browser } from "$app/environment";

    let selected: QuestionCategory | null

    $: {
        if (browser && selected) {
            console.log(selected?.slug)
            goto(`#${selected!.slug}`)
            selected = null
        }
    }

    export let data: {
        faq: QuestionCategory[]
    }
</script>

<div class="grid grid-cols-3 relative h-[60vh] items-center text-white bg-neutral-900">
    <div class="p-12 space-y-4">
        <div class="space-y-1">
            <p class="text-5xl font-serif font-bold shadow">Vraag en Antwoord</p>
            <p>We beantwoorden hier alvast de meest frequent gestelde vragen. Toch geen antwoord gevonden? Contacteer ons dan gerust hier.</p>
        </div>
        <select bind:value={selected}>
            <option value={null}>Ga snel naar..</option>
            {#each data.faq as category}
                <option value={category}>{category.title}</option>
            {/each}
        </select>
    </div>
    <img class="col-span-2 h-[60vh] object-cover w-full" src="https://unsplash.com/photos/4V1dC_eoCwg/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjYzODQ4NDU0&force=true&w=1920" style="object-position: 50% 75%;">
</div>

<div class="container py-12 space-y-24">
    {#each data.faq as category}
        <div class="space-y-4">
            <p id={category.slug} class="font-bold text-4xl font-serif" style="scroll-margin-top: 75px">{category.title}</p>
            <div class="h-[3px] bg-primary/50"></div>
            <div class="grid grid-cols-2 gap-12">
                {#each category.contents as questionAnswer}
                <div>
                    <p class="font-semibold text-lg">{questionAnswer.question}</p>
                    <p class="opacity-90">{questionAnswer.answer}</p>
                </div>
                {/each}
            </div>
        </div>
    {/each}

    <p class="text-center opacity-75 font-medium font-lg">Niet gevonden wat je zocht?<br>Contacteer ons dan <a href="/" class="fat-link">hier</a>.</p>
</div>

<style>
select {
    @apply text-center font-medium px-5;
    appearance: none;
    background-color: rgb(39, 39, 39);
    border: transparent;
    text-indent: 5px;
    padding: 4px;
    margin: 0;
    width: 50%;
}
</style>