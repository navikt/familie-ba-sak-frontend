import { queryKeys } from '@hooks/keys/queryKeys';
import { byggFeiletRessurs, byggSuksessRessurs } from '@navikt/familie-typer';
import type { QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { lagTestQueryClient, TestProviders } from '@testutils/testrender';
import { Brevmottakertype } from '@typer/brevmottaker';
import type { Saksbehandler } from '@typer/saksbehandler';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';

import { useHentBrevmottakere } from './useHentBrevmottakere';

const VEILEDER_GRUPPE = '93a26831-9866-4410-927b-74ff51a9107c';
const behandlingId = 42;

interface WrapperProps extends PropsWithChildren {
    queryClient: QueryClient;
    saksbehandler: Saksbehandler;
}

function Wrapper({ queryClient, saksbehandler, children }: WrapperProps) {
    return (
        <TestProviders queryClient={queryClient} saksbehandler={saksbehandler}>
            {children}
        </TestProviders>
    );
}

const brevmottaker = lagBrevmottakerBehandling({
    type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
    navn: 'Ekte Mottaker',
    adresselinje1: 'Ekte mottakergate 1',
    adresselinje2: 'Ekte mottakergate 2',
});

describe('useHentBrevmottakere', () => {
    test('skal hente brevmottakere for behandlingen', async () => {
        // Arrange
        server.use(
            http.get(`/familie-ba-sak/api/brevmottaker/${behandlingId}`, () =>
                HttpResponse.json(byggSuksessRessurs([brevmottaker]))
            )
        );

        const queryClient = lagTestQueryClient();
        const saksbehandler = lagSaksbehandler();

        // Act
        const { result } = renderHook(() => useHentBrevmottakere(behandlingId), {
            wrapper: ({ children }) => (
                <Wrapper queryClient={queryClient} saksbehandler={saksbehandler}>
                    {children}
                </Wrapper>
            ),
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual([brevmottaker]);
    });

    test('skal returnere feil når henting feiler', async () => {
        // Arrange
        server.use(
            http.get(`/familie-ba-sak/api/brevmottaker/${behandlingId}`, () =>
                HttpResponse.json(byggFeiletRessurs('Noe gikk galt'))
            )
        );

        const queryClient = lagTestQueryClient();
        const saksbehandler = lagSaksbehandler();

        // Act
        const { result } = renderHook(() => useHentBrevmottakere(behandlingId), {
            wrapper: ({ children }) => (
                <Wrapper queryClient={queryClient} saksbehandler={saksbehandler}>
                    {children}
                </Wrapper>
            ),
        });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
    });

    test('skal obfuskere brevmottakere uten å endre dataene i cachen', async () => {
        // Arrange
        const queryClient = lagTestQueryClient();
        const saksbehandler = lagSaksbehandler({ groups: [VEILEDER_GRUPPE] });

        server.use(
            http.get('/user/profile', () => HttpResponse.json(saksbehandler)),
            http.get(`/familie-ba-sak/api/brevmottaker/${behandlingId}`, () =>
                HttpResponse.json(byggSuksessRessurs([brevmottaker]))
            )
        );

        // Act
        const { result } = renderHook(() => useHentBrevmottakere(behandlingId), {
            wrapper: ({ children }) => (
                <Wrapper queryClient={queryClient} saksbehandler={saksbehandler}>
                    {children}
                </Wrapper>
            ),
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.[0]).toEqual(
            expect.objectContaining({
                navn: 'Bruker med utenlandsk adresse',
                adresselinje1: 'Mottakerveien 1',
                adresselinje2: undefined,
            })
        );
        expect(queryClient.getQueryData(queryKeys.brevmottakere(behandlingId))).toEqual([brevmottaker]);
    });
});
