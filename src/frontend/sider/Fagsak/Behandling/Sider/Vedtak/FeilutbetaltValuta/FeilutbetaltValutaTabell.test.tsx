import { queryKeys } from '@hooks/keys/queryKeys';
import { ActionMenu } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { VedtakContainer } from '@sider/Fagsak/Behandling/Sider/Vedtak/VedtakContainer';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { QueryClient } from '@tanstack/react-query';
import { waitFor, within } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagFeilutbetaltValuta } from '@testutils/testdata/feilutbetaltValutaTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren, ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { FeilutbetaltValuta } from './FeilutbetaltValuta';
import { FeilutbetaltValutaTabell } from './FeilutbetaltValutaTabell';
import {
    FeilutbetaltValutaTabellProvider,
    useFeilutbetaltValutaTabellContext,
} from './FeilutbetaltValutaTabellContext';

const PERIODER_URL = '/familie-ba-sak/api/feilutbetalt-valuta/behandling/:behandlingId';
const ENKELTPERIODE_URL = '/familie-ba-sak/api/feilutbetalt-valuta/behandling/:behandlingId/periode/:id';

const behandlingId = 1;

const periode = lagFeilutbetaltValuta({ id: 5, fom: '2024-01-01', tom: '2024-03-31', feilutbetaltBeløp: 500 });
const annenPeriode = lagFeilutbetaltValuta({ id: 6, fom: '2024-05-01', tom: '2024-05-31', feilutbetaltBeløp: 250 });

const radMedPeriode = { name: /01\.01\.2024 - 31\.03\.2024/ };
const radMedAnnenPeriode = { name: /01\.05\.2024 - 31\.05\.2024/ };

