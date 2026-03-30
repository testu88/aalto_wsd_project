import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as communityController from "./controllers/communityController.js";
import * as postController from "./controllers/postController.js"
import * as commentController from "./controllers/commentController.js";


const app = new Hono();
app.use("/*", cors());
app.use("/*", logger());




//SQL client commands
app.get("/api/communities",  communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.post("/api/communities", communityController.create);
app.delete("/api/communities/:communityId", communityController.deleteById);


app.get("/api/communities/:communityId/posts", postController.readAll);
app.get("/api/communities/:communityId/posts/:postId", postController.readById);
app.post("/api/communities/:communityId/posts", postController.create);
app.delete("/api/communities/:communityId/posts/:postId", postController.deleteById);


app.get("/api/communities/:communityId/posts/:postId/comments", commentController.readAll);
app.post("/api/communities/:communityId/posts/:postId/comments", commentController.create);
app.delete("/api/communities/:communityId/posts/:postId/comments/:commentId", commentController.deleteById);


export default app;