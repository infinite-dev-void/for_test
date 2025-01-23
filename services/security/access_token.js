import fastify from "./../../fastify.js";
import { verify_refresh, sign_access } from "./../../utils/jwt.js";

export default {
    /**
     * @type {import("fastify").RouteHandlerMethod}
     */
    handler: async function (request, reply) {
        const refresh_token = request.cookies.refresh_token;

        if (typeof refresh_token != "string") {
            return reply.status(400).send({
                message: "رمز التحديث غير موجود",
            });
        }

        try {
            const payload = await verify_refresh(refresh_token);

            const access_token = await sign_access({
                id: payload.id,
                type: payload.type,
            });

            return reply.status(200).send({
                token: access_token,
            });
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
    },

    /**
     * @type {import("fastify").RouteOptions}
     */
    opts: {},
};
