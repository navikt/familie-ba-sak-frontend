import { behandlingsresultater } from './behandling';
import {
    erKlageFeilregistrertAvKA,
    harAnkeEksistertPåKlagebehandling,
    KlageinstansEventType,
    KlageinstansUtfall,
    klageinstansUtfallTilTekst,
    utledKlagebehandlingResultattekst,
} from './klage';
import { KlageTestdata } from '../testdata/KlageTestdata';

describe('Klage', () => {
    describe('HarAnkeEksistertPåKlagebehandling', () => {
        const ankeTyper = KlageTestdata.lagAnkeKlageinstansEventTyper();
        const ikkeAnkeTyper = KlageTestdata.lagIkkeAnkeKlageinstansEventTyper();

        test.each(ankeTyper)('skal returnere true om type er anke', type => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({
                klageinstansResultat: [KlageTestdata.lagKlageinstansResultat({ type })],
            });

            // Act
            const eksistert = harAnkeEksistertPåKlagebehandling(klagebehandling);

            // Expect
            expect(eksistert).toBe(true);
        });

        test.each(ikkeAnkeTyper)('skal returnere false om type ikke er anke', type => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({
                klageinstansResultat: [KlageTestdata.lagKlageinstansResultat({ type })],
            });

            // Act
            const eksistert = harAnkeEksistertPåKlagebehandling(klagebehandling);

            // Expect
            expect(eksistert).toBe(false);
        });
    });

    describe('ErKlageFeilregistrertAvKA', () => {
        const feilregistrertTyper = KlageTestdata.lagFeilregistrertKlageinstansEventTyper();
        const ikkeFeilregistrertTyper = KlageTestdata.lagIkkeFeilregistrertKlageinstansEventTyper();

        test.each(feilregistrertTyper)('skal returnere true om klage er feilregistert', type => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({
                klageinstansResultat: [KlageTestdata.lagKlageinstansResultat({ type })],
            });

            // Act
            const erFeilregistrert = erKlageFeilregistrertAvKA(klagebehandling);

            // Expect
            expect(erFeilregistrert).toBe(true);
        });

        test.each(ikkeFeilregistrertTyper)(
            'skal returnere false om klage ikke er feilregistrert',
            type => {
                // Arrange
                const klagebehandling = KlageTestdata.lagKlagebehandling({
                    klageinstansResultat: [KlageTestdata.lagKlageinstansResultat({ type })],
                });

                // Act
                const erFeilregistrert = erKlageFeilregistrertAvKA(klagebehandling);

                // Expect
                expect(erFeilregistrert).toBe(false);
            }
        );
    });

    describe('UtledKlagebehandlingResultattekst', () => {
        const alleKlageinstansUtfall = KlageTestdata.lagAlleKlageinstansUtfall();
        const alleKlageResultat = KlageTestdata.lagAlleKlageResultat();

        test.each(alleKlageinstansUtfall)('skal utlede forventet tekst fra utfall', utfall => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({
                klageinstansResultat: [
                    KlageTestdata.lagKlageinstansResultat({ utfall: undefined }),
                    KlageTestdata.lagKlageinstansResultat({ utfall }),
                ],
            });

            // Act
            const tekst = utledKlagebehandlingResultattekst(klagebehandling);

            // Expect
            expect(tekst).toBe(klageinstansUtfallTilTekst[utfall]);
        });

        test('skal utlede feilregistrert klagebehandlingtekst', () => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({
                klageinstansResultat: [
                    KlageTestdata.lagKlageinstansResultat({
                        type: KlageinstansEventType.KLAGEBEHANDLING_AVSLUTTET,
                        utfall: undefined,
                    }),
                    KlageTestdata.lagKlageinstansResultat({
                        type: KlageinstansEventType.BEHANDLING_FEILREGISTRERT,
                        utfall: KlageinstansUtfall.AVVIST,
                    }),
                ],
            });

            // Act
            const tekst = utledKlagebehandlingResultattekst(klagebehandling);

            // Expect
            expect(tekst).toBe('Feilregistrert (KA)');
        });

        test.each(alleKlageResultat)('skal utlede tekst for resultat på behandlingen', resultat => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({ resultat: resultat });

            // Act
            const tekst = utledKlagebehandlingResultattekst(klagebehandling);

            // Expect
            expect(tekst).toBe(behandlingsresultater[resultat]);
        });

        test('skal utlede tilbakefallende tekst hvis ingenting annet kan utledes', () => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({ resultat: undefined });

            // Act
            const tekst = utledKlagebehandlingResultattekst(klagebehandling);

            // Expect
            expect(tekst).toBe('Ikke satt');
        });
    });
});
