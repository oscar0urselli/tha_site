<script lang="ts">
	import PostCard from "$lib/components/PostCard.svelte";
    import posts from "$lib/posts.json";
</script>

<h2 class="ibm-plex-mono-semibold">~/posts$ ls -l</h2>

{#each Object.entries(posts) as [i, p]}
    <PostCard index={i} title={p.title} date={p.date} description={p.description} />
{/each}