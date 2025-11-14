import React, { type PropsWithChildren } from 'react';

import { Route, Routes } from 'react-router';
import { describe, expect } from 'vitest';

import { Heading } from '@navikt/ds-react';

import { BehandlingsmenyNy } from './BehandlingsmenyNy';
import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { OpprettFagsakModal } from '../../../../komponenter/Modal/fagsak/OpprettFagsakModal';
import { lagBehandling } from '../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../testutils/testdata/fagsakTestdata';
import { lagPerson } from '../../../../testutils/testdata/personTestdata';
import { render, TestProviders } from '../../../../testutils/testrender';
import { BehandlingProvider } from '../../Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../Behandling/context/HentOgSettBehandlingContext';
import { BrukerProvider } from '../../BrukerContext';
import { FagsakProvider } from '../../FagsakContext';
import { ManuelleBrevmottakerePåFagsakProvider } from '../../ManuelleBrevmottakerePåFagsakContext';

function OpprettFagsakModalWrapper() {
    const { erModalÅpen } = useModal(ModalType.OPPRETT_FAGSAK);
    if (!erModalÅpen) {
        return null;
    }
    return <OpprettFagsakModal />;
}

interface WrapperProps extends PropsWithChildren {
    initialEntries?: [{ pathname: string }];
}

function Wrapper({ initialEntries = [{ pathname: '/fagsak/1/1/registrer-soknad' }], children }: WrapperProps) {
    const fagsak = lagFagsak();
    const behandling = lagBehandling();
    return (
        <TestProviders initialEntries={initialEntries}>
            <FagsakProvider fagsak={fagsak}>
                <BrukerProvider bruker={lagPerson()}>
                    <ManuelleBrevmottakerePåFagsakProvider>
                        <OpprettFagsakModalWrapper />
                        <Routes>
                            <Route
                                path={'/fagsak/:fagsakId/dokumentutsending'}
                                element={
                                    <>
                                        <Heading level={'1'} size={'medium'}>
                                            Dokumentutsending
                                        </Heading>
                                    </>
                                }
                            />
                            <Route
                                path={`/fagsak/${fagsak.id}/${behandling.behandlingId}/registrer-soknad`}
                                element={
                                    <HentOgSettBehandlingProvider fagsak={fagsak}>
                                        <BehandlingProvider behandling={behandling}>{children}</BehandlingProvider>
                                    </HentOgSettBehandlingProvider>
                                }
                            />
                        </Routes>
                    </ManuelleBrevmottakerePåFagsakProvider>
                </BrukerProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('BehandlingsmenyNy', () => {
    test('skal vise en uåpnet behandlingsmeny ', () => {
        const { screen } = render(<BehandlingsmenyNy />, { wrapper: Wrapper });
        expect(screen.getByRole('button', { name: 'Meny' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Opprett behandling' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Opprett ny fagsak' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Send informasjonsbrev' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Henlegg behandling' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Endre behandlende enhet' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Endre behandlingstema' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Legg til barn' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Sett behandling på vent' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Fortsett behandling' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Legg til brevmottaker' })).not.toBeInTheDocument();
    });

    test('skal kunne åpne behandlingsmenyen', async () => {
        const { screen, user } = render(<BehandlingsmenyNy />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Meny' }));

        expect(screen.getByRole('menuitem', { name: 'Opprett behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Opprett ny fagsak' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Send informasjonsbrev' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Henlegg behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Endre behandlende enhet' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Endre behandlingstema' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Legg til barn' })).not.toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Sett behandling på vent' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Fortsett behandling' })).not.toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
    });

    test('skal kunne åpne opprett behandling modal', async () => {
        const { screen, user } = render(<BehandlingsmenyNy />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Opprett behandling' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Opprett ny behandling' })).toBeInTheDocument();
    });

    test('skal kunne åpne opprett fagsak modal', async () => {
        const { screen, user } = render(<BehandlingsmenyNy />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Opprett ny fagsak' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Opprett fagsak' })).toBeInTheDocument();
    });

    test('skal kunne navigere til dokumentutsending', async () => {
        const { screen, user } = render(<BehandlingsmenyNy />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1/1/registrer-soknad' }]} />,
        });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Send informasjonsbrev' });
        await user.click(menuitem);

        expect(screen.getByRole('heading', { name: 'Dokumentutsending' })).toBeInTheDocument();
    });
});
