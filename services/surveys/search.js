import fastify from "./../../fastify.js";
import { authn, authr, ADMIN } from "./../security/mod.js";

export default {
    /**
     * @type {import("fastify").RouteHandlerMethod}
     */
    handler: async function (request, reply) {
        const body = request.body;

        if (typeof body.passport_no != "string") {
            return reply.status(404).send();
        }

        /**
         * @type {import("mysql2/promise").Connection}
         */

        try {
            const [rows, _] = await fastify.mysql.query(
                "SELECT * FROM fms_surveys WHERE passport_no=?",
                [body.passport_no]
            );

            if (rows.length == 1) {
                return reply.status(200).send(rows[0]);
            } else {
                return reply.status(404).send();
            }
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
        schema: {
            body: {
                type: "object",
            },
        },
        preHandler: [authn, authr([ADMIN])],
    },
};
