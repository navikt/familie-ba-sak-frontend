import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { BrevmottakereFagsakProvider } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { BrukerProvider } from '@sider/Fagsak/BrukerContext';
import { waitFor } from '@testing-library/react';
import { lagBrevmottakerFagsak } from '@testutils/testdata/brevmottakerTestdata';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { type BrevmottakerFagsak, Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerDialogProvider } from '../Felles/BrevmottakerDialogContext';
import { BrevmottakerDialogFagsak } from './BrevmottakerDialogFagsak';

vi.mock('@hooks/useErLesevisningFagsak');

const UTENLANDSK_ADRESSE_INFO = 'Ved utenlandsk adresse skal postnummer og poststed legges i adresselinjene.';

async function renderDialog(brevmottakere: BrevmottakerFagsak[] = []) {
    function Wrapper({ children }: PropsWithChildren) {
        return (
            <TestProviders>
                <BrukerProvider bruker={lagPerson({ navn: 'Bruker Brukersen' })}>
                    <BrevmottakereFagsakProvider initielleBrevmottakere={brevmottakere}>
                        <BrevmottakerDialogProvider initialErÅpen={true}>
                            {({ erDialogÅpen }) => erDialogÅpen && children}
                        </BrevmottakerDialogProvider>
                    </BrevmottakereFagsakProvider>
                </BrukerProvider>
            </TestProviders>
        );
    }
    const resultat = render(<BrevmottakerDialogFagsak />, { wrapper: Wrapper });
    // Dialogen flytter fokus til seg selv i en requestAnimationFrame etter åpning. Venter på dette,
    // slik at fokus ikke blir flyttet bort fra feltet testen skriver i.
    await waitFor(() => expect(resultat.screen.getByRole('dialog')).toHaveFocus());
    return resultat;
}

function hentLukkKnappIFooter(screen: Awaited<ReturnType<typeof renderDialog>>['screen']) {
    // Dialog.Header har også en lukkeknapp med navnet "Lukk", footer-knappen kommer sist i DOM-en
    return screen.getAllByRole('button', { name: 'Lukk' }).at(-1) as HTMLElement;
}

