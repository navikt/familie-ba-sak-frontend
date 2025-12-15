import type { ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import { Utbetalingvelger } from './Utbetalingvelger';
import { render } from '../../../../../../../testutils/testrender';
import { IEndretUtbetalingAndelÅrsak } from '../../../../../../../typer/utbetalingAndel';
import { Utbetaling, utbetalingTilLabel } from '../../Utbetaling';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

const onSubmit = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

function Wrapper({
    children,
    defaultValues,
    onSubmitDelay = 0,
}: {
    children: ReactNode;
    defaultValues?: DefaultValues<EndretUtbetalingAndelFormValues>;
    onSubmitDelay?: number;
}) {
    const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(() => onSubmit(onSubmitDelay))}>
                {children}
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
}

const utbetalingVelgerRadioKnapper = (screen: ReturnType<typeof render>['screen']) => ({
    fullUtbetaling: screen.queryByRole('radio', {
        name: utbetalingTilLabel(Utbetaling.FULL_UTBETALING),
    }),
    deltUtbetaling: screen.queryByRole('radio', {
        name: utbetalingTilLabel(Utbetaling.DELT_UTBETALING),
    }),
    ingenUtbetaling: screen.queryByRole('radio', {
        name: utbetalingTilLabel(Utbetaling.INGEN_UTBETALING),
    }),
});

describe('Utbetalingvelger', () => {
    test('skal vise utbetalingvelger med alle utbetalingsalternativer når ingen årsak er valgt', () => {
        const { screen } = render(<Utbetalingvelger />, { wrapper: Wrapper });

        const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        expect(fullUtbetaling).toBeInTheDocument();
        expect(deltUtbetaling).toBeInTheDocument();
        expect(ingenUtbetaling).toBeInTheDocument();
    });

    test('skal kunne velge en utbetaling', async () => {
        const { screen, user } = render(<Utbetalingvelger />, { wrapper: Wrapper });

        const { fullUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        expect(fullUtbetaling).not.toBeChecked();

        await user.click(fullUtbetaling!);

        expect(fullUtbetaling).toBeChecked();
    });

    test('skal ikke kunne endre utbetaling når erLesevisning er true', async () => {
        const { screen, user } = render(<Utbetalingvelger erLesevisning={true} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.UTBETALING]: Utbetaling.FULL_UTBETALING,
                    }}
                />
            ),
        });

        const { fullUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        expect(fullUtbetaling).toBeChecked();

        await user.click(ingenUtbetaling!);

        expect(fullUtbetaling).toBeChecked();
        expect(ingenUtbetaling).not.toBeChecked();
    });

    test('skal ikke kunne endre utbetaling når skjema submitter', async () => {
        const { screen, user } = render(<Utbetalingvelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.UTBETALING]: Utbetaling.FULL_UTBETALING,
                    }}
                    onSubmitDelay={3_000}
                />
            ),
        });

        const { fullUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        expect(fullUtbetaling).toBeChecked();
        expect(ingenUtbetaling).not.toBeChecked();

        await user.click(ingenUtbetaling!);

        expect(fullUtbetaling).toBeChecked();
        expect(ingenUtbetaling).not.toBeChecked();
    });

    test('skal fokusere som forventet på komponenten når brukeren klikker på komponenten for å så tabbe ut', async () => {
        const { screen, user } = render(<Utbetalingvelger />, { wrapper: Wrapper });
        const { fullUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        expect(fullUtbetaling).not.toHaveFocus();

        await user.click(fullUtbetaling!);

        expect(fullUtbetaling).toHaveFocus();

        await user.tab();

        expect(fullUtbetaling).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når utbetaling mangler og skjemaet submittes', async () => {
        const { screen, user } = render(<Utbetalingvelger />, { wrapper: Wrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        expect(screen.getByText('Du må velge om beløpet skal utbetales')).toBeInTheDocument();
    });

    describe('Årsakvelger', () => {
        test('skal kun vise FULL_UTBETALING og INGEN_UTBETALING når årsak DELT_BOSTED er valgt', () => {
            const { screen } = render(<Utbetalingvelger />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        defaultValues={{
                            [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                        }}
                    />
                ),
            });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).toBeInTheDocument();
            expect(deltUtbetaling).not.toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });

        test('skal kun vise DELT_UTBETALING og INGEN_UTBETALING når årsak ETTERBETALING_3ÅR er valgt', () => {
            const { screen } = render(<Utbetalingvelger />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        defaultValues={{
                            [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3ÅR,
                        }}
                    />
                ),
            });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).not.toBeInTheDocument();
            expect(deltUtbetaling).toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });

        test('skal kun vise DELT_UTBETALING og INGEN_UTBETALING når årsak ETTERBETALING_3MND er valgt', () => {
            const { screen } = render(<Utbetalingvelger />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        defaultValues={{
                            [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND,
                        }}
                    />
                ),
            });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).not.toBeInTheDocument();
            expect(deltUtbetaling).toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });

        test('skal kun vise INGEN_UTBETALING når årsak ENDRE_MOTTAKER er valgt', () => {
            const { screen } = render(<Utbetalingvelger />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        defaultValues={{
                            [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER,
                        }}
                    />
                ),
            });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).not.toBeInTheDocument();
            expect(deltUtbetaling).not.toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });

        test('skal kun vise INGEN_UTBETALING når årsak ALLEREDE_UTBETALT er valgt', () => {
            const { screen } = render(<Utbetalingvelger />, {
                wrapper: props => (
                    <Wrapper
                        {...props}
                        defaultValues={{
                            [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT,
                        }}
                    />
                ),
            });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).not.toBeInTheDocument();
            expect(deltUtbetaling).not.toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });
    });
});
