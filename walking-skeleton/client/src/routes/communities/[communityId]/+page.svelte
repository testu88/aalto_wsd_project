<script>
    import { page } from "$app/state";
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import PostForm from "$lib/components/posts/PostForm.svelte";
    import { initCommunity } from "$lib/states/communityState.svelte.js";
    import { initPosts } from "$lib/states/postState.svelte.js";
    let communityId = $derived(parseInt(page.params.communityId));
    $effect(() => {
        initCommunity(communityId);
        initPosts(communityId);
    });
</script>


<Community communityId={communityId} />
<PostList communityId={communityId} />
<PostForm communityId={communityId} />