describe('BrevmottakerDialogFagsak', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useErLesevisningFagsak).mockReturnValue(false);
    });

    test('skal vise skjemaet direkte og deaktivere Lukk når det ikke finnes brevmottakere', async () => {
        const { screen } = await renderDialog();

        expect(screen.getByRole('dialog', { name: 'Brevmottaker' })).toBeInTheDocument();
        expect(screen.getByText('Ingen brevmottakere er registrert.')).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Mottaker' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeDisabled();
    });

    test('skal ikke kunne velge dødsbo på fagsak', async () => {
        const { screen } = await renderDialog();

        const valg = screen.getAllByRole('option').map(option => option.textContent);
        expect(valg).toEqual(['-- Velg mottaker --', 'Bruker med utenlandsk adresse', 'Fullmektig', 'Verge']);
    });

    test('skal vise registrerte brevmottakere uten skjema når det finnes brevmottakere', async () => {
        const { screen } = await renderDialog([
            lagBrevmottakerFagsak({ type: Brevmottakertype.FULLMEKTIG, navn: 'Fia Fullmektig' }),
        ]);

        expect(screen.getByRole('heading', { name: 'Fullmektig' })).toBeInTheDocument();
        expect(screen.getByText('Fia Fullmektig')).toBeInTheDocument();
        expect(screen.queryByRole('combobox', { name: 'Mottaker' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Legg til ny mottaker' })).toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeEnabled();
    });

    test('skal vise og skjule skjemaet med Legg til ny mottaker og Avbryt', async () => {
        const { screen, user } = await renderDialog([lagBrevmottakerFagsak({ type: Brevmottakertype.FULLMEKTIG })]);

        await user.click(screen.getByRole('button', { name: 'Legg til ny mottaker' }));

        expect(screen.getByRole('combobox', { name: 'Mottaker' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeDisabled();

        await user.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(screen.queryByRole('combobox', { name: 'Mottaker' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Legg til ny mottaker' })).toBeInTheDocument();
    });

    test('skal kun kunne velge brevmottakertyper som fortsatt er tilgjengelige', async () => {
        const { screen, user } = await renderDialog([lagBrevmottakerFagsak({ type: Brevmottakertype.VERGE })]);

        await user.click(screen.getByRole('button', { name: 'Legg til ny mottaker' }));

        const valg = screen.getAllByRole('option').map(option => option.textContent);
        expect(valg).toEqual(['-- Velg mottaker --', 'Bruker med utenlandsk adresse']);
    });

    test('skal ikke kunne legge til flere enn to brevmottakere', async () => {
        const { screen } = await renderDialog([
            lagBrevmottakerFagsak({ type: Brevmottakertype.FULLMEKTIG }),
            lagBrevmottakerFagsak({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, landkode: 'SE' }),
        ]);

        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
    });

    test('skal verken vise skjema eller Legg til ny mottaker i lesevisning', async () => {
        vi.mocked(useErLesevisningFagsak).mockReturnValue(true);

        const { screen } = await renderDialog();

        expect(screen.queryByRole('combobox', { name: 'Mottaker' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeEnabled();
    });

    test('skal vise postnummer og poststed når Norge er valgt', async () => {
        const { screen, user } = await renderDialog();

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Norge{Enter}');

        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Poststed' })).toBeInTheDocument();
        expect(screen.queryByText(UTENLANDSK_ADRESSE_INFO)).not.toBeInTheDocument();
    });

    test('skal vise informasjon om utenlandsk adresse og skjule postnummer og poststed når et annet land er valgt', async () => {
        const { screen, user } = await renderDialog();

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Sverige{Enter}');

        expect(screen.getByText(UTENLANDSK_ADRESSE_INFO)).toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Postnummer' })).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Poststed' })).not.toBeInTheDocument();
    });

    test('skal vise valideringsfeil og ikke legge til brevmottaker når skjemaet er tomt', async () => {
        const { screen, user } = await renderDialog();

        await user.click(screen.getByRole('button', { name: 'Legg til brevmottaker' }));

        expect(await screen.findByText('Mottaker må velges.')).toBeInTheDocument();
        expect(screen.getByText('Navn er påkrevd.')).toBeInTheDocument();
        expect(screen.getByText('Land er påkrevd.')).toBeInTheDocument();
        expect(screen.getByText('Adresselinje 1 er påkrevd.')).toBeInTheDocument();
        expect(screen.getByText('Ingen brevmottakere er registrert.')).toBeInTheDocument();
    });

    test('skal legge til brevmottakeren i listen og skjule skjemaet', async () => {
        const { screen, user } = await renderDialog();

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Verge');
        await user.type(screen.getByRole('textbox', { name: 'Navn' }), 'Vera Verge');
        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Norge{Enter}');
        await user.type(screen.getByRole('textbox', { name: 'Adresselinje 1' }), 'Gate 1');
        await user.type(screen.getByRole('textbox', { name: 'Postnummer' }), '0010');
        await user.type(screen.getByRole('textbox', { name: 'Poststed' }), 'Oslo');
        await user.click(screen.getByRole('button', { name: 'Legg til brevmottaker' }));

        await waitFor(() => expect(screen.queryByRole('combobox', { name: 'Mottaker' })).not.toBeInTheDocument());
        expect(screen.getByRole('heading', { name: 'Verge' })).toBeInTheDocument();
        expect(screen.getByText('Vera Verge')).toBeInTheDocument();
        expect(screen.queryByText('Ingen brevmottakere er registrert.')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Legg til ny mottaker' })).toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeEnabled();
    });

    test('skal fjerne brevmottakeren fra listen når man klikker på Fjern', async () => {
        const { screen, user } = await renderDialog([
            lagBrevmottakerFagsak({ type: Brevmottakertype.VERGE, navn: 'Vera Verge' }),
        ]);

        await user.click(screen.getByRole('button', { name: 'Fjern verge' }));

        expect(screen.queryByText('Vera Verge')).not.toBeInTheDocument();
        expect(screen.getByText('Ingen brevmottakere er registrert.')).toBeInTheDocument();
    });

    test('skal lukke dialogen når man klikker på Lukk', async () => {
        const { screen, user } = await renderDialog([lagBrevmottakerFagsak()]);

        await user.click(hentLukkKnappIFooter(screen));

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });
});
