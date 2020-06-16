/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Contact
 */

export enum EMAIL_VALIDATE_RESPONSE {

    OK = "OK",
    NO_AT_SIGN = "NO_AT_SIGN",
    INVALID_USER = "INVALID_USER",
    INVALID_DOMAIN = "INVALID_DOMAIN",
}

export const validateEmail = (email: string): EMAIL_VALIDATE_RESPONSE => {

    const splited: string[] = email.split('@');

    if (splited.length !== 2) {
        return EMAIL_VALIDATE_RESPONSE.NO_AT_SIGN;
    }

    const user: string = splited[0];
    const domain: string = splited[1];

    if (!/^[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/igm.test(domain)) {
        return EMAIL_VALIDATE_RESPONSE.INVALID_DOMAIN;
    }

    if (user.length <= 2) {

        if (!/^[a-zA-Z0-9]+$/igm.test(user)) {
            return EMAIL_VALIDATE_RESPONSE.INVALID_USER;
        }
    } else {

        if (!/^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9]$/igm.test(user)) {
            return EMAIL_VALIDATE_RESPONSE.INVALID_USER;
        }
    }

    return EMAIL_VALIDATE_RESPONSE.OK;
};

export enum PHONE_VALIDATE_RESPONSE {

    OK = "OK",
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validatePhone = (phone: string): PHONE_VALIDATE_RESPONSE => {

    return PHONE_VALIDATE_RESPONSE.OK;
};
