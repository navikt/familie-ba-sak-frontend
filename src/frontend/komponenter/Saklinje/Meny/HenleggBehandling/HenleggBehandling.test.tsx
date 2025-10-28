import React, { type PropsWithChildren } from 'react';

import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { HenleggBehandling } from './HenleggBehandling';
import { HenleggBehandlingModal } from './HenleggBehandlingModal';
import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { BehandlingProvider } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../../../sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '../../../../sider/Fagsak/FagsakContext';
import { skruPåAlleToggles } from '../../../../testutils/mocks/handlers/featureToggleHandlers';
import { lagBehandling } from '../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../testutils/testrender';
import { BehandlingStatus, BehandlingSteg, type IBehandling } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import { FeatureToggle, type FeatureToggles } from '../../../../typer/featureToggles';

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
    featureToggles?: FeatureToggles;
}

function Wrapper({
    fagsak = lagFagsak(),
    behandling = lagBehandling(),
    featureToggles = skruPåAlleToggles(),
    children,
}: WrapperProps) {
    return (
        <TestProviders featureToggles={featureToggles}>
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
                    featureToggles={{ [FeatureToggle.tekniskVedlikeholdHenleggelse]: false }}
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
                    featureToggles={{ [FeatureToggle.tekniskVedlikeholdHenleggelse]: false }}
                />
            ),
        });
        expect(screen.queryByRole('menuitem', { name: 'Henlegg behandling' })).not.toBeInTheDocument();
    });

    test('skal vise knapp selv om det er lesevisning og på et steg som ikke er henlegtbart', async () => {
        const { screen } = render(<HenleggBehandling />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        status: BehandlingStatus.UTREDES,
                        steg: BehandlingSteg.BESLUTTE_VEDTAK,
                    })}
                    featureToggles={{ [FeatureToggle.tekniskVedlikeholdHenleggelse]: true }}
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
