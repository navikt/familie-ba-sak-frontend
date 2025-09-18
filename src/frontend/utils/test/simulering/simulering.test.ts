import { mockSimuleringPeriode } from './simulering.mock';
import { hentPeriodelisteMedTommePerioder, hentÅrISimuleringen } from '../../simulering';

describe('utils/simulering', () => {
    test('Første dag i året havnet innenfor rett år ved hentÅrISimuleringen', () => {
        const simuleringsperioder = [
            mockSimuleringPeriode({ fom: '2020-01-01', tom: '2020-01-31' }),
            mockSimuleringPeriode({ fom: '2020-02-01', tom: '2020-02-28' }),
        ];
        const årISimulering = hentÅrISimuleringen(simuleringsperioder);
        expect(årISimulering.length).toEqual(1);
    });

    describe('hentPeriodelisteMedTommePerioder', () => {
        test('Legger til perioder mellom innsendte perioder (fyller hull)', () => {
            const simuleringsperioder = [
                mockSimuleringPeriode({ fom: '2020-01-01', tom: '2020-01-31' }),
                mockSimuleringPeriode({ fom: '2020-03-01', tom: '2020-03-31' }),
            ];
            const periodeliste = hentPeriodelisteMedTommePerioder(simuleringsperioder);
            expect(periodeliste.length).toEqual(3);
            expect(periodeliste.find(p => p.fom === '2020-01-01')).toBeTruthy();
            expect(periodeliste.find(p => p.fom === '2020-02-01')).toBeTruthy();
            expect(periodeliste.find(p => p.fom === '2020-03-01')).toBeTruthy();
        });

        test('Legger ikke til perioder hvor innsendte perioder er etter hverandre (ingen hull)', () => {
            const simuleringsperioder = [
                mockSimuleringPeriode({ fom: '2020-01-01', tom: '2020-01-31' }),
                mockSimuleringPeriode({ fom: '2020-02-01', tom: '2020-02-28' }),
            ];
            const periodeliste = hentPeriodelisteMedTommePerioder(simuleringsperioder);
            expect(periodeliste.length).toEqual(2);
        });

        test('Sorterer perioder kronologisk etter fom-dato', () => {
            const simuleringsperioder = [
                mockSimuleringPeriode({ fom: '2020-03-01', tom: '2020-03-31' }),
                mockSimuleringPeriode({ fom: '2020-02-01', tom: '2020-02-28' }),
            ];
            const periodeliste = hentPeriodelisteMedTommePerioder(simuleringsperioder);
            expect(periodeliste[0].fom).toEqual('2020-02-01');
            expect(periodeliste[1].fom).toEqual('2020-03-01');
        });
    });
});
