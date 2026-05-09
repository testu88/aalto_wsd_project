<script>
    import { useCommentState } from "$lib/states/commentState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    let {communityId, postId} = $props();
    let commentState = useCommentState();
    let authState = useAuthState();
    const removeComment = async (commentId) => {
        await commentState.removeComment(communityId, postId, commentId);
    };
</script>

<h3>Comments</h3>
<ul>
    {#each commentState?.comments[postId] as comment}
    {#if comment}
    <li>{comment.content}</li>
    {#if Number(comment.created_by) === Number(authState.user?.id)}
    <button onclick={() => removeComment(comment.id)}>Remove</button>
    {/if}
    {:else}
    <p>Loading...</p>
    {/if}
    {/each}
</ul>