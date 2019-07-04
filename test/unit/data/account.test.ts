/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Account
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from "chance";
import { USERNAME_VALIDATE_RESPONSE, validateUsername } from '../../../src';

describe('Given [Account Validate] helper functions', (): void => {

    const chance: Chance.Chance = new Chance('data-account');

    it('should be able to validate user name OK', async (): Promise<void> => {

        const username: string = chance.first();

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate user name no space', async (): Promise<void> => {

        const username: string = chance.first() + ' ' + chance.first();

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.NO_SPACE);
    });

    it('should be able to validate user name only letter and number', async (): Promise<void> => {

        const username: string = 'Aa10(';

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.ONLY_LETTERS_OR_NUMBERS);
    });
});
