import { byggFunksjonellFeilRessurs, byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { act, renderHook, waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import { UKJENT_ENHET } from '@typer/enhet';
import type { IMinimalFagsak } from '@typer/fagsak';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { EndreBehandlendeEnhetFormFields, useEndreBehandlendeEnhetForm } from './useEndreBehandlendeEnhetForm';

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

function lagWrapper(fagsak = lagFagsak(), behandling = lagBehandling()) {
    return function Wrapper({ children }: WrapperProps) {
        return (
            <TestProviders>
                <FagsakProvider fagsak={fagsak}>
                    <HentOgSettBehandlingProvider>
                        <BehandlingProvider behandling={behandling}>{children}</BehandlingProvider>
                    </HentOgSettBehandlingProvider>
                </FagsakProvider>
            </TestProviders>
        );
    };
}

function renderUseEndreBehandlendeEnhetForm({
    lukkModal = vi.fn(),
    fagsak,
    behandling,
}: {
    lukkModal?: () => void;
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
} = {}) {
    const hook = renderHook(() => useEndreBehandlendeEnhetForm({ lukkModal }), {
        wrapper: lagWrapper(fagsak, behandling),
    });
    return { ...hook, lukkModal };
}

describe('useEndreBehandlendeEnhetForm', () => {
    test('setter enhetId fra behandlingen som standardverdi når enheten er valgbar', () => {
        const behandling = lagBehandling({
            arbeidsfordelingPåBehandling: {
                behandlendeEnhetId: '4806',
                behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Drammen',
                manueltOverstyrt: false,
            },
        });

        const { result } = renderUseEndreBehandlendeEnhetForm({ behandling });

        expect(result.current.form.getValues()).toEqual({
            [EndreBehandlendeEnhetFormFields.ENHET_ID]: '4806',
            [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: '',
        });
    });

    test('setter UKJENT_ENHET som standardverdi når behandlende enhet ikke finnes blant valgbare enheter', () => {
        const behandling = lagBehandling({
            arbeidsfordelingPåBehandling: {
                behandlendeEnhetId: 'ikke-en-gyldig-enhet',
                behandlendeEnhetNavn: 'Ukjent',
                manueltOverstyrt: false,
            },
        });

        const { result } = renderUseEndreBehandlendeEnhetForm({ behandling });

        expect(result.current.form.getValues(EndreBehandlendeEnhetFormFields.ENHET_ID)).toBe(UKJENT_ENHET);
        expect(result.current.form.getValues(EndreBehandlendeEnhetFormFields.BEGRUNNELSE)).toBe('');
    });

    test('oppdaterer behandlende enhet, setter ny behandling og lukker modal ved vellykket innsending', async () => {
        const behandling = lagBehandling();
        const oppdatertBehandling = lagBehandling({
            arbeidsfordelingPåBehandling: {
                behandlendeEnhetId: '4806',
                behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Drammen',
                manueltOverstyrt: true,
            },
        });

        server.use(
            http.put(`/familie-ba-sak/api/arbeidsfordeling/${behandling.behandlingId}`, () => {
                return HttpResponse.json(byggSuksessRessurs(oppdatertBehandling));
            })
        );

        const { result, lukkModal } = renderUseEndreBehandlendeEnhetForm({ behandling });

        await act(() =>
            result.current.onSubmit({
                [EndreBehandlendeEnhetFormFields.ENHET_ID]: '4806',
                [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: 'Flytter saken til riktig enhet.',
            })
        );

        await waitFor(() => expect(lukkModal).toHaveBeenCalledOnce());
    });

    test('setter root-feil med feilmelding fra api og lar modal stå åpen ved funksjonell feil', async () => {
        const behandling = lagBehandling();

        server.use(
            http.put(`/familie-ba-sak/api/arbeidsfordeling/${behandling.behandlingId}`, () => {
                return HttpResponse.json(byggFunksjonellFeilRessurs('Kunne ikke oppdatere enhet.'));
            })
        );

        const { result, lukkModal } = renderUseEndreBehandlendeEnhetForm({ behandling });

        await act(() =>
            result.current.onSubmit({
                [EndreBehandlendeEnhetFormFields.ENHET_ID]: '4806',
                [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: 'Flytter saken til riktig enhet.',
            })
        );

        await waitFor(() =>
            expect(result.current.form.formState.errors.root?.message).toBe('Kunne ikke oppdatere enhet.')
        );
        expect(lukkModal).not.toHaveBeenCalled();
    });

    test('setter feilmelding fra ApiFeil og lar modal stå åpen ved nettverksfeil', async () => {
        const behandling = lagBehandling();

        server.use(
            http.put(`/familie-ba-sak/api/arbeidsfordeling/${behandling.behandlingId}`, () => {
                return HttpResponse.error();
            })
        );

        const { result, lukkModal } = renderUseEndreBehandlendeEnhetForm({ behandling });

        await act(() =>
            result.current.onSubmit({
                [EndreBehandlendeEnhetFormFields.ENHET_ID]: '4806',
                [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: 'Flytter saken til riktig enhet.',
            })
        );

        await waitFor(() =>
            expect(result.current.form.formState.errors.root?.message).toBe(
                'Får ikke kontakt med serveren. Sjekk internettforbindelsen din og prøv igjen.'
            )
        );
        expect(lukkModal).not.toHaveBeenCalled();
    });
});
