import { BrukerProvider } from '@sider/Fagsak/BrukerContext';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { render } from '@testutils/testrender';
import { Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { BrevmottakertypeField } from './BrevmottakertypeField';

const BRUKER_NAVN = 'Bruker Brukersen';

const ALLE_BREVMOTTAKERTYPER = Object.values(Brevmottakertype);

interface WrapperProps extends PropsWithChildren {
    brevmottakertype?: Brevmottakertype | '';
    onSubmit?: (values: BrevmottakerFormValues) => void | Promise<void>;
}

function Wrapper(props: WrapperProps) {
    return (
        <BrukerProvider bruker={lagPerson({ navn: BRUKER_NAVN })}>
            <Skjema {...props} />
        </BrukerProvider>
    );
}

function Skjema({ brevmottakertype = '', onSubmit = () => {}, children }: WrapperProps) {
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

    const { control, register, handleSubmit } = form;

    const {
        field: { value: land, onChange: settLand },
    } = useController({ control, name: BrevmottakerField.LAND });

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
                <output aria-label={'Valgt land'}>{JSON.stringify(land)}</output>
                <button type={'button'} onClick={() => settLand('NO')}>
                    Velg Norge
                </button>
                <button type={'submit'}>Send inn</button>
            </form>
        </FormProvider>
    );
}

function hentValgbareAlternativer(select: HTMLElement) {
    return Array.from(select.querySelectorAll('option'))
        .filter(option => !option.disabled)
        .map(option => option.textContent);
}

