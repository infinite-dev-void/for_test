import fastify from "../fastify.js";
import { create } from "../services/surveys/mod.js";

export default function () {
    fastify.post("/surveys", create.opts, create.handler);
}
