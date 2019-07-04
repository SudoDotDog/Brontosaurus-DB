/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Account
 */

export enum USERNAME_VALIDATE_RESPONSE {

    NO_SPACE = "NO_SPACE",
    ONLY_LETTERS_OR_NUMBERS = "ONLY_LETTERS_OR_NUMBERS",
    OK = "OK",
}

export const validateUsername = (username: string): USERNAME_VALIDATE_RESPONSE => {

    if (username.includes(' ')) {
        return USERNAME_VALIDATE_RESPONSE.NO_SPACE;
    }

    if (/[A-Z][a-z][0-9]+/.test(username)) {
        return USERNAME_VALIDATE_RESPONSE.ONLY_LETTERS_OR_NUMBERS;
    }

    return USERNAME_VALIDATE_RESPONSE.OK;
};
