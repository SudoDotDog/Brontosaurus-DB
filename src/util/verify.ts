/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Util
 * @description Verify
 */

import * as SpeakEasy from "speakeasy";

export const generateKey = (): string => {

    const secret: SpeakEasy.GeneratedSecret = SpeakEasy.generateSecret({ length: 32 });
    return secret.base32;
};

export const generateCode = (key: string): string => {

    return SpeakEasy.totp({
        secret: key,
        encoding: 'base32',
    });
};

export const verifyCode = (key: string, code: string): boolean => {

    return SpeakEasy.totp.verify({
        secret: key,
        encoding: 'base32',
        token: code,
    });
};
