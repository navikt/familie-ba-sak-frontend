import { fjernWhitespace } from '../commons';

type whitespace = { unicodeDecimalValue: number; navn: string };

describe('utils/commons', () => {
    describe('fjernWhitespace', () => {
        // https://en.wikipedia.org/wiki/Whitespace_character
        const whitespaces: whitespace[] = [
            { unicodeDecimalValue: 9, navn: 'character tabulation' },
            { unicodeDecimalValue: 10, navn: 'line feed' },
            { unicodeDecimalValue: 11, navn: 'line tabulation' },
            { unicodeDecimalValue: 12, navn: 'form feed' },
            { unicodeDecimalValue: 13, navn: 'carriage return' },
            { unicodeDecimalValue: 32, navn: 'space' },
            { unicodeDecimalValue: 133, navn: 'next line' },
            { unicodeDecimalValue: 160, navn: 'no-break space' },
            { unicodeDecimalValue: 5760, navn: 'ogham space mark' },
            { unicodeDecimalValue: 8192, navn: 'en quad' },
            { unicodeDecimalValue: 8193, navn: 'em quad' },
            { unicodeDecimalValue: 8194, navn: 'en space' },
            { unicodeDecimalValue: 8195, navn: 'em space' },
            { unicodeDecimalValue: 8196, navn: 'three-per-em space' },
            { unicodeDecimalValue: 8197, navn: 'four-per-em space' },
            { unicodeDecimalValue: 8198, navn: 'six-per-em space' },
            { unicodeDecimalValue: 8199, navn: 'figure space' },
            { unicodeDecimalValue: 8200, navn: 'punctuation space' },
            { unicodeDecimalValue: 8201, navn: 'thin space' },
            { unicodeDecimalValue: 8202, navn: 'hair space' },
            { unicodeDecimalValue: 8232, navn: 'line separator' },
            { unicodeDecimalValue: 8233, navn: 'paragraph separator' },
            { unicodeDecimalValue: 8239, navn: 'narrow no-break space' },
            { unicodeDecimalValue: 8287, navn: 'medium mathematical space' },
            { unicodeDecimalValue: 12288, navn: 'ideographic space' },
        ];

        whitespaces.forEach(whitespace => {
            test(`Skal fjerne "${whitespace.navn}"`, () => {
                expect(fjernWhitespace(String.fromCharCode(whitespace.unicodeDecimalValue))).toEqual('');
            });
        });
    });
});
