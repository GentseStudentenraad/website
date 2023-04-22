<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<table class="table-auto text-left w-full">
	<thead>
		<tr>
			<th>
				<div class="flex items-center">
					<p>Tag</p>
					<div class="grow"></div>
					<i class="bi bi-chevron-down"></i>
				</div>
			</th>
			<th>
				<div class="flex items-center">
					<p>Type</p>
					<div class="grow"></div>
					<i class="bi bi-chevron-down"></i>
				</div>
			</th>
			<th>Nederlands</th>
			<th>Engels</th>
			<th></th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each data.texts as text}
			<tr>
				<td>{text.key}</td>
				<td>{text.markup}</td>
				<td>{text.dutch?.substring(0, 50)}</td>
				<td>{text.english?.substring(0, 50)}</td>
				<td>
					<a href="/admin/i18n/{text.id}">
						<i class="bi bi-pencil-square"></i>
					</a>
				</td>
				<td>
					<i class="bi bi-trash3-fill"></i>
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
