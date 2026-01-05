import type { ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';

import { render } from '../../../../../../../testutils/testrender';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';
import { FomDato } from './FomDato';

const onSubmit = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

function Wrapper({
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

function UtfyltFomDato({ erLesevisning = false }: { erLesevisning?: boolean }) {
    return (
        <FomDato
            tidligsteDato={new Date(2020, 0, 1)}
            senesteDato={new Date(2030, 11, 31)}
            erLesevisning={erLesevisning}
        />
    );
}

beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2025-12-30T12:00:00Z'));
});

afterEach(() => {
    vi.useRealTimers();
});

describe('FomDato', () => {
    test('skal vise felt for f.o.m.', () => {
        const { screen } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).toBeInTheDocument();
    });

    test('skal kunne skrive inn en måned', async () => {
        const { screen, user } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).toHaveValue('');

        await user.type(fomVelger, '01.2025');

        expect(fomVelger).toHaveValue('01.2025');
    });

    test('skal vise forhåndsvalgt måned', () => {
        const { screen } = render(<UtfyltFomDato />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).toHaveValue('januar 2025');
    });

    test('skal kunne endre en valgt måned', async () => {
        const { screen, user } = render(<UtfyltFomDato />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).toHaveValue('januar 2025');

        await user.clear(fomVelger);
        await user.type(fomVelger, '06.2025');

        expect(fomVelger).toHaveValue('06.2025');
    });

    test('skal formatere måned når bruker tabber ut', async () => {
        const { screen, user } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const fomVelger = screen.getByLabelText('F.o.m.');

        await user.clear(fomVelger);
        await user.type(fomVelger, '06.2025');

        expect(fomVelger).toHaveValue('06.2025');

        await user.tab();

        expect(fomVelger).toHaveValue('juni 2025');
    });

    test('skal vise kalenderikon for å åpne monthpicker', async () => {
        const { screen, user } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne månedsvelger' });
        expect(kalenderknapp).toBeInTheDocument();

        await user.click(kalenderknapp);

        const kalender = screen.getByRole('dialog');
        expect(kalender).toBeInTheDocument();
    });

    test('skal kunne velge måned fra kalenderen', async () => {
        const { screen, user } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const kalenderknapp = screen.getByRole('button', { name: 'Åpne månedsvelger' });
        await user.click(kalenderknapp);

        const månedKnapp = screen.getByRole('button', { name: /januar/i });
        await user.click(månedKnapp);

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).toHaveValue('januar 2025');
    });

    test('skal kunne slette måned ved å tømme feltet', async () => {
        const { screen, user } = render(<UtfyltFomDato />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).toHaveValue('januar 2025');

        await user.clear(fomVelger);

        expect(fomVelger).toHaveValue('');
    });

    test('skal ikke kunne endre måned når erLesevisning er true', async () => {
        const { screen, user } = render(<UtfyltFomDato erLesevisning={true} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
                    }}
                />
            ),
        });

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).toHaveValue('januar 2025');
        expect(fomVelger).toHaveAttribute('readonly');

        await user.type(fomVelger, '06.2025');

        expect(fomVelger).toHaveValue('januar 2025');
    });

    test('skal ikke kunne endre måned når skjema submitter', async () => {
        const { screen, user } = render(<UtfyltFomDato />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    defaultValues={{
                        [EndretUtbetalingAndelFeltnavn.FOM]: new Date(2025, 0, 1),
                    }}
                    onSubmitDelay={3_000}
                />
            ),
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).toHaveValue('januar 2025');
        expect(fomVelger).toHaveAttribute('readonly');

        await user.type(fomVelger, '06.2025');

        expect(fomVelger).toHaveValue('januar 2025');
    });

    test('skal fokusere som forventet på komponenten når brukeren klikker på komponenten for å så tabbe ut', async () => {
        const { screen, user } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const fomVelger = screen.getByLabelText('F.o.m.');
        expect(fomVelger).not.toHaveFocus();

        await user.click(fomVelger);

        expect(fomVelger).toHaveFocus();

        await user.tab();

        expect(fomVelger).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når måned mangler og skjemaet submittes', async () => {
        const { screen, user } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText('F.o.m. er påkrevd');
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal vise valideringsfeil når måned er før tidligste dato og skjemaet submittes', async () => {
        const { screen, user } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const fomVelger = screen.getByLabelText('F.o.m.');
        await user.clear(fomVelger);
        await user.type(fomVelger, '12.2019');

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText(/Valgt måned kan ikke være før/);
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal vise valideringsfeil når måned er etter seneste dato og skjemaet submittes', async () => {
        const { screen, user } = render(<UtfyltFomDato />, { wrapper: Wrapper });

        const fomVelger = screen.getByLabelText('F.o.m.');
        await user.clear(fomVelger);
        await user.type(fomVelger, '01.2031');

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const feilmelding = screen.getByText(/Valgt måned kan ikke være etter/);
        expect(feilmelding).toBeInTheDocument();
    });
});
