<script lang="ts">
	let links = [
		{ name: 'Siteconfiguratie', link: '/admin/config' },
		{ name: 'Nieuws', link: '/admin/nieuws' },
		{ name: 'Personen', link: '/admin/people' }
	];
</script>

<svelte:head>
	<style>
		:root {
			@apply bg-neutral-100;
		}
	</style>
</svelte:head>

<div class="py-12">
	<div class="container space-y-12">
		<div class="grid grid-cols-2 gap-y-2 gap-x-4">
			<p class="text-4xl font-bold col-span-2">Beheer</p>
			<p>
				Opgepast, wijzigingen die je hier maakt worden onmiddelijk zichtbaar gemaakt voor alle
				bezoekers. Wees dus extra voorzichtig met het opladen van nog-niet-publieke informatie.
			</p>
			<p>
				Ontbreek je enkele opties, of ondervind je enkele problemen? Contacteer ons gerust via <a
					class="fat-link"
					href="mailto:ict@gentsestudentenraad.be">mail</a
				>. We behandelen jouw bericht zo snel mogelijk.
			</p>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<p class="text-2xl font-bold col-span-2">Categorieën</p>
			{#each links as link}
				<a href={link.link}>
					<p class="bg-white rounded-md p-4 font-medium">{link.name}</p>
				</a>
			{/each}
		</div>
	</div>
</div>
