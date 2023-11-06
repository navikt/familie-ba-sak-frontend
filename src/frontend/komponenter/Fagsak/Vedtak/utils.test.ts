import { antallMånederIPeriode, summerBeløpForPerioder } from './utils';

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
    test('summerRefusjonsbeløpForPerioder skal finne totalt refusjonsbeløp for alle perioder', () => {
        expect(summerBeløpForPerioder([])).toBe(0);
        expect(
            summerBeløpForPerioder([
                REFUSJONSPERIODE_FIRE_MÅNEDER,
                REFUSJONSPERIODE_TRE_MÅNEDER,
                REFUSJONSPERIODE_EN_MÅNED,
            ])
        ).toBe(950);
        expect(
            summerBeløpForPerioder([
                {
                    fom: '2021-01-01',
                    tom: '2021-08-31',
                    beløp: 62,
                },
                {
                    fom: '2021-09-01',
                    tom: '2021-09-30',
                    beløp: 81,
                },
                {
                    fom: '2021-10-01',
                    tom: '2022-04-30',
                    beløp: 152,
                },
                {
                    fom: '2022-05-01',
                    tom: '2022-09-30',
                    beløp: 108,
                },
            ])
        ).toBe(2181);
    });
    test('antallMånederIPeriode skal finne antall hele måneder en periode varer', () => {
        expect(antallMånederIPeriode(REFUSJONSPERIODE_FIRE_MÅNEDER)).toBe(4);
        expect(antallMånederIPeriode(REFUSJONSPERIODE_TRE_MÅNEDER)).toBe(3);
        expect(antallMånederIPeriode(REFUSJONSPERIODE_EN_MÅNED)).toBe(1);
    });
});
