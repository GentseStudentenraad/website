<script>
	import { page } from '$app/stores';
</script>

<div class="m-auto max-w-[800px] px-12">
	<div class="flex items-center gap-12">
		<i class="bi bi-bug text-9xl" />
		<div>
			<p class="text-2xl font-bold">Error {$page.status}</p>
			<p class="text-lg">{$page.error?.message ?? 'Error unknown.'}</p>
		</div>
	</div>
</div>
