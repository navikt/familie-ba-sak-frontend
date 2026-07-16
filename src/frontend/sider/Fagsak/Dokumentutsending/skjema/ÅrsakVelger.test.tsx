import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/skjema/testutils/renderMedSkjema';
import { skruPåAlleToggles } from '@testutils/mocks/handlers/featureToggleHandlers';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { FagsakType } from '@typer/fagsak';
import { FeatureToggle } from '@typer/featureToggles';
import { describe, expect, test } from 'vitest';

import { dokumentÅrsak, DokumentÅrsakInstitusjon, DokumentÅrsakPerson } from '../dokumentÅrsakTyper';
import { ÅrsakVelger } from './ÅrsakVelger';

describe('ÅrsakVelger', () => {
    test('viser feilmelding når skjemaet sendes inn uten valgt årsak', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<ÅrsakVelger />);

        await sendInnSkjema();

        expect(await screen.findByText('Du må velge en årsak')).toBeInTheDocument();
    });

    test('feilmeldingen forsvinner når en årsak velges', async () => {
        const { sendInnSkjema, screen, user } = renderMedSkjema(<ÅrsakVelger />);

        await sendInnSkjema();
        expect(await screen.findByText('Du må velge en årsak')).toBeInTheDocument();

        await user.selectOptions(screen.getByRole('combobox', { name: 'Velg årsak' }), [
            dokumentÅrsak[DokumentÅrsakPerson.KAN_SØKE],
        ]);

        expect(screen.queryByText('Du må velge en årsak')).not.toBeInTheDocument();
    });

    test('viser årsaker for institusjon når fagsaken er en institusjonsfagsak', () => {
        const { screen } = renderMedSkjema(<ÅrsakVelger />, {
            fagsak: lagFagsak({ fagsakType: FagsakType.INSTITUSJON }),
        });

        expect(
            screen.getByRole('option', {
                name: dokumentÅrsak[DokumentÅrsakInstitusjon.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON],
            })
        ).toBeInTheDocument();
        expect(
            screen.queryByRole('option', { name: dokumentÅrsak[DokumentÅrsakPerson.KAN_SØKE] })
        ).not.toBeInTheDocument();
    });

    test('viser årsaker for person når fagsaken ikke er en institusjonsfagsak', () => {
        const { screen } = renderMedSkjema(<ÅrsakVelger />, {
            fagsak: lagFagsak({ fagsakType: FagsakType.NORMAL }),
        });

        expect(screen.getByRole('option', { name: dokumentÅrsak[DokumentÅrsakPerson.KAN_SØKE] })).toBeInTheDocument();
    });

    test('viser ikke selvstendig rett-alternativet når feature-toggle er avslått', () => {
        const { screen } = renderMedSkjema(<ÅrsakVelger />, {
            featureToggles: { ...skruPåAlleToggles(), [FeatureToggle.selvstendigRettInfobrev]: false },
        });

        expect(
            screen.queryByRole('option', {
                name: dokumentÅrsak[
                    DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD
                ],
            })
        ).not.toBeInTheDocument();
    });

    test('viser selvstendig rett-alternativet når feature-toggle er påslått', () => {
        const { screen } = renderMedSkjema(<ÅrsakVelger />, {
            featureToggles: skruPåAlleToggles(),
        });

        expect(
            screen.getByRole('option', {
                name: dokumentÅrsak[
                    DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD
                ],
            })
        ).toBeInTheDocument();
    });
});
