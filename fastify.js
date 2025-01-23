import Fastify from "fastify";
import mysql from "@fastify/mysql";
import cookie from "@fastify/cookie";

const fastify = Fastify({
    logger: true,
});

fastify.register(mysql, {
    promise: true,
    connectionString: encodeURI(process.env.DATABASE_STRING),
});

fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET || "my-secret", // for cookies signature
    hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
    parseOptions: {}, // options for parsing cookies
});

export default fastify;
