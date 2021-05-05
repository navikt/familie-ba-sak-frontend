import familieDayjs, { familieDayjsDiff } from '../familieDayjs';
import { datoformat } from '../formatter';

describe('utils/familieDayjs', () => {
    test('familieDayjs initialiserer YYYY-MM-DD når format ikke er spesifisert', () => {
        const dato = familieDayjs('1990-02-28');
        expect(dato.get('date')).toEqual(28);
        expect(dato.get('month')).toEqual(1);
        expect(dato.get('year')).toEqual(1990);
    });

    test('familieDayjs initialiserer på format spesifisert', () => {
        const dato = familieDayjs('02.90', datoformat.MÅNED);
        expect(dato.get('date')).toEqual(1);
        expect(dato.get('month')).toEqual(1);
        expect(dato.get('year')).toEqual(1990);
    });

    test('familieDayjsDiff returnerer korrekt differanse', () => {
        const dato = familieDayjs('2001-02-28');
        const differanseDato = familieDayjs('2000-02-28');

        expect(familieDayjsDiff(dato, differanseDato, 'year')).toEqual(1);
        expect(familieDayjsDiff(dato, differanseDato, 'month')).toEqual(12);
        expect(familieDayjsDiff(dato, differanseDato, 'day')).toEqual(366);
    });

    test('familieDayjsDiff returnerer 0 måneders differanse hvis 30 dager eller mindre diff, tross ulike måneder', () => {
        const dato = familieDayjs('2018-06-29');
        const differanseDato = familieDayjs('2018-05-31');

        expect(familieDayjsDiff(dato, differanseDato, 'year')).toEqual(0);
    });

    test('familieDayjsDiff returnerer 0 års differanse hvis 365 dager eller mindre diff, tross ulike årstall', () => {
        const dato = familieDayjs('2019-06-30');
        const differanseDato = familieDayjs('2020-05-17');

        expect(familieDayjsDiff(dato, differanseDato, 'year')).toEqual(0);
    });
});
