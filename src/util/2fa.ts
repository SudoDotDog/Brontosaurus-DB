/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Util
 * @description 2FA
 */

import * as Crypto from "crypto";

const base32: any = require("base32.js");

export const generateKey = (): Promise<string> =>
    new Promise<string>((resolve: (result: string) => void, reject: (reason: any) => void) => {
        const length: number = 32;

        let result: string = "";

        const randomBytes = () =>
            Crypto.randomBytes(6, (err: Error | null, buffer: Buffer) => {
                if (err) {
                    reject(err);
                }
                result += parseInt(buffer.toString("hex"), 16).toString(36);
                if (result.length < length) {
                    randomBytes();
                    return;
                }
                resolve(result.slice(0, length));
            });
        randomBytes();
    });

export const base32Encode = (key: string) => {

    return base32.encode(Buffer.from(key)).toString().replace(/=/g, '');
};

export const generateURL = (name: string, account: string, key: string) => {

    const parsedName: string = encodeURIComponent(name);
    const parsedAccount: string = encodeURIComponent(account);
    const parsedKey: string = base32Encode(key);

    return 'otpauth://totp/' + parsedAccount + '?issuer=' + parsedName + '&secret=' + parsedKey;
};
