import { Fieldset } from '@navikt/ds-react';
import { render } from '@testutils/testrender';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { BegrunnelseField } from './BegrunnelseField';
import { EndreBehandlendeEnhetFormFields, type EndreBehandlendeEnhetFormValues } from './useEndreBehandlendeEnhetForm';

function Wrapper({ children }: PropsWithChildren) {
    const form = useForm<EndreBehandlendeEnhetFormValues>({
        defaultValues: {
            [EndreBehandlendeEnhetFormFields.ENHET_ID]: '',
            [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: '',
        },
    });

    const {
        handleSubmit,
        formState: { errors },
        setError,
    } = form;

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(() => {})}>
                <Fieldset error={errors.root?.message} legend={'Endre enhet'} hideLegend={true}>
                    {children}
                </Fieldset>
                <button type={'button'} onClick={() => setError('root', { message: 'Ukjent feil' })}>
                    Sett rotfeil
                </button>
                <button type={'submit'}>Send inn</button>
            </form>
        </FormProvider>
    );
}

describe('BegrunnelseField', () => {
    test('viser feltet med riktig label', () => {
        const { screen } = render(<BegrunnelseField readOnly={false} />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Begrunnelse' })).toBeInTheDocument();
    });

    test('viser feilmelding når feltet er tomt og skjemaet valideres', async () => {
        const { screen, user } = render(<BegrunnelseField readOnly={false} />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Begrunnelse må fylles ut.')).toBeInTheDocument();
    });

    test('viser feilmelding når verdien er kortere enn tre tegn', async () => {
        const { screen, user } = render(<BegrunnelseField readOnly={false} />, { wrapper: Wrapper });

        await user.type(screen.getByRole('textbox', { name: 'Begrunnelse' }), 'ab');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Må bruke minst tre tegn.')).toBeInTheDocument();
    });

    test('lagrer det man skriver inn i feltet', async () => {
        const { screen, user } = render(<BegrunnelseField readOnly={false} />, { wrapper: Wrapper });

        const tekstfelt = screen.getByRole('textbox', { name: 'Begrunnelse' });
        await user.type(tekstfelt, 'En gyldig begrunnelse');

        expect(tekstfelt).toHaveValue('En gyldig begrunnelse');
    });

    test('fjerner rotfeil når man endrer verdien i feltet', async () => {
        const { screen, user } = render(<BegrunnelseField readOnly={false} />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Sett rotfeil' }));
        expect(await screen.findByText('Ukjent feil')).toBeInTheDocument();

        await user.type(screen.getByRole('textbox', { name: 'Begrunnelse' }), 'x');

        expect(screen.queryByText('Ukjent feil')).not.toBeInTheDocument();
    });

    test('gjør feltet skrivebeskyttet når readOnly er true', () => {
        const { screen } = render(<BegrunnelseField readOnly={true} />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Begrunnelse' })).toHaveAttribute('readonly');
    });

    test('gjør ikke feltet skrivebeskyttet når readOnly er false', () => {
        const { screen } = render(<BegrunnelseField readOnly={false} />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Begrunnelse' })).not.toHaveAttribute('readonly');
    });
});
