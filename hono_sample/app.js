import { Hono } from "@hono/hono";
import { logger } from "@hono/hono/logger";

const app = new Hono();

/*app.get("/", (c) => {
    let result = "";
    let number1 = Number(c.req.query("number1"));
    let number2 = Number(c.req.query("number2"));
    let operation = c.req.query("operation");
    if (operation){
        if (operation === "sum"){
            if (number1 && number2){
               
            result = number1 + number2;
            } else if (number1){
                result = number1 + 0;
            } else if (number2){
                result = 0 + number2;
            }
        } else if (operation === "difference"){
            if (number1 && number2){
            result = number1 - number2;
            } else if (number1){
                result = number1 - 0;
            } else if (number2){
                result = 0 - number2;
            }
        } else {
            result = "Invalid operation.";
        };
    } else {
        result = "Invalid operation.";
    }
    return c.text(result);
});*/

/*app.get("/", (c) => c.text("Hello world!"));
app.post("/", (c) => c.text("Post data"));
app.get("/hello", (c) => c.text("Goodbye!"));
app.on("PEEK", "/out", (c) => c.text("Peek out"));*/

// MULTIPLE PATH VARIABLES
/*app.get("/restaurants", (c) => c.text("Listing restaurants."));
app.post("/restaurants", (c) => c.text("Adding a restaurant."));
app.get("/restaurants/:restaurantId", (c) => {
    const restaurantId = c.req.param("restaurantId");
    return c.text(`Showing restaurant with id : ${restaurantId}.`);
});
app.get("/restaurants/:restaurantId/reviews", (c) => {
    const restaurantId = c.req.param("restaurantId");
    return c.text(`Listing reviews for restaurant with id : ${restaurantId}.`);
});
app.post("/restaurants/:restaurantId/reviews", (c) => {
    const restaurantId = c.req.param("restaurantId");
    return c.text(`Adding a review for restaurant with id : ${restaurantId}.`);
});
app.delete("/restaurants/:restaurantId/reviews/:reviewId", (c) => {
    const restaurantId = c.req.param("restaurantId");
    const reviewId = c.req.param("reviewId");
    return c.text(`Removing review :${reviewId} from restaurant with id :r${restaurantId}.`);
});*/

// CUSTOM MIDDLEWARE
/*const myLogger = async (c, next) => {
    console.log(`--> ${c.req.method}   ${c.req.path}`);
    await next();
    console.log(`<-- ${c.req.status}`);
};

app.use(myLogger);
app.use(logger());
app.use("/api", logger());

app.get("/", (c) => c.text("Hellow world!"));*/

// JSON data
/*app.get("/", (c) => {
    const data = { message: "Hello world"};
    return c.json(data);
},
);*/

// return path variables in json
/*app.get("/lists/:listId/items/:itemId", (c) => {
    const listId = c.req.param("listId");
    const itemId = c.req.param("itemId");

    return c.json({ listId, itemId});
},
);*/

// request JSON data [ curl -X POST -H "Content-Type: application/json" -d '{"message":"hello"}' "http://localhost:8000"]
/*app.post("/", async (c) => {
    const data = await c.req.json();
    const message = data.message ?? "No message";
    return c.json({message});
},
);*/

/*app.post("/echo", async (c) => {
    const data = await c.req.json();
    return c.json(data);
});
app.post("/data", async (c) => {
    const request = await c.req.json();
    const data = request.data ?? "No data";
    return c.json({data});
});
app.post("/filter/:property", async (c) => {
    const property = c.req.param("property");
    const request = await c.req.json();
    const data = {[property]: request[property]} ?? {};
    return c.json(data);
});*/

// API
/*let temperature = 20;
app.get("/api/temperature", (c) => {
    return c.json({temperature});
});
app.post("/api/temperature", (c) => {
    temperature++;
    return c.json({temperature});
    
});
app.delete("/api/temperature", (c)=> {
    temperature--;
    return c.json({temperature});
});
// curl -X PUT -H "Content-Type:application/json" -d '{"temperature":30}' "http://localhost:8000/api/temperature"
app.put("/api/temperature", async (c) => {
    const data = await c.req.json();
    temperature = data.temperature;
    return c.json({temperature});
});*/

let cards = [];

app.get("/api/cards", (c) => {
    return c.json({cards});
});
app.post("/api/cards", async (c) => {
    const card = await c.req.json();
    cards.push(card);
    return c.json({cards});
});
app.delete("/api/cards/:id",  (c) => {
    const id = c.req.param("id");
    cards = cards.filter((card) => card.id !== id);
    return c.json({cards});
});

export default app;
