<script lang="ts">
    export let source: string | undefined = undefined;
    export let description: string | null = null;
    let files: FileList;

    $: if (files) {
        for (const file of files) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                source = e.target?.result?.toString();
            };
        }
    }
</script>

<div class="py-2">
    {#if description !== null}
        <p class="text-[12px] opacity-50 font-semibold uppercase">{description}</p>
    {/if}

    <div class="flex items-center gap-4 w-full bg-white rounded-md p-4 shadow-sm">
        {#if source}
            <img class="h-32 rounded-md" src={source} alt="Preview" />
        {/if}

        <input type="file" accept=".jpg, .jpeg, .png" bind:files />
    </div>
</div>
