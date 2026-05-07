import * as communityRepository from "../repositories/communityRepository.js";

const create = async (c) => {
    const data = await c.req.json();
    if (!data.name || !data.description){
        return c.json({error: "Missing required fields"}, 400);
    };
    const user = c.get("user");
    const newCommunity = await communityRepository.create(user.id, data);
    return c.json(newCommunity, 201);
};

const readAll = async (c) => {
    
    const communities = await communityRepository.findAll();
    if (!communities){
        return c.json({error: "Communities not found"}, 404);
    };
    return c.json(communities, 200);
};

 const readOne = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    console.log("coummity id:", communityId);
    if (!Number.isInteger(communityId)){
        return c.json({error: "Invalid community id"}, 400);
    };
    
    const community = await communityRepository.findById(communityId);
    if (!community){
        return c.json({error: "Community not found"}, 404);
    };
    return c.json(community, 200);
 };

 const deleteById = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)){
        return c.json({error: "Invalid community id"}, 400);
    };
    const user = c.get("user");
    const deletedCommunity = await communityRepository.deleteById(user.id, communityId);
    if (!deletedCommunity) {
        return c.json({error: "Community not found"}, 404);
    };
    return c.json(deletedCommunity, 200);
 };

 export { create, readAll, readOne, deleteById };