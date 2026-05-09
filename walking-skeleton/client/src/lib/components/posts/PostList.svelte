<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    let postState = usePostState();
    let authState = useAuthState();
   
</script>

<ul>
    {#each postState?.posts[communityId] as post}
    <li>
        <h2><a href={`/communities/${communityId}/posts/${post.id}`}>{post?.title}</a></h2>
        <p>{post?.content}</p>
        {#if Number(post.created_by) === Number(authState.user?.id)}
        <button onclick={() => postState.removePost(communityId, post.id)}>Remove</button>
        {/if}
    </li>
    {/each}
</ul>