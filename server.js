import app from "./app.js";

const port = process.env.PORT || 4000;
try {
    await app.listen({
        port,
        host: "0.0.0.0",
    });
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
