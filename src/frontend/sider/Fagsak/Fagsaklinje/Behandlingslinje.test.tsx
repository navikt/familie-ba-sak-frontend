import React, { type PropsWithChildren } from 'react';

import { Route, Routes } from 'react-router';
import { describe, expect, test } from 'vitest';

import type { ISaksbehandler } from '@navikt/familie-typer';

import { lagBehandling, lagVisningBehandling } from '../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../testutils/testdata/fagsakTestdata';
import { lagPerson } from '../../../testutils/testdata/personTestdata';
import { lagSaksbehandler } from '../../../testutils/testdata/saksbehandlerTestdata';
import { render, TestProviders } from '../../../testutils/testrender';
import type { IBehandling } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { FagsakProvider } from '../FagsakContext';
import { ManuelleBrevmottakerePåFagsakProvider } from '../ManuelleBrevmottakerePåFagsakContext';
import { Behandlingslinje } from './Behandlingslinje';
import { BehandlingProvider } from '../Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../Behandling/context/HentOgSettBehandlingContext';
import { BrukerProvider } from '../BrukerContext';

interface WrapperProps extends PropsWithChildren {
    saksbehandler?: ISaksbehandler;
    fagsak?: IMinimalFagsak;
    bruker?: IPersonInfo;
    behandling?: IBehandling;
}

function Wrapper({
    saksbehandler = lagSaksbehandler(),
    behandling = lagBehandling(),
    fagsak = lagFagsak({ behandlinger: [lagVisningBehandling({ behandlingId: behandling?.behandlingId })] }),
    bruker = lagPerson(),
    children,
}: WrapperProps) {
    return (
        <TestProviders
            initialEntries={[{ pathname: '/fagsak/:fagsakId/:behandlingId/*' }]}
            saksbehandler={saksbehandler}
        >
            <Routes>
                <Route
                    path={'/fagsak/:fagsakId/:behandlingId/*'}
                    element={
                        <FagsakProvider fagsak={fagsak}>
                            <BrukerProvider bruker={bruker}>
                                <ManuelleBrevmottakerePåFagsakProvider>
                                    <HentOgSettBehandlingProvider fagsak={fagsak}>
                                        <BehandlingProvider behandling={behandling}>{children}</BehandlingProvider>
                                    </HentOgSettBehandlingProvider>
                                </ManuelleBrevmottakerePåFagsakProvider>
                            </BrukerProvider>
                        </FagsakProvider>
                    }
                />
                <Route path={`/fagsak/:fagsakId/saksoversikt`} element={<h1>Saksoversikt</h1>} />
                <Route path={`/fagsak/:fagsakId/dokumenter`} element={<h1>Dokumenter</h1>} />
            </Routes>
        </TestProviders>
    );
}

describe('Behandlingslinje', () => {
    test('skal rendre komponenten som forventet', () => {
        const { screen } = render(<Behandlingslinje />, { wrapper: Wrapper });

        expect(screen.getByRole('button', { name: 'Saksoversikt' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Dokumenter' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Meny' })).toBeInTheDocument();
    });

    test('skal kunne navigere til saksoversikt', async () => {
        const { screen, user } = render(<Behandlingslinje />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Saksoversikt' }));

        expect(screen.getByRole('heading', { name: 'Saksoversikt' })).toBeInTheDocument();
    });

    test('skal kunne navigere til dokumenter', async () => {
        const { screen, user } = render(<Behandlingslinje />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Dokumenter' }));

        expect(screen.getByRole('heading', { name: 'Dokumenter' })).toBeInTheDocument();
    });

    test('skal kunne åpne fagsakmeny', async () => {
        const { screen, user } = render(<Behandlingslinje />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Meny' }));

        expect(screen.getByRole('menuitem', { name: 'Opprett behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Send informasjonsbrev' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Henlegg behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Endre behandlende enhet' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Endre behandlingstema' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Legg til barn' })).not.toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Sett behandling på vent' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Fortsett behandling' })).not.toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'A-Inntekt' })).toBeInTheDocument();
    });

    test('skal ikke vise fagsakmeny hvis saksbehandler ikke har tilgang', async () => {
        const { screen } = render(<Behandlingslinje />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    saksbehandler={lagSaksbehandler({ groups: ['71f503a2-c28f-4394-a05a-8da263ceca4a'] })}
                />
            ),
        });

        expect(screen.getByRole('button', { name: 'Saksoversikt' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Dokumenter' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Meny' })).not.toBeInTheDocument();
    });
});
