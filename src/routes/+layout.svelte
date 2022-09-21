<script>
  import "../app.css";

  const routes = [
    ["Wie", "/"],
    ["Verkiezingen", "/"],
    ["Werking", "/"],
    ["Nieuws", "/nieuws"],
    ["FAQ", "/"],
    ["Contact", "/"],
    ["Enlight", "/"],

  ]
</script>

<div class="flex flex-col justify-between w-full min-h-[100vh]">
    <nav class="bg-primary p-3 flex items-center gap-6 text-white">
        <a href="/">
            <img
                src="https://gentsestudentenraad.be/static/persistent/images/logo.png"
                class="h-8"
                alt="Logo"
            >
        </a>

        {#each routes as route}
            <a href={route[1]}>{route[0]}</a>
        {/each}

        <div class="grow"></div>

        <p>socials</p>

        <p>login</p>
    </nav>

    <main class="container py-12">
        <slot />
    </main>

    <footer class="bg-neutral-200 p-3">
        <p>Footer</p>
    </footer>
</div>
