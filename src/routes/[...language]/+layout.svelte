<script lang="ts">
  import "../../app.css";
  import { Language} from "$lib/Language";
  import { page } from '$app/stores';

  export let data: {
    language: Language,
    routes: [String, String]
  }
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

        {#each data.routes as route}
            <a href={route[1]}>{route[0]}</a>
        {/each}

        <div class="grow"></div>

        <div class="flex items-center gap-2">
            <img src="/icons/translation.png" class="h-4 w-4" alt="Translation Icon">
            <a href='/{$page.routeId?.replace("[...language]", data.language === Language.DUTCH ? "en" : "nl")}'>
                {data.language === Language.DUTCH ? "English" : "Dutch"}
            </a>
        </div>
    </nav>

    <main class="container py-12">
        <slot />
    </main>

    <footer class="bg-neutral-200 p-3">
        <p>Footer</p>
    </footer>
</div>
