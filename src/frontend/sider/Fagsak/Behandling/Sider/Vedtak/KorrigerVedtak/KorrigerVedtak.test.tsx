import { queryKeys } from '@hooks/keys/queryKeys';
import { ActionMenu, Button } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { VedtakContainer } from '@sider/Fagsak/Behandling/Sider/Vedtak/VedtakContainer';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { QueryClient } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagKorrigertVedtak } from '@testutils/testdata/korrigertVedtakTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IRestKorrigertVedtak } from '@typer/vedtak';
import { delay, HttpResponse, http } from 'msw';
import { type PropsWithChildren, useState } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { KorrigertVedtakAdvarsel } from './KorrigertVedtakAdvarsel';
import { useKorrigertVedtakContext } from './KorrigertVedtakContext';
import { KorrigerVedtak } from './KorrigerVedtak';
import { KorrigerVedtakModal } from './KorrigerVedtakModal';

const KORRIGERT_VEDTAK_URL = '/familie-ba-sak/api/korrigertvedtak/behandling/:behandlingId';

const behandlingId = 1;

const korrigertVedtak = lagKorrigertVedtak({ vedtaksdato: '2024-02-01', begrunnelse: 'Feil i tidligere vedtak' });

function mockKorrigertVedtak(korrigertVedtak: IRestKorrigertVedtak | null) {
    server.use(http.get(KORRIGERT_VEDTAK_URL, () => HttpResponse.json(byggSuksessRessurs(korrigertVedtak))));
}

interface Props extends PropsWithChildren {
    queryClient: QueryClient;
}

function Wrapper({ queryClient, children }: Props) {
    return (
        <TestProviders queryClient={queryClient}>
            <FagsakProvider fagsak={lagFagsak()}>
                <BehandlingProvider behandling={lagBehandling({ behandlingId })}>{children}</BehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

function Vedtaksside() {
    const { korrigertVedtak } = useKorrigertVedtakContext();
    const [visModal, settVisModal] = useState(false);
    return (
        <>
            {korrigertVedtak && <KorrigertVedtakAdvarsel />}
            {visModal && <KorrigerVedtakModal lukkModal={() => settVisModal(false)} />}
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button>Vedtaksmeny</Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <KorrigerVedtak åpneModal={() => settVisModal(true)} />
                </ActionMenu.Content>
            </ActionMenu>
        </>
    );
}

function renderVedtaksside() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    queryClient.setQueryData(queryKeys.historikkinnslag(behandlingId), []);
    const result = render(
        <VedtakContainer>
            <Vedtaksside />
        </VedtakContainer>,
        {
            wrapper: ({ children }) => <Wrapper queryClient={queryClient}>{children}</Wrapper>,
        }
    );
    const erHistorikkinnslagInvalidert = () =>
        queryClient.getQueryState(queryKeys.historikkinnslag(behandlingId))?.isInvalidated;
    return { ...result, erHistorikkinnslagInvalidert };
}

describe('KorrigerVedtak', () => {
    test('skal vise korrigeringen som er hentet fra endepunktet for korrigert vedtak', async () => {
        mockKorrigertVedtak(korrigertVedtak);
        const { screen, user } = renderVedtaksside();

        await user.click(await screen.findByRole('button', { name: 'Vedtaksmeny' }));
        await user.click(screen.getByRole('menuitem', { name: 'Vis korrigert vedtak' }));

        expect(screen.getByRole('textbox', { name: 'Vedtaksdato' })).toHaveValue('01.02.2024');
        expect(screen.getByRole('textbox', { name: /Begrunnelse/ })).toHaveValue('Feil i tidligere vedtak');
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeInTheDocument();
    });

    test('skal vise feilmelding når korrigert vedtak ikke kan hentes', async () => {
        server.use(http.get(KORRIGERT_VEDTAK_URL, () => HttpResponse.error()));

        const { screen } = renderVedtaksside();

        expect(await screen.findByText('Klarte ikke å hente inn vedtak.')).toBeInTheDocument();
    });

    test('skal vise korrigeringen fra svaret når en korrigering lagres', async () => {
        mockKorrigertVedtak(null);
        const korrigerForespørsel = vi.fn();
        server.use(
            http.post(KORRIGERT_VEDTAK_URL, async ({ params, request }) => {
                korrigerForespørsel({ params, body: await request.json() });
                return HttpResponse.json(byggSuksessRessurs(korrigertVedtak));
            })
        );
        const { screen, user, erHistorikkinnslagInvalidert } = renderVedtaksside();

        await user.click(await screen.findByRole('button', { name: 'Vedtaksmeny' }));
        await user.click(screen.getByRole('menuitem', { name: 'Korriger vedtak' }));
        await user.type(screen.getByRole('textbox', { name: 'Vedtaksdato' }), '01.02.2024');
        await user.type(screen.getByRole('textbox', { name: /Begrunnelse/ }), 'Feil i tidligere vedtak');
        await user.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(await screen.findByText('Vedtaket er korrigert etter § 35')).toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Vedtaksdato' })).not.toBeInTheDocument();
        expect(korrigerForespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '1' },
            body: { vedtaksdato: '2024-02-01', begrunnelse: 'Feil i tidligere vedtak' },
        });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });

    test('skal skjule korrigeringen når den fjernes', async () => {
        mockKorrigertVedtak(korrigertVedtak);
        const angreForespørsel = vi.fn();
        server.use(
            http.patch(KORRIGERT_VEDTAK_URL, ({ params }) => {
                angreForespørsel(params);
                return HttpResponse.json(byggSuksessRessurs(korrigertVedtak));
            })
        );
        const { screen, user, erHistorikkinnslagInvalidert } = renderVedtaksside();

        await user.click(await screen.findByRole('button', { name: 'Vedtaksmeny' }));
        await user.click(screen.getByRole('menuitem', { name: 'Vis korrigert vedtak' }));
        await user.click(screen.getByRole('button', { name: 'Fjern korrigering' }));

        await waitFor(() => expect(screen.queryByText('Vedtaket er korrigert etter § 35')).not.toBeInTheDocument());
        expect(screen.queryByRole('textbox', { name: 'Vedtaksdato' })).not.toBeInTheDocument();
        expect(angreForespørsel).toHaveBeenCalledExactlyOnceWith({ behandlingId: '1' });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });

    test('skal ikke kunne lagre eller fjerne korrigeringen mens korrigeringen lagres', async () => {
        mockKorrigertVedtak(korrigertVedtak);
        server.use(
            http.post(KORRIGERT_VEDTAK_URL, async () => {
                await delay('infinite');
            })
        );
        const { screen, user } = renderVedtaksside();

        await user.click(await screen.findByRole('button', { name: 'Vedtaksmeny' }));
        await user.click(screen.getByRole('menuitem', { name: 'Vis korrigert vedtak' }));
        const oppdaterKnapp = screen.getByRole('button', { name: 'Oppdater' });
        const fjernKnapp = screen.getByRole('button', { name: 'Fjern korrigering' });
        await user.click(oppdaterKnapp);

        await waitFor(() => expect(oppdaterKnapp).toBeDisabled());
        expect(fjernKnapp).toBeDisabled();
    });
});
