<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<table class="table-auto text-left w-full">
	<thead>
		<tr>
			<th>
				<div class="flex items-center">
					<p>Student</p>
					<div class="grow" />
					<i class="bi bi-chevron-down" />
				</div>
			</th>
			<th>
				<div class="flex items-center">
					<p>Vak</p>
					<div class="grow" />
					<i class="bi bi-chevron-down" />
				</div>
			</th>
			<th>
				<div class="flex items-center">
					<p>Datum</p>
					<div class="grow" />
					<i class="bi bi-chevron-down" />
				</div>
			</th>
			<th>
				<div class="flex items-center">
					<p>Inhoud</p>
					<div class="grow" />
					<i class="bi bi-chevron-down" />
				</div>
			</th>
			<th />
			<th />
		</tr>
	</thead>

	<tbody>
		{#each [0, 0, 0, 0, 0, 0, 0, 0] as _}
			<tr>
				<td>Anoniem</td>
				<td>Algoritmen en Datastructuren III</td>
				<td>{new Date().toLocaleDateString()}</td>
				<td
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.</td
				>
				<td>
					<a href="/admin/feedback/001">
						<i class="bi bi-eye" />
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
