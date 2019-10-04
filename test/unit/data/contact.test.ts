/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Contact
 * @override Unit
 */

import { expect } from 'chai';
import { EMAIL_VALIDATE_RESPONSE, validateEmail } from '../../../src/data/contact';

describe('Given [Validate Email] helper function', (): void => {

    it('should be able to validate email OK - 1', (): void => {

        const username: string = 'someone.w@mail.com';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate email OK - 2', (): void => {

        const username: string = 'some_-ne.w@mail.com';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate email OK - 3', (): void => {

        const username: string = 'abc@123.com';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate email OK - 4', (): void => {

        const username: string = 'wm@mengw.io';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate email OK - 5', (): void => {

        const username: string = '5@mail.com';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate invalid username - 1', (): void => {

        const username: string = '_something@mail.com';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.INVALID_USER);
    });

    it('should be able to validate invalid username - 2', (): void => {

        const username: string = 'user((name@mail.com';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.INVALID_USER);
    });

    it('should be able to validate invalid domain - 1', (): void => {

        const username: string = 'user@mail.companyLongLongLong';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.INVALID_DOMAIN);
    });

    it('should be able to validate invalid domain - 2', (): void => {

        const username: string = 'user@mail.n233';

        const result: EMAIL_VALIDATE_RESPONSE = validateEmail(username);

        expect(result).to.be.equal(EMAIL_VALIDATE_RESPONSE.INVALID_DOMAIN);
    });
});
