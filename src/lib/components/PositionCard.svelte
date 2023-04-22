<script lang="ts">
	import type { PageData } from './$types';
    import Tag from './Tag.svelte';

	export let position: PageData;
</script>

<div class="rounded-lg p-6 space-y-4 bg-white h-fit">
	<div class="flex items-center gap-4 overflow-hidden">
		<img
			src="https://gentsestudentenraad.be/static/persistent/images/{position.person.image}"
			alt="Portrait of {position.person.name}"
			class="h-16 w-16 object-cover rounded-full"
		/>
		<div>
			<p class="opacity-90 text-sn text-ellipsis">
				{position.name}
			</p>
			<p class="font-semibold text-xl">{position.person.name}</p>
		</div>

		<div class="grow"></div>
	</div>


	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris.
	</p>


    {#if position.person.mail !== null}
        <Tag link="mailto:{position.person.mail}" value="{position.person.mail}" icon="mailbox" ></Tag>
    {/if}
</div>
