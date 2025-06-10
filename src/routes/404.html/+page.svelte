<script lang="ts">
	import { onMount } from "svelte";

    let path = "";
    onMount(() => {
        path = location.pathname.slice(1);
    });
</script>

<title>404 | Oscar Urselli</title>

<h1 class="ibm-plex-mono-bold">~$ cd {path}</h1>
<h2 class="ibm-plex-mono-semibold">cd: {path}: No such file or directory</h2>