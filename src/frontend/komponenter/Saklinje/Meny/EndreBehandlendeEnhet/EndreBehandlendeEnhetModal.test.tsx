import { byggFunksjonellFeilRessurs, byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { BehandlingStatus, type IBehandling } from '@typer/behandling';
import type { IMinimalFagsak } from '@typer/fagsak';
import type { Saksbehandler } from '@typer/saksbehandler';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '@utils/behandling';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect } from 'vitest';

import { EndreBehandlendeEnhetModal } from './EndreBehandlendeEnhetModal';

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
    saksbehandler?: Saksbehandler;
}

function Wrapper({
    fagsak = lagFagsak(),
    behandling = lagBehandling(),
    saksbehandler = lagSaksbehandler(),
    children,
}: WrapperProps) {
    return (
        <TestProviders saksbehandler={saksbehandler}>
            <FagsakProvider fagsak={fagsak}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>{children}</BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('EndreBehandlendeEnhetModal', () => {
    test('skal rendre modal med redigerbare felter', () => {
        const lukkModal = vi.fn();
        const { screen } = render(<EndreBehandlendeEnhetModal lukkModal={lukkModal} />, { wrapper: Wrapper });

        expect(screen.getByRole('dialog', { name: 'Endre enhet for denne behandlingen' })).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Velg ny enhet' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Begrunnelse' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bekreft' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
    });

    test('skal kunne lukke modal ved å trykke avbryt', async () => {
        const lukkModal = vi.fn();
        const { screen, user } = render(<EndreBehandlendeEnhetModal lukkModal={lukkModal} />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(lukkModal).toHaveBeenCalledOnce();
    });

    test('skal vise valideringsfeil og ikke sende inn hvis enhet ikke er valgt', async () => {
        const lukkModal = vi.fn();
        const { screen, user } = render(<EndreBehandlendeEnhetModal lukkModal={lukkModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        arbeidsfordelingPåBehandling: {
                            behandlendeEnhetId: '',
                            behandlendeEnhetNavn: '',
                            manueltOverstyrt: false,
                        },
                    })}
                />
            ),
        });

        await user.type(screen.getByRole('textbox', { name: 'Begrunnelse' }), 'Flytter saken til riktig enhet.');
        await user.click(screen.getByRole('button', { name: 'Bekreft' }));

        expect(await screen.findByText('Enhet må velges.')).toBeInTheDocument();
        expect(lukkModal).not.toHaveBeenCalled();
    });

    test('skal vise valideringsfeil hvis begrunnelse ikke er fylt ut', async () => {
        const lukkModal = vi.fn();
        const { screen, user } = render(<EndreBehandlendeEnhetModal lukkModal={lukkModal} />, { wrapper: Wrapper });

        await user.selectOptions(screen.getByRole('combobox', { name: 'Velg ny enhet' }), '4806');
        await user.click(screen.getByRole('button', { name: 'Bekreft' }));

        expect(await screen.findByText('Begrunnelse må fylles ut.')).toBeInTheDocument();
        expect(lukkModal).not.toHaveBeenCalled();
    });

    test('skal oppdatere behandlende enhet og lukke modal ved vellykket innsending', async () => {
        const oppdatertBehandling = lagBehandling({
            arbeidsfordelingPåBehandling: {
                behandlendeEnhetId: '4806',
                behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Drammen',
                manueltOverstyrt: true,
            },
        });
        server.use(
            http.put('/familie-ba-sak/api/arbeidsfordeling/:behandlingId', () => {
                return HttpResponse.json(byggSuksessRessurs(oppdatertBehandling));
            })
        );

        const lukkModal = vi.fn();
        const { screen, user } = render(<EndreBehandlendeEnhetModal lukkModal={lukkModal} />, { wrapper: Wrapper });

        await user.selectOptions(screen.getByRole('combobox', { name: 'Velg ny enhet' }), '4806');
        await user.type(screen.getByRole('textbox', { name: 'Begrunnelse' }), 'Flytter saken til riktig enhet.');
        await user.click(screen.getByRole('button', { name: 'Bekreft' }));

        await waitFor(() => expect(lukkModal).toHaveBeenCalledOnce());
    });

    test('skal vise feilmelding når innsending feiler', async () => {
        server.use(
            http.put('/familie-ba-sak/api/arbeidsfordeling/:behandlingId', () => {
                return HttpResponse.json(byggFunksjonellFeilRessurs('Kunne ikke oppdatere enhet.'));
            })
        );

        const lukkModal = vi.fn();
        const { screen, user } = render(<EndreBehandlendeEnhetModal lukkModal={lukkModal} />, { wrapper: Wrapper });

        await user.selectOptions(screen.getByRole('combobox', { name: 'Velg ny enhet' }), '4806');
        await user.type(screen.getByRole('textbox', { name: 'Begrunnelse' }), 'Flytter saken til riktig enhet.');
        await user.click(screen.getByRole('button', { name: 'Bekreft' }));

        expect(await screen.findByText('Kunne ikke oppdatere enhet.')).toBeInTheDocument();
        expect(lukkModal).not.toHaveBeenCalled();
    });

    test('skal deaktivere redigering når behandlingen er avsluttet', () => {
        const lukkModal = vi.fn();
        const { screen } = render(<EndreBehandlendeEnhetModal lukkModal={lukkModal} />, {
            wrapper: props => <Wrapper {...props} behandling={lagBehandling({ status: BehandlingStatus.AVSLUTTET })} />,
        });

        expect(screen.queryByRole('button', { name: 'Bekreft' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
    });

    test('skal tillate redigering selv om behandlende enhet er midlertidig', () => {
        const lukkModal = vi.fn();
        const { screen } = render(<EndreBehandlendeEnhetModal lukkModal={lukkModal} />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        arbeidsfordelingPåBehandling: {
                            behandlendeEnhetId: MIDLERTIDIG_BEHANDLENDE_ENHET_ID,
                            behandlendeEnhetNavn: 'Midlertidig enhet',
                            manueltOverstyrt: false,
                        },
                    })}
                />
            ),
        });

        expect(screen.getByRole('button', { name: 'Bekreft' })).not.toBeDisabled();
    });
});
