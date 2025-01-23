import "dotenv/config";
import fastify from "./fastify.js";

import { default as registerRoutes } from "./routes/mod.js";

registerRoutes();

export default fastify;
