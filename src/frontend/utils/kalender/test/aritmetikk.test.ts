import { kalenderDato, KalenderEnhet, leggTil, trekkFra, kalenderDiffMåned } from '../';

describe('Kalender aritmetikk ', () => {
    describe('Legg til logikk', () => {
        describe('Tester legg til dager funksjonalitet', () => {
            test('Skal legge til dager i samme måned', () => {
                const dagMånedÅr = kalenderDato('2020-02-10');

                const dagMånedÅr2 = leggTil(dagMånedÅr, 10, KalenderEnhet.DAG);
                expect(dagMånedÅr2.år).toBe(2020);
                expect(dagMånedÅr2.måned).toBe(1);
                expect(dagMånedÅr2.dag).toBe(20);
            });

            test('Skal legge til dager over månedsskifte med skuddår', () => {
                const dagMånedÅr = kalenderDato('2020-02-10');

                const dagMånedÅr2 = leggTil(dagMånedÅr, 20, KalenderEnhet.DAG);
                expect(dagMånedÅr2.år).toBe(2020);
                expect(dagMånedÅr2.måned).toBe(2);
                expect(dagMånedÅr2.dag).toBe(1);
            });

            test('Legg til 1 dag ved 28 februar ved skuddår', () => {
                const dagMånedÅr = kalenderDato('2020-02-28');

                const dagMånedÅr2 = leggTil(dagMånedÅr, 1, KalenderEnhet.DAG);
                expect(dagMånedÅr2.år).toBe(2020);
                expect(dagMånedÅr2.måned).toBe(1);
                expect(dagMånedÅr2.dag).toBe(29);
            });

            test('Legg til 1 dag ved 28 februar uten skuddår', () => {
                const dagMånedÅr = kalenderDato('2021-02-28');

                const dagMånedÅr2 = leggTil(dagMånedÅr, 1, KalenderEnhet.DAG);
                expect(dagMånedÅr2.år).toBe(2021);
                expect(dagMånedÅr2.måned).toBe(2);
                expect(dagMånedÅr2.dag).toBe(1);
            });
        });

        describe('Tester legg til måneder funksjonalitet', () => {
            test('Pluss måneder innenfor et år', () => {
                const dagMånedÅr = kalenderDato('2020-07-10');

                const nyDagMånedÅr = leggTil(dagMånedÅr, 3, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2020);
                expect(nyDagMånedÅr.måned).toBe(9);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Pluss måneder forbi et år', () => {
                const dagMånedÅr = kalenderDato('2020-07-10');

                const nyDagMånedÅr = leggTil(dagMånedÅr, 9, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2021);
                expect(nyDagMånedÅr.måned).toBe(3);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Pluss måneder forbi flere år', () => {
                const dagMånedÅr = kalenderDato('2020-10-10');

                const nyDagMånedÅr = leggTil(dagMånedÅr, 24, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2022);
                expect(nyDagMånedÅr.måned).toBe(9);
            });

            test('Pluss måneder 12 måneder fra skuddår', () => {
                const dagMånedÅr = kalenderDato('2020-02-29');

                const nyDagMånedÅr = leggTil(dagMånedÅr, 12, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2021);
                expect(nyDagMånedÅr.måned).toBe(1);
                expect(nyDagMånedÅr.dag).toBe(28);
            });

            test('Pluss måneder 12 måneder til skuddår', () => {
                const dagMånedÅr = kalenderDato('2019-02-28');

                const nyDagMånedÅr = leggTil(dagMånedÅr, 12, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2020);
                expect(nyDagMånedÅr.måned).toBe(1);
                expect(nyDagMånedÅr.dag).toBe(28);
            });
        });

        describe('Skal teste legg til år logikk', () => {
            test('Legg til 0 år', () => {
                const dagMånedÅr = kalenderDato('2020-07-10');

                const nyDagMånedÅr = leggTil(dagMånedÅr, 0, KalenderEnhet.ÅR);
                expect(nyDagMånedÅr.år).toBe(2020);
                expect(nyDagMånedÅr.måned).toBe(6);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Legg til 2 år', () => {
                const dagMånedÅr = kalenderDato('2020-07-10');

                const nyDagMånedÅr = leggTil(dagMånedÅr, 2, KalenderEnhet.ÅR);
                expect(nyDagMånedÅr.år).toBe(2022);
                expect(nyDagMånedÅr.måned).toBe(6);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Legg til 1 år ved skuddår', () => {
                const dagMånedÅr = kalenderDato('2020-02-29');

                const nyDagMånedÅr = leggTil(dagMånedÅr, 1, KalenderEnhet.ÅR);
                expect(nyDagMånedÅr.år).toBe(2021);
                expect(nyDagMånedÅr.måned).toBe(1);
                expect(nyDagMånedÅr.dag).toBe(28);
            });
        });
    });

    describe('Trekk fra logikk', () => {
        describe('Tester trekk fra dager funksjonalitet', () => {
            test('Skal trekke fra dager i samme måned', () => {
                const dagMånedÅr = kalenderDato('2020-02-15');

                const dagMånedÅr2 = trekkFra(dagMånedÅr, 10, KalenderEnhet.DAG);
                expect(dagMånedÅr2.år).toBe(2020);
                expect(dagMånedÅr2.måned).toBe(1);
                expect(dagMånedÅr2.dag).toBe(5);
            });

            test('Skal trekke fra dager over månedsskifte med skuddår', () => {
                const dagMånedÅr = kalenderDato('2020-03-10');

                const dagMånedÅr2 = trekkFra(dagMånedÅr, 20, KalenderEnhet.DAG);
                expect(dagMånedÅr2.år).toBe(2020);
                expect(dagMånedÅr2.måned).toBe(1);
                expect(dagMånedÅr2.dag).toBe(19);
            });

            test('Trekk fra 1 dag ved 1 mars ved skuddår', () => {
                const dagMånedÅr = kalenderDato('2020-03-01');

                const dagMånedÅr2 = trekkFra(dagMånedÅr, 1, KalenderEnhet.DAG);
                expect(dagMånedÅr2.år).toBe(2020);
                expect(dagMånedÅr2.måned).toBe(1);
                expect(dagMånedÅr2.dag).toBe(29);
            });

            test('Trekk fra 1 dag ved 1 mars uten skuddår', () => {
                const dagMånedÅr = kalenderDato('2021-03-01');

                const dagMånedÅr2 = trekkFra(dagMånedÅr, 1, KalenderEnhet.DAG);
                expect(dagMånedÅr2.år).toBe(2021);
                expect(dagMånedÅr2.måned).toBe(1);
                expect(dagMånedÅr2.dag).toBe(28);
            });
        });

        describe('Tester trekk fra måneder funksjonalitet', () => {
            test('Trekk fra måneder innenfor et år', () => {
                const dagMånedÅr = kalenderDato('2020-07-10');

                const nyDagMånedÅr = trekkFra(dagMånedÅr, 3, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2020);
                expect(nyDagMånedÅr.måned).toBe(3);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Trekk fra måneder forbi et år', () => {
                const dagMånedÅr = kalenderDato('2020-07-10');

                const nyDagMånedÅr = trekkFra(dagMånedÅr, 9, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2019);
                expect(nyDagMånedÅr.måned).toBe(9);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Trekk fra måneder forbi flere år', () => {
                const dagMånedÅr = kalenderDato('2020-10-10');

                const nyDagMånedÅr = trekkFra(dagMånedÅr, 24, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2018);
                expect(nyDagMånedÅr.måned).toBe(9);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Trekk fra 12 måneder ved skuddår', () => {
                const dagMånedÅr = kalenderDato('2020-02-29');

                const nyDagMånedÅr = trekkFra(dagMånedÅr, 12, KalenderEnhet.MÅNED);
                expect(nyDagMånedÅr.år).toBe(2019);
                expect(nyDagMånedÅr.måned).toBe(1);
                expect(nyDagMånedÅr.dag).toBe(28);
            });
        });

        describe('Skal teste trekk fra år logikk', () => {
            test('Trekk fra 0 år', () => {
                const dagMånedÅr = kalenderDato('2020-07-10');

                const nyDagMånedÅr = trekkFra(dagMånedÅr, 0, KalenderEnhet.ÅR);
                expect(nyDagMånedÅr.år).toBe(2020);
                expect(nyDagMånedÅr.måned).toBe(6);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Trekk fra 2 år', () => {
                const dagMånedÅr = kalenderDato('2020-07-10');

                const nyDagMånedÅr = trekkFra(dagMånedÅr, 2, KalenderEnhet.ÅR);
                expect(nyDagMånedÅr.år).toBe(2018);
                expect(nyDagMånedÅr.måned).toBe(6);
                expect(nyDagMånedÅr.dag).toBe(10);
            });

            test('Trekk fra 1 år ved skuddår', () => {
                const dagMånedÅr = kalenderDato('2020-02-29');

                const nyDagMånedÅr = trekkFra(dagMånedÅr, 1, KalenderEnhet.ÅR);
                expect(nyDagMånedÅr.år).toBe(2019);
                expect(nyDagMånedÅr.måned).toBe(1);
                expect(nyDagMånedÅr.dag).toBe(28);
            });
        });
    });

    describe('Differanse i måned logikk', () => {
        describe('Tester differanse innenfor samme år', () => {
            test('Skal bli differansen i måneder', () => {
                const dagMånedÅr1 = kalenderDato('2020-02-15');
                const dagMånedÅr2 = kalenderDato('2020-03-11');
                const månedDiff = kalenderDiffMåned(dagMånedÅr1, dagMånedÅr2);
                expect(månedDiff).toBe(1);
            });

            test('Skal bli differansen i måneder', () => {
                const dagMånedÅr1 = kalenderDato('2020-02-15');
                const dagMånedÅr2 = kalenderDato('2020-04-11');
                const månedDiff = kalenderDiffMåned(dagMånedÅr1, dagMånedÅr2);
                expect(månedDiff).toBe(2);
            });
        });

        describe('Tester differanse på tvers av år', () => {
            test('Skal bli differansen i år * 12', () => {
                const dagMånedÅr1 = kalenderDato('2020-01-15');
                const dagMånedÅr2 = kalenderDato('2021-01-11');
                const månedDiff = kalenderDiffMåned(dagMånedÅr1, dagMånedÅr2);
                expect(månedDiff).toBe(12);
            });

            test('Skal bli differansen år * 12 pluss differansen i måneder', () => {
                const dagMånedÅr1 = kalenderDato('2020-12-15');
                const dagMånedÅr2 = kalenderDato('2021-01-11');
                const månedDiff = kalenderDiffMåned(dagMånedÅr1, dagMånedÅr2);
                expect(månedDiff).toBe(1);
            });
        });
    });
});
