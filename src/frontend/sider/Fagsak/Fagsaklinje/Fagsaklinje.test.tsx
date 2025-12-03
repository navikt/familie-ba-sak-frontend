import React, { type PropsWithChildren } from 'react';

import { Route, Routes } from 'react-router';
import { describe, expect, test } from 'vitest';

import type { ISaksbehandler } from '@navikt/familie-typer';

import { Fagsaklinje } from './Fagsaklinje';
import { lagFagsak } from '../../../testutils/testdata/fagsakTestdata';
import { lagPerson } from '../../../testutils/testdata/personTestdata';
import { lagSaksbehandler } from '../../../testutils/testdata/saksbehandlerTestdata';
import { render, TestProviders } from '../../../testutils/testrender';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { BrukerProvider } from '../BrukerContext';
import { FagsakProvider } from '../FagsakContext';
import { ManuelleBrevmottakerePåFagsakProvider } from '../ManuelleBrevmottakerePåFagsakContext';

interface WrapperProps extends PropsWithChildren {
    saksbehandler?: ISaksbehandler;
    fagsak?: IMinimalFagsak;
    bruker?: IPersonInfo;
}

function Wrapper({
    saksbehandler = lagSaksbehandler(),
    fagsak = lagFagsak(),
    bruker = lagPerson(),
    children,
}: WrapperProps) {
    return (
        <TestProviders saksbehandler={saksbehandler}>
            <Routes>
                <Route
                    path={'/'}
                    element={
                        <FagsakProvider fagsak={fagsak}>
                            <BrukerProvider bruker={bruker}>
                                <ManuelleBrevmottakerePåFagsakProvider>
                                    {children}
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

describe('Fagsaklinje', () => {
    test('skal rendre komponenten som forventet', () => {
        const { screen } = render(<Fagsaklinje />, { wrapper: Wrapper });

        expect(screen.getByRole('button', { name: 'Saksoversikt' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Infotrygd' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Dokumenter' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Meny' })).toBeInTheDocument();
    });

    test('skal kunne navigere til saksoversikt', async () => {
        const { screen, user } = render(<Fagsaklinje />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Saksoversikt' }));

        expect(screen.getByRole('heading', { name: 'Saksoversikt' })).toBeInTheDocument();
    });

    test('skal kunne navigere til dokumenter', async () => {
        const { screen, user } = render(<Fagsaklinje />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Dokumenter' }));

        expect(screen.getByRole('heading', { name: 'Dokumenter' })).toBeInTheDocument();
    });

    test('skal kunne åpne fagsakmeny', async () => {
        const { screen, user } = render(<Fagsaklinje />, { wrapper: Wrapper });

        const meny = screen.getByRole('button', { name: 'Meny' });
        await user.click(meny);

        expect(screen.getByRole('menuitem', { name: 'Opprett behandling' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Opprett ny fagsak' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Send informasjonsbrev' })).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: 'Legg til brevmottaker' })).not.toBeInTheDocument();
    });

    test('skal ikke vise fagsakmeny hvis saksbehandler ikke har tilgang', async () => {
        const { screen } = render(<Fagsaklinje />, {
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
