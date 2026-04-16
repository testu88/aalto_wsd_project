<script>
    let { communityId } = $props();
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
</script>


<h1>{communityState?.communities?.find((c) => c.id === communityId)?.name ?? "Loading..."}</h1>
<p>{communityState?.communities?.find((c) => c.id === communityId)?.description ?? "Loading..."}</p>



