<script lang="ts">
	import PostCard from "$lib/components/PostCard.svelte";
    import posts from "$lib/posts.json";
</script>

<title>Posts | Oscar Urselli</title>

<h2 class="ibm-plex-mono-semibold">~/posts$ ls -l</h2>

{#each Object.keys(posts) as i}
    <PostCard post={posts[posts.length - Number(i) - 1]} />
{/each}