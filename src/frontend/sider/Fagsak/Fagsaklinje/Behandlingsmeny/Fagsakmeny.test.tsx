import React, { type PropsWithChildren } from 'react';

import { Route, Routes } from 'react-router';
import { describe, expect } from 'vitest';

import { Heading } from '@navikt/ds-react';

import { Fagsakmeny } from './Fagsakmeny';
import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { OpprettFagsakModal } from '../../../../komponenter/Modal/fagsak/OpprettFagsakModal';
import { FagsakTestdata } from '../../../../testutils/testdata/fagsakTestdata';
import { PersonTestdata } from '../../../../testutils/testdata/personTestdata';
import { render, TestProviders } from '../../../../testutils/testrender';
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

function Wrapper({ initialEntries = [{ pathname: '/fagsak/1' }], children }: WrapperProps) {
    return (
        <TestProviders initialEntries={initialEntries}>
            <FagsakProvider fagsak={FagsakTestdata.lagFagsak()}>
                <BrukerProvider bruker={PersonTestdata.lagPerson()}>
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
                                        {children}
                                    </>
                                }
                            />
                            <Route path={'/fagsak/:fagsakId'} element={<>{children}</>} />
                        </Routes>
                    </ManuelleBrevmottakerePåFagsakProvider>
                </BrukerProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('Fagsakmeny', () => {
    test('skal rendre komponenten som forventent', () => {
        const { screen } = render(<Fagsakmeny />, { wrapper: Wrapper });
        expect(screen.getByRole('button', { name: 'Meny' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Opprett behandling' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Opprett ny fagsak' })).not.toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Send informasjonsbrev' })).not.toBeInTheDocument();
    });

    test('skal vise de korrekte knappene når man trykker på menyen når man ikke er på dokumentsiden', async () => {
        const { screen, user } = render(<Fagsakmeny />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1' }]} />,
        });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        expect(screen.getByRole('menuitem', { name: 'Opprett behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Opprett ny fagsak' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Send informasjonsbrev' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Legg til brevmottaker' })).not.toBeInTheDocument();
    });

    test('skal vise de korrekte knappene når man trykker på menyen når man er på dokumentsiden', async () => {
        const { screen, user } = render(<Fagsakmeny />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1/dokumentutsending' }]} />,
        });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        expect(screen.getByRole('menuitem', { name: 'Opprett behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Opprett ny fagsak' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Send informasjonsbrev' })).not.toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
    });

    test('skal kunne åpne opprett behandling modal', async () => {
        const { screen, user } = render(<Fagsakmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Opprett behandling' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Opprett ny behandling' })).toBeInTheDocument();
    });

    test('skal kunne åpne opprett fagsak modal', async () => {
        const { screen, user } = render(<Fagsakmeny />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Opprett ny fagsak' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Opprett fagsak' })).toBeInTheDocument();
    });

    test('skal kunne navigere til dokumentutsending', async () => {
        const { screen, user } = render(<Fagsakmeny />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1' }]} />,
        });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Send informasjonsbrev' });
        await user.click(menuitem);

        expect(screen.getByRole('heading', { name: 'Dokumentutsending' })).toBeInTheDocument();
    });

    test('skal kunne åpne legg til brevmottaker modal på dokumentutsending siden', async () => {
        const { screen, user } = render(<Fagsakmeny />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1/dokumentutsending' }]} />,
        });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        const menuitem = screen.getByRole('menuitem', { name: 'Legg til brevmottaker' });
        await user.click(menuitem);

        expect(screen.getByRole('dialog', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
    });
});
