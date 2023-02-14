<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { text } from 'svelte/internal';

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
				<th>Tag</th>
                <th>Type</th>
				<th>Nederlands</th>
				<th>Engels</th>
                <th></th>
                <th></th>
			</tr>
		</thead>
		<tbody>
            {#each data.texts as text}
            <tr class="h-12 border-b child:p-4">
				<td>{text.key}</td>
                <td>{text.markup}</td>
				<td>{text.dutch?.substring(0, 50)}</td>
				<td>{text.english?.substring(0, 50)}</td>
                <td on:click={() => goto(`/admin/text/${text.id}`)}>
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
