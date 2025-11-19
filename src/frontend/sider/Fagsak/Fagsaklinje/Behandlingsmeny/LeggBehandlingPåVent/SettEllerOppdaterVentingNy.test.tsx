import React, { type PropsWithChildren } from 'react';

import { describe } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { SettEllerOppdaterVentingNy } from './SettEllerOppdaterVentingNy';
import { lagBehandling } from '../../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../../testutils/testrender';
import { type IBehandling, SettPåVentÅrsak } from '../../../../../typer/behandling';
import { type IMinimalFagsak } from '../../../../../typer/fagsak';
import { BehandlingProvider } from '../../../Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../../Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '../../../FagsakContext';

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
                        <ActionMenu open={true}>
                            <ActionMenu.Content>{children}</ActionMenu.Content>
                        </ActionMenu>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('SettEllerOppdaterVentingNy', () => {
    test('skal rendre komponent når behandlingen ikke er satt på vent', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<SettEllerOppdaterVentingNy åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        aktivSettPåVent: undefined,
                    })}
                />
            ),
        });
        expect(screen.getByRole('menuitem', { name: 'Sett behandling på vent' })).toBeInTheDocument();
    });

    test('skal rendre komponent når behandlingen ikke er satt på vent', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<SettEllerOppdaterVentingNy åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        aktivSettPåVent: {
                            frist: '2025-10-10',
                            årsak: SettPåVentÅrsak.AVVENTER_DOKUMENTASJON,
                        },
                    })}
                />
            ),
        });
        expect(screen.getByRole('menuitem', { name: 'Endre ventende behandling' })).toBeInTheDocument();
    });
});
