import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { render } from '@testutils/testrender';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { Adresselinje2Field } from './Adresselinje2Field';

vi.mock('@hooks/useErLesevisningFagsak');

interface WrapperProps extends PropsWithChildren {
    onSubmit?: (values: BrevmottakerFormValues) => void | Promise<void>;
}

function Wrapper({ onSubmit = () => {}, children }: WrapperProps) {
    const form = useForm<BrevmottakerFormValues>({
        defaultValues: {
            [BrevmottakerField.BREVMOTTAKERTYPE]: '',
            [BrevmottakerField.NAVN]: '',
            [BrevmottakerField.LAND]: null,
            [BrevmottakerField.ADRESSELINJE_1]: '',
            [BrevmottakerField.ADRESSELINJE_2]: '',
            [BrevmottakerField.POSTNUMMER]: '',
            [BrevmottakerField.POSTSTED]: '',
        },
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
                <button type={'submit'}>Send inn</button>
            </form>
        </FormProvider>
    );
}

describe('Adresselinje2Field', () => {
    beforeEach(() => {
        vi.mocked(useErLesevisningFagsak).mockReturnValue(false);
    });

    test('skal vise feltet med riktig label', () => {
        const { screen } = render(<Adresselinje2Field />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Adresselinje 2 (valgfri)' })).toBeInTheDocument();
    });

    test('skal lagre det man skriver inn i feltet', async () => {
        const { screen, user } = render(<Adresselinje2Field />, { wrapper: Wrapper });

        const tekstfelt = screen.getByRole('textbox', { name: 'Adresselinje 2 (valgfri)' });
        await user.type(tekstfelt, 'Leilighet 101');

        expect(tekstfelt).toHaveValue('Leilighet 101');
    });

    test('skal sende inn skjemaet når feltet er tomt', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<Adresselinje2Field />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit.mock.calls[0][0][BrevmottakerField.ADRESSELINJE_2]).toBe('');
    });

    test('skal vise feilmelding når feltet har mer enn 80 tegn', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<Adresselinje2Field />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.click(screen.getByRole('textbox', { name: 'Adresselinje 2 (valgfri)' }));
        await user.paste('a'.repeat(81));
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Adresselinje 2 kan ikke være mer enn 80 tegn.')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('skal sende inn skjemaet når feltet har nøyaktig 80 tegn', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<Adresselinje2Field />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.click(screen.getByRole('textbox', { name: 'Adresselinje 2 (valgfri)' }));
        await user.paste('a'.repeat(80));
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit.mock.calls[0][0][BrevmottakerField.ADRESSELINJE_2]).toBe('a'.repeat(80));
        expect(screen.queryByText('Adresselinje 2 kan ikke være mer enn 80 tegn.')).not.toBeInTheDocument();
    });

    test('skal ikke være skrivebeskyttet når man ikke er i lesevisning', () => {
        const { screen } = render(<Adresselinje2Field />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Adresselinje 2 (valgfri)' })).not.toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet når man er i lesevisning', () => {
        vi.mocked(useErLesevisningFagsak).mockReturnValue(true);

        const { screen } = render(<Adresselinje2Field />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Adresselinje 2 (valgfri)' })).toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet mens skjemaet sendes inn', async () => {
        const { screen, user } = render(<Adresselinje2Field />, {
            wrapper: props => <Wrapper {...props} onSubmit={() => new Promise(() => {})} />,
        });

        const tekstfelt = screen.getByRole('textbox', { name: 'Adresselinje 2 (valgfri)' });
        await user.type(tekstfelt, 'Leilighet 101');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(tekstfelt).toHaveAttribute('readonly');
    });
});
