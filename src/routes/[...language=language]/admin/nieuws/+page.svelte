<script lang="ts">
	import type { PageData } from './$types';

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

<table class="table-auto">
	<thead>
		<tr>
			<th>
				<div class="flex items-center">
					<p>Titel/Synopsis</p>
					<div class="grow" />
					<i class="bi bi-chevron-down" />
				</div>
			</th>
			<th>
				<div class="flex items-center">
					<p>Auteur</p>
					<div class="grow" />
					<i class="bi bi-chevron-down" />
				</div>
			</th>
			<th>
				<div class="flex items-center">
					<p>Publicatiedatum</p>
					<div class="grow" />
					<i class="bi bi-chevron-down" />
				</div>
			</th>
			<th />
			<th />
		</tr>
	</thead>
	<tbody>
		{#each data.news as news_item}
			<tr>
				<td>
					<p class="font-medium">{news_item.title}</p>
					<p class="opacity-75 text-xs truncate">{news_item.synopsis}</p>
				</td>
				<td class:opacity-50={news_item.author === null} class="text-sm">
					{news_item.author ?? '/'}
				</td>
				<td class="text-sm font-bold">{news_item.published_at.toLocaleString()}</td>
				<td>
					<a href="/admin/nieuws/{news_item.id}">
						<i class="bi bi-pencil-square" />
					</a>
				</td>
				<td>
					<i class="bi bi-trash3-fill" />
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="sass">
    th
        @apply text-left

    tbody
        @apply bg-white text-sm font-medium

    th, td
        @apply border border-neutral-200 px-3 py-2
</style>
