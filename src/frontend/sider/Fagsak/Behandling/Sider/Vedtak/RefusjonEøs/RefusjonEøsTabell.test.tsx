import { queryKeys } from '@hooks/keys/queryKeys';
import { ActionMenu } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/BehandlingContext';
import { VedtakContainer } from '@sider/Fagsak/Behandling/Sider/Vedtak/VedtakContainer';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { QueryClient } from '@tanstack/react-query';
import { waitFor, within } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagRefusjonEøs } from '@testutils/testdata/refusjonEøsTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren, ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { RefusjonEøs } from './RefusjonEøs';
import { RefusjonEøsTabell } from './RefusjonEøsTabell';
import { RefusjonEøsTabellProvider, useRefusjonEøsTabellContext } from './RefusjonEøsTabellContext';

const PERIODER_URL = encodeURI('/familie-ba-sak/api/refusjon-eøs/behandlinger/:behandlingId');
const ENKELTPERIODE_URL = encodeURI('/familie-ba-sak/api/refusjon-eøs/behandlinger/:behandlingId/perioder/:id');

const behandlingId = 1;

const periode = lagRefusjonEøs({ id: 5, fom: '2024-01-01', tom: '2024-03-31', refusjonsbeløp: 500 });
const annenPeriode = lagRefusjonEøs({ id: 6, fom: '2024-05-01', tom: '2024-05-31', refusjonsbeløp: 250 });

const radMedPeriode = { name: /01\.01\.2024 - 31\.03\.2024/ };
const radMedAnnenPeriode = { name: /01\.05\.2024 - 31\.05\.2024/ };

function mockRefusjonEøs(perioder: IRestRefusjonEøs[]) {
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
    const { erRefusjonEøsTabellSynlig } = useRefusjonEøsTabellContext();
    if (!erRefusjonEøsTabellSynlig) {
        return (
            <>
                <span>Tabellen er skjult</span>
                <ActionMenu open={true}>
                    <ActionMenu.Content>
                        <RefusjonEøs />
                    </ActionMenu.Content>
                </ActionMenu>
            </>
        );
    }
    return <RefusjonEøsTabell />;
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

describe('RefusjonEøsTabell', () => {
    test('skal vise perioder som er hentet fra endepunktet for refusjon EØS', async () => {
        mockRefusjonEøs([periode]);

        const { screen } = renderTabell();

        const rad = await screen.findByRole('row', radMedPeriode);
        expect(within(rad).getByRole('cell', { name: '500 kr/mnd' })).toBeInTheDocument();
    });

    test('skal vise feilmelding når periodene ikke kan hentes', async () => {
        server.use(http.get(PERIODER_URL, () => HttpResponse.error()));

        const { screen } = renderTabell();

        expect(await screen.findByText('Klarte ikke å hente inn vedtak.')).toBeInTheDocument();
    });

    test('skal vise tabellen når listen går fra ingen perioder til perioder', () => {
        const { screen, rerender } = renderMedProvidere(
            <RefusjonEøsTabellProvider refusjonEøsPerioder={[]}>
                <Tabell />
            </RefusjonEøsTabellProvider>
        );
        expect(screen.getByText('Tabellen er skjult')).toBeInTheDocument();

        rerender(
            <RefusjonEøsTabellProvider refusjonEøsPerioder={[periode]}>
                <Tabell />
            </RefusjonEøsTabellProvider>
        );

        expect(screen.getByRole('row', radMedPeriode)).toBeInTheDocument();
    });

    test('skal åpne tabellen med skjema fra menyvalget og skjule den igjen ved avbryt', async () => {
        mockRefusjonEøs([]);
        const { screen, user } = renderTabell();

        await user.click(await screen.findByRole('menuitem', { name: 'Legg til refusjon EØS' }));
        expect(screen.getByRole('button', { name: 'Lagre periode' })).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Avbryt' }));
        expect(screen.getByText('Tabellen er skjult')).toBeInTheDocument();
    });

    test('skal vise periodene fra svaret og skjule tabellen når siste periode slettes', async () => {
        mockRefusjonEøs([periode]);
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
        mockRefusjonEøs([periode]);
        const oppdaterForespørsel = vi.fn();
        server.use(
            http.put(ENKELTPERIODE_URL, async ({ params, request }) => {
                oppdaterForespørsel({ params, body: await request.json() });
                return HttpResponse.json(byggSuksessRessurs([{ ...periode, refusjonsbeløp: 750 }]));
            })
        );
        const { screen, user, erHistorikkinnslagInvalidert } = renderTabell();
        const rad = await screen.findByRole('row', radMedPeriode);
        await user.click(within(rad).getByRole('button', { name: 'Vis mer' }));

        const beløp = screen.getByRole('textbox', { name: 'Refusjonsbeløp (kr/mnd)' });
        await user.clear(beløp);
        await user.type(beløp, '750');
        await user.click(screen.getByRole('button', { name: 'Lagre periode' }));

        expect(await screen.findByRole('cell', { name: '750 kr/mnd' })).toBeInTheDocument();
        expect(
            await within(screen.getByRole('row', radMedPeriode)).findByRole('button', { name: 'Vis mer' })
        ).toBeInTheDocument();
        expect(oppdaterForespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '1', id: '5' },
            body: { fom: '2024-01-01', tom: '2024-03-31', refusjonsbeløp: 750, land: 'SE', refusjonAvklart: true },
        });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });

    test('skal vise periodene fra svaret når en periode legges til', async () => {
        mockRefusjonEøs([periode]);
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
        await user.type(screen.getByRole('combobox', { name: 'EØS-land' }), 'Sverige{Enter}');
        await user.click(screen.getByRole('radio', { name: 'Refusjon avklart' }));
        await user.type(screen.getByRole('textbox', { name: 'F.o.m' }), '05.2024');
        await user.type(screen.getByRole('textbox', { name: 'T.o.m' }), '05.2024');
        await user.type(screen.getByRole('textbox', { name: 'Refusjonsbeløp (kr/mnd)' }), '250');
        await user.click(screen.getByRole('button', { name: 'Lagre periode' }));

        expect(await screen.findByRole('row', radMedAnnenPeriode)).toBeInTheDocument();
        await waitFor(() =>
            expect(screen.queryByRole('textbox', { name: 'Refusjonsbeløp (kr/mnd)' })).not.toBeInTheDocument()
        );
        expect(opprettForespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '1' },
            body: { fom: '2024-05-01', tom: '2024-05-31', refusjonsbeløp: 250, land: 'SE', refusjonAvklart: true },
        });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
    });
});
