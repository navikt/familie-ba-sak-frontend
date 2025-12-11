import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import Utbetalingvelger from './Utbetalingvelger';
import { render } from '../../../../../../../testutils/testrender';
import { IEndretUtbetalingAndelÅrsak } from '../../../../../../../typer/utbetalingAndel';
import { Utbetaling, utbetalingTilLabel } from '../../Utbetaling';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

const DEFAULT_VALUES: DefaultValues<EndretUtbetalingAndelFormValues> = {
    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: '',
    [EndretUtbetalingAndelFeltnavn.UTBETALING]: '',
};

const onSubmit = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

function DefaultFormWrapper({
    children,
    defaultValues = DEFAULT_VALUES,
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
        const { screen } = render(<Utbetalingvelger />, { wrapper: DefaultFormWrapper });

        const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        expect(fullUtbetaling).toBeInTheDocument();
        expect(deltUtbetaling).toBeInTheDocument();
        expect(ingenUtbetaling).toBeInTheDocument();
    });

    test('skal kunne velge en utbetaling', async () => {
        const { screen, user } = render(<Utbetalingvelger />, { wrapper: DefaultFormWrapper });

        const { fullUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        expect(fullUtbetaling).not.toBeChecked();

        await user.click(fullUtbetaling!);

        expect(fullUtbetaling).toBeChecked();
    });

    test('skal ikke kunne endre utbetaling når erLesevisning er true', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.UTBETALING]: Utbetaling.FULL_UTBETALING,
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<Utbetalingvelger erLesevisning={true} />, { wrapper: FormWrapper });

        const { fullUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        expect(fullUtbetaling).toBeChecked();

        await user.click(ingenUtbetaling!);

        expect(fullUtbetaling).toBeChecked();
        expect(ingenUtbetaling).not.toBeChecked();
    });

    test('skal ikke kunne endre utbetaling når skjema submitter', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.UTBETALING]: Utbetaling.FULL_UTBETALING,
            };
            return DefaultFormWrapper({ children, defaultValues, onSubmitDelay: 3_000 });
        }

        const { screen, user } = render(<Utbetalingvelger />, { wrapper: FormWrapper });

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
        const { screen, user } = render(<Utbetalingvelger />, { wrapper: DefaultFormWrapper });
        const { fullUtbetaling } = utbetalingVelgerRadioKnapper(screen);

        expect(fullUtbetaling).not.toHaveFocus();

        await user.click(fullUtbetaling!);

        expect(fullUtbetaling).toHaveFocus();

        await user.tab();

        expect(fullUtbetaling).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når utbetaling mangler og skjemaet submittes', async () => {
        const { screen, user } = render(<Utbetalingvelger />, { wrapper: DefaultFormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        expect(screen.getByText('Du må velge om beløpet skal utbetales')).toBeInTheDocument();
    });

    describe('Årsakvelger', () => {
        test('skal kun vise FULL_UTBETALING og INGEN_UTBETALING når årsak DELT_BOSTED er valgt', () => {
            function FormWrapper({ children }: PropsWithChildren) {
                const defaultValues = {
                    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                };
                return DefaultFormWrapper({ children, defaultValues });
            }

            const { screen } = render(<Utbetalingvelger />, { wrapper: FormWrapper });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).toBeInTheDocument();
            expect(deltUtbetaling).not.toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });

        test('skal kun vise DELT_UTBETALING og INGEN_UTBETALING når årsak ETTERBETALING_3ÅR er valgt', () => {
            function FormWrapper({ children }: PropsWithChildren) {
                const defaultValues = {
                    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3ÅR,
                };
                return DefaultFormWrapper({ children, defaultValues });
            }

            const { screen } = render(<Utbetalingvelger />, { wrapper: FormWrapper });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).not.toBeInTheDocument();
            expect(deltUtbetaling).toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });

        test('skal kun vise DELT_UTBETALING og INGEN_UTBETALING når årsak ETTERBETALING_3MND er valgt', () => {
            function FormWrapper({ children }: PropsWithChildren) {
                const defaultValues = {
                    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND,
                };
                return DefaultFormWrapper({ children, defaultValues });
            }

            const { screen } = render(<Utbetalingvelger />, { wrapper: FormWrapper });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).not.toBeInTheDocument();
            expect(deltUtbetaling).toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });

        test('skal kun vise INGEN_UTBETALING når årsak ENDRE_MOTTAKER er valgt', () => {
            function FormWrapper({ children }: PropsWithChildren) {
                const defaultValues = {
                    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER,
                };
                return DefaultFormWrapper({ children, defaultValues });
            }

            const { screen } = render(<Utbetalingvelger />, { wrapper: FormWrapper });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).not.toBeInTheDocument();
            expect(deltUtbetaling).not.toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });

        test('skal kun vise INGEN_UTBETALING når årsak ALLEREDE_UTBETALT er valgt', () => {
            function FormWrapper({ children }: PropsWithChildren) {
                const defaultValues = {
                    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT,
                };
                return DefaultFormWrapper({ children, defaultValues });
            }

            const { screen } = render(<Utbetalingvelger />, { wrapper: FormWrapper });

            const { fullUtbetaling, deltUtbetaling, ingenUtbetaling } = utbetalingVelgerRadioKnapper(screen);

            expect(fullUtbetaling).not.toBeInTheDocument();
            expect(deltUtbetaling).not.toBeInTheDocument();
            expect(ingenUtbetaling).toBeInTheDocument();
        });
    });
});
