<script lang="ts">
	import type { News } from '@prisma/client';

	export let news_item: News;
</script>

<div>
	<a href="/nieuws/{news_item.id}">
		<div class="flex col-span-full items-center gap-6 rounded-md bg-white overflow-clip">
			<img
				src="https://gentsestudentenraad.be/static/persistent/images/{news_item.banner_image}"
				class="object-cover overflow-hidden aspect-video h-32 flex-none"
				alt={news_item.banner_image_alt}
			/>
			<div>
				<p class="font-bold text-xs opacity-90">
					NIEUWS - {news_item.published_at.toLocaleDateString()}
				</p>
				<p class="font-semibold text-lg">{news_item.title}</p>
				<p class="text-sm opacity-75">{news_item.synopsis}</p>
			</div>
		</div>
	</a>
</div>
