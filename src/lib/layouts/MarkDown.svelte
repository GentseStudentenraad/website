<script lang="ts">
	export let banner = '';
</script>

{#if banner !== ''}
	<img src={banner} class="w-full max-h-[50vh] object-cover" />
{/if}

<div class="container md py-24">
	<slot />
</div>
