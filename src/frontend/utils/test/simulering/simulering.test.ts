import { lagSimulering, lagSimuleringPeriode } from '@testutils/testdata/simuleringTestdata';

import {
    hentPeriodelisteMedTommePerioder,
    hentÅrISimuleringen,
    settPerioderTilIkkeUtbetaltOmForfallsdatoIkkePassert,
} from '../../simulering';

describe('utils/simulering', () => {
    test('Første dag i året havnet innenfor rett år ved hentÅrISimuleringen', () => {
        const simuleringsperioder = [
            lagSimuleringPeriode({ fom: '2020-01-01', tom: '2020-01-31' }),
            lagSimuleringPeriode({ fom: '2020-02-01', tom: '2020-02-28' }),
        ];
        const årISimulering = hentÅrISimuleringen(simuleringsperioder);
        expect(årISimulering.length).toEqual(1);
    });

    describe('hentPeriodelisteMedTommePerioder', () => {
        test('Legger til perioder mellom innsendte perioder (fyller hull)', () => {
            const simuleringsperioder = [
                lagSimuleringPeriode({ fom: '2020-01-01', tom: '2020-01-31' }),
                lagSimuleringPeriode({ fom: '2020-03-01', tom: '2020-03-31' }),
            ];
            const periodeliste = hentPeriodelisteMedTommePerioder(simuleringsperioder);
            expect(periodeliste.length).toEqual(3);
            expect(periodeliste.find(p => p.fom === '2020-01-01')).toBeTruthy();
            expect(periodeliste.find(p => p.fom === '2020-02-01')).toBeTruthy();
            expect(periodeliste.find(p => p.fom === '2020-03-01')).toBeTruthy();
        });

        test('Legger ikke til perioder hvor innsendte perioder er etter hverandre (ingen hull)', () => {
            const simuleringsperioder = [
                lagSimuleringPeriode({ fom: '2020-01-01', tom: '2020-01-31' }),
                lagSimuleringPeriode({ fom: '2020-02-01', tom: '2020-02-28' }),
            ];
            const periodeliste = hentPeriodelisteMedTommePerioder(simuleringsperioder);
            expect(periodeliste.length).toEqual(2);
        });

        test('Sorterer perioder kronologisk etter fom-dato', () => {
            const simuleringsperioder = [
                lagSimuleringPeriode({ fom: '2020-03-01', tom: '2020-03-31' }),
                lagSimuleringPeriode({ fom: '2020-02-01', tom: '2020-02-28' }),
            ];
            const periodeliste = hentPeriodelisteMedTommePerioder(simuleringsperioder);
            expect(periodeliste[0].fom).toEqual('2020-02-01');
            expect(periodeliste[1].fom).toEqual('2020-03-01');
        });
    });

    describe('settPerioderTilIkkeUtbetaltOmForfallsdatoIkkePassert', () => {
        test('skal sette perioden til ikke utbetalt når resultatet er 0 og forfallsdatoen ikke har passert', () => {
            const simulering = lagSimulering({
                tidSimuleringHentet: '2020-02-01',
                perioder: [
                    lagSimuleringPeriode({
                        resultat: 0,
                        forfallsdato: '2020-03-01',
                        nyttBeløp: 1054,
                        tidligereUtbetalt: 1054,
                    }),
                ],
            });

            const normalisertSimulering = settPerioderTilIkkeUtbetaltOmForfallsdatoIkkePassert(simulering);

            expect(normalisertSimulering.perioder[0].tidligereUtbetalt).toEqual(0);
            expect(normalisertSimulering.perioder[0].resultat).toEqual(1054);
        });

        test('skal ikke endre perioden når forfallsdatoen har passert', () => {
            const simulering = lagSimulering({
                tidSimuleringHentet: '2020-03-01',
                perioder: [
                    lagSimuleringPeriode({
                        resultat: 0,
                        forfallsdato: '2020-02-01',
                        nyttBeløp: 1054,
                        tidligereUtbetalt: 1054,
                    }),
                ],
            });

            const normalisertSimulering = settPerioderTilIkkeUtbetaltOmForfallsdatoIkkePassert(simulering);

            expect(normalisertSimulering.perioder[0].tidligereUtbetalt).toEqual(1054);
            expect(normalisertSimulering.perioder[0].resultat).toEqual(0);
        });

        test('skal ikke endre perioden når resultatet ikke er 0', () => {
            const simulering = lagSimulering({
                tidSimuleringHentet: '2020-02-01',
                perioder: [
                    lagSimuleringPeriode({
                        resultat: 500,
                        forfallsdato: '2020-03-01',
                        nyttBeløp: 1054,
                        tidligereUtbetalt: 554,
                    }),
                ],
            });

            const normalisertSimulering = settPerioderTilIkkeUtbetaltOmForfallsdatoIkkePassert(simulering);

            expect(normalisertSimulering.perioder[0].tidligereUtbetalt).toEqual(554);
            expect(normalisertSimulering.perioder[0].resultat).toEqual(500);
        });

        test('skal ikke endre perioden når forfallsdato og tidspunkt for simulering mangler', () => {
            const simulering = lagSimulering({
                tidSimuleringHentet: undefined,
                perioder: [
                    lagSimuleringPeriode({
                        resultat: 0,
                        forfallsdato: undefined,
                        nyttBeløp: 1054,
                        tidligereUtbetalt: 1054,
                    }),
                ],
            });

            const normalisertSimulering = settPerioderTilIkkeUtbetaltOmForfallsdatoIkkePassert(simulering);

            expect(normalisertSimulering.perioder[0].tidligereUtbetalt).toEqual(1054);
            expect(normalisertSimulering.perioder[0].resultat).toEqual(0);
        });
    });
});
