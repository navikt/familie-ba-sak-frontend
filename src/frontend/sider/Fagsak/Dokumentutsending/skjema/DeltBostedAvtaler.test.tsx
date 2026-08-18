import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/skjema/testutils/renderMedSkjema';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { describe, expect, test } from 'vitest';

import { DeltBostedAvtaler } from './DeltBostedAvtaler';

const merketBarn: IBarnMedOpplysninger = {
    ident: '01011012345',
    navn: 'Barnesen',
    fødselsdato: '2010-01-01',
    merket: true,
    manueltRegistrert: false,
    erFolkeregistrert: true,
};

const ikkeMerketBarn: IBarnMedOpplysninger = {
    ...merketBarn,
    merket: false,
};

describe('DeltBostedAvtaler', () => {
    test('legger automatisk til et tomt datofelt når barnet er merket', () => {
        const { screen } = renderMedSkjema(<DeltBostedAvtaler barn={merketBarn} />, {
            defaultValues: { avtalerOmDeltBostedPerBarn: {} },
        });

        expect(screen.getByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toBeInTheDocument();
    });

    test('viser ingen datofelt eller valideringsfeil når barnet ikke er merket', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<DeltBostedAvtaler barn={ikkeMerketBarn} />, {
            defaultValues: { avtalerOmDeltBostedPerBarn: {} },
        });

        await sendInnSkjema();

        expect(screen.queryByRole('textbox', { name: 'Dato for avtale om delt bosted' })).not.toBeInTheDocument();
        expect(screen.queryByText('Du må fylle inn en gyldig dato for avtale')).not.toBeInTheDocument();
    });

    test('viser feilmelding når merket barn mangler avtaledato ved innsending', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<DeltBostedAvtaler barn={merketBarn} />, {
            defaultValues: { avtalerOmDeltBostedPerBarn: { [merketBarn.ident]: [{ dato: '' }] } },
        });

        await sendInnSkjema();

        expect(await screen.findByText('Du må fylle inn dato for avtale')).toBeInTheDocument();
    });

    test('legger til og fjerner avtaledatoer', async () => {
        const { screen, user } = renderMedSkjema(<DeltBostedAvtaler barn={merketBarn} />, {
            defaultValues: { avtalerOmDeltBostedPerBarn: { [merketBarn.ident]: [{ dato: '' }] } },
        });

        await user.click(screen.getByRole('button', { name: 'Legg til dato for avtale' }));
        expect(screen.getAllByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toHaveLength(2);

        await user.click(screen.getByRole('button', { name: 'Fjern' }));
        expect(screen.getAllByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toHaveLength(1);
    });
});
