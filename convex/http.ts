import { httpRouter } from 'convex/server';
import { authComponent, createAuth } from './auth';

const http = httpRouter();

// { cors: true } is required for client side frameworks
authComponent.registerRoutes(http, createAuth);

export default http;
