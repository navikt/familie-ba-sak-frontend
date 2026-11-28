import { queryKeys } from '@hooks/keys/queryKeys';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/BehandlingContext';
import { VedtakContainer } from '@sider/Fagsak/Behandling/Sider/Vedtak/VedtakContainer';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { QueryClient } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagTilbakekrevingsvedtakMotregning } from '@testutils/testdata/tilbakekrevingsvedtakMotregningTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { TilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { TilbakekrevingsvedtakMotregning } from './TilbakekrevingsvedtakMotregning';
import { useTilbakekrevingsvedtakMotregningContext } from './TilbakekrevingsvedtakMotregningContext';

const TILBAKEKREVINGSVEDTAK_MOTREGNING_URL =
    '/familie-ba-sak/api/behandling/:behandlingId/tilbakekrevingsvedtak-motregning';

const behandlingId = 1;

const tilbakekrevingsvedtakMotregning = lagTilbakekrevingsvedtakMotregning({
    samtykke: true,
    varselDato: '2026-01-15',
    årsakTilFeilutbetaling: 'Lagret årsak',
    vurderingAvSkyld: 'Lagret vurdering',
});

function mockTilbakekrevingsvedtakMotregning(
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO | null
) {
    server.use(
        http.get(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () =>
            HttpResponse.json(byggSuksessRessurs(tilbakekrevingsvedtakMotregning))
        )
    );
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
    const { tilbakekrevingsvedtakMotregning } = useTilbakekrevingsvedtakMotregningContext();
    return tilbakekrevingsvedtakMotregning && <TilbakekrevingsvedtakMotregning />;
}

function renderVedtaksside() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const result = render(
        <VedtakContainer>
            <Vedtaksside />
        </VedtakContainer>,
        {
            wrapper: ({ children }) => <Wrapper queryClient={queryClient}>{children}</Wrapper>,
        }
    );
    return { ...result, queryClient };
}

describe('TilbakekrevingsvedtakMotregning', () => {
    test('skal vise tekstene som er hentet fra endepunktet for motregning', async () => {
        mockTilbakekrevingsvedtakMotregning(tilbakekrevingsvedtakMotregning);
        const { screen, user } = renderVedtaksside();

        await user.click(await screen.findByRole('button', { name: 'Vis mer' }));

        expect(screen.getByRole('textbox', { name: /^Årsak til feilutbetaling/ })).toHaveValue('Lagret årsak');
        expect(screen.getByRole('textbox', { name: /^Vurdering av skyld/ })).toHaveValue('Lagret vurdering');
    });

    test('skal vise feilmelding når motregningen ikke kan hentes', async () => {
        server.use(http.get(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () => HttpResponse.error()));

        const { screen } = renderVedtaksside();

        expect(await screen.findByText('Klarte ikke å hente inn vedtak.')).toBeInTheDocument();
    });

    test('skal legge motregningen fra svaret i cachen når tekstene lagres', async () => {
        mockTilbakekrevingsvedtakMotregning(tilbakekrevingsvedtakMotregning);
        const lagret = lagTilbakekrevingsvedtakMotregning({
            ...tilbakekrevingsvedtakMotregning,
            vurderingAvSkyld: 'Vurdering fra svaret',
        });
        const oppdaterForespørsel = vi.fn();
        server.use(
            http.patch(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, async ({ params, request }) => {
                oppdaterForespørsel({ params, body: await request.json() });
                return HttpResponse.json(byggSuksessRessurs(lagret));
            })
        );
        const { screen, user, queryClient } = renderVedtaksside();

        await user.click(await screen.findByRole('button', { name: 'Vis mer' }));
        const vurdering = screen.getByRole('textbox', { name: /^Vurdering av skyld/ });
        await user.clear(vurdering);
        await user.type(vurdering, 'Ny vurdering');
        await user.click(screen.getByRole('button', { name: 'Lagre' }));

        await waitFor(() =>
            expect(queryClient.getQueryData(queryKeys.tilbakekrevingsvedtakMotregning(behandlingId))).toEqual(lagret)
        );
        expect(screen.queryByRole('textbox', { name: /^Vurdering av skyld/ })).not.toBeInTheDocument();
        expect(oppdaterForespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '1' },
            body: {
                varselDato: '2026-01-15',
                årsakTilFeilutbetaling: 'Lagret årsak',
                vurderingAvSkyld: 'Ny vurdering',
            },
        });
    });
});
