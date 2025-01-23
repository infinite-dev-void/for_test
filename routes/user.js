import fastify from "./../fastify.js";
import { get } from "../services/user/mod.js";

export default function () {
    fastify.get("/users", get.opts, get.handler);
}
