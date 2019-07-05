/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Common
 */

export enum COMMON_NAME_VALIDATE_RESPONSE {

    TOO_SHORT = "TOO_SHORT",
    NO_SPACE = "NO_SPACE",
    ONLY_LETTERS_OR_NUMBERS = "ONLY_LETTERS_OR_NUMBERS",
    OK = "OK",
}

export const validateCommonName = (
    username: string,
    length: number = 2,
): COMMON_NAME_VALIDATE_RESPONSE => {

    if (username.length < length) {
        return COMMON_NAME_VALIDATE_RESPONSE.TOO_SHORT;
    }

    if (username.includes(' ')) {
        return COMMON_NAME_VALIDATE_RESPONSE.NO_SPACE;
    }

    if (!/^[0-z]+$/.test(username)) {
        return COMMON_NAME_VALIDATE_RESPONSE.ONLY_LETTERS_OR_NUMBERS;
    }

    return COMMON_NAME_VALIDATE_RESPONSE.OK;
};
