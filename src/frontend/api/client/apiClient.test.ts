import { server } from '@testutils/mocks/node';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ApiClient } from './apiClient';

const BASE_URL = 'http://localhost:3000';

type TestData = { id: number; name: string };

function lagSuksessRessurs<T>(data: T) {
    return { status: 'SUKSESS', data, melding: 'OK' };
}

function lagFeilRessurs(
    status: 'FEILET' | 'IKKE_TILGANG' | 'FUNKSJONELL_FEIL',
    frontendFeilmelding: string,
    callId?: string | null
) {
    return { status, melding: 'En feil oppstod', frontendFeilmelding, callId };
}

describe('ApiClient', () => {
    let client: ApiClient;

    beforeEach(() => {
        client = new ApiClient(BASE_URL);
    });

    describe('GET-forespørsler', () => {
        test('returnerer data ved vellykket SUKSESS-respons', async () => {
            const mockData: TestData = { id: 1, name: 'Test' };

            server.use(http.get(`${BASE_URL}/api/test`, () => HttpResponse.json(lagSuksessRessurs(mockData))));

            const result = await client.get<void, TestData>({ url: '/api/test' });
            expect(result).toEqual(mockData);
        });

        test.each(['FEILET', 'IKKE_TILGANG', 'FUNKSJONELL_FEIL'] as const)(
            'avviser forespørselen ved %s-status',
            async status => {
                server.use(
                    http.get(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
                );

                await expect(client.get({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
            }
        );
    });

    describe('POST-forespørsler', () => {
        test('sender forespørsel med riktig body og returnerer data', async () => {
            const requestBody = { name: 'Ny ressurs' };
            const mockData: TestData = { id: 2, name: 'Ny ressurs' };

            server.use(
                http.post(`${BASE_URL}/api/test`, async ({ request }) => {
                    const body = await request.json();
                    expect(body).toEqual(requestBody);
                    return HttpResponse.json(lagSuksessRessurs(mockData));
                })
            );

            const result = await client.post<typeof requestBody, TestData>({
                url: '/api/test',
                data: requestBody,
            });
            expect(result).toEqual(mockData);
        });

        test.each(['FEILET', 'IKKE_TILGANG', 'FUNKSJONELL_FEIL'] as const)(
            'avviser forespørselen ved %s-status',
            async status => {
                server.use(
                    http.post(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
                );

                await expect(client.post({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
            }
        );
    });

    describe('PUT-forespørsler', () => {
        test('oppdaterer ressurs og returnerer data ved vellykket respons', async () => {
            const mockData: TestData = { id: 1, name: 'Oppdatert navn' };

            server.use(http.put(`${BASE_URL}/api/test/1`, () => HttpResponse.json(lagSuksessRessurs(mockData))));

            const result = await client.put<void, TestData>({ url: '/api/test/1' });
            expect(result).toEqual(mockData);
        });

        test.each(['FEILET', 'IKKE_TILGANG', 'FUNKSJONELL_FEIL'] as const)(
            'avviser forespørselen ved %s-status',
            async status => {
                server.use(
                    http.put(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
                );

                await expect(client.put({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
            }
        );
    });

    describe('PATCH-forespørsler', () => {
        test('endrer deler av en ressurs og returnerer data ved vellykket respons', async () => {
            const mockData: TestData = { id: 1, name: 'Delvis oppdatert' };

            server.use(http.patch(`${BASE_URL}/api/test/1`, () => HttpResponse.json(lagSuksessRessurs(mockData))));

            const result = await client.patch<void, TestData>({ url: '/api/test/1' });
            expect(result).toEqual(mockData);
        });

        test.each(['FEILET', 'IKKE_TILGANG', 'FUNKSJONELL_FEIL'] as const)(
            'avviser forespørselen ved %s-status',
            async status => {
                server.use(
                    http.patch(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
                );

                await expect(client.patch({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
            }
        );
    });

    describe('DELETE-forespørsler', () => {
        test('sletter en ressurs og returnerer data ved vellykket respons', async () => {
            server.use(http.delete(`${BASE_URL}/api/test/1`, () => HttpResponse.json(lagSuksessRessurs(null))));

            const result = await client.delete<void, null>({ url: '/api/test/1' });
            expect(result).toBeNull();
        });

        test.each(['FEILET', 'IKKE_TILGANG', 'FUNKSJONELL_FEIL'] as const)(
            'avviser forespørselen ved %s-status',
            async status => {
                server.use(
                    http.delete(`${BASE_URL}/api/test`, () =>
                        HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt'))
                    )
                );

                await expect(client.delete({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
            }
        );
    });

    describe('Feilmelding med callId', () => {
        test('inkluderer callId i feilmeldingen når den er satt', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () =>
                    HttpResponse.json(lagFeilRessurs('FEILET', 'Noe gikk galt', 'abc-123'))
                )
            );

            await expect(client.get({ url: '/api/test' })).rejects.toThrow('Noe gikk galt (CallId: abc-123)');
        });

        test('utelater callId fra feilmeldingen når den er null', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () =>
                    HttpResponse.json(lagFeilRessurs('FEILET', 'Noe gikk galt', null))
                )
            );

            await expect(client.get({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
        });

        test('utelater callId fra feilmeldingen når den mangler i responsen', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs('FEILET', 'Noe gikk galt')))
            );

            await expect(client.get({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
        });
    });

    describe('Interceptorer', () => {
        test('addResponseInterceptor returnerer en numerisk id', () => {
            const id = client.addResponseInterceptor({ onFulfilled: vi.fn(r => r) });

            expect(typeof id).toBe('number');
        });

        test('kjører onFulfilled-interceptoren ved vellykket respons', async () => {
            const mockData: TestData = { id: 1, name: 'Test' };
            const onFulfilled = vi.fn(response => response);

            server.use(http.get(`${BASE_URL}/api/test`, () => HttpResponse.json(lagSuksessRessurs(mockData))));

            client.addResponseInterceptor({ onFulfilled });
            await client.get<void, TestData>({ url: '/api/test' });

            expect(onFulfilled).toHaveBeenCalledOnce();
        });

        test('kjører onRejected-interceptoren ved nettverksfeil', async () => {
            const onRejected = vi.fn(error => Promise.reject(error));

            server.use(http.get(`${BASE_URL}/api/network-error`, () => HttpResponse.error()));

            client.addResponseInterceptor({ onRejected });
            await expect(client.get({ url: '/api/network-error' })).rejects.toThrow();

            expect(onRejected).toHaveBeenCalledOnce();
        });

        test('removeResponseInterceptor kaster ikke feil', () => {
            const id = client.addResponseInterceptor({ onFulfilled: vi.fn(r => r) });

            expect(() => client.removeResponseInterceptor(id)).not.toThrow();
        });

        test('fjernet interceptor kjøres ikke på påfølgende forespørsler', async () => {
            const mockData: TestData = { id: 1, name: 'Test' };
            const onFulfilled = vi.fn(response => response);

            server.use(http.get(`${BASE_URL}/api/test`, () => HttpResponse.json(lagSuksessRessurs(mockData))));

            const id = client.addResponseInterceptor({ onFulfilled });
            client.removeResponseInterceptor(id);

            await client.get<void, TestData>({ url: '/api/test' });
            expect(onFulfilled).not.toHaveBeenCalled();
        });
    });

    describe('Nettverksfeil', () => {
        test('avviser ved nettverksfeil', async () => {
            server.use(http.get(`${BASE_URL}/api/test`, () => HttpResponse.error()));

            await expect(client.get({ url: '/api/test' })).rejects.toThrow();
        });
    });
});
