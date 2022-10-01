<script lang="ts">
	import type { News } from '@prisma/client'

	export let news_item: News;
</script>

<a href="/nieuws/{news_item.id}">
	<div class="grid grid-cols-3 bg-neutral-900 overflow-hidden">
		<img
			src="https://gentsestudentenraad.be/static/persistent/images/{news_item.banner_image}"
			class="object-cover overflow-hidden h-[60vh] col-span-2 w-full"
			alt={news_item.banner_image_alt}
		/>

		<div class="self-center col-span-1 p-12 space-y-4 text-white">
			<div class="space-y-1">
				<p class="font-bold font-serif text-4xl">{news_item.title}</p>
				<p class="font-medium font-lg">{news_item.synopsis}</p>
				<p class="font-semibold opacity-75 text-sm">
					GEPUBLICEERD OP {news_item.published_at.toLocaleDateString().toUpperCase()}
				</p>
			</div>
			<div class="flex gap-4 items-center bg-neutral-900 w-fit rounded-full pr-8">
				<img
					src="https://unsplash.com/photos/RGKdWJOUFH0/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjYzNzc4MTYx&force=true&w=640"
					alt="Author Portrait"
					class="rounded-full h-12 w-12 object-cover"
				/>
				<div class="font-medium text-white">
					<p class="text-xs font-bold">FUNCTIE</p>
					<p class="text-sm">{news_item.author}</p>
				</div>
			</div>
		</div>
	</div>
</a>