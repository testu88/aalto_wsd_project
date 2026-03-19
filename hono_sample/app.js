import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/", (c) => {
    let result = "";
    let number1 = 0;
    let number2 = 0;
    if (c.req.query("operation") && c.req.query("number1") && c.req.query("number2")){
        number1 = Number(c.req.query("number1"));
        number2 = Number(c.req.query("number2"));
        if (c.req.query("operation") === "sum"){
            result = number1+ number2;
        } else if (c.req.query("operation") === "difference"){
            result = Number(number1) - Number(number2);
        } else if (c.req.query("operation" !== "sum") || c.req.query("operation") !== "difference"){
            result = "Invalid operation.";
        };
    } else if (!c.req.query("operation")){
        result = "Invalid operation.";
    }else if (c.req.query("number1")){
        number1 = Number(c.req.query("number1"));
        result = number1+number2;
    } else if (c.req.query("number2")){
        number2 = Number(c.req.query("number2"));
        result = number1+number2;
    } else {
        result = "Invalid operation.";
    };

    return c.text(result);
});

export default app;
