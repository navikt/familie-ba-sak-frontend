import { byggFunksjonellFeilRessurs, byggSuksessRessurs } from '@navikt/familie-typer';

import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import {
    HentOgSettBehandlingProvider,
    useHentOgSettBehandlingContext,
} from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { act, renderHook, waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';

import { EndringstidspunktDialogProvider, useEndringstidspunktDialogContext } from './EndringstidspunktDialogContext';
import { Feltnavn, useEndringstidspunktForm } from './useEndringstidspunktForm';

interface Props extends PropsWithChildren {
    behandling?: IBehandling;
}

function Wrapper({ behandling = lagBehandling(), children }: Props) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>
                        <EndringstidspunktDialogProvider>{children}</EndringstidspunktDialogProvider>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

function renderUseEndringstidspunktForm(behandling?: IBehandling) {
    return renderHook(
        () => {
            const endringstidspunktForm = useEndringstidspunktForm();
            const endringstidspunktDialogContext = useEndringstidspunktDialogContext();
            const hentOgSettBehandlingContext = useHentOgSettBehandlingContext();

            // react-hook-form bruker en proxy for å avgjøre hvilke deler av formState den skal
            // abonnere på. Vi må lese errors under render for at endringer i setError skal føre
            // til at hooken faktisk rerenderes med den nye feilmeldingen.
            const { errors } = endringstidspunktForm.form.formState;

            return {
                ...endringstidspunktForm,
                errors,
                dialog: endringstidspunktDialogContext,
                behandlingRessurs: hentOgSettBehandlingContext.behandlingRessurs,
            };
        },
        {
            wrapper: ({ children }) => <Wrapper behandling={behandling}>{children}</Wrapper>,
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

        act(() => result.current.dialog.åpneDialog());
        act(() => result.current.form.setValue(Feltnavn.ENDRINGSTIDSPUNKT, '2024-01-01', { shouldDirty: true }));

        await act(() => result.current.form.handleSubmit(result.current.onSubmit)());

        await waitFor(() => expect(result.current.dialog.erDialogÅpen).toBe(false));
        await waitFor(() => expect(result.current.behandlingRessurs).toEqual(byggSuksessRessurs(oppdatertBehandling)));
        await waitFor(() => expect(result.current.form.getValues()).toEqual({ [Feltnavn.ENDRINGSTIDSPUNKT]: null }));
    });

    test('setter root-feil og lar dialogen stå åpen ved funksjonell feil', async () => {
        server.use(
            http.put('/familie-ba-sak/api/vedtaksperioder/endringstidspunkt', () =>
                HttpResponse.json(byggFunksjonellFeilRessurs('Kunne ikke oppdatere endringstidspunkt.'))
            )
        );

        const { result } = renderUseEndringstidspunktForm(lagBehandling({ behandlingId: 2 }));

        act(() => result.current.dialog.åpneDialog());
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

        act(() => result.current.dialog.åpneDialog());
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
