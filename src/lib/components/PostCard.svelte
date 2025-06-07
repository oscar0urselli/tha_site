<script lang="ts">
    let { index, title, date, description } = $props();
</script>

<div class="card border-0 shadow-lg my-4">
    <div class="card-body">
        <a href="/posts/{index}"><h5 class="card-title ibm-plex-mono-medium">{title}</h5></a>
        <p class="card-text ibm-plex-mono-regular">{description}</p>
        <p class="ibm-plex-mono-light">{date}</p>
    </div>
</div>