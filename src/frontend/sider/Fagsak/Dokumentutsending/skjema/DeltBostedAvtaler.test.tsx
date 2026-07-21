import { DokumentÅrsak } from '@sider/Fagsak/Dokumentutsending/dokumentÅrsakTyper';
import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/testutils/renderMedSkjema';
import type { DokumentutsendingBarn } from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { describe, expect, test } from 'vitest';
import { DeltBostedAvtaler } from './DeltBostedAvtaler';

const merketBarn: DokumentutsendingBarn = {
    ident: '01011012345',
    navn: 'Barnesen',
    fødselsdato: '2010-01-01',
    merket: true,
    manueltRegistrert: false,
    erFolkeregistrert: true,
    avtalerOmDeltBosted: [],
};

const ikkeMerketBarn: DokumentutsendingBarn = {
    ...merketBarn,
    merket: false,
};

describe('DeltBostedAvtaler', () => {
    test('legger automatisk til et tomt datofelt når barnet er merket', () => {
        const { screen } = renderMedSkjema(<DeltBostedAvtaler barn={merketBarn} index={0} />, {
            defaultValues: {
                årsak: DokumentÅrsak.DELT_BOSTED,
                valgteBarn: [{ ...merketBarn, avtalerOmDeltBosted: [{ dato: '' }] }],
            },
        });

        expect(screen.getByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toBeInTheDocument();
    });

    test('viser ingen datofelt eller valideringsfeil når barnet ikke er merket', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<DeltBostedAvtaler barn={ikkeMerketBarn} index={0} />, {
            defaultValues: { årsak: DokumentÅrsak.DELT_BOSTED, valgteBarn: [ikkeMerketBarn] },
        });

        await sendInnSkjema();

        expect(screen.queryByRole('textbox', { name: 'Dato for avtale om delt bosted' })).not.toBeInTheDocument();
        expect(screen.queryByText('Du må fylle inn en gyldig dato for avtale')).not.toBeInTheDocument();
    });

    test('viser feilmelding når merket barn mangler avtaledato ved innsending', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<DeltBostedAvtaler barn={merketBarn} index={0} />, {
            defaultValues: {
                årsak: DokumentÅrsak.DELT_BOSTED,
                valgteBarn: [{ ...merketBarn, avtalerOmDeltBosted: [{ dato: '' }] }],
            },
        });

        await sendInnSkjema();

        expect(await screen.findByText('Du må fylle inn dato for avtale')).toBeInTheDocument();
    });

    test('fjerner feilmelding når avtaledato endres', async () => {
        const { sendInnSkjema, screen, user } = renderMedSkjema(<DeltBostedAvtaler barn={merketBarn} index={0} />, {
            defaultValues: {
                årsak: DokumentÅrsak.DELT_BOSTED,
                valgteBarn: [{ ...merketBarn, avtalerOmDeltBosted: [{ dato: '' }] }],
            },
        });

        await sendInnSkjema();
        expect(await screen.findByText('Du må fylle inn dato for avtale')).toBeInTheDocument();

        await user.click(screen.getByRole('textbox', { name: 'Dato for avtale om delt bosted' }));
        await user.keyboard('01.01.2020');

        expect(screen.queryByText('Du må fylle inn dato for avtale')).not.toBeInTheDocument();
    });

    test('legger til og fjerner avtaledatoer', async () => {
        const { screen, user } = renderMedSkjema(<DeltBostedAvtaler barn={merketBarn} index={0} />, {
            defaultValues: {
                årsak: DokumentÅrsak.DELT_BOSTED,
                valgteBarn: [{ ...merketBarn, avtalerOmDeltBosted: [{ dato: '' }] }],
            },
        });

        await user.click(screen.getByRole('button', { name: 'Legg til dato for avtale' }));
        expect(screen.getAllByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toHaveLength(2);

        await user.click(screen.getByRole('button', { name: 'Fjern' }));
        expect(screen.getAllByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toHaveLength(1);
    });
});
