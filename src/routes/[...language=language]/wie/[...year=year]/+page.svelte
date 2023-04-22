<script lang="ts">
	import 'chance';
	import { goto } from '$app/navigation';
	import PositionCard from '$lib/components/PositionCard.svelte';
	import type { PageData } from './$types';

	let selected = '2022';

	export let data: PageData;
</script>

<img
	src="https://gentsestudentenraad.be/static/persistent/images/7a2e803a-f3c1-47c2-bfe6-298aca6b09b1-DB-GSR-2.jpg"
	alt="Groepsfoto studentenraad"
	class="h-[50vh] object-cover"
	style="object-position: 50% 30%"
/>

<div class="container md grid grid-cols-2 gap-x-8 gap-y-2 py-12">
	{@html data.i18n.get('who-about')}
</div>

<div class="space-y-4">
	{#each data.groups.filter((e) => e.positions.length > 0) as group}
		<div class="odd:bg-neutral-100">
			<div class="container grid grid-cols-2 gap-6 py-6">
				<div class="space-y-1 col-span-2">
					<p class="font-serif font-bold text-3xl">{group.name}</p>
					{#if group.description}
						<p class="opacity-90">{@html group.description}</p>
					{/if}
				</div>
                <div class="space-y-6">
                    {#each group.positions as position, j}
                        {#if j % 2 === 0}
                            <PositionCard {position} />
                        {/if}
                    {/each}
                </div>
                <div class="space-y-6">
                    {#each group.positions as position, j}
                        {#if j % 2 === 1}
                            <PositionCard {position} />
                        {/if}
                    {/each}
                </div>
			</div>
		</div>
	{/each}

	<div class="container flex items-center justify-center py-12 gap-4">
		<p>Bekijk historische data:</p>
		<select name="year" id="year" bind:value={selected} on:change={() => goto(`/wie/${selected}`)}>
			{#each ['2022', '2021', '2020'] as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
	</div>
</div>
