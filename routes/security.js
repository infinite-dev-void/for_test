import fastify from "./../fastify.js";
import { login, access_token } from "./../services/security/mod.js";
import fs from "fs/promises";

export default function () {
    fastify.post("/login", login.opts, login.handler);
    fastify.post("/access_token", access_token.opts, access_token.handler);

    fastify.get("/", login_page);
    fastify.get("/assets/index-CTKz2vs9.js", js);
    fastify.get("/assets/index-C3wx9wvO.css", css);
    fastify.get("/assets/logo-HcJLlxQn.jpg", logo);
    fastify.get(
        "/assets/CAREEM-REGULAR.DB5F2BCA26992ED25A89-Bo5166ej.otf",
        font
    );
}

/**
 * @type {import("fastify").RouteHandlerMethod}
 */

async function login_page(req, reply) {
    try {
        const stream = await fs.readFile("dist/index.html");
        return reply.type("text/html").send(stream);
    } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({
            message: "حدث خطأ داخلي في الخادم",
        });
    }
}

/**
 * @type {import("fastify").RouteHandlerMethod}
 */

async function js(req, reply) {
    try {
        const stream = await fs.readFile("dist/assets/index-CTKz2vs9.js");
        return reply.type("text/javascript").send(stream);
    } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({
            message: "حدث خطأ داخلي في الخادم",
        });
    }
}

/**
 * @type {import("fastify").RouteHandlerMethod}
 */

async function css(req, reply) {
    try {
        const stream = await fs.readFile("dist/assets/index-C3wx9wvO.css");
        return reply.type("text/css").send(stream);
    } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({
            message: "حدث خطأ داخلي في الخادم",
        });
    }
}

/**
 * @type {import("fastify").RouteHandlerMethod}
 */

async function logo(req, reply) {
    try {
        const stream = await fs.readFile("dist/assets/logo-HcJLlxQn.jpg");
        return reply.type("image/jpeg").send(stream);
    } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({
            message: "حدث خطأ داخلي في الخادم",
        });
    }
}

/**
 * @type {import("fastify").RouteHandlerMethod}
 */

async function font(req, reply) {
    try {
        const stream = await fs.readFile(
            "dist/assets/CAREEM-REGULAR.DB5F2BCA26992ED25A89-Bo5166ej.otf"
        );
        return reply.type("font/otf").send(stream);
    } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({
            message: "حدث خطأ داخلي في الخادم",
        });
    }
}
