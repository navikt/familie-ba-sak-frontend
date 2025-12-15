import type { ReactNode } from 'react';
import React from 'react';

import { describe, expect, test, vi } from 'vitest';

import { Table } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';

import { EndretUtbetalingAndelProvider } from './EndretUtbetalingAndelContext';
import { EndretUtbetalingAndelRadRHF } from './EndretUtbetalingAndelRadRHF';
import { lagBehandling } from '../../../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../../../testutils/testrender';
import type { IBehandling } from '../../../../../../typer/behandling';
import { PersonType } from '../../../../../../typer/person';
import { Målform } from '../../../../../../typer/søknad';
import { IEndretUtbetalingAndelÅrsak, type IRestEndretUtbetalingAndel } from '../../../../../../typer/utbetalingAndel';
import { FagsakProvider } from '../../../../FagsakContext';
import { BehandlingProvider } from '../../../context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../../context/HentOgSettBehandlingContext';

const defaultBehandling: IBehandling = {
    ...lagBehandling(),
    personer: [
        {
            type: PersonType.BARN,
            personIdent: '10987654321',
            fødselsdato: '2023-12-31',
            navn: 'Barn 1',
            kjønn: kjønnType.MANN,
            målform: Målform.NB,
        },
        {
            type: PersonType.BARN,
            personIdent: '11111111111',
            fødselsdato: '2024-12-31',
            navn: 'Barn 2',
            kjønn: kjønnType.KVINNE,
            målform: Målform.NB,
        },
    ],
};

const defaultEndretUtbetalingAndel: IRestEndretUtbetalingAndel = {
    id: 1,
    personIdenter: ['10987654321'],
    prosent: 50,
    fom: '2024-01',
    tom: '2024-12',
    begrunnelse: 'Dette er en begrunnelse',
    årsak: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
    erTilknyttetAndeler: true,
    avtaletidspunktDeltBosted: '2024-01-15',
};

const tomEndretUtbetalingAndel: IRestEndretUtbetalingAndel = {
    personIdenter: [],
};

