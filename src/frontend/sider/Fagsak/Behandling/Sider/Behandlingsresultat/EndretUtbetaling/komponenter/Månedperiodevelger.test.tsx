import React, { type ReactNode } from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import { Månedperiodevelger, utledTidligsteOgSenesteDato } from './Månedperiodevelger';
import { lagBehandling } from '../../../../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../../../../testutils/testrender';
import type { IPersonMedAndelerTilkjentYtelse } from '../../../../../../../typer/beregning';
import { IEndretUtbetalingAndelÅrsak } from '../../../../../../../typer/utbetalingAndel';
import { FagsakProvider } from '../../../../../FagsakContext';
import { BehandlingProvider } from '../../../../context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../../../context/HentOgSettBehandlingContext';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

const DEFAULT_VALUES: DefaultValues<EndretUtbetalingAndelFormValues> = {
    [EndretUtbetalingAndelFeltnavn.PERSONER]: [],
};

const onSubmit = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

function Wrapper({
    children,
    defaultValues = DEFAULT_VALUES,
    onSubmitDelay = 0,
}: {
    children: ReactNode;
    onSubmitDelay?: number;
    defaultValues?: DefaultValues<EndretUtbetalingAndelFormValues>;
}) {
    const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider fagsak={lagFagsak()}>
                    <BehandlingProvider behandling={lagBehandling()}>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(() => onSubmit(onSubmitDelay))}>
                                {children}
                                <Button type="submit">Submit</Button>
                            </form>
                        </FormProvider>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

const lagMockPerson = (personIdent: string, stønadFom: string, stønadTom: string): IPersonMedAndelerTilkjentYtelse => {
    return {
        personIdent,
        stønadFom,
        stønadTom,
        ytelsePerioder: [],
        beløp: 0,
    } as IPersonMedAndelerTilkjentYtelse;
};

describe('utledTidligsteOgSenesteDato', () => {
    test('returnerer tidligste fom og seneste tom når ingen personer er valgt', () => {
        const behandling = {
            ...lagBehandling(),
            personerMedAndelerTilkjentYtelse: [
                lagMockPerson('1', '2023-01', '2023-12'),
                lagMockPerson('2', '2023-03', '2024-02'),
            ],
        };

        const { tidligsteDato, senesteDato } = utledTidligsteOgSenesteDato(behandling, [], '');

        expect(tidligsteDato).toEqual(new Date('2023-01-01'));
        expect(senesteDato).toEqual(new Date('2024-02-01'));
    });

    test('filtrerer på valgt person', () => {
        const behandling = {
            ...lagBehandling(),
            personerMedAndelerTilkjentYtelse: [
                lagMockPerson('1', '2023-01', '2023-12'),
                lagMockPerson('2', '2023-03', '2024-02'),
            ],
        };

        const { tidligsteDato, senesteDato } = utledTidligsteOgSenesteDato(behandling, ['1'], '');

        expect(tidligsteDato).toEqual(new Date('2023-01-01'));
        expect(senesteDato).toEqual(new Date('2023-12-01'));
    });

    test('filtrerer på flere valgte personer', () => {
        const behandling = {
            ...lagBehandling(),
            personerMedAndelerTilkjentYtelse: [
                lagMockPerson('1', '2023-01', '2023-06'),
                lagMockPerson('2', '2023-03', '2024-02'),
                lagMockPerson('3', '2023-05', '2023-09'),
            ],
        };

        const { tidligsteDato, senesteDato } = utledTidligsteOgSenesteDato(behandling, ['1', '3'], '');

        expect(tidligsteDato).toEqual(new Date('2023-01-01'));
        expect(senesteDato).toEqual(new Date('2023-09-01'));
    });

    test('begrenser seneste dato til inneværende måned når årsak er ALLEREDE_UTBETALT og tom er i fremtiden', () => {
        const omFemÅr = new Date(new Date().getFullYear() + 5, 0, 1).toISOString();

        const behandling = {
            ...lagBehandling(),
            personerMedAndelerTilkjentYtelse: [lagMockPerson('1', '2023-01', omFemÅr)],
        };

        const { senesteDato } = utledTidligsteOgSenesteDato(
            behandling,
            [],
            IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT
        );

        expect(senesteDato.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    test('begrenser tidligste dato til inneværende måned når årsak er ALLEREDE_UTBETALT og fom er i fremtiden', () => {
        const omFemÅr = new Date(new Date().getFullYear() + 5, 0, 1).toISOString();

        const behandling = {
            ...lagBehandling(),
            personerMedAndelerTilkjentYtelse: [lagMockPerson('1', omFemÅr, omFemÅr)],
        };

        const { tidligsteDato } = utledTidligsteOgSenesteDato(
            behandling,
            [],
            IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT
        );

        expect(tidligsteDato.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    test('begrenser ikke datoer når årsak ikke er ALLEREDE_UTBETALT', () => {
        const omFemÅr = new Date(new Date().getFullYear() + 5, 0, 1).toISOString();

        const behandling = {
            ...lagBehandling(),
            personerMedAndelerTilkjentYtelse: [lagMockPerson('1', '2023-01', omFemÅr)],
        };

        const { tidligsteDato, senesteDato } = utledTidligsteOgSenesteDato(
            behandling,
            [],
            IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER
        );

        expect(tidligsteDato).toEqual(new Date('2023-01-01'));
        expect(senesteDato).toEqual(new Date(omFemÅr));
    });
});

describe('Månedperiodevelger', () => {
    test('viser "valgfri" i TOM label når årsak er ENDRE_MOTTAKER', () => {
        const { screen } = render(<Månedperiodevelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        ...DEFAULT_VALUES,
                        [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER,
                    }}
                />
            ),
        });

        expect(screen.getByLabelText('T.o.m. (valgfri)')).toBeInTheDocument();
    });

    test('viser ikke "valgfri" i TOM label når årsak ikke er ENDRE_MOTTAKER', () => {
        const { screen } = render(<Månedperiodevelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        ...DEFAULT_VALUES,
                        [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT,
                    }}
                />
            ),
        });

        expect(screen.getByLabelText('T.o.m.')).toBeInTheDocument();
        expect(screen.queryByLabelText('T.o.m. (valgfri)')).not.toBeInTheDocument();
    });

    test('viser ikke "valgfri" i TOM label når årsak ikke er valgt', () => {
        const { screen } = render(<Månedperiodevelger />, { wrapper: Wrapper });

        expect(screen.getByLabelText('T.o.m.')).toBeInTheDocument();
        expect(screen.queryByLabelText('T.o.m. (valgfri)')).not.toBeInTheDocument();
    });

    test('viser både FOM og TOM månedvelgere', () => {
        const { screen } = render(<Månedperiodevelger />, { wrapper: Wrapper });

        expect(screen.getByLabelText('F.o.m.')).toBeInTheDocument();
        expect(screen.getByLabelText('T.o.m.')).toBeInTheDocument();
    });
});
