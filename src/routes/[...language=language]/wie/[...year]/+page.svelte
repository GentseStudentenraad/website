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


<div class="container space-y-4">
    {#each data.groups as group}
        <div>
            <p class="font-serif font-bold text-2xl">{group.name}</p>
            <p>{group.description}</p>

            <div class="grid grid-cols-3 gap-6 py-8">
                {#each group.positions as position}
                    <div class="flex gap-4 items-center">
                        <img src={position.person.image} alt="Portrait of {position.person.name}" class="h-24 w-24 object-cover rounded-full">
                        <div class="-space-y-1">
                            <p class="uppercase font-bold text-xs opacity-75">{position.name}</p>
                            <p class="font-medium text-lg">{position.person.name}</p>
                            <p class="text-sm opacity-90">{position.education}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
