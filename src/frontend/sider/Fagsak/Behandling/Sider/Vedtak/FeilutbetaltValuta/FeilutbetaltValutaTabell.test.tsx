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
import type { IBehandling } from '@typer/behandling';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { FeilutbetaltValuta } from './FeilutbetaltValuta';
import { FeilutbetaltValutaTabell } from './FeilutbetaltValutaTabell';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValutaTabellContext';

const PERIODER_URL = '/familie-ba-sak/api/feilutbetalt-valuta/behandling/:behandlingId';
const PERIODE_URL = '/familie-ba-sak/api/feilutbetalt-valuta/behandling/:behandlingId/periode/:id';

const behandlingId = 1;

const periode = lagFeilutbetaltValuta({ id: 5, fom: '2024-01-01', tom: '2024-03-31', feilutbetaltBeløp: 500 });
const annenPeriode = lagFeilutbetaltValuta({ id: 6, fom: '2024-05-01', tom: '2024-05-31', feilutbetaltBeløp: 250 });

const periodeRad = { name: /01\.01\.2024 - 31\.03\.2024/ };
const annenPeriodeRad = { name: /01\.05\.2024 - 31\.05\.2024/ };

function mockFeilutbetaltValuta(perioder: IRestFeilutbetaltValuta[]) {
    server.use(http.get(PERIODER_URL, () => HttpResponse.json(byggSuksessRessurs(perioder))));
}

function mockOpprettMedVentendeHenting(perioderEtterOpprettelse: IRestFeilutbetaltValuta[]) {
    const opprettetPayload = vi.fn();
    const hentetPåNytt = vi.fn();
    let fullførHenting: () => void = () => {};
    const hentingFullført = new Promise<void>(resolve => {
        fullførHenting = resolve;
    });
    server.use(
        http.post(PERIODER_URL, async ({ request }) => {
            opprettetPayload(await request.json());
            server.use(
                http.get(PERIODER_URL, async () => {
                    hentetPåNytt();
                    await hentingFullført;
                    return HttpResponse.json(byggSuksessRessurs(perioderEtterOpprettelse));
                })
            );
            return HttpResponse.json(byggSuksessRessurs(lagBehandling({ behandlingId })));
        })
    );
    return { opprettetPayload, hentetPåNytt, fullførHenting: () => fullførHenting() };
}

interface Props extends PropsWithChildren {
    queryClient: QueryClient;
    settBehandling: (behandling: IBehandling) => void;
}

function Wrapper({ queryClient, settBehandling, children }: Props) {
    return (
        <TestProviders queryClient={queryClient}>
            <FagsakProvider fagsak={lagFagsak()}>
                <BehandlingProvider behandling={lagBehandling({ behandlingId })} settBehandling={settBehandling}>
                    <VedtakContainer>{children}</VedtakContainer>
                </BehandlingProvider>
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

function renderTabell(queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })) {
    queryClient.setQueryData(queryKeys.historikkinnslag(behandlingId), []);
    const settBehandling = vi.fn();
    const result = render(<Tabell />, {
        wrapper: ({ children }) => (
            <Wrapper queryClient={queryClient} settBehandling={settBehandling}>
                {children}
            </Wrapper>
        ),
    });
    const erHistorikkinnslagInvalidert = () =>
        queryClient.getQueryState(queryKeys.historikkinnslag(behandlingId))?.isInvalidated;
    return { ...result, settBehandling, erHistorikkinnslagInvalidert };
}

