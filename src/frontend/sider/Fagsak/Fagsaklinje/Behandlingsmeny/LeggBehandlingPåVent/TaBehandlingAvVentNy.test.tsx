import React, { type PropsWithChildren } from 'react';

import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { TaBehandlingAvVentNy } from './TaBehandlingAvVentNy';
import { lagBehandling } from '../../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../../testutils/testrender';
import { type IBehandling, SettPåVentÅrsak } from '../../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
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

describe('TaBehandlingAvVentNy', () => {
    test('skal rendre komponent for behandling som er satt på vent', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<TaBehandlingAvVentNy åpneModal={åpneModal} />, {
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
        expect(screen.getByRole('menuitem', { name: 'Fortsett behandling' })).toBeInTheDocument();
    });

    test('skal ikke rendre komponent for behandling som ikke er satt på vent', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<TaBehandlingAvVentNy åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        aktivSettPåVent: undefined,
                    })}
                />
            ),
        });
        expect(screen.queryByRole('menuitem', { name: 'Fortsett behandling' })).not.toBeInTheDocument();
    });
});
