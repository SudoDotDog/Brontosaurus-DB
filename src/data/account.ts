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

export enum PASSWORD_VALIDATE_RESPONSE {

    TOO_SHORT = "TOO_SHORT",
    ONLY_KEYBOARD_CHARACTER_AVAILABLE = "ONLY_KEYBOARD_CHARACTER_AVAILABLE",
    HAVE_TO_INCLUDE_LETTER = "HAVE_TO_INCLUDE_LETTER",
    HAVE_TO_INCLUDE_NUMBER = "HAVE_TO_INCLUDE_NUMBER",
    HAVE_TO_INCLUDE_SYMBOL = "HAVE_TO_INCLUDE_SYMBOL",
    OK = "OK",
}

export const validatePassword = (
    password: string,
    length: number = 6,
    haveToIncludeLetter: boolean = true,
    haveToIncludeNumber: boolean = true,
    haveToIncludeSymbol: boolean = false,
): PASSWORD_VALIDATE_RESPONSE => {

    if (password.length < length) {
        return PASSWORD_VALIDATE_RESPONSE.TOO_SHORT;
    }

    if (!/[A-Z][a-z][0-9][!@#$%^&*()[\]{};:'",./<>?~`-+_=]+/.test(password)) {
        return PASSWORD_VALIDATE_RESPONSE.ONLY_KEYBOARD_CHARACTER_AVAILABLE;
    }

    if (haveToIncludeLetter) {
        if (!/.+[A-Z][a-z].+/.test(password)) {
            return PASSWORD_VALIDATE_RESPONSE.HAVE_TO_INCLUDE_LETTER;
        }
    }

    if (haveToIncludeNumber) {
        if (!/.+[0-9].+/.test(password)) {
            return PASSWORD_VALIDATE_RESPONSE.HAVE_TO_INCLUDE_NUMBER;
        }
    }

    if (haveToIncludeSymbol) {
        if (!/.+[!@#$%^&*()[\]{};:'",./<>?~`-+_=].+/.test(password)) {
            return PASSWORD_VALIDATE_RESPONSE.HAVE_TO_INCLUDE_SYMBOL;
        }
    }

    return PASSWORD_VALIDATE_RESPONSE.OK;
};
