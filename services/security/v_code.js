function randomNumber(length = 6) {
    let number = "";
    for (let i = 0; i < length; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}

/**
 * @type {Object.<string,{vCode:number, lastVCode:number, count:number, verified:number}>}
 */

const vCodes = {};

let len = 0,
    deleter = false;

const runDeleter = () => {
    if (!deleter) {
        deleter == true;
        const id = setInterval(() => {
            const now = Date.now();
            for (const [email, { count, lastVCode }] of Object.entries(
                vCodes
            )) {
                if (
                    (count == 1 && now > lastVCode + 1000 * 60 * 60) ||
                    now > lastVCode + 1000 * 60 * 5
                ) {
                    delete vCodes[email];
                    len--;
                    if (len == 0) {
                        clearInterval(id);
                        deleter = false;
                    }
                }
            }
        }, 3600000);
    }
};

export function new_vcode(email) {
    let foundEmail = vCodes[email];

    if (foundEmail) {
        if (foundEmail.count > 500) {
            if (Date.now() < foundEmail.lastVCode + 1000 * 60 * 5) {
                throw "لقد بلغت الحد الأقصى لعدد رموز التحقق يرجى المحاولة لاحقا";
            } else {
                foundEmail.count = 0;
            }
        }
    } else {
        vCodes[email] = foundEmail = { count: 0 };
        len++;
        runDeleter();
    }
    const vCode = randomNumber(6);
    foundEmail.vCode = vCode;
    foundEmail.lastVCode = Date.now();
    foundEmail.count++;
    foundEmail.verified = 0;
    return vCode;
}

export function verify(email, vCode) {
    const foundEmail = vCodes[email];
    if (!foundEmail) {
        return { field: "email", error: "لم يتم إرسال رمز تحقق للبريد" };
    }

    if (foundEmail.verified > 25) {
        return {
            field: "vCode",
            error: "لقد استنفدت جميع المحاولات يرجى طلب رمز جديد",
        };
    }

    if (foundEmail.vCode != vCode) {
        foundEmail.verified++;
        return {
            field: "vCode",
            error: "رمز التحقق غير صحيح",
        };
    }

    if (Date.now() > foundEmail.lastVCode + 1000 * 60 * 5) {
        throw {
            field: "vCode",
            error: "انتهت صلاحية الرمز يرجى طلب رمز جديد",
        };
    }
    return true;
}
