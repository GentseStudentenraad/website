<script lang="ts">
  import type {News} from '@prisma/client';

  export let news_item: News;
</script>

<div>
	<a href="/nieuws/{news_item.id}">
		<div class="grid grid-cols-5 bg-white overflow-hidden rounded-xl">
			<img
				src="https://gentsestudentenraad.be/static/persistent/images/{news_item.banner_image}"
				class="object-cover overflow-hidden col-span-3 w-full"
				alt={news_item.banner_image_alt}
			/>

			<div class="self-center col-span-2 p-12  space-y-4">
				<p class="font-bold font-serif text-4xl">{news_item.title}</p>
				<p class="font-medium font-lg">{news_item.synopsis}</p>
				<p class="font-semibold opacity-75 text-sm">
					GEPUBLICEERD OP {news_item.published_at.toLocaleDateString().toUpperCase()}
				</p>
				<div class="flex gap-4 items-center bg-neutral-900 w-fit rounded-full pr-8">
					<img
						src="https://unsplash.com/photos/RGKdWJOUFH0/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjYzNzc4MTYx&force=true&w=640"
						alt="Author Portrait"
						class="rounded-full h-12 w-12 object-cover"
					/>
					<div class="font-medium text-white">
						<p class="text-xs font-bold">Bestuurder</p>
						<p class="text-sm">{news_item.author}</p>
					</div>
				</div>

			</div>
		</div>
	</a>
</div>