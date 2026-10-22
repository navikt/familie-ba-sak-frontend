import { useErLesevisning } from '@hooks/useErLesevisning';
import type { Regionkode } from '@komponenter/FlaggCombobox';
import { BrukerProvider } from '@sider/Fagsak/BrukerContext';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { render } from '@testutils/testrender';
import { Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { LandField } from './LandField';

vi.mock('@hooks/useErLesevisning');

const BRUKER_NAVN = 'Bruker Brukersen';

interface WrapperProps extends PropsWithChildren {
    brevmottakertype?: Brevmottakertype | '';
    land?: Regionkode | null;
    onSubmit?: (values: BrevmottakerFormValues) => void | Promise<void>;
}

function Wrapper(props: WrapperProps) {
    return (
        <BrukerProvider bruker={lagPerson({ navn: BRUKER_NAVN })}>
            <Skjema {...props} />
        </BrukerProvider>
    );
}

function Skjema({ brevmottakertype = '', land = null, onSubmit = () => {}, children }: WrapperProps) {
    const form = useForm<BrevmottakerFormValues>({
        defaultValues: {
            [BrevmottakerField.BREVMOTTAKERTYPE]: brevmottakertype,
            [BrevmottakerField.NAVN]: '',
            [BrevmottakerField.LAND]: land,
            [BrevmottakerField.ADRESSELINJE_1]: '',
            [BrevmottakerField.ADRESSELINJE_2]: '',
            [BrevmottakerField.POSTNUMMER]: '',
            [BrevmottakerField.POSTSTED]: '',
        },
    });

    const { control, register, handleSubmit } = form;

    const valgtLand = useWatch({ control, name: BrevmottakerField.LAND });

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {children}
                <label>
                    Navn
                    <input {...register(BrevmottakerField.NAVN)} />
                </label>
                <label>
                    Postnummer
                    <input {...register(BrevmottakerField.POSTNUMMER)} />
                </label>
                <label>
                    Poststed
                    <input {...register(BrevmottakerField.POSTSTED)} />
                </label>
                <output aria-label={'Valgt land'}>{JSON.stringify(valgtLand)}</output>
                <button type={'submit'}>Send inn</button>
            </form>
        </FormProvider>
    );
}

describe('LandField', () => {
    beforeEach(() => {
        vi.mocked(useErLesevisning).mockReturnValue(false);
    });

    test('skal vise feltet med riktig label', () => {
        const { screen } = render(<LandField />, { wrapper: Wrapper });

        expect(screen.getByRole('combobox', { name: 'Land' })).toBeInTheDocument();
    });

    test('skal lagre valgt land i skjemaet', async () => {
        const { screen, user } = render(<LandField />, { wrapper: Wrapper });

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Sverige{Enter}');

        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('"SE"');
    });

    test('skal vise feilmelding når land ikke er valgt', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
        });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Land er påkrevd.')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('skal ikke kunne velge flyktning', async () => {
        const { screen, user } = render(<LandField />, { wrapper: Wrapper });

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Flyktning{Enter}');

        expect(screen.getByText('Fant ingen treff')).toBeInTheDocument();
        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('null');
    });

    test('skal kunne velge Norge når brevmottaker ikke er bruker med utenlandsk adresse', async () => {
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} brevmottakertype={Brevmottakertype.FULLMEKTIG} />,
        });

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Norge{Enter}');

        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('"NO"');
    });

    test('skal ikke kunne velge Norge når brevmottaker er bruker med utenlandsk adresse', async () => {
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} brevmottakertype={Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE} />,
        });

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Norge{Enter}');

        expect(screen.getByText('Fant ingen treff')).toBeInTheDocument();
        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('null');
    });

    test('skal vise feilmelding når Norge er valgt for bruker med utenlandsk adresse', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<LandField />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    brevmottakertype={Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE}
                    land={'NO'}
                    onSubmit={onSubmit}
                />
            ),
        });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Norge kan ikke velges for bruker med utenlandsk adresse.')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('skal sende inn skjemaet når et gyldig land er valgt', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} brevmottakertype={Brevmottakertype.FULLMEKTIG} onSubmit={onSubmit} />,
        });

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Sverige{Enter}');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit.mock.calls[0][0][BrevmottakerField.LAND]).toBe('SE');
    });

    test('skal nullstille postnummer og poststed når man velger et annet land enn Norge', async () => {
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} land={'NO'} />,
        });

        await user.type(screen.getByRole('textbox', { name: 'Postnummer' }), '0001');
        await user.type(screen.getByRole('textbox', { name: 'Poststed' }), 'Oslo');

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Sverige{Enter}');

        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('"SE"');

        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toHaveValue('');
        expect(screen.getByRole('textbox', { name: 'Poststed' })).toHaveValue('');
    });

    test('skal ikke nullstille postnummer og poststed når man velger Norge', async () => {
        const { screen, user } = render(<LandField />, { wrapper: Wrapper });

        await user.type(screen.getByRole('textbox', { name: 'Postnummer' }), '0001');
        await user.type(screen.getByRole('textbox', { name: 'Poststed' }), 'Oslo');

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Norge{Enter}');

        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('"NO"');
        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toHaveValue('0001');
        expect(screen.getByRole('textbox', { name: 'Poststed' })).toHaveValue('Oslo');
    });

    test('skal preutfylle navn med "v/dødsbo" når man velger Norge for dødsbo', async () => {
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} brevmottakertype={Brevmottakertype.DØDSBO} land={'SE'} />,
        });

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Norge{Enter}');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue(`${BRUKER_NAVN} v/dødsbo`);
    });

    test('skal preutfylle navn med "Estate of" når man velger et annet land enn Norge for dødsbo', async () => {
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} brevmottakertype={Brevmottakertype.DØDSBO} />,
        });

        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Sverige{Enter}');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue(`Estate of ${BRUKER_NAVN}`);
    });

    test('skal ikke endre navn når man velger land for andre brevmottakertyper enn dødsbo', async () => {
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} brevmottakertype={Brevmottakertype.FULLMEKTIG} />,
        });

        await user.type(screen.getByRole('textbox', { name: 'Navn' }), 'Ola Nordmann');
        await user.type(screen.getByRole('combobox', { name: 'Land' }), 'Sverige{Enter}');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue('Ola Nordmann');
    });

    test('skal ikke være skrivebeskyttet når man ikke er i lesevisning', () => {
        const { screen } = render(<LandField />, { wrapper: Wrapper });

        expect(screen.getByRole('combobox', { name: 'Land' })).not.toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet når man er i lesevisning', () => {
        vi.mocked(useErLesevisning).mockReturnValue(true);

        const { screen } = render(<LandField />, { wrapper: Wrapper });

        expect(screen.getByRole('combobox', { name: 'Land' })).toHaveAttribute('readonly');
    });

    test('skal være skrivebeskyttet mens skjemaet sendes inn', async () => {
        const { screen, user } = render(<LandField />, {
            wrapper: props => <Wrapper {...props} land={'SE'} onSubmit={() => new Promise(() => {})} />,
        });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(screen.getByRole('combobox', { name: 'Land' })).toHaveAttribute('readonly');
    });
});
