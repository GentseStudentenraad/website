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
		<div class="flex aspect-[3] w-full bg-white overflow-hidden rounded-xl items-center shadow-sm">
			<img
				src="https://gentsestudentenraad.be/static/persistent/images/{news_item.banner_image}"
				class="object-cover overflow-hidden w-[60%]"
				alt={news_item.banner_image_alt}
			/>

			<div class="p-12 space-y-2">
				<p class="font-bold font-serif text-4xl">{news_item.title}</p>
				<p class="font-medium font-lg">{news_item.synopsis}</p>
				<div class="flex items-center gap-2">
					<i class="bi bi-calendar-event" />
					<p class="font-semibold opacity-75 text-sm">
						{news_item.published_at.toLocaleDateString().toUpperCase()}
					</p>
				</div>
			</div>
		</div>
	</a>
</div>
