<script lang="ts">
	import { onMount } from "svelte";

    let mode = "";
    onMount(() => {
        mode = document.documentElement.getAttribute('data-bs-theme') || "light";

        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes") {
                    mode = mutation.target.ownerDocument?.documentElement.getAttribute("data-bs-theme") || "light";
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true
        });
    });
</script>

<title>Home | Oscar Urselli</title>

<div class="d-flex flex-column justify-content-center align-items-center">
    <h1 class="ibm-plex-mono-bold">Oscar Urselli</h1>
    <div class="hstack mx-auto gap-3 mt-3">
        {#key mode}
            {#if mode === "light"}
                <a href="https://github.com/oscar0urselli" class="btn btn-outline-dark btn-sm" aria-label="GitHub"><i class="bi bi-github"></i></a>
                <a href="https://www.linkedin.com/in/oscar-urselli-121a98294/" class="btn btn-outline-dark btn-sm" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            {:else if mode === "dark"}
                <a href="https://github.com/oscar0urselli" class="btn btn-outline-light btn-sm" aria-label="GitHub"><i class="bi bi-github"></i></a>
                <a href="https://www.linkedin.com/in/oscar-urselli-121a98294/" class="btn btn-outline-light btn-sm" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            {/if}
        {/key}
    </div>
</div>

