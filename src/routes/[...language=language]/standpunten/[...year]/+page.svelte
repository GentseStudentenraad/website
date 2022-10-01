<script lang="ts">
	export let data: {
		opinionGroups: any[];
	};
</script>

{#if data.opinionGroups.filter((e) => e.opinions.length > 0).length > 0}
	<div class="container py-12 space-y-24">
		{#each data.opinionGroups as group}
			{#if group.opinions.length > 0}
				<div class="space-y-0">
					<div>
						<p class="font-serif font-bold text-6xl text-center">{group.name}</p>
						{#if group.description}
							<p>{group.description}</p>
						{/if}
					</div>

					<div class="space-y-6">
						{#each group.opinions as opinion}
							<div class="h-[3px] first:bg-transparent bg-black/20" />
							<div>
								<a
									href="https://gentsestudentenraad.be/static/persistent/files/{opinion.document_link}"
									class="space-y-1"
								>
									<p class="text-primary decoration-2 font-bold text-xl">{opinion.title}</p>
									{#if opinion.about}
										<p>{opinion.about}</p>
									{/if}
									<p class="font-bold text-sm opacity-75">
										{opinion.published_at.toLocaleDateString()}
									</p>
								</a>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<div class="container">
		<p class="text-3xl font-bold">TODO</p>
		<p>Voor dit jaar zijn nog geen standpunten vrijgegeven.</p>
		<a href="/standpunten/2021" class="fat-link">klik hier</a>
	</div>
{/if}
