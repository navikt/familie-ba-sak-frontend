import { opplysningsdokumenter } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/skjema/testutils/renderMedSkjema';
import { describe, expect, test } from 'vitest';

import { Dokumentvelger } from './Dokumentvelger';

const førsteDokument = opplysningsdokumenter[0].label;

describe('Dokumentvelger', () => {
    test('viser feilmelding når verken dokumenter eller fritekster er valgt', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<Dokumentvelger />, {
            defaultValues: { dokumenter: [], fritekster: [] },
        });

        await sendInnSkjema();

        expect(await screen.findByText('Du må velge minst ett dokument')).toBeInTheDocument();
    });

    test('viser ingen feilmelding når minst én fritekst finnes, selv uten valgte dokumenter', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<Dokumentvelger />, {
            defaultValues: { dokumenter: [], fritekster: [{ tekst: 'En fritekst' }] },
        });

        await sendInnSkjema();

        expect(screen.queryByText('Du må velge minst ett dokument')).not.toBeInTheDocument();
    });

    test('valg av et dokument oppdaterer feltet og fjerner feilmeldingen', async () => {
        const { sendInnSkjema, screen, user, hentForm } = renderMedSkjema(<Dokumentvelger />, {
            defaultValues: { dokumenter: [], fritekster: [] },
        });

        await sendInnSkjema();
        expect(await screen.findByText('Du må velge minst ett dokument')).toBeInTheDocument();

        await user.click(screen.getByRole('combobox', { name: 'Velg dokumenter' }));
        await user.click(await screen.findByRole('option', { name: førsteDokument }));

        expect(hentForm().getValues('dokumenter')).toEqual([førsteDokument]);
        expect(screen.queryByText('Du må velge minst ett dokument')).not.toBeInTheDocument();
    });
});
