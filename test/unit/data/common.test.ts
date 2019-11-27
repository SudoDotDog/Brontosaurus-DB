/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Common
 * @override Unit
 */

import { expect } from 'chai';
import { COMMON_KEY_VALIDATE_RESPONSE, COMMON_NAME_VALIDATE_RESPONSE, fitAnchor, validateCommonKey, validateCommonName } from '../../../src/data/common';

describe('Given [Validate Common Name] helper function', (): void => {

    it('should be able to validate common name OK', (): void => {

        const name: string = 'Aa 10';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(name);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate common name ok start with number', (): void => {

        const name: string = '3a';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(name);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate common name only letter and number', (): void => {

        const name: string = 'Aa10(';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(name);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.ONLY_SELECTED_SYMBOL);
    });

    it('should be able to validate common name too short', (): void => {

        const name: string = 'a';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(name);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.TOO_SHORT);
    });

    it('should be able to validate common name selected symbol', (): void => {

        const name: string = 'Aa10d^&as92312';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(name);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate common - no symbol', (): void => {

        const name: string = '<<<123';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(name);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.ONLY_SELECTED_SYMBOL);
    });

    it('should be able to validate common - start with space', (): void => {

        const name: string = ' Hello World LLC';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(name);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.START_WITH_SPACE);
    });

    it('should be able to validate common - end with space', (): void => {

        const name: string = 'Hello World LLC ';

        const result: COMMON_NAME_VALIDATE_RESPONSE = validateCommonName(name);

        expect(result).to.be.equal(COMMON_NAME_VALIDATE_RESPONSE.END_WITH_SPACE);
    });
});

describe('Given [Validate Common Key] helper function', (): void => {

    it('should be able to validate key OK', (): void => {

        const key: string = 'Aa10';

        const result: COMMON_KEY_VALIDATE_RESPONSE = validateCommonKey(key);

        expect(result).to.be.equal(COMMON_KEY_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate key start with number', (): void => {

        const name: string = '3a';

        const result: COMMON_KEY_VALIDATE_RESPONSE = validateCommonKey(name);

        expect(result).to.be.equal(COMMON_KEY_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate key no space', (): void => {

        const key: string = 'Aa 10';

        const result: COMMON_KEY_VALIDATE_RESPONSE = validateCommonKey(key);

        expect(result).to.be.equal(COMMON_KEY_VALIDATE_RESPONSE.NO_SPACE);
    });

    it('should be able to validate key only letter and number', (): void => {

        const name: string = 'Aa10(';

        const result: COMMON_KEY_VALIDATE_RESPONSE = validateCommonKey(name);

        expect(result).to.be.equal(COMMON_KEY_VALIDATE_RESPONSE.ONLY_SELECTED_SYMBOL);
    });

    it('should be able to validate key too short', (): void => {

        const name: string = 'a';

        const result: COMMON_KEY_VALIDATE_RESPONSE = validateCommonKey(name);

        expect(result).to.be.equal(COMMON_KEY_VALIDATE_RESPONSE.TOO_SHORT);
    });

    it('should be able to validate key selected symbol', (): void => {

        const name: string = 'Aa10d^&as92312';

        const result: COMMON_KEY_VALIDATE_RESPONSE = validateCommonKey(name);

        expect(result).to.be.equal(COMMON_KEY_VALIDATE_RESPONSE.OK);
    });

    it('should be able to validate key - no symbol', (): void => {

        const name: string = '<<<123';

        const result: COMMON_KEY_VALIDATE_RESPONSE = validateCommonKey(name);

        expect(result).to.be.equal(COMMON_KEY_VALIDATE_RESPONSE.ONLY_SELECTED_SYMBOL);
    });
});

describe('Given [Fit Anchor] helper function', (): void => {

    it('should be able to return empty string', (): void => {

        const name: string = '';

        const result: string = fitAnchor(name);

        expect(result).to.be.equal('');
    });

    it('should be able to remove space and parse lower case', (): void => {

        const name: string = ' So ME Thin G ';

        const result: string = fitAnchor(name);

        expect(result).to.be.equal('something');
    });
});

