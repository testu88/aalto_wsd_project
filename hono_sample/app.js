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
const myLogger = async (c, next) => {
    console.log(`--> ${c.req.method}   ${c.req.path}`);
    await next();
    console.log(`<-- ${c.req.status}`);
};

//app.use(myLogger);
//app.use(logger());
app.use("/api", logger());

app.get("/", (c) => c.text("Hellow world!"));



export default app;
