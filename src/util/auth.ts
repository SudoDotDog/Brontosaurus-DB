/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Util
 * @description Auth
 */

import { createHash, Hash } from 'crypto';
import { ResetToken, SpecialPassword } from '../interface/common';
import { PreviousPassword } from '../interface/account';

export const garblePassword = (password: string, salt: string): string => {

    const salted: string = password + ':' + salt;
    const md5: Hash = createHash('md5').update(salted);

    return md5.digest('hex');
};

export const verifyPreviousPassword = (garbledPassword: string, previousPassword: PreviousPassword): boolean => {

    return garbledPassword === previousPassword.password;
};

export const verifySpecialPassword = (garbledPassword: string, specialPassword: SpecialPassword): boolean => {

    if (Boolean(specialPassword.suspendedAt) || Boolean(specialPassword.suspendedBy)) {
        return false;
    }

    const presentTime: number = new Date().getTime();
    const expireTime: number = specialPassword.expireAt.getTime();

    if (presentTime > expireTime) {
        return false;
    }

    return garbledPassword === specialPassword.password;
};

export const verifyResetToken = (garbledPassword: string, resetToken: ResetToken): boolean => {

    const presentTime: number = new Date().getTime();
    const expireTime: number = resetToken.expireAt.getTime();

    if (presentTime > expireTime) {
        return false;
    }

    return garbledPassword === resetToken.password;
};
