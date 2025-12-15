import type { ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import Begrunnelse from './Begrunnelse';
import { render } from '../../../../../../../testutils/testrender';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

const DEFAULT_VALUES: DefaultValues<EndretUtbetalingAndelFormValues> = {
    [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: '',
};

const onSubmit = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

function Wrapper({
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

describe('Begrunnelse', () => {
    test('skal vise begrunnelse', () => {
        const { screen } = render(<Begrunnelse />, { wrapper: Wrapper });

        const begrunnelse = screen.getByLabelText('Begrunnelse');
        expect(begrunnelse).toBeInTheDocument();
    });

    test('skal kunne skrive inn en begrunnelse', async () => {
        const { screen, user } = render(<Begrunnelse />, { wrapper: Wrapper });

        const begrunnelse = screen.getByLabelText('Begrunnelse');

        expect(begrunnelse).toHaveValue('');

        await user.type(begrunnelse, 'Begrunnelse');

        expect(begrunnelse).toHaveValue('Begrunnelse');
    });

    test('skal vise forhåndsutfylt begrunnelse', () => {
        const { screen } = render(<Begrunnelse />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: 'Eksisterende begrunnelse',
                    }}
                />
            ),
        });

        const begrunnelse = screen.getByLabelText('Begrunnelse');
        expect(begrunnelse).toHaveValue('Eksisterende begrunnelse');
    });

    test('skal kunne endre en eksisterende begrunnelse', async () => {
        const { screen, user } = render(<Begrunnelse />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: 'Gammel begrunnelse',
                    }}
                />
            ),
        });

        const begrunnelse = screen.getByLabelText('Begrunnelse');
        expect(begrunnelse).toHaveValue('Gammel begrunnelse');

        await user.clear(begrunnelse);
        await user.type(begrunnelse, 'Ny begrunnelse');

        expect(begrunnelse).toHaveValue('Ny begrunnelse');
    });

    test('skal kunne slette begrunnelse ved å tømme feltet', async () => {
        const { screen, user } = render(<Begrunnelse />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: 'Begrunnelse som skal slettes',
                    }}
                />
            ),
        });

        const begrunnelse = screen.getByLabelText('Begrunnelse');
        expect(begrunnelse).toHaveValue('Begrunnelse som skal slettes');

        await user.clear(begrunnelse);

        expect(begrunnelse).toHaveValue('');
    });

    test('skal støtte lengre tekster', async () => {
        const { screen, user } = render(<Begrunnelse />, { wrapper: Wrapper });

        const begrunnelse = screen.getByLabelText('Begrunnelse');
        const langTekst =
            'Dette er en veldig lang begrunnelse som inneholder mye informasjon om hvorfor utbetalingen er endret.\n' +
            'Den kan inneholde flere linjer og mye detaljer om situasjonen.';

        await user.type(begrunnelse, langTekst);

        expect(begrunnelse).toHaveValue(langTekst);
    });

    test('skal ikke kunne endre begrunnelse når erLesevisning er true', async () => {
        const { screen, user } = render(<Begrunnelse erLesevisning={true} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: 'Låst begrunnelse',
                    }}
                />
            ),
        });

        const begrunnelse = screen.getByLabelText('Begrunnelse');
        expect(begrunnelse).toHaveValue('Låst begrunnelse');
        expect(begrunnelse).toHaveAttribute('readonly');

        await user.type(begrunnelse, 'Ny begrunnelse');

        expect(begrunnelse).toHaveValue('Låst begrunnelse');
    });

    test('skal ikke kunne endre begrunnelse når skjema submitter', async () => {
        const { screen, user } = render(<Begrunnelse />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: 'Begrunnelse under innsending',
                    }}
                    onSubmitDelay={3_000}
                />
            ),
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const begrunnelse = screen.getByLabelText('Begrunnelse');
        expect(begrunnelse).toHaveValue('Begrunnelse under innsending');
        expect(begrunnelse).toHaveAttribute('readonly');

        await user.type(begrunnelse, 'Ny begrunnelse');

        expect(begrunnelse).toHaveValue('Begrunnelse under innsending');
    });

    test('skal fokusere som forventet på komponenten når brukeren klikker på komponenten for å så tabbe ut', async () => {
        const { screen, user } = render(<Begrunnelse />, { wrapper: Wrapper });

        const begrunnelse = screen.getByLabelText('Begrunnelse');
        expect(begrunnelse).not.toHaveFocus();

        await user.click(begrunnelse);

        expect(begrunnelse).toHaveFocus();

        await user.tab();

        expect(begrunnelse).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når begrunnelse mangler og skjemaet submittes', async () => {
        const { screen, user } = render(<Begrunnelse />, { wrapper: Wrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText('Du må begrunne den endrede utbetalingsperioden');
        expect(feilmelding).toBeInTheDocument();
    });
});
