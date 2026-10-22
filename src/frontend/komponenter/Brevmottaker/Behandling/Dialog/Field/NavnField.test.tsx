import { useErLesevisning } from '@hooks/useErLesevisning';
import { render } from '@testutils/testrender';
import { Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { NavnField } from './NavnField';

vi.mock('@hooks/useErLesevisning');

interface WrapperProps extends PropsWithChildren {
    brevmottakertype?: Brevmottakertype | '';
    onSubmit?: (values: BrevmottakerFormValues) => void | Promise<void>;
}

function Wrapper({ brevmottakertype = '', onSubmit = () => {}, children }: WrapperProps) {
    const form = useForm<BrevmottakerFormValues>({
        defaultValues: {
            [BrevmottakerField.BREVMOTTAKERTYPE]: brevmottakertype,
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

describe('NavnField', () => {
    beforeEach(() => {
        vi.mocked(useErLesevisning).mockReturnValue(false);
    });

    test('skal vise feltet med riktig label', () => {
        const { screen } = render(<NavnField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Navn' })).toBeInTheDocument();
    });

    test('skal lagre det man skriver inn i feltet', async () => {
        const { screen, user } = render(<NavnField />, { wrapper: Wrapper });

        const tekstfelt = screen.getByRole('textbox', { name: 'Navn' });
        await user.type(tekstfelt, 'Ola Nordmann');

        expect(tekstfelt).toHaveValue('Ola Nordmann');
    });

    test('skal vise feilmelding når feltet er tomt', async () => {
        const { screen, user } = render(<NavnField />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Navn er påkrevd.')).toBeInTheDocument();
    });

    test('skal vise feilmelding når feltet kun inneholder mellomrom', async () => {
        const { screen, user } = render(<NavnField />, { wrapper: Wrapper });

        await user.type(screen.getByRole('textbox', { name: 'Navn' }), '   ');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Navn er påkrevd.')).toBeInTheDocument();
    });

    test('skal vise feilmelding når feltet har mer enn 80 tegn', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<NavnField />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.click(screen.getByRole('textbox', { name: 'Navn' }));
        await user.paste('a'.repeat(81));
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Navn kan ikke være mer enn 80 tegn.')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('skal sende inn skjemaet når feltet har nøyaktig 80 tegn', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<NavnField />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.click(screen.getByRole('textbox', { name: 'Navn' }));
        await user.paste('a'.repeat(80));
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit.mock.calls[0][0][BrevmottakerField.NAVN]).toBe('a'.repeat(80));
    });

    test('skal ikke være skrivebeskyttet når man ikke er i lesevisning', () => {
        const { screen } = render(<NavnField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Navn' })).not.toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet når man er i lesevisning', () => {
        vi.mocked(useErLesevisning).mockReturnValue(true);

        const { screen } = render(<NavnField />, { wrapper: Wrapper });

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet mens skjemaet sendes inn', async () => {
        const { screen, user } = render(<NavnField />, {
            wrapper: props => <Wrapper {...props} onSubmit={() => new Promise(() => {})} />,
        });

        const tekstfelt = screen.getByRole('textbox', { name: 'Navn' });
        await user.type(tekstfelt, 'Ola Nordmann');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(tekstfelt).toHaveAttribute('readonly');
    });

    test.each([Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, Brevmottakertype.DØDSBO])(
        'skal være skrivebeskyttet når brevmottakertype er %s fordi navnet er preutfylt',
        (brevmottakertype: Brevmottakertype) => {
            const { screen } = render(<NavnField />, {
                wrapper: props => <Wrapper {...props} brevmottakertype={brevmottakertype} />,
            });

            expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveAttribute('readonly');
        }
    );

    test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
        'skal ikke være skrivebeskyttet når brevmottakertype er %s',
        (brevmottakertype: Brevmottakertype) => {
            const { screen } = render(<NavnField />, {
                wrapper: props => <Wrapper {...props} brevmottakertype={brevmottakertype} />,
            });

            expect(screen.getByRole('textbox', { name: 'Navn' })).not.toHaveAttribute('readonly');
        }
    );
});
