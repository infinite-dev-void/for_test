import fastify from "./../../fastify.js";
import { authn, authr, ADMIN } from "./../security/mod.js";

export default {
    /**
     * @type {import("fastify").RouteHandlerMethod}
     */
    handler: async function (request, reply) {
        /**
         * @type {import("mysql2/promise").Connection}
         */

        try {
            const [rows, _] = await fastify.mysql.query(
                "SELECT id, user_name, type_id, type, status_id, status FROM view_users"
            );
            return reply.send(rows);
        } catch (err) {
            fastify.log.error(err);
            return reply.status(500).send({
                message: "خطأ داخلي في الخادم",
            });
        }
    },
    /**
     * @type {import("fastify").RouteOptions}
     */
    opts: {
        preHandler: [authn, authr([ADMIN])],
    },
};
