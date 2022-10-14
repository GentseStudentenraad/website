<script lang="ts">
	import 'chance';
	import { Chance } from 'chance';
	import type { Configuration, Prisma, Person, PersonGroup, PersonPosition } from '@prisma/client';
	import { Position } from '$lib/Person';

	let selected: number = 2022;

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
	<div class="flex align-center">
		<select name="year" id="year">
			{#each [2022, 2021, 2020] as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
	</div>
</div>

<div class="space-y-4">
	{#each data.groups as group}
		{#if group.positions.length > 0}
			<div class="odd:bg-neutral-100">
				<div class="container grid grid-cols-2 gap-12 py-12">
					<div class="space-y-1" class:col-span-2={group.description == null}>
						<p class="font-serif font-bold text-3xl">{group.name}</p>
						<div class="h-[2px] bg-neutral-200" />
						{#if group.description}
							<p class="opacity-90">{@html group.description}</p>
						{/if}
					</div>
					{#each group.positions as position}
						<div class="flex gap-4 items-center">
							<img
								src="https://gentsestudentenraad.be/static/persistent/images/{position.person
									.image}"
								alt="Portrait of {position.person.name}"
								class="h-40 w-40 object-cover rounded-full"
							/>
							<div class="space-y-1">
								<p class="uppercase font-bold text-xs opacity-75">{position.name}</p>
								<div class="-space-y-1">
									<p class="font-medium text-xl">{position.person.name}</p>
									{#if position.education}
										<p class="opacity-90">{position.education}</p>
									{/if}
								</div>
								{#if position.person.mail !== null}
									<a href="mailto:{position.person.mail}" class="mt-4 w-fit opacity-90">
										<p class="text-sm font-semibold">{position.person.mail}</p>
									</a>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</div>
