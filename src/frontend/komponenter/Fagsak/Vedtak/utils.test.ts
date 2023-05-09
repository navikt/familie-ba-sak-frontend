import {
    antallMånederIPeriode,
    summerBeløpForPerioder,
    tilFørsteDagIMånedenHvisGyldigInput,
    tilSisteDagIMånedenHvisGyldigInput,
} from './utils';

const REFUSJONSPERIODE_FIRE_MÅNEDER = {
    fom: '2022-06-01',
    tom: '2022-09-30',
    beløp: 25,
};

const REFUSJONSPERIODE_TRE_MÅNEDER = {
    fom: '2023-01-01',
    tom: '2023-03-31',
    beløp: 250,
};

const REFUSJONSPERIODE_EN_MÅNED = {
    fom: '2023-05-01',
    tom: '2023-05-31',
    beløp: 100,
};

describe('Vedtakutils', () => {
    test('tilFørsteDagIMånedenHvisGyldigInput skal gjøre om gyldig input til første dag i måneden', () => {
        expect(tilFørsteDagIMånedenHvisGyldigInput('2023-01-20')).toBe('2023-01-01');
        expect(tilFørsteDagIMånedenHvisGyldigInput('2023-05-02')).toBe('2023-05-01');
    });
    test('tilFørsteDagIMånedenHvisGyldigInput skal ikke endre ugyldig input', () => {
        expect(tilFørsteDagIMånedenHvisGyldigInput('NaN')).toBe('NaN');
        expect(tilFørsteDagIMånedenHvisGyldigInput(undefined)).toBe('');
    });
    test('tilSisteDagIMånedenHvisGyldigInput skal gjøre om gyldig input til første dag i måneden', () => {
        expect(tilSisteDagIMånedenHvisGyldigInput('2023-01-20')).toBe('2023-01-31');
        expect(tilSisteDagIMånedenHvisGyldigInput('2023-02-27')).toBe('2023-02-28');
        expect(tilSisteDagIMånedenHvisGyldigInput('2024-02-14')).toBe('2024-02-29');
        expect(tilSisteDagIMånedenHvisGyldigInput('2023-04-02')).toBe('2023-04-30');
    });

    test('summerRefusjonsbeløpForPerioder skal finne totalt refusjonsbeløp for alle perioder', () => {
        expect(summerBeløpForPerioder([])).toBe(0);
        expect(
            summerBeløpForPerioder([
                REFUSJONSPERIODE_FIRE_MÅNEDER,
                REFUSJONSPERIODE_TRE_MÅNEDER,
                REFUSJONSPERIODE_EN_MÅNED,
            ])
        ).toBe(950);
    });
    test('antallMånederIPeriode skal finne antall hele måneder en periode varer', () => {
        expect(antallMånederIPeriode(REFUSJONSPERIODE_FIRE_MÅNEDER)).toBe(4);
        expect(antallMånederIPeriode(REFUSJONSPERIODE_TRE_MÅNEDER)).toBe(3);
        expect(antallMånederIPeriode(REFUSJONSPERIODE_EN_MÅNED)).toBe(1);
    });
});
