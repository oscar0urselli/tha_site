<script lang="ts">
	import { onMount } from 'svelte';

    let { children } = $props();

    let modeIcon: any;

    function changeMode(event: any) {
        if (document.documentElement.getAttribute('data-bs-theme') === 'light') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            modeIcon.className = 'bi bi-moon-fill';
        }
        else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            modeIcon.className = 'bi bi-brightness-high-fill';
        }
    }

    onMount(() => {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    });
</script>

<nav class="navbar navbar-expand-md bg-body-tertiary sticky-top">
    <div class="container">
        <a class="navbar-brand ibm-plex-mono-medium" href="/">@oscarurselli.com:~$</a>
        <button class="navbar-toggler rounded-0 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-top vh-100" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1">
                    <li class="nav-item">
                        <a class="nav-link ibm-plex-mono-light" href="/posts">~/posts</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ibm-plex-mono-light" href="/about">~/about</a>
                    </li>
                    <li class="nav-item ms-5">
                        <div class="form-check form-switch nav-link">
                            <input onchange={changeMode} class="form-check-input" type="checkbox" role="switch" checked>
                            <i bind:this={modeIcon} class="bi bi-sun-fill"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>

<div class="container my-5">
    {@render children()}
</div>

<nav class="navbar bg-body-tertiary pt-4">
    <div class="container">
        <p class="text-center ibm-plex-mono-regular">© 2025 Oscar Urselli, Built with <a href="https://svelte.dev/">SvelteKit</a></p>
    </div>
</nav>