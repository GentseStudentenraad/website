<script lang="ts">
  import type {News} from '@prisma/client';

  export let news_item: News;
</script>

<a href="/nieuws/{news_item.id}" class="bg-white rounded-md shadow-sm h-full">
	<img
		src="https://gentsestudentenraad.be/static/persistent/images/{news_item.banner_image}"
		class="object-cover overflow-hidden aspect-square w-full rounded-t-md mb-2"
		alt={news_item.banner_image_alt}
	/>
	<div class="p-4">
		<p class="font-bold text-xs opacity-90">NIEUWS - {news_item.published_at.toLocaleDateString()}</p>
		<p class="font-semibold text-lg">{news_item.title}</p>
		<p class="text-sm opacity-75">{news_item.synopsis}</p>	
	</div>
</a>