describe('BrevmottakertypeField', () => {
    test('skal vise feltet med riktig label', () => {
        const { screen } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        expect(screen.getByRole('combobox', { name: 'Mottaker' })).toBeInTheDocument();
    });

    test('skal vise brevmottakertypene som kan velges', () => {
        const { screen } = render(
            <BrevmottakertypeField
                erLesevisning={false}
                valgbareBrevmottakertyper={[Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, Brevmottakertype.VERGE]}
            />,
            { wrapper: Wrapper }
        );

        expect(hentValgbareAlternativer(screen.getByRole('combobox', { name: 'Mottaker' }))).toEqual([
            'Bruker med utenlandsk adresse',
            'Verge',
        ]);
    });

    test('skal ikke vise noen alternativer når ingen brevmottakertyper kan velges', () => {
        const { screen } = render(<BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={[]} />, {
            wrapper: Wrapper,
        });

        expect(hentValgbareAlternativer(screen.getByRole('combobox', { name: 'Mottaker' }))).toEqual([]);
    });

    test('skal vise feilmelding når mottaker ikke er valgt', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
            }
        );

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Mottaker må velges.')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('skal vise feilmelding når valgt mottaker ikke kan velges', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(
            <BrevmottakertypeField
                erLesevisning={false}
                valgbareBrevmottakertyper={[Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE]}
            />,
            {
                wrapper: props => (
                    <Wrapper {...props} brevmottakertype={Brevmottakertype.FULLMEKTIG} onSubmit={onSubmit} />
                ),
            }
        );

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Du har valgt en mottaker som ikke kan velges.')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('skal sende inn skjemaet med valgt mottaker', async () => {
        const onSubmit = vi.fn();
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: props => <Wrapper {...props} onSubmit={onSubmit} />,
            }
        );

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Verge');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit.mock.calls[0][0][BrevmottakerField.BREVMOTTAKERTYPE]).toBe(Brevmottakertype.VERGE);
    });

    test('skal preutfylle navn med brukers navn når man velger bruker med utenlandsk adresse', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Bruker med utenlandsk adresse');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue(BRUKER_NAVN);
    });

    test('skal preutfylle navn med "v/dødsbo" når man velger dødsbo og land ikke er valgt', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Dødsbo');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue(`${BRUKER_NAVN} v/dødsbo`);
    });

    test('skal preutfylle navn med "v/dødsbo" og beholde Norge når man velger dødsbo og Norge er valgt', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        await user.click(screen.getByRole('button', { name: 'Velg Norge' }));
        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Dødsbo');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue(`${BRUKER_NAVN} v/dødsbo`);
        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('"NO"');
    });

    test('skal oppdatere preutfylt navn når man bytter fra dødsbo til bruker med utenlandsk adresse', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        const select = screen.getByRole('combobox', { name: 'Mottaker' });
        await user.selectOptions(select, 'Dødsbo');
        await user.selectOptions(select, 'Bruker med utenlandsk adresse');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue(BRUKER_NAVN);
    });

    test('skal nullstille navn når man bytter fra dødsbo til en mottaker som ikke preutfylles', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        const select = screen.getByRole('combobox', { name: 'Mottaker' });
        await user.selectOptions(select, 'Dødsbo');
        await user.selectOptions(select, 'Verge');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue('');
    });

    test('skal ikke preutfylle navn når man velger fullmektig', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Fullmektig');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue('');
    });

    test('skal nullstille navn når man bytter fra bruker med utenlandsk adresse til en annen mottaker', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        const select = screen.getByRole('combobox', { name: 'Mottaker' });
        await user.selectOptions(select, 'Bruker med utenlandsk adresse');
        await user.selectOptions(select, 'Fullmektig');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue('');
    });

    test('skal beholde navn når man bytter mellom mottakere som ikke preutfylles', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        const select = screen.getByRole('combobox', { name: 'Mottaker' });
        await user.selectOptions(select, 'Fullmektig');
        await user.type(screen.getByRole('textbox', { name: 'Navn' }), 'Ola Nordmann');
        await user.selectOptions(select, 'Verge');

        expect(screen.getByRole('textbox', { name: 'Navn' })).toHaveValue('Ola Nordmann');
    });

    test('skal nullstille land, postnummer og poststed når Norge er valgt og man velger bruker med utenlandsk adresse', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        await user.click(screen.getByRole('button', { name: 'Velg Norge' }));
        await user.type(screen.getByRole('textbox', { name: 'Postnummer' }), '0001');
        await user.type(screen.getByRole('textbox', { name: 'Poststed' }), 'Oslo');

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Bruker med utenlandsk adresse');

        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('null');
        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toHaveValue('');
        expect(screen.getByRole('textbox', { name: 'Poststed' })).toHaveValue('');
    });

    test('skal ikke nullstille land, postnummer og poststed når Norge er valgt og man velger fullmektig', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        await user.click(screen.getByRole('button', { name: 'Velg Norge' }));
        await user.type(screen.getByRole('textbox', { name: 'Postnummer' }), '0001');
        await user.type(screen.getByRole('textbox', { name: 'Poststed' }), 'Oslo');

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Fullmektig');

        expect(screen.getByRole('status', { name: 'Valgt land' })).toHaveTextContent('"NO"');
        expect(screen.getByRole('textbox', { name: 'Postnummer' })).toHaveValue('0001');
        expect(screen.getByRole('textbox', { name: 'Poststed' })).toHaveValue('Oslo');
    });

    test('skal ikke være skrivebeskyttet før skjemaet sendes inn', () => {
        const { screen } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: Wrapper,
            }
        );

        expect(screen.getByRole('combobox', { name: 'Mottaker' })).toBeInTheDocument();
        expect(screen.queryByTitle('Skrivebeskyttet')).not.toBeInTheDocument();
    });

    test('skal være skrivebeskyttet i lesevisning', () => {
        const { screen } = render(
            <BrevmottakertypeField erLesevisning={true} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            { wrapper: Wrapper }
        );

        expect(screen.getByRole('combobox', { name: 'SkrivebeskyttetMottaker' })).toBeInTheDocument();
    });

    test('skal være skrivebeskyttet mens skjemaet sendes inn', async () => {
        const { screen, user } = render(
            <BrevmottakertypeField erLesevisning={false} valgbareBrevmottakertyper={ALLE_BREVMOTTAKERTYPER} />,
            {
                wrapper: props => <Wrapper {...props} onSubmit={() => new Promise(() => {})} />,
            }
        );

        await user.selectOptions(screen.getByRole('combobox', { name: 'Mottaker' }), 'Verge');
        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(screen.getByRole('combobox', { name: 'SkrivebeskyttetMottaker' })).toBeInTheDocument();
    });
});
