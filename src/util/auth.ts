/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Util
 * @description Auth
 */

import { createHash, Hash } from 'crypto';
import { SpecialPassword } from '../interface/common';

export const garblePassword = (password: string, salt: string): string => {

    const salted: string = password + ':' + salt;
    const md5: Hash = createHash('md5').update(salted);

    return md5.digest('hex');
};

export const verifySpecialPassword = (garbledPassword: string, specialPassword: SpecialPassword): boolean => {

    const presentTime: number = new Date().getTime();
    const expireTime: number = specialPassword.expireAt.getTime();

    if (presentTime > expireTime) {
        return false;
    }

    return garbledPassword === specialPassword.password;
};
