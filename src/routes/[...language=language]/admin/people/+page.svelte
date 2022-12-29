<script lang="ts">
  import type { PageData } from './$types';
  import {goto} from "$app/navigation";

  export let data: PageData;
</script>

<svelte:head>
  <style>
      :root {
          @apply bg-neutral-100;
      }
  </style>
</svelte:head>

<div class="container py-12 font-normal space-y-4">
  <table class="table-auto text-left w-full">
    <thead class="">
    <tr class="h-12 border-b child:p-4">
      <th>Portret</th>
      <th>Naam</th>
      <th>Mail</th>
    </tr>
    </thead>
    <tbody class="text-sm font-medium">
    {#each data.people as person}
      <tr class="h-16 border-y hover:cursor-pointer child:p-2">
        <td>
          {#if person.image }
          <img
            src="https://gentsestudentenraad.be/static/persistent/images/{person.image}"
            alt="Portrait of {person.name}"
            class="h-12 w-12"
          />
          {:else }
          <div class="h-12 w-12 bg-neutral-200 text-center">null</div>
          {/if}
        </td>
        <td>
          <p>{person.name}</p>
        </td>
        <td class:opacity-50={person.mail === null}>{person.mail}</td>
        <td on:click={() => goto(`/admin/people/${person.id}`)}>
          <i class="bi bi-pencil-square"></i>
        </td>
        <td on:click={() => alert("Zeker dat je dit bericht wenst te verwijderen?")}>
          <i class="bi bi-trash3-fill"></i>
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
</div>
