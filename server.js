import app from "./app.js";

try {
    await app.listen({ port: 3000 });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}

/* fastify.get("/", async function (request, reply) {
    return { hello: "world" };
});

import argon2 from "argon2";

const hashed = await argon2.hash("12345678");
console.log(hashed);

console.log(await argon2.verify(hashed, "12345678"));
 */
