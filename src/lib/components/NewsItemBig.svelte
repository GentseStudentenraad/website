<script lang="ts">
	import type { News } from '@prisma/client';

	export let news_item: News;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
	/>
</svelte:head>

<div>
	<a href="/nieuws/{news_item.id}">
		<div class="grid grid-cols-2 items-center">
			<img
				src="https://gentsestudentenraad.be/static/persistent/images/{news_item.banner_image}"
				class="object-cover rounded-lg aspect-[3/2] w-full"
				alt={news_item.banner_image_alt}
			/>

			<div class="p-12 space-y-1">
				<p class="font-bold uppercase text-sm opacity-50">Nieuws</p>
				<p class="font-bold text-3xl">{news_item.title}</p>
				<p class="font-medium font-lg opacity-75">{news_item.synopsis}</p>
				<div class="flex gap-2 pt-2 flex-wrap">
					<div class="tag">
						<i class="bi bi-calendar-event"></i>
						<p>
							{news_item.published_at.toLocaleDateString().toUpperCase()}
						</p>
					</div>
					<div class="tag">
						<i class="bi bi-person-fill"></i>
						<p>
							{news_item.author}
						</p>
					</div>
				</div>
			</div>
		</div>
	</a>
</div>

<style lang="sass">
    .tag
        @apply flex items-center gap-2 px-3 text-sm py-1 bg-white rounded-full w-fit border-2 border-neutral-200 font-semibold text-sm
</style>
