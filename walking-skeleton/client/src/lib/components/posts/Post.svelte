<script>
    let { communityId, postId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    let postState = usePostState();
    let post = $derived(postState.posts[communityId]?.find((p) => p.id === postId));
</script>

{#if post && post?.title }
<h2>{post.title}</h2>
<p>{post.content}</p>
{:else}
<p>Loading...</p>
{/if}
