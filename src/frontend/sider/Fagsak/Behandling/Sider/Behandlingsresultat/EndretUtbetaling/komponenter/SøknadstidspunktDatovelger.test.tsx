import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import SøknadstidspunktDatovelger from './SøknadstidspunktDatovelger';
import { render } from '../../../../../../../testutils/testrender';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

const DEFAULT_VALUES: DefaultValues<EndretUtbetalingAndelFormValues> = {
    [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: undefined,
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

describe('SøknadstidspunktDatovelger', () => {
    test('skal vise søknadstidspunkt datovelger', () => {
        const { screen } = render(<SøknadstidspunktDatovelger />, { wrapper: DefaultFormWrapper });

        const datovelger = screen.getByLabelText('Søknadstidspunkt');
        expect(datovelger).toBeInTheDocument();
    });

    test('skal kunne skrive inn en dato', async () => {
        const { screen, user } = render(<SøknadstidspunktDatovelger />, { wrapper: DefaultFormWrapper });

        const datovelger = screen.getByLabelText('Søknadstidspunkt');

        expect(datovelger).toHaveValue('');

        await user.type(datovelger, '01.01.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal vise forhåndsvalgt dato', () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen } = render(<SøknadstidspunktDatovelger />, { wrapper: FormWrapper });

        const datovelger = screen.getByLabelText('Søknadstidspunkt');
        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal kunne endre en valgt dato', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<SøknadstidspunktDatovelger />, { wrapper: FormWrapper });

        const datovelger = screen.getByLabelText('Søknadstidspunkt');
        expect(datovelger).toHaveValue('01.01.2025');

        await user.clear(datovelger);
        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('15.06.2025');
    });

    test('skal vise kalenderikon for å åpne datepicker', async () => {
        const { screen, user } = render(<SøknadstidspunktDatovelger />, { wrapper: DefaultFormWrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne datovelger' });
        expect(kalenderknapp).toBeInTheDocument();

        await user.click(kalenderknapp);

        const kalender = screen.getByRole('dialog');
        expect(kalender).toBeInTheDocument();
    });

    test('skal kunne velge dato fra kalenderen', async () => {
        const { screen, user } = render(<SøknadstidspunktDatovelger />, { wrapper: DefaultFormWrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne datovelger' });
        await user.click(kalenderknapp);

        const dagKnapp = screen.getByRole('button', { name: /15$/ });
        await user.click(dagKnapp);

        const datovelger = screen.getByLabelText('Søknadstidspunkt');
        expect(datovelger).toHaveValue('15.12.2025');
    });

    test('skal kunne slette dato ved å tømme feltet', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<SøknadstidspunktDatovelger />, { wrapper: FormWrapper });

        const datovelger = screen.getByLabelText('Søknadstidspunkt');
        expect(datovelger).toHaveValue('01.01.2025');

        await user.clear(datovelger);

        expect(datovelger).toHaveValue('');
    });

    test('skal ikke kunne endre dato når erLesevisning er true', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<SøknadstidspunktDatovelger erLesevisning={true} />, {
            wrapper: FormWrapper,
        });

        const datovelger = screen.getByLabelText('Søknadstidspunkt');
        expect(datovelger).toHaveValue('01.01.2025');
        expect(datovelger).toHaveAttribute('readonly');

        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal ikke kunne endre dato når skjema submitter', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues, onSubmitDelay: 3_000 });
        }

        const { screen, user } = render(<SøknadstidspunktDatovelger />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const datovelger = screen.getByLabelText('Søknadstidspunkt');
        expect(datovelger).toHaveValue('01.01.2025');
        expect(datovelger).toHaveAttribute('readonly');

        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal fokusere som forventet på komponenten når brukeren klikker på komponenten for å så tabbe ut', async () => {
        const { screen, user } = render(<SøknadstidspunktDatovelger />, { wrapper: DefaultFormWrapper });

        const datovelger = screen.getByLabelText('Søknadstidspunkt');
        expect(datovelger).not.toHaveFocus();

        await user.click(datovelger);

        expect(datovelger).toHaveFocus();

        await user.tab();

        expect(datovelger).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når søknadstidspunkt mangler og skjemaet submittes', async () => {
        const { screen, user } = render(<SøknadstidspunktDatovelger />, { wrapper: DefaultFormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        expect(screen.getByText('Søknadstidspunkt er påkrevd')).toBeInTheDocument();
    });
});
