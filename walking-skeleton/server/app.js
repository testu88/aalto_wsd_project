import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as communityController from "./controllers/communityController.js";
import * as postController from "./controllers/postController.js"
import * as commentController from "./controllers/commentController.js";
import * as authController from "./controllers/authController.js";
import * as middlewares from "./middlewares.js";


const app = new Hono();
app.use("/*", cors());
app.use("/*", logger());




// ROUTES

// User
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);


// Communities

app.get("/api/communities",  communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.post("/api/communities", middlewares.authenticate, communityController.create);
app.delete("/api/communities/:communityId", middlewares.authenticate, communityController.deleteById);

// Posts
app.get("/api/communities/:communityId/posts", postController.readAll);
app.get("/api/communities/:communityId/posts/:postId", postController.readById);
app.post("/api/communities/:communityId/posts", middlewares.authenticate, postController.create);
app.delete("/api/communities/:communityId/posts/:postId", middlewares.authenticate, postController.deleteById);

// Comments
app.get("/api/communities/:communityId/posts/:postId/comments", commentController.readAll);
app.post("/api/communities/:communityId/posts/:postId/comments", middlewares.authenticate, commentController.create);
app.delete("/api/communities/:communityId/posts/:postId/comments/:commentId", middlewares.authenticate, commentController.deleteById);


export default app;