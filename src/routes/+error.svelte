<script>
    import {page} from '$app/stores';
</script>

<div class="container">
	<div class="flex items-center gap-4">
		<img src="/error.png" class="h-48" />
		<div class="space-y-1">
			<p class="text-4xl font-bold">Error {$page.status}</p>
			<p class="text-xl">{$page.error?.message ?? 'Error unknown.'}</p>
			<div class="divider" />
			<p>
				Geen zorgen, we houden deze foutmelding bij en proberen hem zo snel mogelijk op te lossen.
			</p>
		</div>
	</div>
</div>
