import { periodeOverlapperMedValgtDato } from '..';

describe('Periode', () => {
    describe('Periode overlapper med valgt dato', () => {
        test('Returner true hvis periode overlapper med valgt dato', () => {
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-09-01'))
            ).toBe(true);
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-10-13'))
            ).toBe(true);
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-08-13'))
            ).toBe(true);
        });

        test('Returner false hvis periode ikke overlapper med valgt dato', () => {
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-08-12'))
            ).toBe(false);
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-10-14'))
            ).toBe(false);
        });
    });
});
