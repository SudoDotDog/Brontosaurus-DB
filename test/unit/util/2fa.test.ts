/**
 * @author WMXPY
 * @namespace Brontosaurus_Server
 * @description Placeholder
 * @package Unit Test
 */

import { expect } from 'chai';
import { generateKey } from '../../../src/util/2fa';

describe('Given [2fa] helper functions', (): void => {

    it('Should be able to generate key', async (): Promise<void> => {

        const key: string = await generateKey();

        expect(key).to.have.lengthOf(32);
    });
});
