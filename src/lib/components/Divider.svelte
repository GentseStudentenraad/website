<script lang="ts">
	export let text: string;
</script>

<div class="flex items-center gap-4">
	<div class="grow h-[1px] bg-black/25 rounded"></div>
	<div class="opacity-50 font-medium text-xs uppercase">{text}</div>
	<div class="grow h-[1px] bg-black/25 rounded"></div>
</div>
