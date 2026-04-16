import { browser } from "$app/environment";
import * as communitiesApi from "$lib/apis/communitiesApi.js";


let communityState = $state([]);

/*let communityState = $state([
  { id: 1, name: 'Developers Hub', description: 'A place for developers' },
  { id: 2, name: 'Design Factory', description: 'Creative minds meet here' },
  { id: 3, name: 'Startup Workshop', description: 'Where ideas become reality' }
]);*/

const initCommunities = async () => {
    if (browser) {
        const communities = await communitiesApi.getCommunities();
        if (communities.error){
            return;
        }
        communityState = communities.data;
    };
};

const initCommunity = async (id) => {
    if (browser) {
        const community = await communitiesApi.getCommunity(id);
        if (community.error) return;
        if (community.data && !communityState.find((c) => c.id === id)) {
            communityState.push(community.data);
        };
    };
};

const useCommunityState = () => {
    return {
        get communities(){
            return communityState;
        },
        addCommunity: async (community) => {
            const newCommunity = await communitiesApi.createCommunity(community);
            if (newCommunity.error){
                console.error(newCommunity.error);
                return;
            };
            communityState.push(newCommunity.data);
        },
        removeCommunity: async (id) => {
            const deletedCommunity = await communitiesApi.deleteCommunity(id);
            if (deletedCommunity.error){
                console.error(deletedCommunity.error);
                return;
            };
            const index = communityState.findIndex((c) => c.id === id);
            if (index !== -1){
                communityState.splice(index, 1);
            };
        }
    };
};


export { initCommunities, initCommunity, useCommunityState };