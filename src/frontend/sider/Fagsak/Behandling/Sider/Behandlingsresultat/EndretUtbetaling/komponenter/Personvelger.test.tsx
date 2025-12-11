import React, { createContext, type PropsWithChildren, type ReactNode, useContext } from 'react';

import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { afterEach, describe, expect, test } from 'vitest';

import { Button } from '@navikt/ds-react';
import { kjønnType } from '@navikt/familie-typer';

import Personvelger from './Personvelger';
import { lagBehandling } from '../../../../../../../testutils/testdata/behandlingTestdata';
import { render } from '../../../../../../../testutils/testrender';
import type { IBehandling } from '../../../../../../../typer/behandling';
import { PersonType } from '../../../../../../../typer/person';
import { Målform } from '../../../../../../../typer/søknad';
import { BehandlingProvider } from '../../../../context/BehandlingContext';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

const defaultBehandling: IBehandling = {
    ...lagBehandling(),
    personer: [
        {
            type: PersonType.SØKER,
            personIdent: '12345678910',
            fødselsdato: '1990-01-01',
            navn: 'Mor',
            kjønn: kjønnType.KVINNE,
            målform: Målform.NB,
        },
        {
            type: PersonType.BARN,
            personIdent: '10987654321',
            fødselsdato: '2023-12-31',
            navn: 'Barn 1',
            kjønn: kjønnType.MANN,
            målform: Målform.NB,
        },
        {
            type: PersonType.BARN,
            personIdent: '11111111111',
            fødselsdato: '2024-12-31',
            navn: 'Barn 2',
            kjønn: kjønnType.KVINNE,
            målform: Målform.NB,
        },
    ],
    personerMedAndelerTilkjentYtelse: [
        {
            personIdent: '10987654321',
            ytelsePerioder: [],
            beløp: 1000,
            stønadFom: '2024-01-01',
            stønadTom: '2042-12-31',
        },
        {
            personIdent: '11111111111',
            ytelsePerioder: [],
            beløp: 1000,
            stønadFom: '2025-01-01',
            stønadTom: '2043-12-31',
        },
    ],
};

const TestBehandlingContext = createContext<IBehandling>(defaultBehandling);

vi.mock('../../../../context/BehandlingContext', () => ({
    useBehandlingContext: () => ({
        behandling: useContext(TestBehandlingContext),
    }),
    BehandlingProvider: ({ children }: PropsWithChildren) => <>{children}</>,
}));

afterEach(() => {
    vi.resetAllMocks();
});

const DEFAULT_VALUES: DefaultValues<EndretUtbetalingAndelFormValues> = {
    [EndretUtbetalingAndelFeltnavn.PERSONER]: [],
};

const onSubmit = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

function DefaultFormWrapper({
    children,
    defaultValues = DEFAULT_VALUES,
    onSubmitDelay = 0,
    behandling = defaultBehandling,
}: {
    children: ReactNode;
    onSubmitDelay?: number;
    defaultValues?: DefaultValues<EndretUtbetalingAndelFormValues>;
    behandling?: IBehandling;
}) {
    const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
    return (
        <TestBehandlingContext.Provider value={behandling}>
            <BehandlingProvider behandling={behandling}>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(() => onSubmit(onSubmitDelay))}>
                        {children}
                        <Button type="submit">Submit</Button>
                    </form>
                </FormProvider>
            </BehandlingProvider>
        </TestBehandlingContext.Provider>
    );
}

