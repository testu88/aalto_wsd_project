import * as todoRepository from './todoRepository.js';

// add controller functions here and export them
const create = async (c) => {
    const data = await c.req.json();
    if (!data.name){
        return c.json({error: "Missing required fields"}, 400);
    };
    const todo = await todoRepository.create(data);
    return c.json(todo, 201);
};
const readAll = async (c) => {
    const todos = await todoRepository.findAll();
    return c.json(todos, 200);
};

const readOne = async (c) => { 
    const id = Number(c.req.param("todoId")); 
    if (!Number.isInteger(id)) { return c.json({error: "Invalid todo id"}, 400); }; 
    const todo = await todoRepository.findById(id); 
    if (!todo){ return c.json({error: "Todo not found"}, 404); }; 
    return c.json(todo, 200); };

const update = async (c) => {
    const id = Number(c.req.param("todoId"));
    if (!Number.isInteger(id)){
        return c.json({error: "Invalid todo id"}, 400);
    };
    const data = await c.req.json();
    if (!data.name || !data.created_at){
        return c.json({error: "Missing required fields"}, 400);
    };
    const updatedTodo = await todoRepository.updateById(id, data);
    if (!updatedTodo){
        return c.json({error: "Todo not found"}, 404);
    }
        return c.json(updatedTodo,200 );
};
const deleteOne = async (c) => {
    const id = Number(c.req.param("todoId"));
    if (!Number.isInteger(id)){
        return c.json({error: "Invalid todo id"}, 400);
    };
    const deletedTodo = await todoRepository.deleteById(id);
    if (!deletedTodo){
        return c.json({error: "Todo not found"}, 404);
    };
    return c.json(deletedTodo,200);
};

export {create, readAll, readOne, update, deleteOne };