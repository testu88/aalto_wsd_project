import app from "./app.js";
//start Deno server

Deno.serve(app.fetch);
