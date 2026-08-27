import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/testutils/renderMedSkjema';
import {
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { skruPåAlleToggles } from '@testutils/mocks/handlers/featureToggleHandlers';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { FagsakType } from '@typer/fagsak';
import { FeatureToggle } from '@typer/featureToggles';
import { useFormContext } from 'react-hook-form';
import { describe, expect, test } from 'vitest';
import { DokumentÅrsak, dokumentÅrsak } from '../dokumentÅrsakTyper';
import { ÅrsakVelger } from './ÅrsakVelger';

function FritekstAvsnittVisning() {
    const { watch } = useFormContext<DokumentutsendingFormValues>();
    return <div data-testid="fritekstAvsnitt">{watch(DokumentutsendingFeltnavn.FRITEKST_AVSNITT)}</div>;
}

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
            dokumentÅrsak[DokumentÅrsak.KAN_SØKE],
        ]);

        expect(screen.queryByText('Du må velge en årsak')).not.toBeInTheDocument();
    });

    test('viser årsaker for institusjon når fagsaken er en institusjonsfagsak', () => {
        const { screen } = renderMedSkjema(<ÅrsakVelger />, {
            fagsak: lagFagsak({ fagsakType: FagsakType.INSTITUSJON }),
        });

        expect(
            screen.getByRole('option', {
                name: dokumentÅrsak[DokumentÅrsak.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON],
            })
        ).toBeInTheDocument();
        expect(screen.queryByRole('option', { name: dokumentÅrsak[DokumentÅrsak.KAN_SØKE] })).not.toBeInTheDocument();
    });

    test('viser årsaker for person når fagsaken ikke er en institusjonsfagsak', () => {
        const { screen } = renderMedSkjema(<ÅrsakVelger />, {
            fagsak: lagFagsak({ fagsakType: FagsakType.NORMAL }),
        });

        expect(screen.getByRole('option', { name: dokumentÅrsak[DokumentÅrsak.KAN_SØKE] })).toBeInTheDocument();
    });

    test('viser ikke selvstendig rett-alternativet når feature-toggle er avslått', () => {
        const { screen } = renderMedSkjema(<ÅrsakVelger />, {
            featureToggles: { ...skruPåAlleToggles(), [FeatureToggle.selvstendigRettInfobrev]: false },
        });

        expect(
            screen.queryByRole('option', {
                name: dokumentÅrsak[
                    DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD
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
                    DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD
                ],
            })
        ).toBeInTheDocument();
    });

    test('endring av årsak nullstiller resten av skjemaet, men beholder valgt årsak', async () => {
        const { screen, user } = renderMedSkjema(
            <>
                <ÅrsakVelger />
                <FritekstAvsnittVisning />
            </>,
            { defaultValues: { fritekstAvsnitt: 'Noe tekst' } }
        );

        expect(screen.getByTestId('fritekstAvsnitt')).toHaveTextContent('Noe tekst');

        await user.selectOptions(screen.getByRole('combobox', { name: 'Velg årsak' }), [
            dokumentÅrsak[DokumentÅrsak.KAN_SØKE],
        ]);

        expect(screen.getByRole('combobox', { name: 'Velg årsak' })).toHaveValue(DokumentÅrsak.KAN_SØKE);
        expect(screen.getByTestId('fritekstAvsnitt')).toHaveTextContent('');
    });
});
