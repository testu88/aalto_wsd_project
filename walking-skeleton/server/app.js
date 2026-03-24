import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
app.use("/*", cors());
app.use("/*", logger());


// create instance of database client
const sql = postgres();

//SQL client commands
app.get("/api/books", async (c) => {
    const books = await sql `SELECT * FROM books`;
    return c.json(books);
});

app.get("/api/books/:bookId", async (c) => {
    const id = Number(c.req.param("bookId"));
    if (!Number.isInteger(id)){
        return c.json({error: "Invalid book id"}, 400);
    };
    const result = await sql`SELECT * FROM books WHERE id = ${id}`;
    if (result.length === 0) {
        return c.json({error : "Book not found"}, 404);
    };
    return c.json(result[0]);
});

app.post("/api/books", async (c) => {
    const book = await c.req.json();
    if (!book.title || !book.description || !book.published_at || !book.page_count){
        return c.json({error: "Missing required fields"}, 400);
    };
    const result = await sql`INSERT INTO books (title, description, published_at, page_count) VALUES (
    ${book.title}, ${book.description}, ${book.published_at}, ${book.page_count}) RETURNING *;`;

    return c.json(result[0], 201);
});


app.delete("/api/books/:bookId", async (c) => {
    const id = Number(c.req.param("bookId"));
    if (!Number.isInteger(id)){
        return c.json({error: "Invalid book id "}, 400);
    };
    const result = await sql`DELETE FROM books WHERE id = ${id} RETURNING *;`;
    if (result.length === 0) {
        return c.json({error: "NO book found"}, 404);
    };
    return c.json(result[0]); 
});

app.put("/api/books/:bookId", async (c) => {
    const id = Number(c.req.param("bookId"));
    if (!Number.isInteger(id)){
        return c.json({error: "Invalid book id"}, 400);
    };
    const book = await c.req.json();
    if (!book.title || !book.description || !book.published_at || !book.page_count){
        return c.json({error: "MIssing required fields"} , 404);
    };
    const result = await sql `UPDATE books SET title=${book.title}, description=${book.description}, published_at=${book.published_at}, page_count=${book.page_count} WHERE id = ${id} RETURNING *;`;
    if (result.length === 0) {
        return c.json({error: "Book not found"}, 404);
    };
    return c.json(result[0]);
});

app.get("/api/todos", async (c) => {
    const todos = await sql`SELECT * FROM todos`;
    return c.json(todos);
});


app.post("/api/todos", async (c) => {
    const todo = await c.req.json();
    if (!todo.name){
        return c.json({error: "Missing required fields"}, 400);
    };
    const createdAt = new Date().toISOString();
    const result = await sql`INSERT INTO todos (name, created_at) VALUES (${todo.name}, ${createdAt}) RETURNING *;`;
    return c.json(result[0], 201);
});

app.put("/api/todos/:todoId", async (c) => {
    const id = Number(c.req.param("todoId"));
    if (!Number.isInteger(id)){
        return c.json({error: "Invalid todo id"}, 400);
    };
    const todo = await c.req.json();

    if (!todo.name || !todo.created_at){
        return c.json({error: "Missing required fields"}, 400);
    };
    const result = await sql`UPDATE todos SET name=${todo.name}, created_at=${todo.created_at} WHERE id = ${id} RETURNING *;`;
    if (result.length === 0) {
        return c.json({error: "Todo not found"}, 404);
    };
    return c.json(result[0], 200);
});







/*let visits = 0;
app.get("/api/visits", (c) => {
    visits++;
    return c.json({visits});
});*/

// retrieve todos from database on requests to /api/todos
/*app.get("/api/todos", async (c) => {
    const todos = await sql`SELECT * FROM todos`;
  ;  return c.json(todos);
});*/

// books API




export default app;