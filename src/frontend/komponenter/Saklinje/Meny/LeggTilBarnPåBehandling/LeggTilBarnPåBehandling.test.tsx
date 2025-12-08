import React, { type PropsWithChildren } from 'react';

import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { LeggTilBarnPBehandling } from './LeggTilBarnPåBehandling';
import { BehandlingProvider } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../../../sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '../../../../sider/Fagsak/FagsakContext';
import { lagBehandling } from '../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../testutils/testrender';
import { BehandlingStatus, Behandlingstype, BehandlingÅrsak, type IBehandling } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

function Wrapper({
    fagsak = lagFagsak(),
    behandling = lagBehandling({
        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
        status: BehandlingStatus.UTREDES,
        årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
    }),
    children,
}: WrapperProps) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={fagsak}>
                <HentOgSettBehandlingProvider fagsak={fagsak}>
                    <BehandlingProvider behandling={behandling}>
                        <ActionMenu open={true}>
                            <ActionMenu.Content>{children}</ActionMenu.Content>
                        </ActionMenu>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('LeggTilBarnPåBehandling', () => {
    test('skal rendre komponenten', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<LeggTilBarnPBehandling åpneModal={åpneModal} />, { wrapper: Wrapper });
        expect(screen.getByRole('menuitem', { name: 'Legg til barn' })).toBeInTheDocument();
    });

    test('skal ikke rendre komponenten i lesevisning', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<LeggTilBarnPBehandling åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
                        status: BehandlingStatus.SATT_PÅ_VENT,
                        årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
                    })}
                />
            ),
        });
        expect(screen.queryByRole('menuitem', { name: 'Legg til barn' })).not.toBeInTheDocument();
    });

    test('skal ikke rendre komponenten hvis behandlingsårsaken er urelevant', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<LeggTilBarnPBehandling åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
                        status: BehandlingStatus.UTREDES,
                        årsak: BehandlingÅrsak.SØKNAD,
                    })}
                />
            ),
        });
        expect(screen.queryByRole('menuitem', { name: 'Legg til barn' })).not.toBeInTheDocument();
    });

    test('skal rendre komponenten hvis behandlingsårsaken er urelevant men behandling er en migrering fra infotrygd', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<LeggTilBarnPBehandling åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        type: Behandlingstype.MIGRERING_FRA_INFOTRYGD,
                        status: BehandlingStatus.UTREDES,
                        årsak: BehandlingÅrsak.SØKNAD,
                    })}
                />
            ),
        });
        expect(screen.getByRole('menuitem', { name: 'Legg til barn' })).toBeInTheDocument();
    });

    test('skal kunne åpne modal', async () => {
        const åpneModal = vi.fn();
        const { screen, user } = render(<LeggTilBarnPBehandling åpneModal={åpneModal} />, { wrapper: Wrapper });
        const knapp = screen.getByRole('menuitem', { name: 'Legg til barn' });
        await user.click(knapp);
        expect(åpneModal).toHaveBeenCalledOnce();
    });
});
