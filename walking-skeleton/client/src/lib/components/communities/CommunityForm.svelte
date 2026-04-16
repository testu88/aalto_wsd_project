<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
 
    const addCommunity = async (e) => {
        e.preventDefault();
        const community = Object.fromEntries(new FormData(e.target));
        await communityState.addCommunity(community);
        e.target.reset();
    };
</script>

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
