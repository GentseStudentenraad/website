<script lang="ts">
  export let action = () => {};
  export let text = "Sla wijzigingen op"
  export let color: String
</script>

<button
    on:click={action}
    class="action-button"
    style:background-color={color}
>
  {text}
</button>

<style>
  .action-button {
      @apply col-span-2 p-4 text-center text-white bg-neutral-700 rounded-md text-lg font-bold hover:cursor-pointer w-full;
  }
</style>
