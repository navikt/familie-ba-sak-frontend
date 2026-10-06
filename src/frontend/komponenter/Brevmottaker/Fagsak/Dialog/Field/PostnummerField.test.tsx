import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { render } from '@testutils/testrender';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { PostnummerField } from './PostnummerField';

vi.mock('@hooks/useErLesevisningFagsak');

interface WrapperProps extends PropsWithChildren {
    onSubmit?: (values: BrevmottakerFormValues) => void | Promise<void>;
}

function Wrapper({ onSubmit = () => {}, children }: WrapperProps) {
    const form = useForm<BrevmottakerFormValues>({
        defaultValues: {
            [BrevmottakerField.BREVMOTTAKERTYPE]: '',
            [BrevmottakerField.NAVN]: '',
            [BrevmottakerField.LAND]: 'NO',
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

describe('PostnummerField', () => {
    beforeEach(() => {
        vi.mocked(useErLesevisningFagsak).mockReturnValue(false);
    });

    test('skal vise feltet med riktig label', () => {
        const { screen } = render(<PostnummerField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toBeInTheDocument();
    });

    test('skal lagre det man skriver inn i feltet', async () => {
        const { screen, user } = render(<PostnummerField />, { wrapper: Wrapper });

        const tekstfelt = screen.getByRole('textbox', { name: 'Postnummer' });
        await user.type(tekstfelt, '0001');

        expect(tekstfelt).toHaveValue('0001');
    });

    test('skal ikke kunne skrive inn mer enn 4 tegn', async () => {
        const { screen, user } = render(<PostnummerField />, { wrapper: Wrapper });

        const tekstfelt = screen.getByRole('textbox', { name: 'Postnummer' });
        await user.type(tekstfelt, '12345');

        expect(tekstfelt).toHaveValue('1234');
    });

    test('skal vise numerisk tastatur på mobil', () => {
        const { screen } = render(<PostnummerField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toHaveAttribute('inputmode', 'numeric');
    });

    test('skal vise feilmelding når feltet er tomt', async () => {
        const { screen, user } = render(<PostnummerField />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Postnummer er påkrevd.')).toBeInTheDocument();
    });

    test.each(['123', 'abcd', '12a4', ' 123'])(
        'skal vise feilmelding når postnummer er "%s"',
        async (postnummer: string) => {
            const onSubmit = vi.fn();
            const { screen, user } = render(<PostnummerField />, {
                wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
            });

            await user.type(screen.getByRole('textbox', { name: 'Postnummer' }), postnummer);
            await user.click(screen.getByRole('button', { name: 'Send inn' }));

            expect(await screen.findByText('Postnummer må være 4 siffer.')).toBeInTheDocument();
            expect(onSubmit).not.toHaveBeenCalled();
        }
    );

    test('skal sende inn skjemaet når postnummer er 4 siffer', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<PostnummerField />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.type(screen.getByRole('textbox', { name: 'Postnummer' }), '0001');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit.mock.calls[0][0][BrevmottakerField.POSTNUMMER]).toBe('0001');
    });

    test('skal ikke være skrivebeskyttet når man ikke er i lesevisning', () => {
        const { screen } = render(<PostnummerField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Postnummer' })).not.toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet når man er i lesevisning', () => {
        vi.mocked(useErLesevisningFagsak).mockReturnValue(true);

        const { screen } = render(<PostnummerField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet mens skjemaet sendes inn', async () => {
        const { screen, user } = render(<PostnummerField />, {
            wrapper: props => <Wrapper {...props} onSubmit={() => new Promise(() => {})} />,
        });

        const tekstfelt = screen.getByRole('textbox', { name: 'Postnummer' });
        await user.type(tekstfelt, '0001');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(tekstfelt).toHaveAttribute('readonly');
    });
});
