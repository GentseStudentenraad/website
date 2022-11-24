<script lang="ts">
	import 'chance';
	import { Chance } from 'chance';
	import type { Configuration, Prisma, Person, PersonGroup, PersonPosition } from '@prisma/client';
	import { goto } from '$app/navigation';

	type PersonGroupJoined = Prisma.PersonGroupGetPayload<{
		include: {
			positions: true;
		};
	}>;

	export let data: {
		groups: Array<PersonGroupJoined>;
		translations: any;
	};
</script>

<img
	src="https://gentsestudentenraad.be/static/persistent/images/7a2e803a-f3c1-47c2-bfe6-298aca6b09b1-DB-GSR-2.jpg"
	alt="Groepsfoto studentenraad"
	class="h-[50vh] object-cover"
	style="object-position: 50% 30%"
/>

<div class="container grid grid-cols-2 gap-x-8 gap-y-2 py-12">
	<p class="font-serif font-bold text-4xl col-span-2">{data.translations.who.title}</p>
	<p>{Chance().paragraph()}</p>
	<p>{Chance().paragraph()}</p>
</div>

<div class="space-y-4">
	{#each data.groups.filter(e => e.positions.length > 0) as group, i}
		<div class="odd:bg-neutral-100">
			<div class="container grid grid-cols-2 gap-12 py-12">
				<div class="space-y-1 col-span-2">
					<p class="font-serif font-bold text-3xl">{group.name}</p>
					<div class="h-[2px] bg-neutral-200" />
					{#if group.description}
						<p class="opacity-90">{@html group.description}</p>
					{/if}
				</div>
				{#each group.positions as position}
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

							<div class="grow"></div>

							{#if position.person.mail !== null}
							<p class="opacity-90 text-xl truncate text-ellipsis">
								<i class="bi bi-mailbox"></i>
							</p>
							{/if}
						</div>

						<div class="h-[2px] bg-black/10 w-full"></div>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
						</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<div class="container flex items-center justify-center py-12 gap-4">
		<p>Bekijk historische data: </p>
		<select name="year" id="year" on:change="{e => goto(`/wie/${e.target.value}`)}">
			{#each [2022, 2021, 2020] as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
	</div>
</div>
