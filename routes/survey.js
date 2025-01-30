import fastify from "../fastify.js";
import { create, get, search } from "../services/surveys/mod.js";

export default function () {
    fastify.post("/surveys", create.opts, create.handler);
    fastify.get("/surveys", get.opts, get.handler);
    fastify.post("/surveys/search", search.opts, search.handler);
}
