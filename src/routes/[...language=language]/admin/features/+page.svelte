<script lang="ts">
	import type { PageData } from './$types';
    import Checkbox from '$lib/components/Admin/Checkbox.svelte';

	export let data: PageData;
</script>

<div class="space-y-2">
    <div>
        <h4>Optionele features</h4>
        <p>Je kan bepaalde functionaliteiten in- en uitschakelen. Je verliest hierbij geen data.</p>
    </div>
    <Checkbox bind:value={data.configuration.active} label="Website is publiek" description={null} />
    <Checkbox bind:value={data.configuration.news_section} label="Nieuwssectie" description={null} />
    <Checkbox bind:value={data.configuration.who_section} label="Wie-sectie" description={null} />
    <Checkbox bind:value={data.configuration.faq_section} label="FAQ-sectie" description={null} />
    <Checkbox bind:value={data.configuration.opinions_section} label="Standpuntensectie" description={null} />
    <Checkbox bind:value={data.configuration.i18n} label="Vertalingen" description={null} />
</div>
