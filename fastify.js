import Fastify from "fastify";
import mysql from "@fastify/mysql";
import cookie from "@fastify/cookie";

const fastify = Fastify({
    logger: false,
});

fastify.register(mysql, {
    promise: true,
    connectionString: "mysql://root:159951236m_W@127.0.0.1:3306/immigration",
});

fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET || "my-secret", // for cookies signature
    hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
    parseOptions: {}, // options for parsing cookies
});

export default fastify;
