import { useErLesevisning } from '@hooks/useErLesevisning';
import { tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { render } from '@testutils/testrender';
import { format } from 'date-fns';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { EndringstidspunktFelt } from './EndringstidspunktFelt';
import { Feltnavn, type FormValues } from './useEndringstidspunktForm';

vi.mock('@hooks/useErLesevisning');

function Wrapper({ children }: PropsWithChildren) {
    const form = useForm<FormValues>({
        defaultValues: {
            [Feltnavn.ENDRINGSTIDSPUNKT]: null,
        },
    });

    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = form;

    const endringstidspunkt = useWatch({ control, name: Feltnavn.ENDRINGSTIDSPUNKT });

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(() => {})}>
                {children}
                <button type={'submit'}>Send inn</button>
                <output aria-label={'Verdi'}>{JSON.stringify(endringstidspunkt)}</output>
                <output aria-label={'Endret'}>{String(isDirty)}</output>
            </form>
        </FormProvider>
    );
}

describe('EndringstidspunktFelt', () => {
    beforeEach(() => {
        vi.mocked(useErLesevisning).mockReturnValue(false);
    });

    test('viser feltet med riktig label og placeholder', () => {
        const { screen } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' })).toHaveAttribute(
            'placeholder',
            'DD.MM.ÅÅÅÅ'
        );
    });

    test('viser feilmelding når feltet er tomt', async () => {
        const { screen, user } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Du må velge en gyldig dato.')).toBeInTheDocument();
    });

    test('viser verdien man skriver inn når datoen er gyldig', async () => {
        const { screen, user } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        const datofelt = screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' });

        await user.type(datofelt, '15.06.2023');

        expect(datofelt).toHaveValue('15.06.2023');
        expect(screen.queryByText(/du må velge en gyldig dato/i)).not.toBeInTheDocument();
    });

    test('lagrer gyldig dato som ISO-dato i skjemaet', async () => {
        const { screen, user } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        await user.type(screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' }), '15.06.2023');

        expect(screen.getByRole('status', { name: 'Verdi' })).toHaveTextContent('"2023-06-15"');
        expect(screen.getByRole('status', { name: 'Endret' })).toHaveTextContent('true');
    });

    test('setter verdien tilbake til null og skjemaet er ikke endret når feltet tømmes', async () => {
        const { screen, user } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        const datofelt = screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' });

        await user.type(datofelt, '15.06.2023');
        await user.clear(datofelt);

        expect(screen.getByRole('status', { name: 'Verdi' })).toHaveTextContent('null');
        expect(screen.getByRole('status', { name: 'Endret' })).toHaveTextContent('false');
    });

    test('setter verdien til null ved ugyldig dato', async () => {
        const { screen, user } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        await user.type(screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' }), '31.13.2023');

        expect(screen.getByRole('status', { name: 'Verdi' })).toHaveTextContent('null');
    });

    test('viser feilmelding når datoen er tidligere enn tidligste gyldige dato', async () => {
        const { screen, user } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));
        await screen.findByText('Du må velge en gyldig dato.');

        const datofelt = screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' });
        await user.type(datofelt, '01.01.1899');

        expect(
            await screen.findByText(
                `Du må velge en dato som er senere enn 1. ${format(tidligsteRelevanteDato, 'MMMM yyyy')}.`
            )
        ).toBeInTheDocument();
    });

    test('viser feilmelding når datoen er frem i tid', async () => {
        const { screen, user } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));
        await screen.findByText('Du må velge en gyldig dato.');

        const datofelt = screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' });
        await user.type(datofelt, '01.01.2999');

        expect(await screen.findByText('Du kan ikke sette en dato som er frem i tid.')).toBeInTheDocument();
    });

    test('viser feilmelding når datoen ikke er gyldig', async () => {
        const { screen, user } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));
        await screen.findByText('Du må velge en gyldig dato.');

        const datofelt = screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' });
        await user.type(datofelt, '31.13.2023');

        expect(await screen.findByText('Du må velge en gyldig dato.')).toBeInTheDocument();
    });

    test('gjør feltet skrivebeskyttet i lesevisning', () => {
        vi.mocked(useErLesevisning).mockReturnValue(true);

        const { screen } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' })).toHaveAttribute('readonly');
    });

    test('gjør ikke feltet skrivebeskyttet utenfor lesevisning', () => {
        const { screen } = render(<EndringstidspunktFelt />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Nytt endringstidspunkt' })).not.toHaveAttribute('readonly');
    });
});
