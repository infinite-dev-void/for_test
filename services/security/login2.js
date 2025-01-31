import fastify from "./../../fastify.js";
import { verify_vcode, sign_refresh } from "./../../utils/jwt.js";
import { verify } from "./v_code.js";

export default {
    /**
     * @type {import("fastify").RouteHandlerMethod}
     */
    handler: async function (request, reply) {
        const body = request.body;

        try {
            const payload = await verify_vcode(body.vcode_token);

            const result = verify(payload.id, body.vcode);

            if (result !== true) {
                return reply.status(400).send({
                    message: result.error,
                });
            }

            const refresh = await sign_refresh({
                id: payload.id,
                type: payload.type,
            });

            return reply
                .setCookie("refresh_token", refresh, {})
                .status(200)
                .send();
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
                properties: {
                    vcode_token: {
                        type: "string",
                    },

                    vcode: {
                        type: "string",
                    },
                },
                required: ["vcode_token", "vcode"],
            },
        },
    },
};

function validate_body(body) {
    if (body.user_name > 255) {
        return "اسم المستخدم طويل جدا";
    }

    if (body.password > 32) {
        return "كلمة المرور طويلة جدا";
    }
}
