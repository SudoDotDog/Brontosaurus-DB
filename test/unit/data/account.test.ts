/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Account
 * @override Unit
 */

import { expect } from 'chai';
import { PASSWORD_VALIDATE_RESPONSE, USERNAME_VALIDATE_RESPONSE, validatePassword, validateUsername } from '../../../src';

describe('Given [Validate Account] helper function', (): void => {

    it('should be able to validate username OK', (): void => {

        const username: string = 'Aa10';

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate username no space', (): void => {

        const username: string = 'Aa 10';

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.NO_SPACE);
    });

    it('should be able to validate username only letter and number', (): void => {

        const username: string = 'Aa10(';

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.ONLY_LETTERS_OR_NUMBERS);
    });

    it('should be able to validate username too short', (): void => {

        const username: string = 'a';

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.TOO_SHORT);
    });

    it('should be able to validate username must start with letter', (): void => {

        const username: string = '9Aa10';

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.MUST_START_WITH_LETTER);
    });

    it('should be able to validate username only letter and number - 2', (): void => {

        const username: string = 'Aa10d-as92312';

        const result: USERNAME_VALIDATE_RESPONSE = validateUsername(username);

        expect(result).to.be.equal(USERNAME_VALIDATE_RESPONSE.ONLY_LETTERS_OR_NUMBERS);
    });
});

describe('Given [Validate Password] helper function', (): void => {

    it('should be able to validate password OK', (): void => {

        const password: string = 'aaaaaa';

        const result: PASSWORD_VALIDATE_RESPONSE = validatePassword(
            password,
            5,
            false,
            false,
            false,
        );

        expect(result).to.be.equal(PASSWORD_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate too short', (): void => {

        const password: string = 'aaaa';

        const result: PASSWORD_VALIDATE_RESPONSE = validatePassword(
            password,
            5,
            false,
            false,
            false,
        );

        expect(result).to.be.equal(PASSWORD_VALIDATE_RESPONSE.TOO_SHORT);
    });

    it('should be able to validate must have number', (): void => {

        const password: string = '!aaaaaa';

        const result: PASSWORD_VALIDATE_RESPONSE = validatePassword(
            password,
            5,
            true,
            true,
            false,
        );

        expect(result).to.be.equal(PASSWORD_VALIDATE_RESPONSE.HAVE_TO_INCLUDE_NUMBER);
    });

    it('should be able to validate must have letter', (): void => {

        const password: string = '!123456';

        const result: PASSWORD_VALIDATE_RESPONSE = validatePassword(
            password,
            5,
            true,
            true,
            false,
        );

        expect(result).to.be.equal(PASSWORD_VALIDATE_RESPONSE.HAVE_TO_INCLUDE_LETTER);
    });
});

