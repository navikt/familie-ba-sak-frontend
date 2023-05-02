import { tilFørsteDagIMånedenHvisGyldigInput, tilSisteDagIMånedenHvisGyldigInput } from './utils';

describe('Vedtakutils', () => {
    test('tilFørsteDagIMånedenHvisGyldigInput skal gjøre om gyldig input til første dag i måneden', () => {
        expect(tilFørsteDagIMånedenHvisGyldigInput('2023-01-20')).toBe('2023-01-01');
        expect(tilFørsteDagIMånedenHvisGyldigInput('2023-05-02')).toBe('2023-05-01');
    });
});

describe('Vedtakutils', () => {
    test('tilFørsteDagIMånedenHvisGyldigInput skal ikke endre ugyldig input', () => {
        expect(tilFørsteDagIMånedenHvisGyldigInput('NaN')).toBe('NaN');
        expect(tilFørsteDagIMånedenHvisGyldigInput(undefined)).toBe('');
    });
});

describe('Vedtakutils', () => {
    test('tilSisteDagIMånedenHvisGyldigInput skal gjøre om gyldig input til første dag i måneden', () => {
        expect(tilSisteDagIMånedenHvisGyldigInput('2023-01-20')).toBe('2023-01-31');
        expect(tilSisteDagIMånedenHvisGyldigInput('2023-02-27')).toBe('2023-02-28');
        expect(tilSisteDagIMånedenHvisGyldigInput('2024-02-14')).toBe('2024-02-29');
        expect(tilSisteDagIMånedenHvisGyldigInput('2023-04-02')).toBe('2023-04-30');
    });
});
