<script lang="ts">
    let links = [
        { name: "Siteconfiguratie", link: "/admin/config"},
        { name: "Nieuws", link: "/admin/news"},
        { name: "Personen", link: "/admin/people"},
        { name: "Personen", link: "/admin/people"},
    ]
</script>

<div class="bg-neutral-100 h-[100vh] py-12">
    <div class="container space-y-12">
        <div>
            <p class="text-4xl font-bold">Welkom</p>
            <p class="text-sm opacity-75">{new Date().toLocaleString()}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <p class="text-2xl font-bold col-span-2">Categorieën</p>
            {#each links as link}
                <a href={link.link}>
                    <p class="bg-white rounded-md p-4 font-medium">{link.name}</p>
                </a>
            {/each}
        </div>
    </div>
</div>