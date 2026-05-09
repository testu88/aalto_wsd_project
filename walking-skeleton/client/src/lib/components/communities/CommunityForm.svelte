<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    let communityState = useCommunityState();
    let authState = useAuthState();
 
    const addCommunity = async (e) => {
        e.preventDefault();
        const community = Object.fromEntries(new FormData(e.target));
        await communityState.addCommunity(community);
        e.target.reset();
    };
</script>

{#if authState.user}
<form onsubmit={addCommunity}>
<label>
    Community name:
    <input type="text" name="name" id="name" placeholder="Add community name" />
</label>
<br />
<label>
    Community description:
    <textarea name="description" id="description" placeholder="Community description"></textarea>
</label>
<br />
<input type="submit" value="Add community" />
</form>
{/if}