import node_mailer from "nodemailer";

/**
 * @type {node_mailer.Transporter}
 */

let transporter;

export function create_connection() {
    /* setting = global.setting; */
    transporter = node_mailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
}

export function verify_connection() {
    return new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}

export function send_mail(to, subject, html) {
    const options = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
        /* dsn: {
            id: "some random message specific id",
            return: "headers",
            notify: ["failure"],
            recipient: from,
        }, */
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}
