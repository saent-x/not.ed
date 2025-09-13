import { httpRouter } from "convex/server";
import { betterAuthComponent } from "./auth";
import { createAuth } from "./lib/auth";

const http = httpRouter();

// { cors: true } is required for client side frameworks
betterAuthComponent.registerRoutes(http, createAuth("emailAndPassword"), {
  cors: true,
});
betterAuthComponent.registerRoutes(http, createAuth("socials"), { cors: true });

export default http;
