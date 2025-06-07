<script lang="ts">
	import { onMount } from 'svelte';

    let { data } = $props();

    let body: HTMLDivElement;

    onMount(() => {
        body.innerHTML = marked.parse(data.post?.body);
    });
</script>

<h2 class="ibm-plex-mono-semibold">{data.post?.title}</h2>

<p class="ibm-plex-mono-regular">{data.post?.description}</p>

<div bind:this={body} class="ibm-plex-mono-regular"></div>

<div class="d-flex justify-content-between">
    {#if data.index < data.length - 1}
        <a href="/posts/{data.index + 1}" class="btn btn-outline-secondary">&lt&lt&lt Previous</a>
    {/if}
    {#if data.index > 0}
        <a href="/posts/{data.index - 1}" class="ms-auto btn btn-outline-secondary">Next &gt;&gt;&gt;</a>
    {/if}    
</div>