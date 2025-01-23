import fastify from "./../../fastify.js";
import { verify_access } from "./../../utils/jwt.js";

/**
 * @type {import("fastify").RouteHandlerMethod}
 */
export default async function (request, reply) {
    const access_token = request.headers.authorization;

    if (typeof access_token != "string") {
        return reply.status(401).send({
            message: "يرجى تسجيل الدخول أولا",
        });
    }

    try {
        const payload = await verify_access(access_token);
        // TODO: select from DB;
        request.user = payload;
    } catch (err) {
        if (err.message) {
            if (err.status_code == 500) {
                fastify.log.error(err.err);
            }
            return reply.status(err.status_code).send({
                message: err.message,
            });
        }

        fastify.log.error(err);
        return reply.status(500).send({
            message: "خطأ داخلي في الخادم",
        });
    }
}
