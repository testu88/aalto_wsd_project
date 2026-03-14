<script>
    let { communityId } = $props();
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
    let community = communityState.getOne(communityId);
    
</script>

{#if community}
<h1>{community.name}</h1>
<p>{community.description}</p>
{:else}
<p>Loading...</p>
{/if}

