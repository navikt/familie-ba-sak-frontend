import React, { type PropsWithChildren } from 'react';

import { http, HttpResponse } from 'msw';
import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

import { HenleggBehandling } from './HenleggBehandling';
import { HenleggBehandlingModal } from './HenleggBehandlingModal';
import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { BehandlingProvider } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../../../sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '../../../../sider/Fagsak/FagsakContext';
import { server } from '../../../../testutils/mocks/node';
import { lagBehandling } from '../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../testutils/testrender';
import { BehandlingStatus, BehandlingSteg, type IBehandling } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import { ToggleNavn } from '../../../../typer/toggles';

function ModalWrapper() {
    const { erModalÅpen } = useModal(ModalType.HENLEGG_BEHANDLING);
    if (!erModalÅpen) {
        return null;
    }
    return <HenleggBehandlingModal />;
}

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

function Wrapper({ fagsak = lagFagsak(), behandling = lagBehandling(), children }: WrapperProps) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={fagsak}>
                <HentOgSettBehandlingProvider fagsak={fagsak}>
                    <BehandlingProvider behandling={behandling}>
                        <ModalWrapper />
                        <ActionMenu open={true}>
                            <ActionMenu.Content>{children}</ActionMenu.Content>
                        </ActionMenu>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('HenleggBehandling', () => {
    test('skal rendre knapp', () => {
        const { screen } = render(<HenleggBehandling />, { wrapper: Wrapper });
        expect(screen.getByRole('menuitem', { name: 'Henlegg behandling' })).toBeInTheDocument();
    });

    test('skal ikke vise knapp hvis man befinner seg i lesevisning', () => {
        const { screen } = render(<HenleggBehandling />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        status: BehandlingStatus.SATT_PÅ_VENT,
                        steg: BehandlingSteg.REGISTRERE_SØKNAD,
                    })}
                />
            ),
        });
        expect(screen.queryByRole('menuitem', { name: 'Henlegg behandling' })).not.toBeInTheDocument();
    });

    test('skal ikke vise knapp hvis man befinner på et steg som ikke er henlegtbart', () => {
        const { screen } = render(<HenleggBehandling />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        status: BehandlingStatus.UTREDES,
                        steg: BehandlingSteg.BESLUTTE_VEDTAK,
                    })}
                />
            ),
        });
        expect(screen.queryByRole('menuitem', { name: 'Henlegg behandling' })).not.toBeInTheDocument();
    });

    test('skal vise knapp selv om det er lesevisning og på et steg som ikke er henlegtbart', async () => {
        server.use(
            http.post('/familie-ba-sak/api/feature/er-toggler-enabled', () => {
                return HttpResponse.json(byggSuksessRessurs({ [ToggleNavn.tekniskVedlikeholdHenleggelse]: true }));
            })
        );

        const { screen } = render(<HenleggBehandling />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        status: BehandlingStatus.UTREDES,
                        steg: BehandlingSteg.BESLUTTE_VEDTAK,
                    })}
                />
            ),
        });

        const knapp = await screen.findByRole('menuitem', { name: 'Henlegg behandling' });

        expect(knapp).toBeInTheDocument();
    });

    test('skal kunne åpne modal', async () => {
        const { screen, user } = render(<HenleggBehandling />, { wrapper: Wrapper });

        const knapp = screen.getByRole('menuitem', { name: 'Henlegg behandling' });
        await user.click(knapp);

        expect(screen.getByRole('dialog', { name: 'Henlegg behandling' })).toBeInTheDocument();
    });
});
