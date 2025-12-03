import React, { type PropsWithChildren } from 'react';

import { Route, Routes } from 'react-router';
import { describe, expect, type MockInstance } from 'vitest';

import { Heading } from '@navikt/ds-react';

import { Behandlingsmeny } from './Behandlingsmeny';
import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { OpprettFagsakModal } from '../../../../komponenter/Modal/fagsak/OpprettFagsakModal';
import { lagBehandling, lagVisningBehandling } from '../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../testutils/testdata/fagsakTestdata';
import { lagPerson } from '../../../../testutils/testdata/personTestdata';
import { render, TestProviders } from '../../../../testutils/testrender';
import { BehandlingProvider } from '../../Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../Behandling/context/HentOgSettBehandlingContext';
import { BrukerProvider } from '../../BrukerContext';
import { FagsakProvider } from '../../FagsakContext';
import { ManuelleBrevmottakerePåFagsakProvider } from '../../ManuelleBrevmottakerePåFagsakContext';
import { HenleggBehandlingModal } from './HenleggBehandling/HenleggBehandlingModal';
import {
    BehandlingÅrsak,
    type IBehandling,
    MIDLERTIDIG_BEHANDLENDE_ENHET_ID,
    SettPåVentÅrsak,
} from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';

function OpprettFagsakModalWrapper() {
    const { erModalÅpen } = useModal(ModalType.OPPRETT_FAGSAK);
    if (!erModalÅpen) {
        return null;
    }
    return <OpprettFagsakModal />;
}

interface WrapperProps extends PropsWithChildren {
    initialEntries?: [{ pathname: string }];
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

function Wrapper({
    initialEntries = [{ pathname: '/fagsak/1/1/registrer-soknad' }],
    behandling = lagBehandling({ årsak: BehandlingÅrsak.NYE_OPPLYSNINGER }),
    fagsak = lagFagsak({ behandlinger: [lagVisningBehandling({ behandlingId: behandling?.behandlingId })] }),
    children,
}: WrapperProps) {
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
                                path={`/fagsak/:fagsakId/:behandlingId/registrer-soknad`}
                                element={
                                    <HentOgSettBehandlingProvider fagsak={fagsak}>
                                        <BehandlingProvider behandling={behandling}>
                                            <HenleggBehandlingModal />

                                            {children}
                                        </BehandlingProvider>
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

describe('Behandlingsmeny', () => {
    test('skal vise en uåpnet behandlingsmeny', () => {
        const { screen } = render(<Behandlingsmeny />, { wrapper: Wrapper });
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
        expect(screen.queryByRole('menuitem', { name: 'A-Inntekt' })).not.toBeInTheDocument();
    });

    test('skal kunne åpne behandlingsmenyen', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Meny' }));

        expect(screen.getByRole('menuitem', { name: 'Opprett behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Opprett ny fagsak' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Send informasjonsbrev' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Henlegg behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Endre behandlende enhet' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Endre behandlingstema' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Legg til barn' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Sett behandling på vent' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Fortsett behandling' })).not.toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'A-Inntekt' })).toBeInTheDocument();
    });

    test('skal kunne åpne opprett behandling modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Opprett behandling' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Opprett ny behandling' })).toBeInTheDocument();
    });

    test('skal kunne åpne opprett fagsak modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Opprett ny fagsak' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Opprett fagsak' })).toBeInTheDocument();
    });

    test('skal kunne navigere til dokumentutsending', async () => {
        const { screen, user } = render(<Behandlingsmeny />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1/1/registrer-soknad' }]} />,
        });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Send informasjonsbrev' });
        await user.click(menuitem);

        expect(screen.getByRole('heading', { name: 'Dokumentutsending' })).toBeInTheDocument();
    });

    test('skal kunne åpne henlegg behandling modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Henlegg behandling' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Henlegg behandling' })).toBeInTheDocument();
    });

    test('skal kunne åpne endre behandlede enhet modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Endre behandlende enhet' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Endre enhet for denne behandlingen' })).toBeInTheDocument();
    });

    test('skal kunne åpne endre behandlingstema modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Endre behandlingstema' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Endre behandlingstema' })).toBeInTheDocument();
    });

    test('skal kunne åpne legg til barn på behandling modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Legg til barn' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Legg til barn' })).toBeInTheDocument();
    });

    test('skal kunne åpne sett behandling på vent modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Sett behandling på vent' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Sett behandling på vent' })).toBeInTheDocument();
    });

    test('skal kunne åpne ta behandling av vent modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, {
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

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Fortsett behandling' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Fortsett behandling' })).toBeInTheDocument();
    });

    test('skal kunne åpne legg til brevmottakere modal', async () => {
        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Legg til brevmottaker' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
    });

    test('skal kunne åpne a-inntekt', async () => {
        const windowOpenSpy: MockInstance = vi.spyOn(window, 'open').mockImplementation(() => null);

        const { screen, user } = render(<Behandlingsmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const knapp = screen.getByRole('menuitem', { name: 'A-Inntekt' });
        await user.click(knapp);

        expect(windowOpenSpy).toHaveBeenCalledOnce();

        windowOpenSpy.mockRestore();
    });

    test('skal vise endre behandlende enhet modal med en gang hvis behandlingen er på midlertidig enhet', () => {
        const { screen } = render(<Behandlingsmeny />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        arbeidsfordelingPåBehandling: {
                            behandlendeEnhetId: MIDLERTIDIG_BEHANDLENDE_ENHET_ID,
                            behandlendeEnhetNavn: 'midlertidig enhet',
                            manueltOverstyrt: false,
                        },
                    })}
                />
            ),
        });
        expect(screen.getByRole('dialog', { name: 'Endre enhet for denne behandlingen' })).toBeInTheDocument();
    });

    test('skal vise behandling på vent modal med en gang hvis behandlingen er på vent', () => {
        const { screen } = render(<Behandlingsmeny />, {
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
        expect(screen.getByRole('dialog', { name: 'Endre ventende behandling' })).toBeInTheDocument();
    });
});
