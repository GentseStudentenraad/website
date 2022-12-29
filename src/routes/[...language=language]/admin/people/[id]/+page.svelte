<script lang="ts">
  import type {PageData} from './$types';
  import TextField from "$lib/components/Admin/TextField.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import ActionButton from "$lib/components/Admin/ActionButton.svelte";
  import LongTextField from "$lib/components/Admin/LongTextField.svelte";
  import ImageUploader from "$lib/components/Admin/ImageUploader.svelte";

  export let data: PageData;
  export let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
</script>

<svelte:head>
  <style>
      :root {
          @apply bg-neutral-100;
      }
  </style>
</svelte:head>

<div class="container space-y-4 py-12">
  <Divider text="Over"/>

  <TextField description="Naam" bind:value={data.person.name}/>

  <ImageUploader description="Portretfoto" source="https://gentsestudentenraad.be/static/persistent/images/{data.person.image}"/>

  <TextField description="Afbeelding" bind:value={data.person.image}/>

  <TextField description="E-mailadres" bind:value={data.person.mail}/>

  {#each data.person.positions as position}
  <Divider text="Positie"/>

  <TextField description="Titel" bind:value={position.name}/>

  <TextField description="Richting" bind:value={position.education}/>

  <TextField description="Sorteerindex" bind:value={position.sort_index}/>

  <TextField description="Academiejaar" bind:value={position.year}/>

  <TextField description="Groep" bind:value={position.person_group.name}/>

  <LongTextField description="Functiebeschrijving" bind:value={description}/>
  {/each}

  <ActionButton action={() => {}} color={data.configuration.brand_color_primary}/>
</div>