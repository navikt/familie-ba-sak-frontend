import React, { type PropsWithChildren } from 'react';

import { Route, Routes } from 'react-router';
import { describe, expect } from 'vitest';

import { ActionMenu, Heading } from '@navikt/ds-react';

import { LeggTilEllerFjernBrevmottakerePåFagsakNy } from './LeggTilEllerFjernBrevmottakerePåFagsakNy';
import type { SkjemaBrevmottaker } from './useBrevmottakerSkjema';
import { BrevmottakerTestdata } from '../../../../../testutils/testdata/brevmottakerTestdata';
import { render, TestProviders } from '../../../../../testutils/testrender';
import { ManuelleBrevmottakerePåFagsakProvider } from '../../../ManuelleBrevmottakerePåFagsakContext';

interface WrapperProps extends PropsWithChildren {
    initialEntries?: [{ pathname: string }];
    brevmottakere?: SkjemaBrevmottaker[];
}

function Wrapper({ initialEntries = [{ pathname: '/fagsak/1' }], brevmottakere = [], children }: WrapperProps) {
    return (
        <TestProviders initialEntries={initialEntries}>
            <ManuelleBrevmottakerePåFagsakProvider brevmottakere={brevmottakere}>
                <Routes>
                    <Route
                        path={'/fagsak/:fagsakId/dokumentutsending'}
                        element={
                            <>
                                <Heading level={'1'} size={'medium'}>
                                    Dokumentutsending
                                </Heading>
                                <ActionMenu open={true}>
                                    <ActionMenu.Content>{children}</ActionMenu.Content>
                                </ActionMenu>
                            </>
                        }
                    />
                    <Route
                        path={'/fagsak/:fagsakId'}
                        element={
                            <ActionMenu open={true}>
                                <ActionMenu.Content>{children}</ActionMenu.Content>
                            </ActionMenu>
                        }
                    />
                </Routes>
            </ManuelleBrevmottakerePåFagsakProvider>
        </TestProviders>
    );
}

describe('LeggTilEllerFjernBrevmottakerePåFagsakNy', () => {
    test('skal ikke rendre komponenten hvis man ikke befinner seg på dokumentutsending', () => {
        const åpneModal = vi.fn();

        const { screen } = render(<LeggTilEllerFjernBrevmottakerePåFagsakNy åpneModal={åpneModal} />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1' }]} />,
        });

        expect(screen.queryByRole('menuitem', { name: 'Legg til brevmottaker' })).not.toBeInTheDocument();
    });

    test('skal rendre komponenten uten brevmottakere hvis man befinner seg på dokumentutsending', () => {
        const åpneModal = vi.fn();

        const { screen } = render(<LeggTilEllerFjernBrevmottakerePåFagsakNy åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1/dokumentutsending' }]} brevmottakere={[]} />
            ),
        });

        expect(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
    });

    test('skal rendre komponenten med en brevmottaker hvis man befinner seg på dokumentutsending', () => {
        const åpneModal = vi.fn();

        const { screen } = render(<LeggTilEllerFjernBrevmottakerePåFagsakNy åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    initialEntries={[{ pathname: '/fagsak/1/dokumentutsending' }]}
                    brevmottakere={[BrevmottakerTestdata.lagBrevmottaker()]}
                />
            ),
        });

        expect(screen.getByRole('menuitem', { name: 'Legg til eller fjern brevmottaker' })).toBeInTheDocument();
    });

    test('skal rendre komponenten med mer enn en brevmottaker hvis man befinner seg på dokumentutsending', () => {
        const åpneModal = vi.fn();

        const { screen } = render(<LeggTilEllerFjernBrevmottakerePåFagsakNy åpneModal={åpneModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    initialEntries={[{ pathname: '/fagsak/1/dokumentutsending' }]}
                    brevmottakere={[BrevmottakerTestdata.lagBrevmottaker(), BrevmottakerTestdata.lagBrevmottaker()]}
                />
            ),
        });

        expect(screen.getByRole('menuitem', { name: 'Se eller fjern brevmottakere' })).toBeInTheDocument();
    });

    test('skal kunne åpne legg til brevmottaker modal', async () => {
        const åpneModal = vi.fn();

        const { screen, user } = render(<LeggTilEllerFjernBrevmottakerePåFagsakNy åpneModal={åpneModal} />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1/dokumentutsending' }]} />,
        });

        const knapp = screen.getByRole('menuitem', { name: 'Legg til brevmottaker' });
        await user.click(knapp);

        expect(åpneModal).toHaveBeenCalledOnce();
    });
});