function mockFeilutbetaltValuta(perioder: IRestFeilutbetaltValuta[]) {
    server.use(http.get(PERIODER_URL, () => HttpResponse.json(byggSuksessRessurs(perioder))));
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

function Tabell() {
    const { erFeilutbetaltValutaTabellSynlig } = useFeilutbetaltValutaTabellContext();
    if (!erFeilutbetaltValutaTabellSynlig) {
        return (
            <>
                <span>Tabellen er skjult</span>
                <ActionMenu open={true}>
                    <ActionMenu.Content>
                        <FeilutbetaltValuta />
                    </ActionMenu.Content>
                </ActionMenu>
            </>
        );
    }
    return <FeilutbetaltValutaTabell />;
}

function renderMedProvidere(ui: ReactNode) {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    queryClient.setQueryData(queryKeys.historikkinnslag(behandlingId), []);
    const result = render(ui, {
        wrapper: ({ children }) => <Wrapper queryClient={queryClient}>{children}</Wrapper>,
    });
    const erHistorikkinnslagInvalidert = () =>
        queryClient.getQueryState(queryKeys.historikkinnslag(behandlingId))?.isInvalidated;
    return { ...result, erHistorikkinnslagInvalidert };
}

function renderTabell() {
    return renderMedProvidere(
        <VedtakContainer>
            <Tabell />
        </VedtakContainer>
    );
}

describe('FeilutbetaltValutaTabell', () => {
    test('skal vise perioder som er hentet fra endepunktet for feilutbetalt valuta', async () => {
        mockFeilutbetaltValuta([periode]);

        const { screen } = renderTabell();

        const rad = await screen.findByRole('row', radMedPeriode);
        expect(within(rad).getByRole('cell', { name: '500 kr' })).toBeInTheDocument();
    });

    test('skal vise feilmelding når periodene ikke kan hentes', async () => {
        server.use(http.get(PERIODER_URL, () => HttpResponse.error()));

        const { screen } = renderTabell();

        expect(await screen.findByText('Klarte ikke å hente inn vedtak.')).toBeInTheDocument();
    });

    test('skal vise tabellen når listen går fra ingen perioder til perioder', () => {
        const { screen, rerender } = renderMedProvidere(
            <FeilutbetaltValutaTabellProvider feilutbetaltValutaPerioder={[]}>
                <Tabell />
            </FeilutbetaltValutaTabellProvider>
        );
        expect(screen.getByText('Tabellen er skjult')).toBeInTheDocument();

        rerender(
            <FeilutbetaltValutaTabellProvider feilutbetaltValutaPerioder={[periode]}>
                <Tabell />
            </FeilutbetaltValutaTabellProvider>
        );

        expect(screen.getByRole('row', radMedPeriode)).toBeInTheDocument();
    });

    test('skal åpne tabellen med skjema fra menyvalget og skjule den igjen ved avbryt', async () => {
        mockFeilutbetaltValuta([]);
        const { screen, user } = renderTabell();

        await user.click(await screen.findByRole('menuitem', { name: 'Legg til feilutbetalt valuta og sats' }));
        expect(screen.getByRole('button', { name: 'Lagre periode' })).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Avbryt' }));
        expect(screen.getByText('Tabellen er skjult')).toBeInTheDocument();
    });

    test('skal vise periodene fra svaret og skjule tabellen når siste periode slettes', async () => {
        mockFeilutbetaltValuta([periode]);
        const slettForespørsel = vi.fn();
        server.use(
            http.delete(ENKELTPERIODE_URL, ({ params }) => {
                slettForespørsel(params);
                return HttpResponse.json(byggSuksessRessurs([]));
            })
        );
        const { screen, user, erHistorikkinnslagInvalidert } = renderTabell();
        const rad = await screen.findByRole('row', radMedPeriode);

        await user.click(within(rad).getByRole('button', { name: 'Fjern periode' }));

        expect(await screen.findByText('Tabellen er skjult')).toBeInTheDocument();
        expect(slettForespørsel).toHaveBeenCalledExactlyOnceWith({ behandlingId: '1', id: '5' });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });

    test('skal vise periodene fra svaret når en periode oppdateres', async () => {
        mockFeilutbetaltValuta([periode]);
        const oppdaterForespørsel = vi.fn();
        server.use(
            http.put(ENKELTPERIODE_URL, async ({ params, request }) => {
                oppdaterForespørsel({ params, body: await request.json() });
                return HttpResponse.json(byggSuksessRessurs([{ ...periode, feilutbetaltBeløp: 750 }]));
            })
        );
        const { screen, user, erHistorikkinnslagInvalidert } = renderTabell();
        const rad = await screen.findByRole('row', radMedPeriode);
        await user.click(within(rad).getByRole('button', { name: 'Vis mer' }));

        const beløp = screen.getByRole('textbox', { name: 'Feilutbetalt beløp' });
        await user.clear(beløp);
        await user.type(beløp, '750');
        await user.click(screen.getByRole('button', { name: 'Lagre periode' }));

        expect(await screen.findByRole('cell', { name: '750 kr' })).toBeInTheDocument();
        expect(
            await within(screen.getByRole('row', radMedPeriode)).findByRole('button', { name: 'Vis mer' })
        ).toBeInTheDocument();
        expect(oppdaterForespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '1', id: '5' },
            body: { fom: '2024-01-01', tom: '2024-03-31', feilutbetaltBeløp: 750 },
        });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });

    test('skal vise periodene fra svaret når en periode legges til', async () => {
        mockFeilutbetaltValuta([periode]);
        const opprettForespørsel = vi.fn();
        server.use(
            http.post(PERIODER_URL, async ({ params, request }) => {
                opprettForespørsel({ params, body: await request.json() });
                return HttpResponse.json(byggSuksessRessurs([periode, annenPeriode]));
            })
        );
        const { screen, user, erHistorikkinnslagInvalidert } = renderTabell();
        await screen.findByRole('row', radMedPeriode);

        await user.click(screen.getByRole('button', { name: 'Legg til ny periode' }));
        await user.type(screen.getByRole('textbox', { name: 'F.o.m' }), '05.2024');
        await user.type(screen.getByRole('textbox', { name: 'T.o.m' }), '05.2024');
        await user.type(screen.getByRole('textbox', { name: 'Feilutbetalt beløp' }), '250');
        await user.click(screen.getByRole('button', { name: 'Lagre periode' }));

        expect(await screen.findByRole('row', radMedAnnenPeriode)).toBeInTheDocument();
        await waitFor(() =>
            expect(screen.queryByRole('textbox', { name: 'Feilutbetalt beløp' })).not.toBeInTheDocument()
        );
        expect(opprettForespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '1' },
            body: { fom: '2024-05-01', tom: '2024-05-31', feilutbetaltBeløp: 250 },
        });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });
});
