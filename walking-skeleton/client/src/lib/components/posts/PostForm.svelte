<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    let postState = usePostState();
    let authState = useAuthState();
    const addPost = async (e) => {
        e.preventDefault();
        const newPost = Object.fromEntries(new FormData(e.target));
        await postState.addPost(communityId, newPost);
        e.target.reset();
    };
</script>

{#if authState.user}
<form onsubmit={addPost}>
    <label>
        Post title:
        <input type="text" id="title" name="title" placeholder="Add a post title" />
    </label>
    <br />
    <label>
        Post content:
        <textarea id="content" name="content" placeholder="Post content"></textarea>
    </label>
    <br />
    <input type="submit" value="Add post" />
</form>
{/if}