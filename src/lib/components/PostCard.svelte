<script lang="ts">
    let { post }: {
        post: {
            title: string,
            date: string,
            description: string,
            filename: string
        }
    } = $props();
</script>

<a href="/posts/{post.filename}" class="link-underline link-underline-opacity-0">
    <div class="card my-4 rounded-0">
        <div class="card-body">
            <h5 class="card-title ibm-plex-mono-medium">{post.title}</h5>
            <p class="card-text ibm-plex-mono-regular">{post.description}</p>
            <p class="ibm-plex-mono-light">{post.date}</p>
        </div>
    </div>
</a>