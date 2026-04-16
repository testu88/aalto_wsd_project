<script>
    import { useCommentState } from "$lib/states/commentState.svelte";

    let {communityId, postId} = $props();
    let commentState = useCommentState();
    const removeComment = async (commentId) => {
        await commentState.removeComment(communityId, postId, commentId);
    };
</script>

<h3>Comments</h3>
<ul>
    {#each commentState?.comments[postId] as comment}
    {#if comment}
    <li>{comment.content}</li>
    <button onclick={removeComment(comment.id)}>Remove</button>
    {:else}
    <p>Loading...</p>
    {/if}
    {/each}
</ul>