let communityState = $state([
  { id: 1, name: 'Developers Hub', description: 'A place for developers' },
  { id: 2, name: 'Design Factory', description: 'Creative minds meet here' },
  { id: 3, name: 'Startup Workshop', description: 'Where ideas become reality' }
]);

const useCommunityState = () => {
    return {
        get communities(){
            return communityState;
        },
        getOne: (id) => {
           return communityState.find((c) => c.id === id);
        },
        addCommunity: (name, description) => {
            communityState.push({id: communityState.length +1, name: name, description: description})
        },
        removeCommunity: (id) => {
            communityState = communityState.filter((c) => c.id !== id);
        }
    };
};


export { useCommunityState };