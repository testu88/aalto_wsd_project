<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    let communityState = useCommunityState();
    let authState = useAuthState();

    
</script>

<ul>
    {#each communityState.communities as community}
    <li>
        <h2><a href={`/communities/${community.id}`}>{community.name}</a></h2>
        <p>{community.description}</p>
        {#if community.created_by === authState.user?.id}
        <button onclick={() => communityState.removeCommunity(community.id)}>Remove</button>
        {/if}
    </li>
    {/each}
</ul>