function Wrapper({
    children,
    behandling = defaultBehandling,
    endretUtbetalingAndel = defaultEndretUtbetalingAndel,
}: {
    children: ReactNode;
    behandling?: IBehandling;
    endretUtbetalingAndel?: IRestEndretUtbetalingAndel;
}) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider fagsak={lagFagsak()}>
                    <BehandlingProvider behandling={behandling}>
                        <EndretUtbetalingAndelProvider endretUtbetalingAndel={endretUtbetalingAndel}>
                            <Table>
                                <Table.Body>{children}</Table.Body>
                            </Table>
                        </EndretUtbetalingAndelProvider>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('EndretUtbetalingAndelRadRHF', () => {
    test('skal vise oppsummering av endret utbetalingsandel', () => {
        const { container } = render(<EndretUtbetalingAndelRadRHF />, { wrapper: Wrapper });

        const oppsummering = container.querySelector('tbody > tr');
        const kolonner = oppsummering?.querySelectorAll('td');

        expect(kolonner?.[0]).toHaveTextContent('Barn 1');
        expect(kolonner?.[1]).toHaveTextContent('01.2024 - 12.2024');
        expect(kolonner?.[2]).toHaveTextContent('Delt bosted');
        expect(kolonner?.[3]).toHaveTextContent('Ja - Delt utbetaling');
    });

    describe('Personkolonne', () => {
        test('skal vise "Ikke satt" når personIdenter er tom', () => {
            const { screen } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            personIdenter: [],
                        }}
                    />
                ),
            });

            expect(screen.getByText('Ikke satt')).toBeInTheDocument();
        });

        test('skal vise flere personer når personIdenter inneholder flere identer', () => {
            const { container } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            personIdenter: ['10987654321', '11111111111'],
                        }}
                    />
                ),
            });

            const oppsummering = container.querySelector('tbody > tr');
            const kolonner = oppsummering?.querySelectorAll('td');
            expect(kolonner?.[0]).toHaveTextContent('Barn 1');
            expect(kolonner?.[0]).toHaveTextContent('Barn 2');
        });
    });

    describe('Periodekolonne', () => {
        test('skal ikke vise periode når fom og tom er undefined', () => {
            const { container } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            fom: undefined,
                            tom: undefined,
                        }}
                    />
                ),
            });

            const oppsummering = container.querySelector('tbody > tr');
            const kolonner = oppsummering?.querySelectorAll('td');
            expect(kolonner?.[1]).toHaveTextContent('');
        });

        test('skal vise periode når fom er satt og tom er undefined', () => {
            const { container } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            fom: '2025-01-01',
                            tom: undefined,
                        }}
                    />
                ),
            });

            const oppsummering = container.querySelector('tbody > tr');
            const kolonner = oppsummering?.querySelectorAll('td');
            expect(kolonner?.[1]).toHaveTextContent('01.2025 -');
        });

        test('skal vise periode når fom og tom er satt', () => {
            const { container } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            fom: '2025-01-01',
                            tom: '2025-12-31',
                        }}
                    />
                ),
            });

            const oppsummering = container.querySelector('tbody > tr');
            const kolonner = oppsummering?.querySelectorAll('td');
            expect(kolonner?.[1]).toHaveTextContent('01.2025 - 12.2025');
        });
    });

    describe('Årsakkolonne', () => {
        test('skal ikke vise årsak når årsak er undefined', () => {
            const { container } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            årsak: undefined,
                        }}
                    />
                ),
            });

            const oppsummering = container.querySelector('tbody > tr');
            const kolonner = oppsummering?.querySelectorAll('td');
            expect(kolonner?.[2]).toHaveTextContent('');
        });

        test('skal vise årsak når årsak er satt', () => {
            const { container } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            årsak: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                        }}
                    />
                ),
            });

            const oppsummering = container.querySelector('tbody > tr');
            const kolonner = oppsummering?.querySelectorAll('td');
            expect(kolonner?.[2]).toHaveTextContent(/Delt bosted/);
        });
    });

    describe('Utbetalingkolonne', () => {
        test('skal vise "Ja - Full utbetaling" når prosent er 100', () => {
            const { screen } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            prosent: 100,
                        }}
                    />
                ),
            });

            expect(screen.getByText(/Ja - Full utbetaling/)).toBeInTheDocument();
        });

        test('skal vise "Ja - Delt utbetaling" når prosent er 50', () => {
            const { screen } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            prosent: 50,
                        }}
                    />
                ),
            });

            expect(screen.getByText(/Ja - Delt utbetaling/)).toBeInTheDocument();
        });

        test('skal vise "Nei" når prosent er 0', () => {
            const { screen } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        endretUtbetalingAndel={{
                            ...defaultEndretUtbetalingAndel,
                            prosent: 0,
                        }}
                    />
                ),
            });

            expect(screen.getByText(/Nei/)).toBeInTheDocument();
        });
    });

    describe('Åpne og lukke rad', () => {
        test('skal kunne ekspandere rad for å vise skjema', async () => {
            const { screen, user } = render(<EndretUtbetalingAndelRadRHF />, { wrapper: Wrapper });

            const åpneRadKnapp = screen.getByRole('button', { name: /Vis mer/ });
            await user.click(åpneRadKnapp);

            expect(screen.getByRole('button', { name: /Vis mindre/ })).toBeInTheDocument();
        });

        test('skal lukke skjema når lukkeknapp klikkes', async () => {
            const { screen, user } = render(<EndretUtbetalingAndelRadRHF />, { wrapper: Wrapper });

            const visMerKnapp = screen.getByRole('button', { name: /Vis mer/ });
            await user.click(visMerKnapp);

            const visMindreKnapp = screen.getByRole('button', { name: /Vis mindre/ });
            await user.click(visMindreKnapp);

            expect(screen.getByRole('button', { name: /Vis mer/ })).toBeInTheDocument();
        });

        test('skal vise alert når skjema har ulagrede endringer og bruker prøver å lukke', async () => {
            const alertSpy = vi.spyOn(window, 'alert');

            const { screen, user } = render(<EndretUtbetalingAndelRadRHF />, { wrapper: Wrapper });

            const visMerKnapp = screen.getByRole('button', { name: /Vis mer/ });
            await user.click(visMerKnapp);

            const begrunnelseFelt = screen.getByLabelText(/Begrunnelse/);
            await user.type(begrunnelseFelt, 'Ny begrunnelse');

            const visMindreKnapp = screen.getByRole('button', { name: /Vis mindre/ });
            await user.click(visMindreKnapp);

            expect(alertSpy).toHaveBeenCalledWith('Perioden med endret utbetaling har endringer som ikke er lagret!');

            expect(screen.getByRole('button', { name: /Vis mindre/ })).toBeInTheDocument();
        });

        test('skal starte med ekspandert skjema når personIdenter er tom liste', () => {
            const { screen } = render(<EndretUtbetalingAndelRadRHF />, {
                wrapper: props => <Wrapper {...props} endretUtbetalingAndel={tomEndretUtbetalingAndel} />,
            });

            expect(screen.getByRole('button', { name: /Vis mindre/ })).toBeInTheDocument();
        });
    });
});
