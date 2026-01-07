import type { ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import { AvtaletidspunktDeltBostedDatovelger } from './AvtaletidspunktDeltBostedDatovelger';
import { render } from '../../../../../../../testutils/testrender';
import { IEndretUtbetalingAndelÅrsak } from '../../../../../../../typer/utbetalingAndel';
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

beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2025-12-31T12:00:00Z'));
});

afterEach(() => {
    vi.useRealTimers();
});

describe('AvtaletidspunktDeltBostedDatovelger', () => {
    test('skal vise avtaletidspunkt delt bosted datovelger', () => {
        const { screen } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: Wrapper });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toBeInTheDocument();
    });

    test('skal kunne skrive inn en dato', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: Wrapper });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');

        expect(datovelger).toHaveValue('');

        await user.type(datovelger, '01.01.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal vise forhåndsvalgt dato', () => {
        const { screen } = render(<AvtaletidspunktDeltBostedDatovelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal kunne endre en valgt dato', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');

        await user.clear(datovelger);
        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('15.06.2025');
    });

    test('skal vise kalenderikon for å åpne datepicker', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: Wrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne datovelger' });
        expect(kalenderknapp).toBeInTheDocument();

        await user.click(kalenderknapp);

        const kalender = screen.getByRole('dialog');
        expect(kalender).toBeInTheDocument();
    });

    test('skal kunne velge dato fra kalenderen', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, { wrapper: Wrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne datovelger' });
        await user.click(kalenderknapp);

        const dagKnapp = screen.getByRole('button', { name: /15$/ });
        await user.click(dagKnapp);

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('15.12.2025');
    });

    test('skal kunne slette dato ved å tømme feltet', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');

        await user.clear(datovelger);

        expect(datovelger).toHaveValue('');
    });

    test('skal ikke kunne endre dato når erLesevisning er true', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger erLesevisning={true} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');
        expect(datovelger).toHaveAttribute('readonly');

        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal ikke kunne endre dato når skjema submitter', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
                    }}
                    onSubmitDelay={3_000}
                />
            ),
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const datovelger = screen.getByLabelText('Avtaletidspunkt delt bosted');
        expect(datovelger).toHaveValue('01.01.2025');
        expect(datovelger).toHaveAttribute('readonly');

        await user.type(datovelger, '15.06.2025');

        expect(datovelger).toHaveValue('01.01.2025');
    });

    test('skal vise valideringsfeil når avtaletidspunkt mangler og årsak er DELT_BOSTED', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                    }}
                />
            ),
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText('Avtaletidspunkt for delt bosted er påkrevd');
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal ikke vise valideringsfeil når avtaletidspunkt mangler og årsak ikke er DELT_BOSTED', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND,
                    }}
                />
            ),
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.queryByText('Avtaletidspunkt for delt bosted er påkrevd');
        expect(feilmelding).not.toBeInTheDocument();
    });

    test('skal ikke vise valideringsfeil når avtaletidspunkt er utfylt og årsak er DELT_BOSTED', async () => {
        const { screen, user } = render(<AvtaletidspunktDeltBostedDatovelger />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                        [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.queryByText('Avtaletidspunkt for delt bosted er påkrevd');
        expect(feilmelding).not.toBeInTheDocument();
    });
});
