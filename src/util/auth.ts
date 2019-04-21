/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Util
 * @description Auth
 */

import { createHash, Hash } from 'crypto';

export const garblePassword = (password: string, salt: string): string => {

    const salted: string = password + ':' + salt;
    const md5: Hash = createHash('md5').update(salted);

    return md5.digest('hex');
};
