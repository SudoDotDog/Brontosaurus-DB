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

    const user: string = splited[0] as string;
    const domain: string = splited[1] as string;

    if (/^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/igm.test(domain)) {
        return EMAIL_VALIDATE_RESPONSE.INVALID_DOMAIN;
    }

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/igm.test(user)) {
        return EMAIL_VALIDATE_RESPONSE.INVALID_USER;
    }

    return EMAIL_VALIDATE_RESPONSE.OK;
};
