import { PUBLIC_API_URL } from "$env/static/public";
import { myFetch } from "$lib/apis/myFetch.js";

const getCommunities = async () => {
    const communities = await myFetch(`${PUBLIC_API_URL}/api/communities`);
    return communities;
};

const getCommunity = async (id) => {
    const community = await myFetch(`${PUBLIC_API_URL}/api/communities/${id}`);
    return community;
};

const createCommunity = async (community) => {
    const newCommunity = await myFetch(`${PUBLIC_API_URL}/api/communities`, {
        headers: { "Content-Type":"application/json", },
        method: "POST",
        body: JSON.stringify(community),
    });
    return newCommunity;
};

const deleteCommunity = async (id) => {
    const deletedCommunity = await myFetch(`${PUBLIC_API_URL}/api/communities/${id}`, {
        method: "DELETE",
    });
    return deletedCommunity;
};

export { getCommunities, getCommunity, createCommunity, deleteCommunity };
