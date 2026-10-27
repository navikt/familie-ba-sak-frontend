import { useErLesevisning } from '@hooks/useErLesevisning';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { BrukerProvider } from '@sider/Fagsak/BrukerContext';
import { waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { type BrevmottakerBehandling, Brevmottakertype } from '@typer/brevmottaker';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerDialogProvider } from '../Felles/BrevmottakerDialogContext';
import { BrevmottakerDialogBehandling } from './BrevmottakerDialogBehandling';

vi.mock('@hooks/useErLesevisning');
vi.mock('@sider/Fagsak/Behandling/context/BehandlingContext');

const OPPRETT_BREVMOTTAKER_URL = '/familie-ba-sak/api/brevmottaker/:behandlingId';
const UTENLANDSK_ADRESSE_INFO = 'Ved utenlandsk adresse skal postnummer og poststed legges i adresselinjene.';
const settÅpenBehandling = vi.fn();

function Wrapper({ children }: PropsWithChildren) {
    return (
        <TestProviders>
            <BrukerProvider bruker={lagPerson({ navn: 'Bruker Brukersen' })}>
                <BrevmottakerDialogProvider initialErÅpen={true}>
                    {({ erDialogÅpen }) => erDialogÅpen && children}
                </BrevmottakerDialogProvider>
            </BrukerProvider>
        </TestProviders>
    );
}

function renderDialog(brevmottakere: BrevmottakerBehandling[] = []) {
    vi.mocked(useBehandlingContext).mockReturnValue({
        behandling: lagBehandling({ behandlingId: 42, brevmottakere }),
        settÅpenBehandling,
    });
    return render(<BrevmottakerDialogBehandling />, { wrapper: Wrapper });
}

