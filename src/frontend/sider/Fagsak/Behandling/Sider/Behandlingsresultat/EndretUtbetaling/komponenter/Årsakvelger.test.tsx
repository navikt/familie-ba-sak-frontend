import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { within } from '@testing-library/dom';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import Årsakvelger from './Årsakvelger';
import { render } from '../../../../../../../testutils/testrender';
import { IEndretUtbetalingAndelÅrsak, årsakTekst } from '../../../../../../../typer/utbetalingAndel';
import { Utbetaling, utbetalingTilLabel } from '../../Utbetaling';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';
import Utbetalingvelger from './Utbetalingvelger';

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
                <Utbetalingvelger />
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
}

describe('Årsakvelger', () => {
    test('skal vise årsakvelger med alle årsaker', () => {
        const { screen } = render(<Årsakvelger />, { wrapper: DefaultFormWrapper });

        const årsakvelger = screen.getByRole('combobox', { name: 'Årsak' });
        expect(årsakvelger).toBeInTheDocument();

        const årsaker = Object.values(IEndretUtbetalingAndelÅrsak);
        årsaker.forEach(årsak => {
            expect(within(årsakvelger).getByRole('option', { name: årsakTekst[årsak] })).toBeInTheDocument();
        });
    });

    test('skal kunne velge en årsak', async () => {
        const { screen, user } = render(<Årsakvelger />, { wrapper: DefaultFormWrapper });

        const årsakvelger = screen.getByRole('combobox', { name: 'Årsak' });
        expect(årsakvelger).toHaveValue('');

        await user.selectOptions(årsakvelger, IEndretUtbetalingAndelÅrsak.DELT_BOSTED);

        expect(årsakvelger).toHaveValue(IEndretUtbetalingAndelÅrsak.DELT_BOSTED);
    });

    test('skal ikke kunne endre årsak når erLesevisning er true', async () => {
        const { screen, user } = render(<Årsakvelger erLesevisning={true} />, { wrapper: DefaultFormWrapper });

        // Aksel setter ikke readonly på combobox, men setter label til 'Skrivebeskyttet[label]'
        const årsakvelger = screen.queryByRole('combobox', { name: 'Årsak' });
        expect(årsakvelger).not.toBeInTheDocument();

        const skrivebeskyttetÅrsakvelger = screen.getByRole('combobox', { name: 'SkrivebeskyttetÅrsak' });
        expect(skrivebeskyttetÅrsakvelger).toBeInTheDocument();

        await user.click(skrivebeskyttetÅrsakvelger);

        const deltBostedÅrsak = within(skrivebeskyttetÅrsakvelger).getByRole('option', {
            name: årsakTekst[IEndretUtbetalingAndelÅrsak.DELT_BOSTED],
        });

        await user.click(deltBostedÅrsak);

        expect(skrivebeskyttetÅrsakvelger).toHaveValue('');
    });

    test('skal ikke kunne endre årsak når skjema submitter', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues: DefaultValues<EndretUtbetalingAndelFormValues> = {
                [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                [EndretUtbetalingAndelFeltnavn.UTBETALING]: Utbetaling.INGEN_UTBETALING,
            };
            return DefaultFormWrapper({ children, defaultValues, onSubmitDelay: 3_000 });
        }

        const { screen, user } = render(<Årsakvelger />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        // Aksel setter ikke readonly på combobox, men setter label til 'Skrivebeskyttet[label]'
        const årsakvelger = screen.queryByRole('combobox', { name: 'Årsak' });
        expect(årsakvelger).not.toBeInTheDocument();

        const skrivebeskyttetÅrsakvelger = screen.getByRole('combobox', { name: 'SkrivebeskyttetÅrsak' });
        expect(skrivebeskyttetÅrsakvelger).toBeInTheDocument();

        await user.click(skrivebeskyttetÅrsakvelger);

        const etterbetaling3MndÅrsak = within(skrivebeskyttetÅrsakvelger).getByRole('option', {
            name: årsakTekst[IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND],
        });

        await user.click(etterbetaling3MndÅrsak);

        expect(skrivebeskyttetÅrsakvelger).toHaveValue(IEndretUtbetalingAndelÅrsak.DELT_BOSTED);
    });

    test('skal fokusere som forventet på komponenten når brukeren klikker på komponenten for å så tabbe ut', async () => {
        const { screen, user } = render(<Årsakvelger />, { wrapper: DefaultFormWrapper });

        const årsakvelger = screen.getByRole('combobox', { name: 'Årsak' });
        expect(årsakvelger).not.toHaveFocus();

        await user.click(årsakvelger);

        expect(årsakvelger).toHaveFocus();

        await user.tab();

        expect(årsakvelger).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når årsak mangler og skjemaet submittes', async () => {
        const { screen, user } = render(<Årsakvelger />, { wrapper: DefaultFormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        expect(screen.getByText('Du må velge en årsak')).toBeInTheDocument();
    });

    describe('Utbetalingvelger', () => {
        test('skal sette utbetaling til INGEN_UTBETALING når ENDRE_MOTTAKER velges', async () => {
            const { screen, user } = render(<Årsakvelger />, { wrapper: DefaultFormWrapper });

            const årsakvelger = screen.getByRole('combobox', { name: 'Årsak' });
            await user.selectOptions(årsakvelger, IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER);

            const ingenUtbetalingRadio = screen.getByRole('radio', {
                name: utbetalingTilLabel(Utbetaling.INGEN_UTBETALING),
            });

            expect(ingenUtbetalingRadio).toBeChecked();
        });

        test('skal sette utbetaling til INGEN_UTBETALING når ALLEREDE_UTBETALT velges', async () => {
            const { screen, user } = render(<Årsakvelger />, { wrapper: DefaultFormWrapper });

            const årsakvelger = screen.getByRole('combobox', { name: 'Årsak' });
            await user.selectOptions(årsakvelger, IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT);

            const ingenUtbetalingRadio = screen.getByRole('radio', {
                name: utbetalingTilLabel(Utbetaling.INGEN_UTBETALING),
            });

            expect(ingenUtbetalingRadio).toBeChecked();
        });

        test('skal tømme utbetaling når andre årsaker enn ENDRE_MOTTAKER eller ALLEREDE_UTBETALT velges', async () => {
            const { screen, user } = render(<Årsakvelger />, { wrapper: DefaultFormWrapper });

            const årsakvelger = screen.getByRole('combobox', { name: 'Årsak' });

            await user.selectOptions(årsakvelger, '');

            const fullUtbetaling = screen.queryByRole('radio', {
                name: utbetalingTilLabel(Utbetaling.FULL_UTBETALING),
            });
            const deltUtbetaling = screen.queryByRole('radio', {
                name: utbetalingTilLabel(Utbetaling.DELT_UTBETALING),
            });
            const ingenUtbetaling = screen.queryByRole('radio', {
                name: utbetalingTilLabel(Utbetaling.INGEN_UTBETALING),
            });

            expect(fullUtbetaling).not.toBeChecked();
            expect(deltUtbetaling).not.toBeChecked();
            expect(ingenUtbetaling).not.toBeChecked();
        });
    });
});
