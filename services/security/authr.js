export const ADMIN = 1;
export const DATA_ENTRY = 2;

/**
 *
 * @param {Number[]} types
 * @returns
 */

export function authr(types) {
    /**
     * @type {import("fastify").RouteHandlerMethod}
     */
    return async function (request, reply) {
        const user = request.user;
        console.log("==============");
        console.log(user);
        console.log("==============");
        if (!types.includes(user.type)) {
            return reply.status(403).send({
                message: "ليس لديك صلاحية",
            });
        }
    };
}
