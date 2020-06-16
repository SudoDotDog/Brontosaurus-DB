/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Util
 * @description 2FA
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from "chance";
// eslint-disable-next-line camelcase
import { Deprecated_generateKey, generateURL } from '../../../src/util/2fa';

describe('Given [2fa] helper functions', (): void => {

    const chance: Chance.Chance = new Chance('util-2fa');

    it('should be able to generate key', async (): Promise<void> => {

        const key: string = await Deprecated_generateKey();

        expect(key).to.have.lengthOf(32);
    });

    it('should be able to generate url', async (): Promise<void> => {

        const name: string = chance.string();
        const account: string = chance.string();

        const key: string = await Deprecated_generateKey();
        const url: string = await generateURL(name, account, key);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(url.length).to.be.greaterThan(30);
    });
});
