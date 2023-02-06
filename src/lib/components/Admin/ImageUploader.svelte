<script lang="ts">
	export let source: string | null = null;
	export let description: string | null = null;

	const upload = (e) => {
		let image = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			source = e.target.result.toString();
		};
	};
</script>

<div class="py-2">
	{#if description !== null}
		<p class="text-[12px] opacity-50 font-semibold uppercase">{description}</p>
	{/if}

	<div class="flex items-center gap-4 w-full bg-white rounded-md p-4 shadow-sm">
		{#if source}
			<img class="h-32 rounded-md " src={source} />
		{/if}

		<input type="file" accept=".jpg, .jpeg, .png" on:change={(e) => upload(e)} />
	</div>
</div>
