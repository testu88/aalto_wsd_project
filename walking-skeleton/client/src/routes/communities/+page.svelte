<script>
   import CommunityList from "$lib/components/communities/CommunityList.svelte";
   import CommunityForm from "$lib/components/communities/CommunityForm.svelte";
   import { initCommunities } from "$lib/states/communityState.svelte.js";
   $effect(() => {
      initCommunities();
   });
</script>

<h1>Communities</h1>
<CommunityList />
<CommunityForm />
