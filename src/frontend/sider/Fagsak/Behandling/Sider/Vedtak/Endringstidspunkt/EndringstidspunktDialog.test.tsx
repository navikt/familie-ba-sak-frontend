import { useErLesevisning } from '@hooks/useErLesevisning';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
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
}

vi.mock('@hooks/useErLesevisning');

function Wrapper({ behandling = lagBehandling(), initialErÅpen, children }: Props) {
    return (
        <TestProviders>
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
        const { screen } = render(<EndringstidspunktDialog />, { wrapper: Wrapper });

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('viser hentet endringstidspunkt', async () => {
        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => <Wrapper initialErÅpen={true}>{children}</Wrapper>,
        });

        await screen.findByRole('dialog');

        expect(screen.getByRole('heading', { name: 'Oppdater endringstidspunkt' })).toBeInTheDocument();
        expect(await screen.findByText('01.01.2024')).toBeInTheDocument();
    });

    test('viser feilmelding dersom endringstidspunkt ikke kan hentes', async () => {
        server.use(http.get(ENDRINGSTIDSPUNKT_URL, () => HttpResponse.error()));

        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => <Wrapper initialErÅpen={true}>{children}</Wrapper>,
        });

        await screen.findByRole('dialog');

        expect(
            await screen.findByText(/Systemet kan ikke hente endringstidspunktet|En feil har oppstått/i)
        ).toBeInTheDocument();
    });

    test('lukker dialogen når man klikker på Avbryt', async () => {
        const { screen, user } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => <Wrapper initialErÅpen={true}>{children}</Wrapper>,
        });

        await screen.findByRole('dialog');

        await user.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('viser Oppdater-knapp når man ikke er i lesevisning', async () => {
        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => (
                <Wrapper behandling={lagBehandling({ status: BehandlingStatus.UTREDES })} initialErÅpen={true}>
                    {children}
                </Wrapper>
            ),
        });

        await screen.findByRole('dialog');

        expect(screen.getByRole('button', { name: 'Oppdater' })).toBeInTheDocument();
    });

    test('viser ikke Oppdater-knapp i lesevisning', async () => {
        vi.mocked(useErLesevisning).mockReturnValue(true);

        const { screen } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => (
                <Wrapper behandling={lagBehandling({ status: BehandlingStatus.AVSLUTTET })} initialErÅpen={true}>
                    {children}
                </Wrapper>
            ),
        });

        await screen.findByRole('dialog');

        expect(screen.queryByRole('button', { name: 'Oppdater' })).not.toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: 'Lukk' })).toHaveLength(2);
    });

    test('viser valideringsfeil og lar dialogen stå åpen ved tom innsending', async () => {
        const { screen, user } = render(<EndringstidspunktDialog />, {
            wrapper: ({ children }) => <Wrapper initialErÅpen={true}>{children}</Wrapper>,
        });

        await screen.findByRole('dialog');

        await user.click(screen.getByRole('button', { name: 'Oppdater' }));

        expect(await screen.findByText('Du må velge en gyldig dato.')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
});
