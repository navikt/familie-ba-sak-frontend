import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/skjema/testutils/renderMedSkjema';
import { describe, expect, test } from 'vitest';

import { KanSøkeFritekst } from './KanSøkeFritekst';

describe('KanSøkeFritekst', () => {
    test('viser ingen fritekstfelt når listen er tom', () => {
        const { screen } = renderMedSkjema(<KanSøkeFritekst erMaksAntallKulepunkter={false} />, {
            defaultValues: { fritekster: [] },
        });

        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    test('legg til fritekst legger til et nytt felt', async () => {
        const { screen, user } = renderMedSkjema(<KanSøkeFritekst erMaksAntallKulepunkter={false} />, {
            defaultValues: { fritekster: [] },
        });

        await user.click(screen.getByRole('button', { name: 'Legg til fritekst' }));

        expect(screen.getAllByRole('textbox')).toHaveLength(1);
    });

    test('fjern-knappen fjerner et fritekstfelt', async () => {
        const { screen, user } = renderMedSkjema(<KanSøkeFritekst erMaksAntallKulepunkter={false} />, {
            defaultValues: { fritekster: [{ tekst: 'Første' }, { tekst: 'Andre' }] },
        });

        expect(screen.getAllByRole('textbox')).toHaveLength(2);

        await user.click(screen.getAllByRole('button', { name: 'Fjern fritekst' })[0]);

        expect(screen.getAllByRole('textbox')).toHaveLength(1);
    });

    test('viser feilmelding når skjemaet sendes inn med tom fritekst', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<KanSøkeFritekst erMaksAntallKulepunkter={false} />, {
            defaultValues: { fritekster: [{ tekst: '' }] },
        });

        await sendInnSkjema();

        expect(
            await screen.findByText('Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.')
        ).toBeInTheDocument();
    });

    test('skjuler legg til-knappen når maks antall kulepunkter er nådd', () => {
        const { screen } = renderMedSkjema(<KanSøkeFritekst erMaksAntallKulepunkter={true} />, {
            defaultValues: { fritekster: [] },
        });

        expect(screen.queryByRole('button', { name: 'Legg til fritekst' })).not.toBeInTheDocument();
    });
});
