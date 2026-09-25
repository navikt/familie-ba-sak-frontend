import { useErLesevisning } from '@hooks/useErLesevisning';
import { HentEndringstidspunktQueryKeyFactory } from '@hooks/useHentEndringstidspunkt';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { QueryClient } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { BehandlingStatus, type IBehandling } from '@typer/behandling';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { EndringstidspunktDialog } from './EndringstidspunktDialog';
import { EndringstidspunktDialogProvider } from './EndringstidspunktDialogContext';

const ENDRINGSTIDSPUNKT_URL = '/familie-ba-sak/api/behandlinger/:behandlingId/endringstidspunkt';

interface Props extends PropsWithChildren {
    behandling?: IBehandling;
    initialErÅpen?: boolean;
    queryClient?: QueryClient;
}

vi.mock('@hooks/useErLesevisning');

function Wrapper({ behandling = lagBehandling(), initialErÅpen = true, queryClient, children }: Props) {
    return (
        <TestProviders queryClient={queryClient}>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>
                        <EndringstidspunktDialogProvider initialErÅpen={initialErÅpen}>
                            {children}
                        </EndringstidspunktDialogProvider>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('EndringstidspunktDialog', () => {
    beforeEach(() => {
        server.use(http.get(ENDRINGSTIDSPUNKT_URL, () => HttpResponse.json(byggSuksessRessurs('2024-01-01'))));

        vi.mocked(useErLesevisning).mockReturnValue(false);
    });

    test('viser ikke dialogen før den er åpnet', () => {
        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => <Wrapper initialErÅpen={false}>{children}</Wrapper>,
        });

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('viser hentet endringstidspunkt', async () => {
        const { screen } = render(<EndringstidspunktDialog />, { wrapper: Wrapper });

        await screen.findByRole('dialog');

        expect(screen.getByRole('heading', { name: 'Oppdater endringstidspunkt' })).toBeInTheDocument();
        expect(await screen.findByText('01.01.2024')).toBeInTheDocument();
    });

    test('viser at det ikke finnes et endringstidspunkt', async () => {
        server.use(http.get(ENDRINGSTIDSPUNKT_URL, () => HttpResponse.json(byggSuksessRessurs(null))));

        const { screen } = render(<EndringstidspunktDialog />, { wrapper: Wrapper });

        await screen.findByRole('dialog');

        expect(await screen.findByText('Ingen endringstidspunkt')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeEnabled();
    });

    test('viser feilmelding dersom endringstidspunkt ikke kan hentes', async () => {
        server.use(http.get(ENDRINGSTIDSPUNKT_URL, () => HttpResponse.error()));

        const { screen } = render(<EndringstidspunktDialog />, { wrapper: Wrapper });

        await screen.findByRole('dialog');

        expect(
            await screen.findByText(/Systemet kan ikke hente endringstidspunktet|En feil har oppstått/i)
        ).toBeInTheDocument();
    });

    test('deaktiverer Oppdater-knappen mens endringstidspunktet hentes', async () => {
        let fullførForespørsel: () => void = () => {};
        const forespørselFullført = new Promise<void>(resolve => {
            fullførForespørsel = resolve;
        });

        server.use(
            http.get(ENDRINGSTIDSPUNKT_URL, async () => {
                await forespørselFullført;
                return HttpResponse.json(byggSuksessRessurs('2024-01-01'));
            })
        );

        const { screen } = render(<EndringstidspunktDialog />, { wrapper: Wrapper });

        await screen.findByRole('dialog');

        expect(screen.getByText('Henter endringstidspunkt...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeDisabled();

        fullførForespørsel();

        expect(await screen.findByText('01.01.2024')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeEnabled();
    });

    test('viser laster og skjuler tidligere hentet endringstidspunkt mens det hentes på nytt', async () => {
        let fullførForespørsel: () => void = () => {};
        const forespørselFullført = new Promise<void>(resolve => {
            fullførForespørsel = resolve;
        });

        server.use(
            http.get(ENDRINGSTIDSPUNKT_URL, async () => {
                await forespørselFullført;
                return HttpResponse.json(byggSuksessRessurs('2024-02-01'));
            })
        );

        const behandling = lagBehandling();
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        queryClient.setQueryData(
            HentEndringstidspunktQueryKeyFactory.endringstidspunkt(behandling.behandlingId),
            '2024-01-01'
        );

        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => (
                <Wrapper behandling={behandling} queryClient={queryClient}>
                    {children}
                </Wrapper>
            ),
        });

        await screen.findByRole('dialog');

        expect(await screen.findByText('Henter endringstidspunkt...')).toBeInTheDocument();
        expect(screen.queryByText('01.01.2024')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeDisabled();

        fullførForespørsel();

        expect(await screen.findByText('01.02.2024')).toBeInTheDocument();
        expect(screen.queryByText('Henter endringstidspunkt...')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeEnabled();
    });

    test('skjuler tidligere feilmelding mens endringstidspunktet hentes på nytt', async () => {
        let fullførForespørsel: () => void = () => {};
        const forespørselFullført = new Promise<void>(resolve => {
            fullførForespørsel = resolve;
        });

        server.use(
            http.get(ENDRINGSTIDSPUNKT_URL, async () => {
                await forespørselFullført;
                return HttpResponse.json(byggSuksessRessurs('2024-02-01'));
            })
        );

        const behandling = lagBehandling();
        const queryKey = HentEndringstidspunktQueryKeyFactory.endringstidspunkt(behandling.behandlingId);
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

        // React Query beholder bare feilen under ny henting dersom queryen tidligere har hatt data
        queryClient.setQueryData(queryKey, '2024-01-01');
        await queryClient
            .fetchQuery({ queryKey, queryFn: () => Promise.reject(new Error('Tidligere feil')), staleTime: 0 })
            .catch(() => {});

        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => (
                <Wrapper behandling={behandling} queryClient={queryClient}>
                    {children}
                </Wrapper>
            ),
        });

        await screen.findByRole('dialog');

        expect(await screen.findByText('Henter endringstidspunkt...')).toBeInTheDocument();
        expect(screen.queryByText('Tidligere feil')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeDisabled();

        fullførForespørsel();

        expect(await screen.findByText('01.02.2024')).toBeInTheDocument();
        expect(screen.queryByText('Tidligere feil')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeEnabled();
    });

    test('viser ikke tidligere hentet endringstidspunkt dersom ny henting feiler', async () => {
        server.use(http.get(ENDRINGSTIDSPUNKT_URL, () => HttpResponse.error()));

        const behandling = lagBehandling();
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        queryClient.setQueryData(
            HentEndringstidspunktQueryKeyFactory.endringstidspunkt(behandling.behandlingId),
            '2024-01-01'
        );

        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => (
                <Wrapper behandling={behandling} queryClient={queryClient}>
                    {children}
                </Wrapper>
            ),
        });

        await screen.findByRole('dialog');

        expect(
            await screen.findByText(/Systemet kan ikke hente endringstidspunktet|En feil har oppstått/i)
        ).toBeInTheDocument();
        expect(screen.queryByText('01.01.2024')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeDisabled();
    });

    test('lukker dialogen når man klikker på Avbryt', async () => {
        const { screen, user } = render(<EndringstidspunktDialog />, { wrapper: Wrapper });

        await screen.findByRole('dialog');

        await user.click(screen.getByRole('button', { name: 'Avbryt' }));

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    test('lukker dialogen når man trykker Escape', async () => {
        const { screen, user } = render(<EndringstidspunktDialog />, { wrapper: Wrapper });

        await screen.findByRole('dialog');
        await user.keyboard('{Escape}');

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    test('lukker ikke dialogen mens skjemaet sendes inn', async () => {
        const behandling = lagBehandling({ behandlingId: 3 });
        const oppdatertBehandling = lagBehandling({ behandlingId: 3 });

        let fullførForespørsel: () => void = () => {};
        const forespørselFullført = new Promise<void>(resolve => {
            fullførForespørsel = resolve;
        });

        server.use(
            http.put('/familie-ba-sak/api/vedtaksperioder/endringstidspunkt', async () => {
                await forespørselFullført;
                return HttpResponse.json(byggSuksessRessurs(oppdatertBehandling));
            })
        );

        const { screen, user } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => <Wrapper behandling={behandling}>{children}</Wrapper>,
        });

        await screen.findByRole('dialog');
        await screen.findByText('01.01.2024');

        const datofelt = screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' });
        await user.type(datofelt, '15.01.2024');
        await user.click(screen.getByRole('button', { name: 'Oppdater' }));

        await waitFor(() => expect(screen.getByRole('button', { name: 'Avbryt' })).toBeDisabled());

        await user.keyboard('{Escape}');

        expect(screen.getByRole('dialog')).toBeInTheDocument();

        fullførForespørsel();

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    test('viser Oppdater-knapp når man ikke er i lesevisning', async () => {
        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => (
                <Wrapper behandling={lagBehandling({ status: BehandlingStatus.UTREDES })}>{children}</Wrapper>
            ),
        });

        await screen.findByRole('dialog');

        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeInTheDocument();
    });

    test('viser ikke Oppdater-knapp i lesevisning', async () => {
        vi.mocked(useErLesevisning).mockReturnValue(true);

        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => (
                <Wrapper behandling={lagBehandling({ status: BehandlingStatus.AVSLUTTET })}>{children}</Wrapper>
            ),
        });

        await screen.findByRole('dialog');

        expect(screen.queryByRole('button', { name: 'Oppdater' })).not.toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: 'Lukk' })).toHaveLength(2);
    });

    test('viser valideringsfeil og lar dialogen stå åpen ved tom innsending', async () => {
        const { screen, user } = render(<EndringstidspunktDialog />, { wrapper: Wrapper });

        await screen.findByRole('dialog');
        await screen.findByText('01.01.2024');

        await user.click(screen.getByRole('button', { name: 'Oppdater' }));

        expect(await screen.findByText('Du må velge en gyldig dato.')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
});
