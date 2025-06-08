<script lang="ts">
    let { index, post }: {
        index: number,
        post: {
            title: string,
            date: string,
            description: string
        }
    } = $props();
</script>

<a href="/posts/{index}" class="link-underline link-underline-opacity-0">
    <div class="card my-4 rounded-0">
        <div class="card-body">
            <h5 class="card-title ibm-plex-mono-medium">{post.title}</h5>
            <p class="card-text ibm-plex-mono-regular">{post.description}</p>
            <p class="ibm-plex-mono-light">{post.date}</p>
        </div>
    </div>
</a>