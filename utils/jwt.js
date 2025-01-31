import { promisify } from "util";

import jwt from "jsonwebtoken";

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

const REFRESH = 1;
const ACCESS = 2;
const VCODE = 3;

export async function sign_refresh(payload) {
    return await sign(
        { ...payload, iat: Date.now(), token_type: REFRESH },
        process.env.JWT_SECRET || "secret"
    );
}

export async function verify_refresh(token) {
    const payload = await verify(
        token,
        process.env.JWT_SECRET || "secret"
    ).catch((err) => {
        throw {
            status_code: 500,
            message: "حدث خطأ في الخادم",
            err,
        };
    });
    if (payload.token_type !== REFRESH) {
        throw {
            status_code: 400,
            message: "رمز التحديث غير صالح",
        };
    }
    return payload;
}

export async function sign_access(payload) {
    return await sign(
        { ...payload, iat: Date.now(), token_type: ACCESS },
        process.env.JWT_SECRET || "secret"
    );
}

export async function verify_access(token) {
    const payload = await verify(
        token,
        process.env.JWT_SECRET || "secret"
    ).catch((err) => {
        throw {
            status_code: 500,
            message: "حدث خطأ في الخادم",
            err,
        };
    });
    if (payload.token_type !== ACCESS) {
        throw {
            status_code: 400,
            message: "رمز الوصول غير صالح",
        };
    }
    return payload;
}

export async function sign_vcode(payload) {
    return await sign(
        { ...payload, iat: Date.now(), token_type: VCODE },
        process.env.JWT_SECRET || "secret"
    );
}

export async function verify_vcode(token) {
    const payload = await verify(
        token,
        process.env.JWT_SECRET || "secret"
    ).catch((err) => {
        throw {
            status_code: 500,
            message: "حدث خطأ في الخادم",
            err,
        };
    });
    if (payload.token_type !== VCODE) {
        throw {
            status_code: 400,
            message: "رمز التحقق غير صالح",
        };
    }
    return payload;
}

/*exports.signToken = async (payload, res) => {
    res.cookie(
        "token",
        await sign({ ...payload, iat: Date.now() }, process.env.JWT_SECRET)
        {
            maxAge: 1000 * 60 * 60 * 24,
            secure: true,
            httpOnly: true,
            sameSite: "Strict",
        }
    ); 
};
*/
/* exports.verifyToken = async (token) => {
    return await verify(decrypt(token), process.env.JWT_SECRET);
};

exports.signActiveId = async (payload) => {
    return aes_gcm_enc(
        await sign(
            { ...payload, iat: Date.now() },
            process.env.JWT_SECRET_ACTIVE_ACCOUNT
        ),
        process.env.AES_GCM_ACTIVE_ACCOUNT_KEY
    );
};

exports.verifyActiveId = async (signedId) => {
    return await verify(
        aes_gcm_dec(signedId, process.env.AES_GCM_ACTIVE_ACCOUNT_KEY),
        process.env.JWT_SECRET_ACTIVE_ACCOUNT
    );
};

exports.signSignupTicket = async (ticketId) => {
    return aes_gcm_enc(
        await sign(
            { ticketId, iat: Date.now() },
            process.env.JWT_SECRET_SIGNUP_TICKET
        ),
        process.env.AES_GCM_SIGNUP_TICKET_KEY
    );
};

exports.verifySignupTicket = async (signedTicket) => {
    return await verify(
        aes_gcm_dec(signedTicket, process.env.AES_GCM_SIGNUP_TICKET_KEY),
        process.env.JWT_SECRET_SIGNUP_TICKET
    );
};
 */
