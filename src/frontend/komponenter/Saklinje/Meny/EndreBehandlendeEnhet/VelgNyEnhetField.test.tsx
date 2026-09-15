import { Fieldset } from '@navikt/ds-react';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import { behandlendeEnheter, UKJENT_ENHET } from '@typer/enhet';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';

import { EndreBehandlendeEnhetFormFields, type EndreBehandlendeEnhetFormValues } from './useEndreBehandlendeEnhetForm';
import { VelgNyEnhetField } from './VelgNyEnhetField';

interface WrapperProps extends PropsWithChildren {
    behandling?: IBehandling;
}

function Wrapper({ behandling = lagBehandling(), children }: WrapperProps) {
    const form = useForm<EndreBehandlendeEnhetFormValues>({
        defaultValues: {
            [EndreBehandlendeEnhetFormFields.ENHET_ID]: UKJENT_ENHET,
            [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: '',
        },
    });

    const {
        handleSubmit,
        formState: { errors },
        setError,
    } = form;

    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>
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
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('VelgNyEnhetField', () => {
    test('viser feltet med riktig label og en valgmulighet for hver behandlende enhet', () => {
        const { screen } = render(<VelgNyEnhetField readOnly={false} />, { wrapper: Wrapper });

        const felt = screen.getByRole('combobox', { name: 'Velg ny enhet' });
        expect(felt).toBeInTheDocument();
        expect(screen.getByRole('option', { name: '- Velg enhet -' })).toBeInTheDocument();
        behandlendeEnheter.forEach(enhet => {
            expect(screen.getByRole('option', { name: `${enhet.enhetId} ${enhet.enhetNavn}` })).toBeInTheDocument();
        });
    });

    test('deaktiverer valgmuligheten som tilsvarer behandlingens nåværende behandlende enhet', () => {
        const behandling = lagBehandling({
            arbeidsfordelingPåBehandling: {
                behandlendeEnhetId: '4806',
                behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Drammen',
                manueltOverstyrt: false,
            },
        });
        const { screen } = render(<VelgNyEnhetField readOnly={false} />, {
            wrapper: props => <Wrapper {...props} behandling={behandling} />,
        });

        expect(screen.getByRole('option', { name: '4806 NAV Familie- og pensjonsytelser Drammen' })).toBeDisabled();
        expect(screen.getByRole('option', { name: '4833 NAV Familie- og pensjonsytelser Oslo 1' })).toBeEnabled();
    });

    test('viser feilmelding når ingen enhet er valgt og skjemaet valideres', async () => {
        const { screen, user } = render(<VelgNyEnhetField readOnly={false} />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Send inn' }));

        expect(await screen.findByText('Enhet må velges.')).toBeInTheDocument();
    });

    test('lagrer valgt enhet i skjemaet', async () => {
        const { screen, user } = render(<VelgNyEnhetField readOnly={false} />, { wrapper: Wrapper });

        await user.selectOptions(screen.getByRole('combobox', { name: 'Velg ny enhet' }), '4806');

        expect(
            screen
                .getByRole('option', { name: '4806 NAV Familie- og pensjonsytelser Drammen' })
                .getAttribute('aria-selected')
        ).toBe('true');
    });

    test('fjerner rotfeil når man velger en ny enhet', async () => {
        const { screen, user } = render(<VelgNyEnhetField readOnly={false} />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Sett rotfeil' }));
        expect(await screen.findByText('Ukjent feil')).toBeInTheDocument();

        await user.selectOptions(screen.getByRole('combobox', { name: 'Velg ny enhet' }), '4806');

        expect(screen.queryByText('Ukjent feil')).not.toBeInTheDocument();
    });

    test('viser skrivebeskyttet-ikon når readOnly er true', () => {
        const { screen } = render(<VelgNyEnhetField readOnly={true} />, { wrapper: Wrapper });

        expect(screen.getByTitle('Skrivebeskyttet')).toBeInTheDocument();
    });

    test('viser ikke skrivebeskyttet-ikon når readOnly er false', () => {
        const { screen } = render(<VelgNyEnhetField readOnly={false} />, { wrapper: Wrapper });

        expect(screen.queryByTitle('Skrivebeskyttet')).not.toBeInTheDocument();
    });
});