describe('Personvelger', () => {
    test('skal vise personvelger', () => {
        const { screen } = render(<Personvelger />, { wrapper: DefaultFormWrapper });

        const personvelger = screen.getByLabelText(/Velg hvem det gjelder/);
        expect(personvelger).toBeInTheDocument();
    });

    test('skal vise dropdown med personer fra behandlingen', async () => {
        const { screen, user } = render(<Personvelger />, { wrapper: DefaultFormWrapper });

        const personvelger = screen.getByLabelText(/Velg hvem det gjelder/);
        await user.click(personvelger);

        const dropwdown = screen.queryByRole('listbox');
        expect(dropwdown).toHaveTextContent('Barn 1');
        expect(dropwdown).toHaveTextContent('Barn 2');

        const dropdownWrapper = dropwdown!.parentElement!.parentElement!;

        // visning av dropdown styres med transform
        expect(dropdownWrapper).toHaveStyle({ transform: 'translate(0px, 8px)' });
    });

    test('skal kunne velge en person', async () => {
        const { screen, user } = render(<Personvelger />, { wrapper: DefaultFormWrapper });

        const personvelger = screen.getByLabelText(/Velg hvem det gjelder/);
        await user.click(personvelger);

        const barn = screen.getByText(/Barn 1/);
        await user.click(barn);

        const valgtBarn = screen.getByRole('button', { name: /Barn 1.*slett/ });
        expect(valgtBarn).toBeInTheDocument();
    });

    test('skal kunne velge flere personer', async () => {
        const { screen, user } = render(<Personvelger />, { wrapper: DefaultFormWrapper });

        const personvelger = screen.getByLabelText(/Velg hvem det gjelder/);
        await user.click(personvelger);

        const barn1 = screen.getByText(/Barn 1/);
        await user.click(barn1);

        const barn2 = screen.getByText(/Barn 2/);
        await user.click(barn2);

        const valgtePersoner = screen.getAllByRole('button', { name: /Barn.*slett/ });
        expect(valgtePersoner).toHaveLength(2);
        expect(valgtePersoner[0]).toHaveTextContent('109876 54321');
        expect(valgtePersoner[1]).toHaveTextContent('111111 11111');
    });

    test('skal kunne fjerne valgt person', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.PERSONER]: [{ value: '10987654321', label: 'Barn 1 (01.01.2020)' }],
            };
            return DefaultFormWrapper({ children, defaultValues });
        }

        const { screen, user } = render(<Personvelger />, { wrapper: FormWrapper });

        const slettKnapp = screen.getByRole('button', { name: /Barn 1.*slett/ });
        await user.click(slettKnapp);

        const valgtePersoner = screen.queryAllByRole('button', { name: /Barn.*slett/ });
        expect(valgtePersoner).toHaveLength(0);
    });

    test('skal ikke vise personer som ikke har andeler tilkjent ytelse', async () => {
        const behandlingUtenBarn2: IBehandling = {
            ...defaultBehandling,
            personerMedAndelerTilkjentYtelse: defaultBehandling.personerMedAndelerTilkjentYtelse.filter(
                p => p.personIdent !== '11111111111'
            ),
        };

        const { screen, user } = render(<Personvelger />, {
            wrapper: props => DefaultFormWrapper({ ...props, behandling: behandlingUtenBarn2 }),
        });

        const personvelger = screen.getByLabelText(/Velg hvem det gjelder/);
        await user.click(personvelger);

        expect(screen.queryByText(/Barn 1/)).toBeInTheDocument();
        expect(screen.queryByText(/Barn 2/)).not.toBeInTheDocument();
    });

    test('skal ikke kunne endre personer når erLesevisning er true', async () => {
        const { screen, user } = render(<Personvelger erLesevisning={true} />, { wrapper: DefaultFormWrapper });

        const personvelger = screen.getByLabelText(/Velg hvem det gjelder/);
        await user.click(personvelger);

        const dropdown = screen.queryByRole('listbox');
        const dropdownWrapper = dropdown!.parentElement!.parentElement!;

        // dropdown blir skjult med transform når erLesevisning er true
        expect(dropdownWrapper).toHaveStyle({ transform: 'translate(0, -200%)' });
    });

    test('skal ikke kunne endre personer når skjema submitter', async () => {
        function FormWrapper({ children }: PropsWithChildren) {
            const defaultValues = {
                [EndretUtbetalingAndelFeltnavn.PERSONER]: [{ value: '10987654321', label: 'Barn 1 (01.01.2020)' }],
            };
            return DefaultFormWrapper({ children, defaultValues, onSubmitDelay: 3_000 });
        }

        const { screen, user } = render(<Personvelger />, { wrapper: FormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        const dropdown = screen.queryByRole('listbox');
        const dropdownWrapper = dropdown!.parentElement!.parentElement!;

        // dropdown blir skjult med transform når erLesevisning er true
        expect(dropdownWrapper).toHaveStyle({ transform: 'translate(0, -200%)' });
    });

    test('skal fokusere som forventet på komponenten når brukeren klikker på komponenten for å så tabbe ut', async () => {
        const { screen, user } = render(<Personvelger />, { wrapper: DefaultFormWrapper });

        const personvelger = screen.getByLabelText(/Velg hvem det gjelder/);
        expect(personvelger).not.toHaveFocus();

        await user.click(personvelger);

        expect(personvelger).toHaveFocus();

        await user.tab();

        expect(personvelger).not.toHaveFocus();
    });

    test('skal vise valideringsfeil når ingen personer er valgt og skjemaet submittes', async () => {
        const { screen, user } = render(<Personvelger />, { wrapper: DefaultFormWrapper });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        expect(screen.getByText('Du må velge minst én person')).toBeInTheDocument();
    });
});
