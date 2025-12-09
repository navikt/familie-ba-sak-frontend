import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import Månedvelger from './Månedvelger';
import { render } from '../../../../../../../testutils/testrender';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

const DEFAULT_VALUES: DefaultValues<EndretUtbetalingAndelFormValues> = {
    [EndretUtbetalingAndelFeltnavn.FOM]: undefined,
    [EndretUtbetalingAndelFeltnavn.TOM]: undefined,
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

function UtfyltMånedvelger({
    name = EndretUtbetalingAndelFeltnavn.FOM,
    erLesevisning = false,
    valgfri = false,
}: {
    name?: EndretUtbetalingAndelFeltnavn.FOM | EndretUtbetalingAndelFeltnavn.TOM;
    erLesevisning?: boolean;
    valgfri?: boolean;
}) {
    return (
        <Månedvelger
            name={name}
            label="Månedvelger label"
            tidligsteDato={new Date(2020, 1, 1)}
            senesteDato={new Date(2030, 12, 31)}
            erLesevisning={erLesevisning}
            valgfri={valgfri}
        />
    );
}

describe('Månedvelger', () => {
    test('skal vise månedvelger', () => {
        const { screen } = render(<UtfyltMånedvelger />, { wrapper: DefaultFormWrapper });

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toBeInTheDocument();
    });

    test('skal kunne skrive inn en måned', async () => {
        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: DefaultFormWrapper });

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toHaveValue('');

        await user.type(månedvelger, '01.2025');

        expect(månedvelger).toHaveValue('01.2025');
    });

    test('skal vise forhåndsvalgt måned', () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen } = render(<UtfyltMånedvelger />, { wrapper: FormWrapper });

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toHaveValue('januar 2025');
    });

    test('skal kunne endre en valgt måned', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: FormWrapper });

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toHaveValue('januar 2025');

        await user.clear(månedvelger);
        await user.type(månedvelger, '06.2025');

        expect(månedvelger).toHaveValue('06.2025');
    });

    test('skal formatere måned når bruker tabber ut', async () => {
        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: DefaultFormWrapper });

        const månedvelger = screen.getByLabelText('Månedvelger label');

        await user.clear(månedvelger);
        await user.type(månedvelger, '06.2025');

        expect(månedvelger).toHaveValue('06.2025');

        await user.tab();

        expect(månedvelger).toHaveValue('juni 2025');
    });

    test('skal vise kalenderikon for å åpne monthpicker', async () => {
        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: DefaultFormWrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne månedsvelger' });
        expect(kalenderknapp).toBeInTheDocument();

        await user.click(kalenderknapp);

        const kalender = screen.getByRole('dialog');
        expect(kalender).toBeInTheDocument();
    });

    test('skal kunne velge måned fra kalenderen', async () => {
        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: DefaultFormWrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne månedsvelger' });
        await user.click(kalenderknapp);

        const månedKnapp = screen.getByRole('button', { name: /januar/i });
        await user.click(månedKnapp);

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toHaveValue('januar 2025');
    });

    test('skal kunne slette måned ved å tømme feltet', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: FormWrapper });

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toHaveValue('januar 2025');

        await user.clear(månedvelger);

        expect(månedvelger).toHaveValue('');
    });

    test('skal ikke kunne endre måned når erLesevisning er true', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<UtfyltMånedvelger erLesevisning={true} />, {
            wrapper: FormWrapper,
        });

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toHaveValue('januar 2025');
        expect(månedvelger).toHaveAttribute('readonly');

        await user.type(månedvelger, '06.2025');

        expect(månedvelger).toHaveValue('januar 2025');
    });

    test('skal ikke kunne endre måned når skjema submitter', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues, onSubmitDelay: 3_000 });
        }

        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toHaveValue('januar 2025');
        expect(månedvelger).toHaveAttribute('readonly');

        await user.type(månedvelger, '06.2025');

        expect(månedvelger).toHaveValue('januar 2025');
    });

    test('skal fokusere som forventet på komponenten når brukeren klikker på komponenten for å så tabbe ut', async () => {
        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: DefaultFormWrapper });

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).not.toHaveFocus();

        await user.click(månedvelger);

        expect(månedvelger).toHaveFocus();

        await user.tab();

        expect(månedvelger).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når måned mangler og skjemaet submittes', async () => {
        const { screen, user } = render(<UtfyltMånedvelger />, { wrapper: DefaultFormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText('Månedvelger label er påkrevd');
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal ikke vise valideringsfeil når måned mangler og valgfri er true', async () => {
        const { screen, user } = render(<UtfyltMånedvelger valgfri={true} />, { wrapper: DefaultFormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.queryByText('Månedvelger label er påkrevd');
        expect(feilmelding).not.toBeInTheDocument();
    });

    test('skal fungere med TOM feltnavnet', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.TOM]: new Date(2025, 11, 31),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<UtfyltMånedvelger name={EndretUtbetalingAndelFeltnavn.TOM} />, {
            wrapper: FormWrapper,
        });

        const månedvelger = screen.getByLabelText('Månedvelger label');
        expect(månedvelger).toHaveValue('desember 2025');

        await user.clear(månedvelger);
        await user.type(månedvelger, '11.2025');

        expect(månedvelger).toHaveValue('11.2025');
    });
});
