import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { render } from '@testutils/testrender';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { PoststedField } from './PoststedField';

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

describe('PoststedField', () => {
    beforeEach(() => {
        vi.mocked(useErLesevisningFagsak).mockReturnValue(false);
    });

    test('skal vise feltet med riktig label', () => {
        const { screen } = render(<PoststedField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Poststed' })).toBeInTheDocument();
    });

    test('skal lagre det man skriver inn i feltet', async () => {
        const { screen, user } = render(<PoststedField />, { wrapper: Wrapper });

        const tekstfelt = screen.getByRole('textbox', { name: 'Poststed' });
        await user.type(tekstfelt, 'Oslo');

        expect(tekstfelt).toHaveValue('Oslo');
    });

    test('skal vise feilmelding når feltet er tomt', async () => {
        const { screen, user } = render(<PoststedField />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Poststed er påkrevd.')).toBeInTheDocument();
    });

    test('skal vise feilmelding når feltet kun inneholder mellomrom', async () => {
        const { screen, user } = render(<PoststedField />, { wrapper: Wrapper });

        await user.type(screen.getByRole('textbox', { name: 'Poststed' }), '   ');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Poststed er påkrevd.')).toBeInTheDocument();
    });

    test('skal vise feilmelding når feltet har mer enn 50 tegn', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<PoststedField />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.click(screen.getByRole('textbox', { name: 'Poststed' }));
        await user.paste('a'.repeat(51));
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Poststed kan ikke være mer enn 50 tegn.')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('skal sende inn skjemaet når feltet har nøyaktig 50 tegn', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<PoststedField />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.click(screen.getByRole('textbox', { name: 'Poststed' }));
        await user.paste('a'.repeat(50));
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit.mock.calls[0][0][BrevmottakerField.POSTSTED]).toBe('a'.repeat(50));
    });

    test('skal ikke være skrivebeskyttet når man ikke er i lesevisning', () => {
        const { screen } = render(<PoststedField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Poststed' })).not.toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet når man er i lesevisning', () => {
        vi.mocked(useErLesevisningFagsak).mockReturnValue(true);

        const { screen } = render(<PoststedField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Poststed' })).toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet mens skjemaet sendes inn', async () => {
        const { screen, user } = render(<PoststedField />, {
            wrapper: props => <Wrapper {...props} onSubmit={() => new Promise(() => {})} />,
        });

        const tekstfelt = screen.getByRole('textbox', { name: 'Poststed' });
        await user.type(tekstfelt, 'Oslo');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(tekstfelt).toHaveAttribute('readonly');
    });
});
