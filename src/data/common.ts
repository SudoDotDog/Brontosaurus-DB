/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Common
 */

export enum COMMON_NAME_VALIDATE_RESPONSE {

    TOO_SHORT = "TOO_SHORT",
    ONLY_SELECTED_SYMBOL = "ONLY_SELECTED_SYMBOL",
    OK = "OK",
}

export const validateCommonName = (
    name: string,
    length: number = 2,
): COMMON_NAME_VALIDATE_RESPONSE => {

    if (name.length < length) {
        return COMMON_NAME_VALIDATE_RESPONSE.TOO_SHORT;
    }

    if (!/^([A-Za-z0-9]|[-_!@#$^&*=+., ])+$/.test(name)) {
        return COMMON_NAME_VALIDATE_RESPONSE.ONLY_SELECTED_SYMBOL;
    }

    return COMMON_NAME_VALIDATE_RESPONSE.OK;
};

export enum COMMON_KEY_VALIDATE_RESPONSE {

    TOO_SHORT = "TOO_SHORT",
    NO_SPACE = "NO_SPACE",
    ONLY_SELECTED_SYMBOL = "ONLY_SELECTED_SYMBOL",
    OK = "OK",
}

export const validateCommonKey = (
    key: string,
    length: number = 2,
): COMMON_KEY_VALIDATE_RESPONSE => {

    if (key.length < length) {
        return COMMON_KEY_VALIDATE_RESPONSE.TOO_SHORT;
    }

    if (key.includes(' ')) {
        return COMMON_KEY_VALIDATE_RESPONSE.NO_SPACE;
    }

    if (!/^([A-Za-z0-9]|[-_!@#$^&*=+])+$/.test(key)) {
        return COMMON_KEY_VALIDATE_RESPONSE.ONLY_SELECTED_SYMBOL;
    }

    return COMMON_KEY_VALIDATE_RESPONSE.OK;
};

export const fitAnchor = (value: string): string => {

    if (value.length === 0) {
        return '';
    }

    return value.replace(/ /g, '').toLowerCase();
};
