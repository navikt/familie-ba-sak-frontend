import React, { type ReactNode } from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import { Månedperiodevelger, utledTidligsteOgSenesteDato } from './Månedperiodevelger';
import { lagBehandling } from '../../../../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../../../../testutils/testdata/fagsakTestdata';
import { lagPersonMedAndelerTilkjentYtelse } from '../../../../../../../testutils/testdata/personTestdata';
import { render, TestProviders } from '../../../../../../../testutils/testrender';
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
    const fagsak = lagFagsak();
    return (
        <TestProviders>
            <FagsakProvider fagsak={fagsak}>
                <HentOgSettBehandlingProvider fagsak={fagsak}>
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

describe('utledTidligsteOgSenesteDato', () => {
    test('returnerer tidligste fom og seneste tom når ingen personer er valgt', () => {
        const behandling = lagBehandling({
            personerMedAndelerTilkjentYtelse: [
                lagPersonMedAndelerTilkjentYtelse({ personIdent: '1', stønadFom: '2023-01', stønadTom: '2023-12' }),
                lagPersonMedAndelerTilkjentYtelse({ personIdent: '2', stønadFom: '2023-03', stønadTom: '2024-02' }),
            ],
        });

        const { tidligsteDato, senesteDato } = utledTidligsteOgSenesteDato(behandling, [], null);

        expect(tidligsteDato).toEqual(new Date('2023-01-01'));
        expect(senesteDato).toEqual(new Date('2024-02-01'));
    });

    test('filtrerer på valgt person', () => {
        const behandling = lagBehandling({
            personerMedAndelerTilkjentYtelse: [
                lagPersonMedAndelerTilkjentYtelse({ personIdent: '1', stønadFom: '2023-01', stønadTom: '2023-12' }),
                lagPersonMedAndelerTilkjentYtelse({ personIdent: '2', stønadFom: '2023-03', stønadTom: '2024-02' }),
            ],
        });

        const { tidligsteDato, senesteDato } = utledTidligsteOgSenesteDato(behandling, ['1'], null);

        expect(tidligsteDato).toEqual(new Date('2023-01-01'));
        expect(senesteDato).toEqual(new Date('2023-12-01'));
    });

    test('filtrerer på flere valgte personer', () => {
        const behandling = lagBehandling({
            personerMedAndelerTilkjentYtelse: [
                lagPersonMedAndelerTilkjentYtelse({ personIdent: '1', stønadFom: '2023-01', stønadTom: '2023-06' }),
                lagPersonMedAndelerTilkjentYtelse({ personIdent: '2', stønadFom: '2023-03', stønadTom: '2024-02' }),
                lagPersonMedAndelerTilkjentYtelse({ personIdent: '3', stønadFom: '2023-05', stønadTom: '2023-09' }),
            ],
        });

        const { tidligsteDato, senesteDato } = utledTidligsteOgSenesteDato(behandling, ['1', '3'], null);

        expect(tidligsteDato).toEqual(new Date('2023-01-01'));
        expect(senesteDato).toEqual(new Date('2023-09-01'));
    });

    test('begrenser seneste dato til inneværende måned når årsak er ALLEREDE_UTBETALT og tom er i fremtiden', () => {
        const omFemÅr = new Date(new Date().getFullYear() + 5, 0, 1).toISOString();

        const behandling = lagBehandling({
            personerMedAndelerTilkjentYtelse: [
                lagPersonMedAndelerTilkjentYtelse({ stønadFom: '2023-01', stønadTom: omFemÅr }),
            ],
        });

        const { senesteDato } = utledTidligsteOgSenesteDato(
            behandling,
            [],
            IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT
        );

        expect(senesteDato.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    test('begrenser tidligste dato til inneværende måned når årsak er ALLEREDE_UTBETALT og fom er i fremtiden', () => {
        const omFemÅr = new Date(new Date().getFullYear() + 5, 0, 1).toISOString();
        const behandling = lagBehandling({
            personerMedAndelerTilkjentYtelse: [
                lagPersonMedAndelerTilkjentYtelse({ stønadFom: omFemÅr, stønadTom: omFemÅr }),
            ],
        });

        const { tidligsteDato } = utledTidligsteOgSenesteDato(
            behandling,
            [],
            IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT
        );

        expect(tidligsteDato.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    test('begrenser ikke datoer når årsak ikke er ALLEREDE_UTBETALT', () => {
        const omFemÅr = new Date(new Date().getFullYear() + 5, 0, 1).toISOString();
        const behandling = lagBehandling({
            personerMedAndelerTilkjentYtelse: [
                lagPersonMedAndelerTilkjentYtelse({ stønadFom: '2023-01', stønadTom: omFemÅr }),
            ],
        });

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
