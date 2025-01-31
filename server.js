import app from "./app.js";
import { create_connection } from "./services/email/handler.js";

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

create_connection();

/* send_mail(
    "walidalayash99@gmail.com",
    "اختبار إرسال البريد",
    "<h1>هل وصلك البريد الإلكتروني</h1><p>يرجى عدم الرد على هذا البريد</p>"
); */

/* fastify.get("/", async function (request, reply) {
    return { hello: "world" };
});
import argon2 from "argon2";

const hashed = await argon2.hash("12345678");
console.log(hashed);

console.log(await argon2.verify(hashed, "12345678"));

*/
