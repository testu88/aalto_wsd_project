import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/", (c) => {
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
});

export default app;
