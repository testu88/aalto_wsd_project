<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    let postState = usePostState();
    let postTitle = $state("");
    let postContent = $state("");
    const addPost = () => {
        postState.addPost(communityId, postTitle, postContent);
        postTitle = "";
        postContent = "";
    };
</script>

<input type="text" bind:value={postTitle} placeholder="Post title" />
<input type="text" bind:value={postContent} placeholder="Post content" />
<button onclick={addPost}>Add Post</button>