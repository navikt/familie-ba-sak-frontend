import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagGrunnlagPerson, lagPersonMedAndelerTilkjentYtelse } from '@testutils/testdata/personTestdata';
import { lagSimulering, lagSimuleringPeriode } from '@testutils/testdata/simuleringTestdata';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { PersonType } from '@typer/person';
import { describe, expect, test } from 'vitest';

import { utledSimuleringsvurdering } from './simuleringsvurdering';

function lagBarn(antall: number) {
    return Array.from({ length: antall }, () => lagGrunnlagPerson({ type: PersonType.BARN }));
}

describe('utledSimuleringsvurdering', () => {
    describe('erFeilutbetaling', () => {
        test('skal returnere true når simuleringen har en feilutbetaling', () => {
            const simulering = lagSimulering({ feilutbetaling: 1054 });

            const { erFeilutbetaling } = utledSimuleringsvurdering(simulering, lagBehandling());

            expect(erFeilutbetaling).toBe(true);
        });

        test('skal returnere false når simuleringen ikke har en feilutbetaling', () => {
            const simulering = lagSimulering({ feilutbetaling: 0 });

            const { erFeilutbetaling } = utledSimuleringsvurdering(simulering, lagBehandling());

            expect(erFeilutbetaling).toBe(false);
        });
    });

    describe('behandlingErEndreMigreringsdato', () => {
        test('skal returnere true når behandlingen har årsak endre migreringsdato', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.ENDRE_MIGRERINGSDATO });

            const { behandlingErEndreMigreringsdato } = utledSimuleringsvurdering(lagSimulering(), behandling);

            expect(behandlingErEndreMigreringsdato).toBe(true);
        });
    });

    describe('behandlingErMigreringMedManuellePosteringer', () => {
        test('skal returnere true når migrering har en periode med manuell postering', () => {
            const behandling = lagBehandling({ type: Behandlingstype.MIGRERING_FRA_INFOTRYGD });
            const simulering = lagSimulering({ perioder: [lagSimuleringPeriode({ manuellPostering: 500 })] });

            const { behandlingErMigreringMedManuellePosteringer } = utledSimuleringsvurdering(simulering, behandling);

            expect(behandlingErMigreringMedManuellePosteringer).toBe(true);
        });

        test('skal returnere false når behandlingen ikke er en migrering', () => {
            const behandling = lagBehandling({ type: Behandlingstype.REVURDERING });
            const simulering = lagSimulering({ perioder: [lagSimuleringPeriode({ manuellPostering: 500 })] });

            const { behandlingErMigreringMedManuellePosteringer } = utledSimuleringsvurdering(simulering, behandling);

            expect(behandlingErMigreringMedManuellePosteringer).toBe(false);
        });
    });

    describe('behandlingErMigreringFraInfotrygdMedKun0Utbetalinger', () => {
        test('skal returnere true når alle andeler er på 0 kroner', () => {
            const behandling = lagBehandling({
                type: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
                personerMedAndelerTilkjentYtelse: [lagPersonMedAndelerTilkjentYtelse({ beløp: 0 })],
            });

            const { behandlingErMigreringFraInfotrygdMedKun0Utbetalinger } = utledSimuleringsvurdering(
                lagSimulering(),
                behandling
            );

            expect(behandlingErMigreringFraInfotrygdMedKun0Utbetalinger).toBe(true);
        });

        test('skal returnere false når minst én andel er ulik 0 kroner', () => {
            const behandling = lagBehandling({
                type: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
                personerMedAndelerTilkjentYtelse: [
                    lagPersonMedAndelerTilkjentYtelse({ beløp: 0 }),
                    lagPersonMedAndelerTilkjentYtelse({ beløp: 1054 }),
                ],
            });

            const { behandlingErMigreringFraInfotrygdMedKun0Utbetalinger } = utledSimuleringsvurdering(
                lagSimulering(),
                behandling
            );

            expect(behandlingErMigreringFraInfotrygdMedKun0Utbetalinger).toBe(false);
        });
    });

    describe('erMigreringFraInfotrygdMedAvvik', () => {
        test('skal returnere true ved migrering med feilutbetaling', () => {
            const behandling = lagBehandling({ type: Behandlingstype.MIGRERING_FRA_INFOTRYGD });
            const simulering = lagSimulering({ feilutbetaling: 1054 });

            const { erMigreringFraInfotrygdMedAvvik } = utledSimuleringsvurdering(simulering, behandling);

            expect(erMigreringFraInfotrygdMedAvvik).toBe(true);
        });

        test('skal returnere true ved migrering med etterbetaling før mars 2023', () => {
            const behandling = lagBehandling({ type: Behandlingstype.MIGRERING_FRA_INFOTRYGD });
            const simulering = lagSimulering({
                perioder: [lagSimuleringPeriode({ fom: '2023-02-01', etterbetaling: 1054 })],
            });

            const { erMigreringFraInfotrygdMedAvvik } = utledSimuleringsvurdering(simulering, behandling);

            expect(erMigreringFraInfotrygdMedAvvik).toBe(true);
        });

        test('skal returnere false når etterbetalingen kun er fra og med mars 2023', () => {
            const behandling = lagBehandling({ type: Behandlingstype.MIGRERING_FRA_INFOTRYGD });
            const simulering = lagSimulering({
                perioder: [lagSimuleringPeriode({ fom: '2023-03-01', etterbetaling: 1054 })],
            });

            const { erMigreringFraInfotrygdMedAvvik } = utledSimuleringsvurdering(simulering, behandling);

            expect(erMigreringFraInfotrygdMedAvvik).toBe(false);
        });

        test('skal returnere false når behandlingen ikke er en migrering', () => {
            const behandling = lagBehandling({ type: Behandlingstype.REVURDERING });
            const simulering = lagSimulering({ feilutbetaling: 1054 });

            const { erMigreringFraInfotrygdMedAvvik } = utledSimuleringsvurdering(simulering, behandling);

            expect(erMigreringFraInfotrygdMedAvvik).toBe(false);
        });
    });

    describe('beløpsgrenser for migrering med avvik', () => {
        test('skal være innenfor beløpsgrensene når avviket er maks 1 krone per barn og totalt under 100 kroner', () => {
            const behandling = lagBehandling({
                type: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
                personer: lagBarn(1),
            });
            const simulering = lagSimulering({
                feilutbetaling: 1,
                perioder: [
                    lagSimuleringPeriode({ fom: '2022-01-01', resultat: 1 }),
                    lagSimuleringPeriode({ fom: '2022-02-01', resultat: -1 }),
                ],
            });

            const {
                behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
                behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
            } = utledSimuleringsvurdering(simulering, behandling);

            expect(behandlingErMigreringMedAvvikInnenforBeløpsgrenser).toBe(true);
            expect(behandlingErMigreringMedAvvikUtenforBeløpsgrenser).toBe(false);
        });

        test('skal være utenfor beløpsgrensene når en periode har større avvik enn antall barn', () => {
            const behandling = lagBehandling({
                type: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
                personer: lagBarn(1),
            });
            const simulering = lagSimulering({
                feilutbetaling: 2,
                perioder: [lagSimuleringPeriode({ fom: '2022-01-01', resultat: 2 })],
            });

            const {
                behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
                behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
            } = utledSimuleringsvurdering(simulering, behandling);

            expect(behandlingErMigreringMedAvvikInnenforBeløpsgrenser).toBe(false);
            expect(behandlingErMigreringMedAvvikUtenforBeløpsgrenser).toBe(true);
        });

        test('skal være utenfor beløpsgrensene når det totale avviket overstiger 100 kroner', () => {
            // 60 barn gjør at avviket per periode er innenfor grensen på 1 krone per barn,
            // slik at testen isolerer grensen for det totale avviket.
            const behandling = lagBehandling({
                type: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
                personer: lagBarn(60),
            });
            const simulering = lagSimulering({
                feilutbetaling: 120,
                perioder: [
                    lagSimuleringPeriode({ fom: '2022-01-01', resultat: 60 }),
                    lagSimuleringPeriode({ fom: '2022-02-01', resultat: 60 }),
                ],
            });

            const {
                behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
                behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
            } = utledSimuleringsvurdering(simulering, behandling);

            expect(behandlingErMigreringMedAvvikInnenforBeløpsgrenser).toBe(false);
            expect(behandlingErMigreringMedAvvikUtenforBeløpsgrenser).toBe(true);
        });

        test('skal ikke ta med perioder fra og med mars 2023 i beløpsgrensene', () => {
            const behandling = lagBehandling({
                type: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
                personer: lagBarn(1),
            });
            const simulering = lagSimulering({
                feilutbetaling: 5000,
                perioder: [
                    lagSimuleringPeriode({ fom: '2022-01-01', resultat: 1 }),
                    lagSimuleringPeriode({ fom: '2023-03-01', resultat: 5000 }),
                ],
            });

            const { behandlingErMigreringMedAvvikInnenforBeløpsgrenser } = utledSimuleringsvurdering(
                simulering,
                behandling
            );

            expect(behandlingErMigreringMedAvvikInnenforBeløpsgrenser).toBe(true);
        });
    });
});