describe('FeilutbetaltValutaTabell', () => {
    test('skal vise perioder som er hentet fra endepunktet for feilutbetalt valuta', async () => {
        // Arrange
        mockFeilutbetaltValuta([periode]);

        // Act
        const { screen } = renderTabell();

        // Assert
        const rad = await screen.findByRole('row', periodeRad);
        expect(within(rad).getByRole('cell', { name: '500 kr' })).toBeInTheDocument();
    });

    test('skal skjule tabellen når det ikke finnes perioder', async () => {
        // Arrange
        mockFeilutbetaltValuta([]);

        // Act
        const { screen } = renderTabell();

        // Assert
        expect(await screen.findByText('Tabellen er skjult')).toBeInTheDocument();
    });

    test('skal vise feilmelding når periodene ikke kan hentes', async () => {
        // Arrange
        server.use(http.get(PERIODER_URL, () => HttpResponse.error()));

        // Act
        const { screen } = renderTabell();

        // Assert
        expect(await screen.findByText('Klarte ikke å hente inn vedtak.')).toBeInTheDocument();
    });

    test('skal vise tabellen når en utdatert liste uten perioder blir oppdatert med perioder', async () => {
        // Arrange
        mockFeilutbetaltValuta([periode]);
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        queryClient.setQueryData(queryKeys.vedtaksperioder(behandlingId), []);
        queryClient.setQueryData(queryKeys.alleBegrunnelser(), {});
        queryClient.setQueryData(queryKeys.sammensattKontrollsak(behandlingId), null);
        queryClient.setQueryData(queryKeys.feilutbetaltValuta(behandlingId), []);

        // Act
        const { screen } = renderTabell(queryClient);

        // Assert
        expect(screen.getByText('Tabellen er skjult')).toBeInTheDocument();
        expect(await screen.findByRole('row', periodeRad)).toBeInTheDocument();
    });

    test('skal åpne tabellen med skjema fra menyvalget og skjule den igjen ved avbryt', async () => {
        // Arrange
        mockFeilutbetaltValuta([]);
        const { screen, user } = renderTabell();

        // Act
        await user.click(await screen.findByRole('menuitem', { name: 'Legg til feilutbetalt valuta og sats' }));

        // Assert
        expect(screen.getByRole('button', { name: 'Lagre periode' })).toBeInTheDocument();

        // Act
        await user.click(screen.getByRole('button', { name: 'Avbryt' }));

        // Assert
        expect(screen.getByText('Tabellen er skjult')).toBeInTheDocument();
    });

    test('skal kopiere tekst til NØS med periodene fra endepunktet', async () => {
        // Arrange
        mockFeilutbetaltValuta([periode, annenPeriode]);
        const { screen, user } = renderTabell();

        // Act
        await user.click(await screen.findByRole('button', { name: 'Kopier tekst til NØS' }));

        // Assert
        const kopiertTekst = await navigator.clipboard.readText();
        expect(kopiertTekst).toContain('Totalt kr 750');
        expect(kopiertTekst).toContain('01.01.2024 - 31.03.2024 kr 500');
        expect(kopiertTekst).toContain('01.05.2024 - 31.05.2024 kr 250');
    });

    test('skal hente periodene på nytt og skjule tabellen når siste periode slettes', async () => {
        // Arrange
        mockFeilutbetaltValuta([periode]);
        const slettetUrl = vi.fn();
        server.use(
            http.delete(PERIODE_URL, ({ request }) => {
                slettetUrl(new URL(request.url).pathname);
                mockFeilutbetaltValuta([]);
                return HttpResponse.json(byggSuksessRessurs(lagBehandling({ behandlingId })));
            })
        );
        const { screen, user, settBehandling, erHistorikkinnslagInvalidert } = renderTabell();
        const rad = await screen.findByRole('row', periodeRad);

        // Act
        await user.click(within(rad).getByRole('button', { name: 'Fjern periode' }));

        // Assert
        expect(await screen.findByText('Tabellen er skjult')).toBeInTheDocument();
        expect(slettetUrl).toHaveBeenCalledWith('/familie-ba-sak/api/feilutbetalt-valuta/behandling/1/periode/5');
        expect(erHistorikkinnslagInvalidert()).toBe(true);
        expect(settBehandling).not.toHaveBeenCalled();
    });

    test('skal hente periodene på nytt og beholde tabellen når en av flere perioder slettes', async () => {
        // Arrange
        mockFeilutbetaltValuta([periode, annenPeriode]);
        server.use(
            http.delete(PERIODE_URL, () => {
                mockFeilutbetaltValuta([annenPeriode]);
                return HttpResponse.json(byggSuksessRessurs(lagBehandling({ behandlingId })));
            })
        );
        const { screen, user } = renderTabell();
        const rad = await screen.findByRole('row', periodeRad);

        // Act
        await user.click(within(rad).getByRole('button', { name: 'Fjern periode' }));

        // Assert
        await waitFor(() => expect(screen.queryByRole('row', periodeRad)).not.toBeInTheDocument());
        expect(screen.getByRole('row', annenPeriodeRad)).toBeInTheDocument();
    });

    test('skal beholde tabellen når siste periode slettes mens skjemaet for ny periode er åpent', async () => {
        // Arrange
        mockFeilutbetaltValuta([periode]);
        server.use(
            http.delete(PERIODE_URL, () => {
                mockFeilutbetaltValuta([]);
                return HttpResponse.json(byggSuksessRessurs(lagBehandling({ behandlingId })));
            })
        );
        const { screen, user } = renderTabell();
        const rad = await screen.findByRole('row', periodeRad);
        await user.click(screen.getByRole('button', { name: 'Legg til ny periode' }));

        // Act
        await user.click(within(rad).getByRole('button', { name: 'Fjern periode' }));

        // Assert
        await waitFor(() => expect(screen.queryByRole('row', periodeRad)).not.toBeInTheDocument());
        expect(screen.getByRole('button', { name: 'Lagre periode' })).toBeInTheDocument();

        // Act
        await user.click(screen.getByRole('button', { name: 'Avbryt' }));

        // Assert
        expect(screen.getByText('Tabellen er skjult')).toBeInTheDocument();
    });

    test('skal hente periodene på nytt når en periode oppdateres', async () => {
        // Arrange
        mockFeilutbetaltValuta([periode]);
        const oppdatertPayload = vi.fn();
        server.use(
            http.put(PERIODE_URL, async ({ request }) => {
                oppdatertPayload(await request.json());
                mockFeilutbetaltValuta([{ ...periode, feilutbetaltBeløp: 750 }]);
                return HttpResponse.json(byggSuksessRessurs(lagBehandling({ behandlingId })));
            })
        );
        const { screen, user, settBehandling, erHistorikkinnslagInvalidert } = renderTabell();
        const rad = await screen.findByRole('row', periodeRad);
        await user.click(within(rad).getByRole('button', { name: 'Vis mer' }));

        // Act
        const beløp = screen.getByRole('textbox', { name: 'Feilutbetalt beløp' });
        await user.clear(beløp);
        await user.type(beløp, '750');
        await user.click(screen.getByRole('button', { name: 'Lagre periode' }));

        // Assert
        expect(await screen.findByRole('cell', { name: '750 kr' })).toBeInTheDocument();
        expect(oppdatertPayload).toHaveBeenCalledWith({ fom: '2024-01-01', tom: '2024-03-31', feilutbetaltBeløp: 750 });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
        expect(settBehandling).not.toHaveBeenCalled();
    });

    test('skal hente periodene på nytt før skjemaet lukkes når en periode legges til', async () => {
        // Arrange
        mockFeilutbetaltValuta([periode]);
        const { opprettetPayload, hentetPåNytt, fullførHenting } = mockOpprettMedVentendeHenting([
            periode,
            annenPeriode,
        ]);
        const { screen, user, settBehandling, erHistorikkinnslagInvalidert } = renderTabell();
        await screen.findByRole('row', periodeRad);
        await user.click(screen.getByRole('button', { name: 'Legg til ny periode' }));

        // Act
        await user.type(screen.getByRole('textbox', { name: 'F.o.m' }), '05.2024');
        await user.type(screen.getByRole('textbox', { name: 'T.o.m' }), '05.2024');
        await user.type(screen.getByRole('textbox', { name: 'Feilutbetalt beløp' }), '250');
        await user.click(screen.getByRole('button', { name: 'Lagre periode' }));

        // Assert
        await waitFor(() => expect(hentetPåNytt).toHaveBeenCalled());
        expect(screen.getByRole('textbox', { name: 'Feilutbetalt beløp' })).toBeInTheDocument();
        expect(screen.queryByRole('row', annenPeriodeRad)).not.toBeInTheDocument();

        // Act
        fullførHenting();

        // Assert
        expect(await screen.findByRole('row', annenPeriodeRad)).toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'Feilutbetalt beløp' })).not.toBeInTheDocument();
        expect(opprettetPayload).toHaveBeenCalledWith({ fom: '2024-05-01', tom: '2024-05-31', feilutbetaltBeløp: 250 });
        expect(erHistorikkinnslagInvalidert()).toBe(true);
        expect(settBehandling).not.toHaveBeenCalled();
    });

    test('skal ikke kunne lagre perioden på nytt mens periodene hentes', async () => {
        // Arrange
        mockFeilutbetaltValuta([]);
        const { opprettetPayload, hentetPåNytt, fullførHenting } = mockOpprettMedVentendeHenting([annenPeriode]);
        const { screen, user } = renderTabell();
        await user.click(await screen.findByRole('menuitem', { name: 'Legg til feilutbetalt valuta og sats' }));
        await user.type(screen.getByRole('textbox', { name: 'F.o.m' }), '05.2024');
        await user.type(screen.getByRole('textbox', { name: 'T.o.m' }), '05.2024');
        await user.type(screen.getByRole('textbox', { name: 'Feilutbetalt beløp' }), '250');
        const lagre = screen.getByRole('button', { name: 'Lagre periode' });

        // Act
        await user.click(lagre);
        await waitFor(() => expect(hentetPåNytt).toHaveBeenCalled());

        // Assert
        expect(lagre).toBeDisabled();

        // Act
        await user.click(lagre);
        fullførHenting();

        // Assert
        expect(await screen.findByRole('row', annenPeriodeRad)).toBeInTheDocument();
        expect(opprettetPayload).toHaveBeenCalledTimes(1);
    });
});
