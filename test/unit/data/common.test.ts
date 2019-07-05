/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Common
 * @override Unit
 */

import { expect } from 'chai';
import { COMMON_NAME_VALIDATE_RESPONSE, validateCommonName } from '../../../src/data/common';

describe('Given [Validate Common Name] helper function', (): void => {

    it('should be able to validate common name OK', (): void => {

        const username: string = 'Aa10';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(username);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate common name ok start with number', (): void => {

        const username: string = '3a';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(username);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate common name no space', (): void => {

        const username: string = 'Aa 10';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(username);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.NO_SPACE);
    });

    it('should be able to validate common name only letter and number', (): void => {

        const username: string = 'Aa10(';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(username);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.ONLY_SELECTED_SYMBOL);
    });

    it('should be able to validate common name too short', (): void => {

        const username: string = 'a';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(username);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.TOO_SHORT);
    });

    it('should be able to validate common name selected symbol', (): void => {

        const username: string = 'Aa10d^&as92312';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(username);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate common - no symbol', (): void => {

        const username: string = '<<<123';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(username);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.ONLY_SELECTED_SYMBOL);
    });
});
