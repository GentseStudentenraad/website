<script lang="ts">
	import type { PersonPosition, Person } from '@prisma/client';

	export let position: PersonPosition & {
		person: Person;
	};
</script>

<div class="rounded-lg p-4 space-y-4 bg-neutral-50">
	<div class="flex items-center gap-4 overflow-hidden">
		<img
			src="https://gentsestudentenraad.be/static/persistent/images/{position.person.image}"
			alt="Portrait of {position.person.name}"
			class="h-16 w-16 object-cover rounded-full"
		/>
		<div>
			<p class="opacity-90 text-xs truncate text-ellipsis">
				{position.name}
			</p>
			<p class="font-semibold text-xl">{position.person.name}</p>
			<p class="opacity-90 text-xs truncate text-ellipsis">{position.education}</p>
		</div>

		<div class="grow" />

		{#if position.person.mail !== null}
			<p class="opacity-90 text-xl truncate text-ellipsis">
				<i class="bi bi-mailbox" />
			</p>
		{/if}
	</div>

	<div class="h-[2px] bg-black/10 w-full" />

	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris.
	</p>
</div>
