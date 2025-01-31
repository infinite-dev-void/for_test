import fastify from "./../fastify.js";
import { login, access_token, login2 } from "./../services/security/mod.js";
import fs from "fs/promises";

const JS = "index-8r5oXDsx.js";
const CSS = "index-BnHi4oA8.css";
const LOGO = "logo-HcJLlxQn.jpg";
const LOGO_NO_BG = "logo-no-bg-CExad3Yc.png";
const FONT = "CAREEM-REGULAR.DB5F2BCA26992ED25A89-Bo5166ej.otf";

export default function () {
    fastify.post("/login", login.opts, login.handler);
    fastify.post("/login2", login2.opts, login2.handler);
    fastify.post("/access_token", access_token.opts, access_token.handler);

    fastify.get("/", login_page);
    fastify.get(`/assets/${JS}`, js);
    fastify.get(`/assets/${CSS}`, css);
    fastify.get(`/assets/${LOGO}`, logo);
    fastify.get(`/assets/${LOGO_NO_BG}`, logo_no_bg);
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
        const stream = await fs.readFile(`dist/assets/${JS}`);
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
        const stream = await fs.readFile(`dist/assets/${CSS}`);
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
        const stream = await fs.readFile(`dist/assets/${LOGO}`);
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

async function logo_no_bg(req, reply) {
    try {
        const stream = await fs.readFile(`dist/assets/${LOGO_NO_BG}`);
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
        const stream = await fs.readFile(`dist/assets/${FONT}`);
        return reply.type("font/otf").send(stream);
    } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({
            message: "حدث خطأ داخلي في الخادم",
        });
    }
}
