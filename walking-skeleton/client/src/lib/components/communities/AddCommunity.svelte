<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
    let communityName = $state("");
    let communityDescription = $state("");

    const addCommunity = () => {
        communityState.addCommunity(communityName, communityDescription);
        communityName = "";
        communityDescription = "";
    };
</script>

<input type="text" bind:value={communityName} placeholder="Community name" />
<input type="text" bind:value={communityDescription} placeholder=" Community description" />
<button onclick={addCommunity}>Add community</button>