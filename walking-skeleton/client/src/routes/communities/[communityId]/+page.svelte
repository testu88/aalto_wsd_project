<script>
    import { page } from "$app/state";
    import Community from "$lib/components/communities/Community.svelte";
    let communityId = $derived(parseInt(page.params.communityId));
</script>


<Community communityId={communityId} />