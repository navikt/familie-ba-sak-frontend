import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import { render } from '../../../../../../../testutils/testrender';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';
import TomDato from './TomDato';

const onSubmit = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

function DefaultFormWrapper({
    children,
    defaultValues = {},
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

function UtfyltTomDato({ erLesevisning = false, valgfri = false }: { erLesevisning?: boolean; valgfri?: boolean }) {
    return (
        <TomDato
            tidligsteDato={new Date(2020, 0, 1)}
            senesteDato={new Date(2030, 11, 31)}
            erLesevisning={erLesevisning}
            valgfri={valgfri}
        />
    );
}

describe('TomDato', () => {
    test('skal vise felt for t.o.m.', () => {
        const { screen } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).toBeInTheDocument();
    });

    test('skal kunne skrive inn en måned', async () => {
        const { screen, user } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).toHaveValue('');

        await user.type(tomVelger, '01.2025');

        expect(tomVelger).toHaveValue('01.2025');
    });

    test('skal vise forhåndsvalgt måned', () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.TOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen } = render(<UtfyltTomDato />, { wrapper: FormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).toHaveValue('januar 2025');
    });

    test('skal kunne endre en valgt måned', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.TOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<UtfyltTomDato />, { wrapper: FormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).toHaveValue('januar 2025');

        await user.clear(tomVelger);
        await user.type(tomVelger, '06.2025');

        expect(tomVelger).toHaveValue('06.2025');
    });

    test('skal formatere måned når bruker tabber ut', async () => {
        const { screen, user } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');

        await user.clear(tomVelger);
        await user.type(tomVelger, '06.2025');

        expect(tomVelger).toHaveValue('06.2025');

        await user.tab();

        expect(tomVelger).toHaveValue('juni 2025');
    });

    test('skal vise kalenderikon for å åpne monthpicker', async () => {
        const { screen, user } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne månedsvelger' });
        expect(kalenderknapp).toBeInTheDocument();

        await user.click(kalenderknapp);

        const kalender = screen.getByRole('dialog');
        expect(kalender).toBeInTheDocument();
    });

    test('skal kunne velge måned fra kalenderen', async () => {
        const { screen, user } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne månedsvelger' });
        await user.click(kalenderknapp);

        const månedKnapp = screen.getByRole('button', { name: /januar/i });
        await user.click(månedKnapp);

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).toHaveValue('januar 2025');
    });

    test('skal kunne slette måned ved å tømme feltet', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.TOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<UtfyltTomDato />, { wrapper: FormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).toHaveValue('januar 2025');

        await user.clear(tomVelger);

        expect(tomVelger).toHaveValue('');
    });

    test('skal ikke kunne endre måned når erLesevisning er true', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.TOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<UtfyltTomDato erLesevisning={true} />, {
            wrapper: FormWrapper,
        });

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).toHaveValue('januar 2025');
        expect(tomVelger).toHaveAttribute('readonly');

        await user.type(tomVelger, '06.2025');

        expect(tomVelger).toHaveValue('januar 2025');
    });

    test('skal ikke kunne endre måned når skjema submitter', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.TOM]: new Date(2025, 0, 1),
            };
            return DefaultFormWrapper({ children, defaultValues, onSubmitDelay: 3_000 });
        }

        const { screen, user } = render(<UtfyltTomDato />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).toHaveValue('januar 2025');
        expect(tomVelger).toHaveAttribute('readonly');

        await user.type(tomVelger, '06.2025');

        expect(tomVelger).toHaveValue('januar 2025');
    });

    test('skal fokusere som forventet på komponenten når brukeren klikker på komponenten for å så tabbe ut', async () => {
        const { screen, user } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');
        expect(tomVelger).not.toHaveFocus();

        await user.click(tomVelger);

        expect(tomVelger).toHaveFocus();

        await user.tab();

        expect(tomVelger).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når måned mangler', async () => {
        const { screen, user } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText('T.o.m. er påkrevd');
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal vise valideringsfeil når måned er før tidligste dato', async () => {
        const { screen, user } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');
        await user.clear(tomVelger);
        await user.type(tomVelger, '12.2019');

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText(/Valgt måned kan ikke være før/);
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal vise valideringsfeil når måned er etter seneste dato', async () => {
        const { screen, user } = render(<UtfyltTomDato />, { wrapper: DefaultFormWrapper });

        const tomVelger = screen.getByLabelText('T.o.m.');
        await user.clear(tomVelger);
        await user.type(tomVelger, '01.2031');

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText(/Valgt måned kan ikke være etter/);
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal ikke vise valideringsfeil når måned mangler og valgfri er true', async () => {
        const { screen, user } = render(<UtfyltTomDato valgfri={true} />, { wrapper: DefaultFormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.queryByText('T.o.m. er påkrevd');
        expect(feilmelding).not.toBeInTheDocument();
    });
});
