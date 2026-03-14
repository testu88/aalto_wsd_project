<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();

</script>

<ul>
    {#each communityState.communities as community}
    <li>
        <h2><a href={`/communities/${community.id}`}>{community.name}</a></h2>
        <p>{community.description}</p>
        <button onclick={() => communityState.removeCommunity(community.id)}>Remove</button>
    </li>
    {/each}
</ul>