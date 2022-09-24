<script lang="ts">
	import type { Group, Position } from "$lib/Person";
    import "chance";
	import { Chance } from "chance";

    let selected: number = 2022

    export let data: {
        groups: Array<Group>
    }
</script>

<img
  src="https://gentsestudentenraad.be/static/persistent/images/7a2e803a-f3c1-47c2-bfe6-298aca6b09b1-DB-GSR-2.jpg"
  alt="Groepsfoto studentenraad"
  class="h-[50vh] object-cover"
  style="object-position: 50% 30%"
>

<div class="container grid grid-cols-2 gap-x-8 gap-y-2 py-12">
    <p class="font-serif font-bold text-4xl col-span-2">Wie zijn wij?</p>
    <p>{Chance().paragraph()}</p>
    <p>{Chance().paragraph()}</p>
</div>


<div class="space-y-4">
    {#each data.groups as group}
        <div class="odd:bg-neutral-100">
            <div class="container grid grid-cols-2 gap-12 py-12">
                <div class="space-y-1">
                    <p class="font-serif font-bold text-3xl">{group.name}</p>
                    <div class="h-[2px] bg-neutral-200"></div>
                    <p class="opacity-90">{group.description}</p>
                </div>
                {#each group.positions as position}
                    <div class="flex gap-4 items-center">
                        <img src={position.person.image} alt="Portrait of {position.person.name}" class="h-40 w-40 object-cover rounded-full">
                        <div class="space-y-1">
                            <p class="uppercase font-bold text-xs opacity-75">{position.name}</p>
                            <div class="-space-y-1">
                                <p class="font-medium text-xl">{position.person.name}</p>
                                <p class="opacity-90">{position.education}</p>
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
    {/each}
</div>
