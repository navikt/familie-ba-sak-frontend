import { HentEndringstidspunktQueryKeyFactory } from '@hooks/useHentEndringstidspunkt';
import { HentVedtaksperioderQueryKeyFactory } from '@hooks/useHentVedtaksperioder';
import { byggFunksjonellFeilRessurs, byggSuksessRessurs } from '@navikt/familie-typer';

import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import {
    HentOgSettBehandlingProvider,
    useHentOgSettBehandlingContext,
} from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { QueryClient } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { EndringstidspunktDialogProvider, useEndringstidspunktDialogContext } from './EndringstidspunktDialogContext';
import { Feltnavn, useEndringstidspunktForm } from './useEndringstidspunktForm';

interface Props extends PropsWithChildren {
    behandling?: IBehandling;
    initialErÅpen?: boolean;
    queryClient?: QueryClient;
}

function Wrapper({ behandling = lagBehandling(), initialErÅpen = true, queryClient, children }: Props) {
    return (
        <TestProviders queryClient={queryClient}>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>
                        <EndringstidspunktDialogProvider initialErÅpen={initialErÅpen}>
                            {children}
                        </EndringstidspunktDialogProvider>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

function renderUseEndringstidspunktForm(behandling?: IBehandling, queryClient?: QueryClient) {
    return renderHook(
        () => {
            const { form, onSubmit } = useEndringstidspunktForm();

            const endringstidspunktDialogContext = useEndringstidspunktDialogContext();
            const hentOgSettBehandlingContext = useHentOgSettBehandlingContext();

            // react-hook-form bruker en proxy for å avgjøre hvilke deler av formState den skal
            // abonnere på. Vi må lese errors under render for at endringer i setError skal føre
            // til at hooken faktisk rerenderes med den nye feilmeldingen.
            const { errors } = form.formState;

            return {
                form,
                onSubmit,
                errors,
                dialog: endringstidspunktDialogContext,
                behandlingRessurs: hentOgSettBehandlingContext.behandlingRessurs,
            };
        },
        {
            wrapper: ({ children }) => (
                <Wrapper behandling={behandling} queryClient={queryClient}>
                    {children}
                </Wrapper>
            ),
        }
    );
}

describe('useEndringstidspunktForm', () => {
    test('gir null som standardverdi for skjemaet', () => {
        const { result } = renderUseEndringstidspunktForm();

        expect(result.current.form.getValues()).toEqual({ [Feltnavn.ENDRINGSTIDSPUNKT]: null });
    });

    test('oppdaterer behandling, lukker dialog og nullstiller skjemaet ved vellykket innsending', async () => {
        const behandling = lagBehandling({ behandlingId: 1 });
        const oppdatertBehandling = lagBehandling({ behandlingId: 1 });

        server.use(
            http.put('/familie-ba-sak/api/vedtaksperioder/endringstidspunkt', () =>
                HttpResponse.json(byggSuksessRessurs(oppdatertBehandling))
            )
        );

        const { result } = renderUseEndringstidspunktForm(behandling);

        act(() => result.current.form.setValue(Feltnavn.ENDRINGSTIDSPUNKT, '2024-01-01', { shouldDirty: true }));

        await act(() => result.current.form.handleSubmit(result.current.onSubmit)());

        await waitFor(() => expect(result.current.dialog.erDialogÅpen).toBe(false));
        await waitFor(() => expect(result.current.behandlingRessurs).toEqual(byggSuksessRessurs(oppdatertBehandling)));
        await waitFor(() => expect(result.current.form.getValues()).toEqual({ [Feltnavn.ENDRINGSTIDSPUNKT]: null }));
    });

    test('venter på at vedtaksperioder er invalidert før dialogen lukkes', async () => {
        const behandling = lagBehandling({ behandlingId: 4 });
        const oppdatertBehandling = lagBehandling({ behandlingId: 4 });

        server.use(
            http.put('/familie-ba-sak/api/vedtaksperioder/endringstidspunkt', () =>
                HttpResponse.json(byggSuksessRessurs(oppdatertBehandling))
            )
        );

        let fullførInvalidering: () => void = () => {};
        const invalideringFullført = new Promise<void>(resolve => {
            fullførInvalidering = resolve;
        });

        const queryClient = new QueryClient();
        const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries').mockReturnValue(invalideringFullført);

        const { result } = renderUseEndringstidspunktForm(behandling, queryClient);

        act(() => result.current.form.setValue(Feltnavn.ENDRINGSTIDSPUNKT, '2024-01-01', { shouldDirty: true }));

        let innsending: Promise<void> = Promise.resolve();
        act(() => {
            innsending = result.current.form.handleSubmit(result.current.onSubmit)();
        });

        await waitFor(() =>
            expect(invalidateQueriesSpy).toHaveBeenCalledWith({
                queryKey: HentVedtaksperioderQueryKeyFactory.behandling(oppdatertBehandling.behandlingId),
            })
        );
        expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1);
        expect(result.current.dialog.erDialogÅpen).toBe(true);

        await act(async () => {
            fullførInvalidering();
            await innsending;
        });

        await waitFor(() => expect(result.current.dialog.erDialogÅpen).toBe(false));
    });

    test('invaliderer endringstidspunkt uten å vente på det før dialogen lukkes', async () => {
        const behandling = lagBehandling({ behandlingId: 5 });
        const oppdatertBehandling = lagBehandling({ behandlingId: 5 });

        server.use(
            http.put('/familie-ba-sak/api/vedtaksperioder/endringstidspunkt', () =>
                HttpResponse.json(byggSuksessRessurs(oppdatertBehandling))
            )
        );

        const endringstidspunktQueryKey = HentEndringstidspunktQueryKeyFactory.endringstidspunkt(
            oppdatertBehandling.behandlingId
        );

        const queryClient = new QueryClient();
        const invalidateQueriesSpy = vi
            .spyOn(queryClient, 'invalidateQueries')
            .mockImplementation(filters =>
                JSON.stringify(filters?.queryKey) === JSON.stringify(endringstidspunktQueryKey)
                    ? new Promise<void>(() => {})
                    : Promise.resolve()
            );

        const { result } = renderUseEndringstidspunktForm(behandling, queryClient);

        act(() => result.current.form.setValue(Feltnavn.ENDRINGSTIDSPUNKT, '2024-01-01', { shouldDirty: true }));

        await act(() => result.current.form.handleSubmit(result.current.onSubmit)());

        expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: endringstidspunktQueryKey });
        await waitFor(() => expect(result.current.dialog.erDialogÅpen).toBe(false));
    });

    test('setter root-feil og lar dialogen stå åpen ved funksjonell feil', async () => {
        server.use(
            http.put('/familie-ba-sak/api/vedtaksperioder/endringstidspunkt', () =>
                HttpResponse.json(byggFunksjonellFeilRessurs('Kunne ikke oppdatere endringstidspunkt.'))
            )
        );

        const { result } = renderUseEndringstidspunktForm(lagBehandling({ behandlingId: 2 }));

        act(() => result.current.form.setValue(Feltnavn.ENDRINGSTIDSPUNKT, '2024-01-01', { shouldDirty: true }));

        await act(() => result.current.form.handleSubmit(result.current.onSubmit)());

        await waitFor(() =>
            expect(result.current.errors.root?.message).toBe('Kunne ikke oppdatere endringstidspunkt.')
        );
        expect(result.current.dialog.erDialogÅpen).toBe(true);
    });

    test('setter generisk feilmelding ved nettverksfeil og lar dialogen stå åpen', async () => {
        server.use(http.put('/familie-ba-sak/api/vedtaksperioder/endringstidspunkt', () => HttpResponse.error()));

        const { result } = renderUseEndringstidspunktForm(lagBehandling({ behandlingId: 3 }));

        act(() => result.current.form.setValue(Feltnavn.ENDRINGSTIDSPUNKT, '2024-01-01', { shouldDirty: true }));

        await act(() => result.current.form.handleSubmit(result.current.onSubmit)());

        await waitFor(() => expect(result.current.errors.root?.message).toBe('En feil har oppstått!'));
        expect(result.current.dialog.erDialogÅpen).toBe(true);
    });

    test('ber om bekreftelse ved nettleseroppdatering når skjemaet er endret', () => {
        const { result } = renderUseEndringstidspunktForm();

        act(() => result.current.form.setValue(Feltnavn.ENDRINGSTIDSPUNKT, '2024-01-01', { shouldDirty: true }));

        const event = new Event('beforeunload', { cancelable: true });
        window.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
    });

    test('ber ikke om bekreftelse ved nettleseroppdatering når skjemaet er uendret', () => {
        renderUseEndringstidspunktForm();

        const event = new Event('beforeunload', { cancelable: true });
        window.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
    });
});
