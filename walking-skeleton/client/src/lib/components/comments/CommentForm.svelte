<script>
    import { useCommentState } from "$lib/states/commentState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    let { communityId, postId } = $props();
    let commentState = useCommentState();
    let authState = useAuthState();
    const addComment = async (e) => {
        e.preventDefault();
        const newComment = Object.fromEntries(new FormData(e.target));
        await commentState.addComment(communityId, postId, newComment);
        e.target.reset();
    };
</script>

{#if authState.user}
<h3>Add Comment</h3>
<form onsubmit={addComment}>
    <label>
        Comment content:
        <textarea name="content" id="content" placeholder="Comment content"></textarea>
    </label>
    <input type="submit" value="Add comment" />
</form>
{/if}