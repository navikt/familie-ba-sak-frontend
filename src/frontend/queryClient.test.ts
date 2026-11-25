import { queryKeys } from '@hooks/keys/queryKeys';
import { QueryClient, type QueryKey } from '@tanstack/react-query';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { FagsakId } from '@typer/fagsak';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { queryClient as appQueryClient, registrerQueryClientLyttere } from './queryClient';

const behandlingId = 1;
const annenBehandlingId = 2;
const fagsakId = FagsakId.fra(10);
const annenFagsakId = FagsakId.fra(20);

describe('queryClient', () => {
    describe('registrerQueryClientLyttere', () => {
        let queryClient: QueryClient;

        function erInvalidert(queryKey: QueryKey) {
            return queryClient.getQueryState(queryKey)?.isInvalidated ?? false;
        }

        beforeEach(() => {
            queryClient = new QueryClient();
            queryClient.setQueryData(queryKeys.fagsak(fagsakId), lagFagsak({ id: fagsakId }));
            queryClient.setQueryData(queryKeys.fagsak(annenFagsakId), lagFagsak({ id: annenFagsakId }));
            queryClient.setQueryData(queryKeys.historikkinnslag(behandlingId), []);
            queryClient.setQueryData(queryKeys.personerMedUgyldigEtterbetalingsperiode(behandlingId), []);
            queryClient.setQueryData(queryKeys.historikkinnslag(annenBehandlingId), []);
            registrerQueryClientLyttere(queryClient);
        });

        test('skal ikke invalidere noe ved første innlasting av behandlingen', async () => {
            await queryClient.query({
                queryKey: queryKeys.behandling(behandlingId),
                queryFn: () => Promise.resolve(lagBehandling({ behandlingId, fagsakId })),
            });

            expect(erInvalidert(queryKeys.fagsak(fagsakId))).toBe(false);
            expect(erInvalidert(queryKeys.historikkinnslag(behandlingId))).toBe(false);
            expect(erInvalidert(queryKeys.personerMedUgyldigEtterbetalingsperiode(behandlingId))).toBe(false);
        });

        test('skal invalidere avhengige queries når behandlingen oppdateres med setQueryData', () => {
            queryClient.setQueryData(queryKeys.behandling(behandlingId), lagBehandling({ behandlingId, fagsakId }));
            queryClient.setQueryData(queryKeys.behandling(behandlingId), lagBehandling({ behandlingId, fagsakId }));

            expect(erInvalidert(queryKeys.fagsak(fagsakId))).toBe(true);
            expect(erInvalidert(queryKeys.historikkinnslag(behandlingId))).toBe(true);
            expect(erInvalidert(queryKeys.personerMedUgyldigEtterbetalingsperiode(behandlingId))).toBe(true);
            expect(erInvalidert(queryKeys.behandling(behandlingId))).toBe(false);
        });

        test('skal invalidere ved mutasjonssvar etter at behandlingen er fjernet fra cachen', async () => {
            await queryClient.query({
                queryKey: queryKeys.behandling(behandlingId),
                queryFn: () => Promise.resolve(lagBehandling({ behandlingId, fagsakId })),
            });
            queryClient.removeQueries({ queryKey: queryKeys.behandling(behandlingId), exact: true });

            queryClient.setQueryData(queryKeys.behandling(behandlingId), lagBehandling({ behandlingId, fagsakId }));

            expect(queryClient.getQueryState(queryKeys.behandling(behandlingId))?.dataUpdateCount).toBe(1);
            expect(erInvalidert(queryKeys.fagsak(fagsakId))).toBe(true);
            expect(erInvalidert(queryKeys.historikkinnslag(behandlingId))).toBe(true);
            expect(erInvalidert(queryKeys.personerMedUgyldigEtterbetalingsperiode(behandlingId))).toBe(true);
        });

        test('skal invalidere avhengige queries når behandlingen hentes på nytt', async () => {
            const queryFn = vi.fn().mockResolvedValue(lagBehandling({ behandlingId, fagsakId }));
            await queryClient.query({ queryKey: queryKeys.behandling(behandlingId), queryFn });
            expect(erInvalidert(queryKeys.fagsak(fagsakId))).toBe(false);

            await queryClient.query({ queryKey: queryKeys.behandling(behandlingId), queryFn, staleTime: 0 });

            expect(queryFn).toHaveBeenCalledTimes(2);
            expect(erInvalidert(queryKeys.fagsak(fagsakId))).toBe(true);
            expect(erInvalidert(queryKeys.historikkinnslag(behandlingId))).toBe(true);
            expect(erInvalidert(queryKeys.personerMedUgyldigEtterbetalingsperiode(behandlingId))).toBe(true);
            expect(erInvalidert(queryKeys.behandling(behandlingId))).toBe(false);
        });

        test('skal ikke invalidere queries for andre fagsaker eller behandlinger', () => {
            queryClient.setQueryData(queryKeys.behandling(behandlingId), lagBehandling({ behandlingId, fagsakId }));
            queryClient.setQueryData(queryKeys.behandling(behandlingId), lagBehandling({ behandlingId, fagsakId }));

            expect(erInvalidert(queryKeys.fagsak(annenFagsakId))).toBe(false);
            expect(erInvalidert(queryKeys.historikkinnslag(annenBehandlingId))).toBe(false);
        });

        test('skal ikke reagere på oppdateringer av underliggende behandlingsnøkler', () => {
            queryClient.setQueryData(queryKeys.historikkinnslag(behandlingId), []);
            queryClient.setQueryData(queryKeys.historikkinnslag(behandlingId), []);

            expect(erInvalidert(queryKeys.fagsak(fagsakId))).toBe(false);
            expect(erInvalidert(queryKeys.personerMedUgyldigEtterbetalingsperiode(behandlingId))).toBe(false);
        });
    });

    describe('queryClient oppsett', () => {
        afterEach(() => {
            appQueryClient.clear();
        });

        test('skal ha registrert lytterne', () => {
            appQueryClient.setQueryData(queryKeys.historikkinnslag(behandlingId), []);
            appQueryClient.setQueryData(queryKeys.behandling(behandlingId), lagBehandling({ behandlingId, fagsakId }));
            appQueryClient.setQueryData(queryKeys.behandling(behandlingId), lagBehandling({ behandlingId, fagsakId }));

            expect(appQueryClient.getQueryState(queryKeys.historikkinnslag(behandlingId))?.isInvalidated).toBe(true);
        });
    });
});
