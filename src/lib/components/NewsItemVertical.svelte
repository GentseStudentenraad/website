<script lang="ts">
    import type { News } from "@prisma/client";

    export let news_item: News;
</script>

<div class="bg-white rounded-md">
    <a href="/nieuws/{news_item.id}">
        <img
            src={news_item.banner_image}
            class="object-cover overflow-hidden aspect-square w-full rounded-t-md"
            alt={news_item.banner_image_alt}
        />
        <div class="p-6 space-y-1">
            <p class="font-semibold">{news_item.title}</p>
            <p class="text-sm opacity-75">{news_item.synopsis}</p>
            <div class="flex gap-2 pt-2 flex-wrap">
                <div class="tag">
                    <i class="bi bi-calendar-event" />
                    <p>
                        {news_item.published_at.toLocaleDateString().toUpperCase()}
                    </p>
                </div>
                <div class="tag">
                    <i class="bi bi-person-fill" />
                    <p>
                        {news_item.author}
                    </p>
                </div>
            </div>
        </div>
    </a>
</div>

<style lang="sass">
    .tag
        @apply flex items-center gap-2 px-3 text-xs py-1 bg-white rounded-full w-fit border-2 border-neutral-200 font-semibold
</style>
