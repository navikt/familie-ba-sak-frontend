import { queryKeys } from '@hooks/keys/queryKeys';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/BehandlingContext';
import { VedtakContainer } from '@sider/Fagsak/Behandling/Sider/Vedtak/VedtakContainer';
import { Vedtaksmeny } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksmeny/Vedtaksmeny';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { QueryClient } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagKorrigertEtterbetaling } from '@testutils/testdata/korrigertEtterbetalingTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { type IRestKorrigertEtterbetaling, KorrigertEtterbetalingÅrsak } from '@typer/vedtak';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { KorrigertEtterbetalingAdvarsel } from './KorrigertEtterbetalingAdvarsel';
import { useKorrigertEtterbetalingContext } from './KorrigertEtterbetalingContext';

const KORRIGERT_ETTERBETALING_URL = '/familie-ba-sak/api/korrigertetterbetaling/behandling/:behandlingId';

const behandlingId = 1;

const korrigertEtterbetaling = lagKorrigertEtterbetaling({
    årsak: KorrigertEtterbetalingÅrsak.MOTREGNING,
    beløp: 2500,
    begrunnelse: 'Motregnet mot feilutbetaling',
});

function mockKorrigertEtterbetaling(korrigertEtterbetaling: IRestKorrigertEtterbetaling | null) {
    server.use(
        http.get(KORRIGERT_ETTERBETALING_URL, () => HttpResponse.json(byggSuksessRessurs(korrigertEtterbetaling)))
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
    const { korrigertEtterbetaling } = useKorrigertEtterbetalingContext();
    return (
        <>
            {korrigertEtterbetaling && <KorrigertEtterbetalingAdvarsel />}
            <Vedtaksmeny />
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

describe('KorrigerEtterbetaling', () => {
    test('skal vise korrigeringen som er hentet fra endepunktet for korrigert etterbetaling', async () => {
        mockKorrigertEtterbetaling(korrigertEtterbetaling);
        const { screen, user } = renderVedtaksside();

        expect(await screen.findByText('Etterbetalingsbeløp i brevet er manuelt korrigert')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Vedtaksmeny' }));
        await user.click(screen.getByRole('menuitem', { name: 'Vis korrigert etterbetaling' }));

        expect(screen.getByRole('combobox', { name: 'Årsak' })).toHaveValue(KorrigertEtterbetalingÅrsak.MOTREGNING);
        expect(screen.getByRole('textbox', { name: 'Nytt beløp' })).toHaveValue('2500');
        expect(screen.getByRole('textbox', { name: /Begrunnelse/ })).toHaveValue('Motregnet mot feilutbetaling');
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeInTheDocument();
    });

    test('skal vise feilmelding når korrigert etterbetaling ikke kan hentes', async () => {
        server.use(http.get(KORRIGERT_ETTERBETALING_URL, () => HttpResponse.error()));

        const { screen } = renderVedtaksside();

        expect(await screen.findByText('Klarte ikke å hente inn vedtak.')).toBeInTheDocument();
    });

    test('skal vise korrigeringen fra svaret når en korrigering lagres', async () => {
        mockKorrigertEtterbetaling(null);
        const korrigerForespørsel = vi.fn();
        server.use(
            http.post(KORRIGERT_ETTERBETALING_URL, async ({ params, request }) => {
                korrigerForespørsel({ params, body: await request.json() });
                return HttpResponse.json(byggSuksessRessurs(korrigertEtterbetaling));
            })
        );
        const { screen, user, erHistorikkinnslagInvalidert } = renderVedtaksside();

        await user.click(await screen.findByRole('button', { name: 'Vedtaksmeny' }));
        await user.click(screen.getByRole('menuitem', { name: 'Korriger etterbetaling' }));
        await user.selectOptions(screen.getByRole('combobox', { name: 'Årsak' }), 'Motregning');
        await user.type(screen.getByRole('textbox', { name: 'Nytt beløp' }), '2500');
        await user.type(screen.getByRole('textbox', { name: /Begrunnelse/ }), 'Motregnet mot feilutbetaling');
        await user.click(screen.getByRole('button', { name: 'Korriger beløp' }));

        expect(await screen.findByText('Etterbetalingsbeløp i brevet er manuelt korrigert')).toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Nytt beløp' })).not.toBeInTheDocument();
        expect(korrigerForespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '1' },
            body: {
                årsak: KorrigertEtterbetalingÅrsak.MOTREGNING,
                beløp: 2500,
                begrunnelse: 'Motregnet mot feilutbetaling',
            },
        });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });

    test('skal skjule korrigeringen når den angres', async () => {
        mockKorrigertEtterbetaling(korrigertEtterbetaling);
        const angreForespørsel = vi.fn();
        server.use(
            http.patch(KORRIGERT_ETTERBETALING_URL, ({ params }) => {
                angreForespørsel(params);
                return HttpResponse.json(byggSuksessRessurs(korrigertEtterbetaling));
            })
        );
        const { screen, user, erHistorikkinnslagInvalidert } = renderVedtaksside();

        await user.click(await screen.findByRole('button', { name: 'Vedtaksmeny' }));
        await user.click(screen.getByRole('menuitem', { name: 'Vis korrigert etterbetaling' }));
        await user.click(screen.getByRole('button', { name: 'Angre korrigering' }));

        await waitFor(() =>
            expect(screen.queryByText('Etterbetalingsbeløp i brevet er manuelt korrigert')).not.toBeInTheDocument()
        );
        expect(screen.queryByRole('textbox', { name: 'Nytt beløp' })).not.toBeInTheDocument();
        expect(angreForespørsel).toHaveBeenCalledExactlyOnceWith({ behandlingId: '1' });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });
});