describe('BrevmottakerDialogBehandling', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useErLesevisning).mockReturnValue(false);
    });

    function hentLukkKnappIFooter(screen: ReturnType<typeof renderDialog>['screen']) {
        // Dialog.Header har også en lukkeknapp med navnet "Lukk", footer-knappen kommer sist i DOM-en
        return screen.getAllByRole('button', { name: 'Lukk' }).at(-1) as HTMLElement;
    }

    test('skal vise skjemaet direkte og deaktivere Lukk når det ikke finnes brevmottakere', () => {
        const { screen } = renderDialog();

        expect(screen.getByRole('dialog', { name: 'Brevmottaker' })).toBeInTheDocument();
        expect(screen.getByText('Ingen brevmottakere er registrert.')).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Mottaker' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeDisabled();
    });

    test('skal kunne velge alle brevmottakertyper for behandling når det ikke finnes brevmottakere', () => {
        const { screen } = renderDialog();

        const valg = screen.getAllByRole('option').map(option => option.textContent);
        expect(valg).toEqual(['-- Velg mottaker --', 'Bruker med utenlandsk adresse', 'Fullmektig', 'Verge', 'Dødsbo']);
    });

    test('skal vise registrerte brevmottakere uten skjema når det finnes brevmottakere', () => {
        const { screen } = renderDialog([
            lagBrevmottakerBehandling({ type: Brevmottakertype.FULLMEKTIG, navn: 'Fia Fullmektig' }),
        ]);

        expect(screen.getByRole('heading', { name: 'Fullmektig' })).toBeInTheDocument();
        expect(screen.getByText('Fia Fullmektig')).toBeInTheDocument();
        expect(screen.queryByRole('combobox', { name: 'Mottaker' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Legg til ny mottaker' })).toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeEnabled();
    });

    test('skal vise og skjule skjemaet med Legg til ny mottaker og Avbryt', async () => {
        const { screen, user } = renderDialog([lagBrevmottakerBehandling({ type: Brevmottakertype.FULLMEKTIG })]);

        await user.click(screen.getByRole('button', { name: 'Legg til ny mottaker' }));

        expect(screen.getByRole('combobox', { name: 'Mottaker' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeDisabled();

        await user.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(screen.queryByRole('combobox', { name: 'Mottaker' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Legg til ny mottaker' })).toBeInTheDocument();
    });

    test('skal kun kunne velge brevmottakertyper som fortsatt er tilgjengelige', async () => {
        const { screen, user } = renderDialog([lagBrevmottakerBehandling({ type: Brevmottakertype.FULLMEKTIG })]);

        await user.click(screen.getByRole('button', { name: 'Legg til ny mottaker' }));

        const valg = screen.getAllByRole('option').map(option => option.textContent);
        expect(valg).toEqual(['-- Velg mottaker --', 'Bruker med utenlandsk adresse']);
    });

    test('skal ikke kunne legge til flere brevmottakere når dødsbo er registrert', () => {
        const { screen } = renderDialog([lagBrevmottakerBehandling({ type: Brevmottakertype.DØDSBO })]);

        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
    });

    test('skal ikke kunne legge til flere enn to brevmottakere', () => {
        const { screen } = renderDialog([
            lagBrevmottakerBehandling({ id: 1, type: Brevmottakertype.FULLMEKTIG }),
            lagBrevmottakerBehandling({ id: 2, type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, landkode: 'SE' }),
        ]);

        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
    });

    test('skal verken vise skjema eller Legg til ny mottaker i lesevisning', () => {
        vi.mocked(useErLesevisning).mockReturnValue(true);

        const { screen } = renderDialog();

        expect(screen.queryByRole('combobox', { name: 'Mottaker' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Legg til ny mottaker' })).not.toBeInTheDocument();
        expect(hentLukkKnappIFooter(screen)).toBeEnabled();
    });

    test('skal vise postnummer og poststed når Norge er valgt', async () => {
        const { screen, user } = renderDialog();

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Norge{Enter}');

        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Poststed' })).toBeInTheDocument();
        expect(screen.queryByText(UTENLANDSK_ADRESSE_INFO)).not.toBeInTheDocument();
    });

    test('skal vise informasjon om utenlandsk adresse og skjule postnummer og poststed når et annet land er valgt', async () => {
        const { screen, user } = renderDialog();

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Sverige{Enter}');

        expect(screen.getByText(UTENLANDSK_ADRESSE_INFO)).toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Postnummer' })).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Poststed' })).not.toBeInTheDocument();
    });

    test('skal vise valideringsfeil og ikke lagre når skjemaet er tomt', async () => {
        const { screen, user } = renderDialog();

        await user.click(screen.getByRole('button', { name: 'Legg til brevmottaker' }));

        expect(await screen.findByText('Mottaker må velges.')).toBeInTheDocument();
        expect(screen.getByText('Navn er påkrevd.')).toBeInTheDocument();
        expect(screen.getByText('Land er påkrevd.')).toBeInTheDocument();
        expect(screen.getByText('Adresselinje 1 er påkrevd.')).toBeInTheDocument();
        expect(settÅpenBehandling).not.toHaveBeenCalled();
    });

    test('skal lagre brevmottakeren og skjule skjemaet når lagring er vellykket', async () => {
        const forespørsel = vi.fn();
        server.use(
            http.post(OPPRETT_BREVMOTTAKER_URL, async ({ params, request }) => {
                forespørsel({ params, body: await request.json() });
                return HttpResponse.json(byggSuksessRessurs(lagBehandling({ behandlingId: 42 })));
            })
        );

        const { screen, user } = renderDialog();

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Verge');
        await user.type(screen.getByRole('textbox', { name: 'Navn' }), 'Vera Verge');
        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Norge{Enter}');
        await user.type(screen.getByRole('textbox', { name: 'Adresselinje 1' }), 'Gate 1');
        await user.type(screen.getByRole('textbox', { name: 'Postnummer' }), '0010');
        await user.type(screen.getByRole('textbox', { name: 'Poststed' }), 'Oslo');
        await user.click(screen.getByRole('button', { name: 'Legg til brevmottaker' }));

        await waitFor(() => expect(screen.queryByRole('combobox', { name: 'Mottaker' })).not.toBeInTheDocument());
        expect(forespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '42' },
            body: {
                type: Brevmottakertype.VERGE,
                navn: 'Vera Verge',
                adresselinje1: 'Gate 1',
                postnummer: '0010',
                poststed: 'Oslo',
                landkode: 'NO',
            },
        });
        expect(settÅpenBehandling).toHaveBeenCalledOnce();
        expect(hentLukkKnappIFooter(screen)).toBeEnabled();
    });

    test('skal vise feilmelding og beholde skjemaet når lagring feiler', async () => {
        server.use(
            http.post(OPPRETT_BREVMOTTAKER_URL, () =>
                HttpResponse.json({
                    status: 'FUNKSJONELL_FEIL',
                    melding: 'Kunne ikke lagre brevmottaker',
                    frontendFeilmelding: 'Brevmottakeren kunne ikke lagres.',
                })
            )
        );

        const { screen, user } = renderDialog();

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Verge');
        await user.type(screen.getByRole('textbox', { name: 'Navn' }), 'Vera Verge');
        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Sverige{Enter}');
        await user.type(screen.getByRole('textbox', { name: 'Adresselinje 1' }), 'Gate 1');
        await user.click(screen.getByRole('button', { name: 'Legg til brevmottaker' }));

        expect(await screen.findByText('Brevmottakeren kunne ikke lagres.')).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue('Vera Verge');
        expect(settÅpenBehandling).not.toHaveBeenCalled();
    });

    test('skal lukke dialogen når man klikker på Lukk', async () => {
        const { screen, user } = renderDialog([lagBrevmottakerBehandling()]);

        await user.click(hentLukkKnappIFooter(screen));

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });
});
