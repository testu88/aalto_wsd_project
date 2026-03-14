<script>
    let { communityId, postId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    let postState = usePostState();
    let post = postState.getPost(communityId, postId);
</script>

{#if post}
<h1>{post.title}</h1>
<p>{post.content}</p>
{:else}
<p>Loading...</p>
{/if}