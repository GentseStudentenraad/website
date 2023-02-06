<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
	/>
	<style>
		:root {
			@apply bg-neutral-100;
		}
	</style>
</svelte:head>

<div class="container py-12 font-normal space-y-4">
	<table class="table-auto text-left">
		<thead class="">
			<tr class="h-12 border-b child:p-4">
				<th>Titel/Synopsis</th>
				<th>Auteur</th>
				<th>Publicatie</th>
			</tr>
		</thead>
		<tbody>
			{#each data.news as news_item}
				<tr class="h-16 border-y hover:cursor-pointer child:p-4">
					<td class="font-medium">
						<p class="font-medium">{news_item.title}</p>
						<p class="opacity-75 text-xs truncate">{news_item.synopsis}</p>
					</td>
					<td class:opacity-50={news_item.author === null} class="text-sm">
						{news_item.author ?? '/'}
					</td>
					<td class="text-sm font-bold">{news_item.published_at.toLocaleString()}</td>
					<td on:click={() => goto(`/admin/nieuws/${news_item.id}`)}>
						<i class="bi bi-pencil-square" />
					</td>
					<td on:click={() => alert('Zeker dat je dit bericht wenst te verwijderen?')}>
						<i class="bi bi-trash3-fill" />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
