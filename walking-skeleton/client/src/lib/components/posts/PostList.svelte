<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    let postState = usePostState();
    
</script>

<ul>
    {#each postState.posts[communityId] as post}
    <li>
        <h2><a href={`/communities/${communityId}/posts/${post.id}`}>{post.title}</a></h2>
        <p>{post.content}</p>
        <button onclick={() => postState.removePost(communityId, post.id)}>Remove</button>
    </li>
    {/each}
</ul>