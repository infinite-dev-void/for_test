import argon2 from "argon2";

import fastify from "./../../fastify.js";
import { sign_refresh } from "./../../utils/jwt.js";

export default {
    /**
     * @type {import("fastify").RouteHandlerMethod}
     */
    handler: async function (request, reply) {
        const body = request.body;

        const message = validate_body(body);
        if (typeof err == "string") {
            return reply.status(400).send({
                message: message,
            });
        }

        try {
            const [rows, _] = await fastify.mysql.query(
                `SELECT id, password, type, status FROM users WHERE user_name=?`,
                [body.user_name]
            );

            if (rows.length == 0) {
                return reply.status(400).send({
                    message: "اسم المستخدم أو كلمة المرور غير صحيحة",
                });
            }

            const user = rows[0];

            const valid = await argon2.verify(user.password, body.password);

            if (!valid) {
                return reply.status(400).send({
                    message: "اسم المستخدم أو كلمة المرور غير صحيح",
                });
            }

            const token = await sign_refresh({ id: user.id, type: user.type });

            return reply
                .setCookie("refresh_token", token, {
                    secure: true,
                    sameSite: "strict",
                })
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
                    user_name: {
                        type: "string",
                    },

                    password: {
                        type: "string",
                    },
                },
                required: ["user_name", "password"],
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
