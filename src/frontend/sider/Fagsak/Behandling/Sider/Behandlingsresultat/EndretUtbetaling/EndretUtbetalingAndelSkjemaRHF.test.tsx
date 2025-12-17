import type { ReactNode } from 'react';
import React from 'react';

import { type DefaultValues, useForm } from 'react-hook-form';
import { describe, expect, test, vi } from 'vitest';

import { EndretUtbetalingAndelProvider } from './EndretUtbetalingAndelContext';
import { EndretUtbetalingAndelSkjemaRHF } from './EndretUtbetalingAndelSkjemaRHF';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from './useEndretUtbetalingAndelRHF';
import { lagBehandling } from '../../../../../../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../../../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../../../testutils/testrender';
import { BehandlingStatus, type IBehandling } from '../../../../../../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../../../../../../typer/utbetalingAndel';
import { IEndretUtbetalingAndelÅrsak } from '../../../../../../typer/utbetalingAndel';
import { FagsakProvider } from '../../../../FagsakContext';
import { BehandlingProvider } from '../../../context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../../context/HentOgSettBehandlingContext';
import { Utbetaling } from '../Utbetaling';

const defaultEndretUtbetalingAndel: IRestEndretUtbetalingAndel = {
    id: 1,
    personIdenter: ['10987654321'],
    prosent: 100,
    fom: '2024-01',
    tom: '2024-12',
    begrunnelse: 'Test begrunnelse',
    årsak: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
    erTilknyttetAndeler: true,
    søknadstidspunkt: '2024-01-01',
    avtaletidspunktDeltBosted: '2024-01-15',
};

const defaultValues: DefaultValues<EndretUtbetalingAndelFormValues> = {
    [EndretUtbetalingAndelFeltnavn.PERSONER]: [{ value: '10987654321', label: 'Barn 1' }],
    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND,
    [EndretUtbetalingAndelFeltnavn.FOM]: new Date('2024-01-01'),
    [EndretUtbetalingAndelFeltnavn.TOM]: new Date('2024-12-01'),
    [EndretUtbetalingAndelFeltnavn.UTBETALING]: Utbetaling.FULL_UTBETALING,
    [EndretUtbetalingAndelFeltnavn.SØKNADSTIDSPUNKT]: new Date('2024-01-01'),
    [EndretUtbetalingAndelFeltnavn.AVTALETIDSPUNKT_DELT_BOSTED]: new Date('2024-01-15'),
    [EndretUtbetalingAndelFeltnavn.BEGRUNNELSE]: 'Test begrunnelse',
};

function Wrapper({
    children,
    behandling = lagBehandling(),
    endretUtbetalingAndel = defaultEndretUtbetalingAndel,
}: {
    children: ReactNode;
    behandling?: IBehandling;
    endretUtbetalingAndel?: IRestEndretUtbetalingAndel;
}) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider fagsak={lagFagsak()}>
                    <BehandlingProvider behandling={behandling}>
                        <EndretUtbetalingAndelProvider endretUtbetalingAndel={endretUtbetalingAndel}>
                            {children}
                        </EndretUtbetalingAndelProvider>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

function FormWrapper() {
    const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
    return <EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={vi.fn()} lukkSkjema={vi.fn()} />;
}

