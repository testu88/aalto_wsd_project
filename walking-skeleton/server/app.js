import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as bookRepository from "./bookRepository.js";


const app = new Hono();
app.use("/*", cors());
app.use("/*", logger());




//SQL client commands
app.get("/api/books", async (c) => {
    const books = await bookRepository.readAll();
    return c.json(books);
});

app.get("/api/books/:bookId", async (c) => {
    const id = Number(c.req.param("bookId"));
    if (!Number.isInteger(id)){
        return c.json({error: "Invalid book id"}, 400);
    };
    const book = await bookRepository.readOne(id);

    if (!book) {
        return c.json({error : "Book not found"}, 404);
    };
    return c.json(book);
});

app.post("/api/books", async (c) => {
    const book = await c.req.json();
    if (!book.title || !book.description || !book.published_at || !book.page_count){
        return c.json({error: "Missing required fields"}, 400);
    };
    const newBook = await bookRepository.create(book);
    return c.json(newBook, 201);
});


app.delete("/api/books/:bookId", async (c) => {
    const id = Number(c.req.param("bookId"));
    if (!Number.isInteger(id)){
        return c.json({error: "Invalid book id "}, 400);
    };
    const deletedBook = await bookRepository.deleteOne(id);

    if (!deletedBook) {
        return c.json({error: "NO book found"}, 404);
    };
    return c.json(deletedBook); 
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
    const updatedBook = await bookRepository.update(id, book);

    if (!updatedBook) {
        return c.json({error: "Book not found"}, 404);
    };
    return c.json(updatedBook);
});

app.get("/api/todos", async(c) => {
    return await todoController.readAll(c);
});

app.get("/api/todos/:todoId", async (c) => {
    return await todoController.readOne(c);
});

app.post("/api/todos", async (c) => {
    return await todoController.create(c);
});
app.put("/api/todos/:todoId", async (c) => {
    return await todoController.update(c);
});
app.delete("/api/todos/:todoId", async (c) => {
   return await todoController.deleteOne(c);
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