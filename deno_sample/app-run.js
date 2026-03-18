import handleRequest from "./app.js";
import { serve } from "https://deno.land/std/http/server.ts";

serve(handleRequest, {port:8000}).then(()=>{
    console.log("Port running on 8000");
});