describe('EndretUtbetalingAndelSkjemaRHF', () => {
    test('skal vise alle skjemafelter', () => {
        const { screen } = render(<FormWrapper />, { wrapper: Wrapper });

        expect(screen.getByLabelText(/Velg hvem det gjelder/)).toBeInTheDocument();
        expect(screen.getByLabelText(/F.o.m/)).toBeInTheDocument();
        expect(screen.getByLabelText(/T.o.m/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Årsak/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Utbetaling/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Søknadstidspunkt/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Begrunnelse/)).toBeInTheDocument();
    });

    test('skal vise SkjemaKnapper når erLesevisning er false', () => {
        const { screen } = render(<FormWrapper />, { wrapper: Wrapper });

        expect(screen.getByRole('button', { name: 'Bekreft' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fjern periode' })).toBeInTheDocument();
    });

    test('skal ikke vise SkjemaKnapper når erLesevisning er true', () => {
        function CustomWrapper({ children }: { children: ReactNode }) {
            const behandlingILesevisning: IBehandling = {
                ...lagBehandling(),
                status: BehandlingStatus.SATT_PÅ_VENT,
            };
            return <Wrapper behandling={behandlingILesevisning}>{children}</Wrapper>;
        }

        const { screen } = render(<FormWrapper />, { wrapper: CustomWrapper });

        expect(screen.queryByRole('button', { name: 'Bekreft' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Avbryt' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Fjern periode' })).not.toBeInTheDocument();
    });

    test('skal vise feilmelding når det er root error', async () => {
        function FormWrapper() {
            const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
            const onSubmitMock = vi.fn(() => {
                form.setError('root', { message: 'Dette er en feilmelding' });
            });
            return <EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={onSubmitMock} lukkSkjema={vi.fn()} />;
        }

        const { screen, user } = render(<FormWrapper />, { wrapper: Wrapper });

        const submitButton = screen.getByRole('button', { name: 'Bekreft' });
        await user.click(submitButton);

        const feilmelding = await screen.findByText(/Dette er en feilmelding/);
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal kunne lukke feilmeldingen', async () => {
        function FormWrapper() {
            const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
            const onSubmitMock = vi.fn(() => {
                form.setError('root', { message: 'Dette er en feilmelding' });
            });
            return <EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={onSubmitMock} lukkSkjema={vi.fn()} />;
        }

        const { screen, user } = render(<FormWrapper />, { wrapper: Wrapper });

        const submitButton = screen.getByRole('button', { name: 'Bekreft' });
        await user.click(submitButton);

        const feilmelding = await screen.findByText(/Dette er en feilmelding/);
        expect(feilmelding).toBeInTheDocument();

        const lukkButton = screen.getByLabelText('Lukk');
        await user.click(lukkButton);

        expect(feilmelding).not.toBeInTheDocument();
    });

    test('skal skjule AvtaletidspunktDeltBostedDatovelger når årsak endres fra DELT_BOSTED til annen årsak', async () => {
        function FormWrapper() {
            const form = useForm<EndretUtbetalingAndelFormValues>({
                defaultValues: {
                    ...defaultValues,
                    [EndretUtbetalingAndelFeltnavn.ÅRSAK]: IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                },
            });
            return <EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={vi.fn()} lukkSkjema={vi.fn()} />;
        }

        const { screen, user } = render(<FormWrapper />, { wrapper: Wrapper });

        expect(screen.getByLabelText(/Avtaletidspunkt delt bosted/)).toBeInTheDocument();

        const årsakvelger = screen.getByRole('combobox', { name: 'Årsak' });
        await user.selectOptions(årsakvelger, IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER);

        expect(screen.queryByLabelText(/Avtaletidspunkt delt bosted/)).not.toBeInTheDocument();
    });

    test('skal vise AvtaletidspunktDeltBostedDatovelger når årsak endres til DELT_BOSTED', async () => {
        function FormWrapper() {
            const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
            return <EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={vi.fn()} lukkSkjema={vi.fn()} />;
        }

        const { screen, user } = render(<FormWrapper />, { wrapper: Wrapper });

        expect(screen.queryByLabelText(/Avtaletidspunkt delt bosted/)).not.toBeInTheDocument();

        const årsakvelger = screen.getByRole('combobox', { name: 'Årsak' });
        await user.selectOptions(årsakvelger, IEndretUtbetalingAndelÅrsak.DELT_BOSTED);

        expect(screen.getByLabelText(/Avtaletidspunkt delt bosted/)).toBeInTheDocument();
    });

    test('skal kalle onSubmit når skjemaet submittes', async () => {
        const onSubmitMock = vi.fn();
        function FormWrapper() {
            const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
            return <EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={onSubmitMock} lukkSkjema={vi.fn()} />;
        }

        const { screen, user } = render(<FormWrapper />, { wrapper: Wrapper });

        const submitButton = screen.getByRole('button', { name: 'Bekreft' });
        await user.click(submitButton);

        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith(defaultValues, expect.anything());
    });

    test('skal kalle lukkSkjema når endringen avbrytes', async () => {
        const lukkSkjema = vi.fn();
        function FormWrapper() {
            const form = useForm<EndretUtbetalingAndelFormValues>({ defaultValues });
            return <EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={vi.fn()} lukkSkjema={lukkSkjema} />;
        }

        const { screen, user } = render(<FormWrapper />, { wrapper: Wrapper });

        const avbrytButton = screen.getByRole('button', { name: /Avbryt/ });
        await user.click(avbrytButton);

        expect(lukkSkjema).toHaveBeenCalledTimes(1);
    });

    test('skal vise valideringsfeil når påkrevde felter er tomme', async () => {
        const onSubmitMock = vi.fn();
        function FormWrapper() {
            const form = useForm<EndretUtbetalingAndelFormValues>({
                defaultValues: {
                    [EndretUtbetalingAndelFeltnavn.PERSONER]: [],
                },
            });
            return <EndretUtbetalingAndelSkjemaRHF form={form} onSubmit={onSubmitMock} lukkSkjema={vi.fn()} />;
        }

        const { screen, user } = render(<FormWrapper />, { wrapper: Wrapper });

        const submitButton = screen.getByRole('button', { name: 'Bekreft' });
        await user.click(submitButton);

        expect(await screen.findByText(/Du må velge minst én person/)).toBeInTheDocument();
        expect(await screen.findByText(/Du må velge en årsak/)).toBeInTheDocument();
        expect(await screen.findByText(/F.o.m. er påkrevd/)).toBeInTheDocument();
        expect(await screen.findByText(/T.o.m. er påkrevd/)).toBeInTheDocument();
        expect(await screen.findByText(/Du må velge om beløpet skal utbetales/)).toBeInTheDocument();
        expect(await screen.findByText(/Søknadstidspunkt er påkrevd/)).toBeInTheDocument();
        expect(await screen.findByText(/Du må begrunne den endrede utbetalingsperioden/)).toBeInTheDocument();

        expect(onSubmitMock).not.toHaveBeenCalled();
    });
});
