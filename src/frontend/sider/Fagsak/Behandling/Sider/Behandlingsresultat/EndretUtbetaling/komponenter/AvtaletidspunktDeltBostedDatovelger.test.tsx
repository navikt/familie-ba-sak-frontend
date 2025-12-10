import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import AvtaletidspunktDeltBostedDatovelger from './AvtaletidspunktDeltBostedDatovelger';
import { render } from '../../../../../../../testutils/testrender';
import { IEndretUtbetalingAndelÅrsak } from '../../../../../../../typer/utbetalingAndel';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

const DEFAULT_VALUES: DefaultValues<EndretUtbetalingAndelFormValues> = {
    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: '',
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

describe('AvtaletidspunktDeltBostedDatovelger', () => {
    test('skal vise avtaletidspunkt delt bosted datovelger', () => {
        const { screen } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: DefaultFormWrapper });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toBeInTheDocument();
    });

    test('skal kunne skrive inn en dato', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: DefaultFormWrapper });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');

        expect(datovelger).toHaveValue('');

        await user.type(datovelger, '01.01.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal vise forhåndsvalgt dato', () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: FormWrapper });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal kunne endre en valgt dato', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: FormWrapper });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');

        await user.clear(datovelger);
        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('15.06.2025');
    });

    test('skal vise kalenderikon for å åpne datepicker', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: DefaultFormWrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne datovelger' });
        expect(kalenderknapp).toBeInTheDocument();

        await user.click(kalenderknapp);

        const kalender = screen.getByRole('dialog');
        expect(kalender).toBeInTheDocument();
    });

    test('skal kunne velge dato fra kalenderen', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: DefaultFormWrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne datovelger' });
        await user.click(kalenderknapp);

        const dagKnapp = screen.getByRole('button', { name: /15$/ });
        await user.click(dagKnapp);

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('15.12.2025');
    });

    test('skal kunne slette dato ved å tømme feltet', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: FormWrapper });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');

        await user.clear(datovelger);

        expect(datovelger).toHaveValue('');
    });

    test('skal ikke kunne endre dato når erLesevisning er true', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger erLesevisning={true} />, {
            wrapper: FormWrapper,
        });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');
        expect(datovelger).toHaveAttribute('readonly');

        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal ikke kunne endre dato når skjema submitter', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues, onSubmitDelay: 3_000 });
        }

        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');
        expect(datovelger).toHaveAttribute('readonly');

        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal vise valideringsfeil når avtaletidspunkt mangler og årsak er DELT_BOSTED', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText('Avtaletidspunkt for delt bosted er påkrevd');
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal ikke vise valideringsfeil når avtaletidspunkt mangler og årsak ikke er DELT_BOSTED', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND,
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.queryByText('Avtaletidspunkt for delt bosted er påkrevd');
        expect(feilmelding).not.toBeInTheDocument();
    });

    test('skal ikke vise valideringsfeil når avtaletidspunkt er utfylt og årsak er DELT_BOSTED', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.queryByText('Avtaletidspunkt for delt bosted er påkrevd');
        expect(feilmelding).not.toBeInTheDocument();
    });
});
