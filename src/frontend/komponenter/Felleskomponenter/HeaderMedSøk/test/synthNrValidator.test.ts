import { idnr } from '@navikt/familie-header';

describe('ID/SynthID validator', () => {
    test('should accept a valid one', () => {
        const result = idnr('13097248022');
        expect(result).toEqual({
            status: 'valid',
            type: 'fnr',
        });
    });

    test('should accept a standard leap year', function () {
        const result = idnr('29029648784');
        expect(result).toEqual({
            status: 'valid',
            type: 'fnr',
        });
    });

    test('should accept year 00 as valid leap year', function () {
        const result = idnr('29020075838');
        expect(result).toEqual({
            status: 'valid',
            type: 'fnr',
        });
    });

    test('should reject if date is > 28 feb in a non leap year', function () {
        const result = idnr('29020112345');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ["checksums don't match", 'invalid date'],
        });
    });

    test('should compensate for checksum digits that are 11', function () {
        const result = idnr('15021951940');
        expect(result).toEqual({
            status: 'valid',
            type: 'fnr',
        });
    });

    test('should reject if less than 11 digits', function () {
        const result = idnr('1234567890');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ['fnr or dnr must consist of 11 digits'],
        });
    });

    test('should reject if more than 11 digits', function () {
        const result = idnr('123456789101');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ['fnr or dnr must consist of 11 digits'],
        });
    });

    test('should reject if non-digits are present', function () {
        const result = idnr('1234567891A');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ['fnr or dnr must consist of 11 digits'],
        });
    });

    test('should reject if checksum 1 is invalid', function () {
        const result = idnr('13097248032');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ["checksums don't match"],
        });
    });

    test('should reject if checksum 2 is invalid', function () {
        const result = idnr('13097248023');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ["checksums don't match"],
        });
    });

    test('should reject if day is invalid', function () {
        const result = idnr('32127248022');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ["checksums don't match", 'invalid date'],
        });
    });

    test('should reject if month is invalid', function () {
        const result = idnr('13137248022');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ["checksums don't match", 'invalid date'],
        });
    });
});

describe('dnr', function () {
    // dnr is identical to fnr except for the first digit
    test('should accept a valid one', function () {
        const result = idnr('53097248016');
        expect(result).toEqual({
            status: 'valid',
            type: 'dnr',
        });
    });
});

describe('synthNr', function () {
    test('should accept synthNr with the third digits = x + 8, for idnr()', function () {
        const result = idnr('04886696871', true);
        expect(result).toEqual({
            status: 'valid',
            type: 'fnr',
        });
    });

    test('should accept synthNr with the third digits = x + 8, for fnr()', function () {
        const result = idnr('04886696871', true);
        expect(result).toEqual({
            status: 'valid',
            type: 'fnr',
        });
    });

    test('should reject if synthNr is wrong', function () {
        const result = idnr('04886696870', true);
        expect(result).toEqual({
            status: 'invalid',
            reasons: ["checksums don't match"],
        });
    });

    test('should reject if synthNr is disabled', function () {
        const result = idnr('04886696871');
        expect(result).toEqual({
            status: 'invalid',
            reasons: ['invalid date'],
        });
    });
});
