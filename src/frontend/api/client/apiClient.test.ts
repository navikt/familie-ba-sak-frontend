import { server } from '@testutils/mocks/node';
import { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ApiClient, ApiFeil, RessursStatus } from './apiClient';

const BASE_URL = 'http://localhost:3000';

type TestData = { id: number; name: string };

type FeilStatus = RessursStatus.FEILET | RessursStatus.IKKE_TILGANG | RessursStatus.FUNKSJONELL_FEIL;

const FEIL_STATUSER: FeilStatus[] = [RessursStatus.FEILET, RessursStatus.IKKE_TILGANG, RessursStatus.FUNKSJONELL_FEIL];

function lagSuksessRessurs<T>(data: T) {
    return { status: RessursStatus.SUKSESS, data, melding: 'OK' };
}

function lagFeilRessurs(status: FeilStatus, frontendFeilmelding: string, callId?: string | null) {
    return { status, melding: 'En feil oppstod', frontendFeilmelding, callId };
}

/**
 * Venter på at en forespørsel skal avvises, og returnerer feilen som en ApiFeil
 * slik at testen kan inspisere feltene (status, ressursStatus, callId, message).
 * Kaster hvis forespørselen mot formodning lykkes, eller hvis feilen ikke er en ApiFeil.
 */
async function fangApiFeil(handling: Promise<unknown>): Promise<ApiFeil> {
    try {
        await handling;
    } catch (error) {
        expect(error).toBeInstanceOf(ApiFeil);
        return error as ApiFeil;
    }
    throw new Error('Forventet at forespørselen skulle avvises, men den lyktes.');
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

        test.each(FEIL_STATUSER)('avviser forespørselen ved %s-status', async status => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
            );

            await expect(client.get({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
        });
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

        test.each(FEIL_STATUSER)('avviser forespørselen ved %s-status', async status => {
            server.use(
                http.post(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
            );

            await expect(client.post({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
        });
    });

    describe('PUT-forespørsler', () => {
        test('oppdaterer ressurs og returnerer data ved vellykket respons', async () => {
            const mockData: TestData = { id: 1, name: 'Oppdatert navn' };

            server.use(http.put(`${BASE_URL}/api/test/1`, () => HttpResponse.json(lagSuksessRessurs(mockData))));

            const result = await client.put<void, TestData>({ url: '/api/test/1' });
            expect(result).toEqual(mockData);
        });

        test.each(FEIL_STATUSER)('avviser forespørselen ved %s-status', async status => {
            server.use(
                http.put(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
            );

            await expect(client.put({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
        });
    });

    describe('PATCH-forespørsler', () => {
        test('endrer deler av en ressurs og returnerer data ved vellykket respons', async () => {
            const mockData: TestData = { id: 1, name: 'Delvis oppdatert' };

            server.use(http.patch(`${BASE_URL}/api/test/1`, () => HttpResponse.json(lagSuksessRessurs(mockData))));

            const result = await client.patch<void, TestData>({ url: '/api/test/1' });
            expect(result).toEqual(mockData);
        });

        test.each(FEIL_STATUSER)('avviser forespørselen ved %s-status', async status => {
            server.use(
                http.patch(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
            );

            await expect(client.patch({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
        });
    });

    describe('DELETE-forespørsler', () => {
        test('sletter en ressurs og returnerer data ved vellykket respons', async () => {
            server.use(http.delete(`${BASE_URL}/api/test/1`, () => HttpResponse.json(lagSuksessRessurs(null))));

            const result = await client.delete<void, null>({ url: '/api/test/1' });
            expect(result).toBeNull();
        });

        test.each(FEIL_STATUSER)('avviser forespørselen ved %s-status', async status => {
            server.use(
                http.delete(`${BASE_URL}/api/test`, () => HttpResponse.json(lagFeilRessurs(status, 'Noe gikk galt')))
            );

            await expect(client.delete({ url: '/api/test' })).rejects.toThrow('Noe gikk galt');
        });
    });

    describe('ApiFeil-felter ved feil-Ressurs på HTTP 200', () => {
        test('setter ressursStatus, status (200) og melding fra Ressurs-objektet', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () =>
                    HttpResponse.json(lagFeilRessurs(RessursStatus.IKKE_TILGANG, 'Ingen tilgang'))
                )
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Ingen tilgang');
            // Backend pakker feil i en 200-respons; HTTP-status er derfor 200 selv om dette er en feil.
            expect(apiFeil.status).toBe(200);
            expect(apiFeil.ressursStatus).toBe(RessursStatus.IKKE_TILGANG);
            expect(apiFeil.callId).toBeUndefined();
        });

        test('bruker statusbasert fallback når frontendFeilmelding mangler', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () =>
                    HttpResponse.json({ status: RessursStatus.IKKE_TILGANG, melding: 'En feil oppstod' })
                )
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Du har ikke tilgang til denne ressursen.');
            expect(apiFeil.status).toBe(200);
            expect(apiFeil.ressursStatus).toBe(RessursStatus.IKKE_TILGANG);
        });
    });

    describe('HTTP-feilstatus med Ressurs-body', () => {
        test('avviser med ApiFeil som bærer HTTP-status, ressursStatus og callId', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () =>
                    HttpResponse.json(lagFeilRessurs(RessursStatus.IKKE_TILGANG, 'Ingen tilgang', 'abc-123'), {
                        status: 403,
                    })
                )
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Ingen tilgang (CallId: abc-123)');
            expect(apiFeil.status).toBe(403);
            expect(apiFeil.ressursStatus).toBe(RessursStatus.IKKE_TILGANG);
            expect(apiFeil.callId).toBe('abc-123');
        });
    });

    describe('HTTP-statusbaserte fallback-meldinger uten Ressurs-body', () => {
        test.each<[number, string]>([
            [400, 'Den innsendte forespørselen var ugyldig.'],
            [401, 'Du er ikke innlogget eller økten din har utløpt. Logg inn på nytt.'],
            [403, 'Du har ikke tilgang til denne ressursen.'],
            [429, 'Du har sendt for mange forespørsler. Vent litt og prøv igjen senere.'],
            [
                500,
                'Det oppstod en feil på serveren. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.',
            ],
            [
                503,
                'Det oppstod en feil på serveren. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.',
            ],
        ])('HTTP %i gir riktig fallback-melding og bærer statuskoden', async (httpStatus, forventetMelding) => {
            server.use(http.get(`${BASE_URL}/api/test`, () => new HttpResponse(null, { status: httpStatus })));

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe(forventetMelding);
            expect(apiFeil.status).toBe(httpStatus);
            expect(apiFeil.ressursStatus).toBeUndefined();
            expect(apiFeil.callId).toBeUndefined();
        });
    });

    describe('Ugyldig respons', () => {
        test('avviser når responsen mangler status-feltet', async () => {
            server.use(http.get(`${BASE_URL}/api/test`, () => HttpResponse.json({ uventet: 'felt' })));

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Ugyldig respons fra serveren.');
            expect(apiFeil.status).toBeUndefined();
            expect(apiFeil.ressursStatus).toBeUndefined();
            expect(apiFeil.callId).toBeUndefined();
        });

        test('avviser når responskroppen er null', async () => {
            server.use(http.get(`${BASE_URL}/api/test`, () => HttpResponse.json(null)));

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Ugyldig respons fra serveren.');
            expect(apiFeil.status).toBeUndefined();
            expect(apiFeil.ressursStatus).toBeUndefined();
            expect(apiFeil.callId).toBeUndefined();
        });
    });

    describe('Ukjent status', () => {
        test('avviser når responsen har en status som ikke håndteres', async () => {
            server.use(http.get(`${BASE_URL}/api/test`, () => HttpResponse.json({ status: 'TULL', melding: 'Hæ?' })));

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Uhåndtert status: TULL');
            expect(apiFeil.status).toBeUndefined();
            expect(apiFeil.ressursStatus).toBeUndefined();
            expect(apiFeil.callId).toBeUndefined();
        });
    });

    describe('Feilmelding med callId', () => {
        test('inkluderer callId i meldingen og setter callId-feltet', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () =>
                    HttpResponse.json(lagFeilRessurs(RessursStatus.FEILET, 'Noe gikk galt', 'abc-123'))
                )
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Noe gikk galt (CallId: abc-123)');
            expect(apiFeil.status).toBe(200);
            expect(apiFeil.ressursStatus).toBe(RessursStatus.FEILET);
            expect(apiFeil.callId).toBe('abc-123');
        });

        test('utelater callId fra meldingen når den er null', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () =>
                    HttpResponse.json(lagFeilRessurs(RessursStatus.FEILET, 'Noe gikk galt', null))
                )
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Noe gikk galt');
            expect(apiFeil.status).toBe(200);
            expect(apiFeil.ressursStatus).toBe(RessursStatus.FEILET);
            expect(apiFeil.callId).toBeNull();
        });

        test('utelater callId fra meldingen når den mangler i responsen', async () => {
            server.use(
                http.get(`${BASE_URL}/api/test`, () =>
                    HttpResponse.json(lagFeilRessurs(RessursStatus.FEILET, 'Noe gikk galt'))
                )
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe('Noe gikk galt');
            expect(apiFeil.status).toBe(200);
            expect(apiFeil.ressursStatus).toBe(RessursStatus.FEILET);
            expect(apiFeil.callId).toBeUndefined();
        });
    });

    describe('Timeout', () => {
        test('faller tilbake på standard timeout-melding når ingen egendefinert melding er satt', async () => {
            vi.spyOn(client['client'], 'request').mockRejectedValueOnce(
                new AxiosError('timeout of 60000ms exceeded', AxiosError.ECONNABORTED)
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/treg' }));

            expect(apiFeil.message).toBe(
                'Nettverkskallet tok for lang tid. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.'
            );
            expect(apiFeil.message).not.toMatch(/timeout of/);
        });

        test('bruker timeoutErrorMessage fra config når den er satt', async () => {
            const config = {
                timeoutErrorMessage: 'Søket tok for lang tid. Prøv et mer spesifikt søk.',
            } as unknown as InternalAxiosRequestConfig;

            vi.spyOn(client['client'], 'request').mockRejectedValueOnce(
                new AxiosError('timeout of 60000ms exceeded', AxiosError.ECONNABORTED, config)
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/treg' }));

            expect(apiFeil.message).toBe('Søket tok for lang tid. Prøv et mer spesifikt søk.');
        });
    });

    describe('Nettverksfeil', () => {
        test('avviser med en ApiFeil ved nettverksfeil', async () => {
            server.use(http.get(`${BASE_URL}/api/test`, () => HttpResponse.error()));

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBeTruthy();
            expect(apiFeil.status).toBeUndefined();
            expect(apiFeil.ressursStatus).toBeUndefined();
            expect(apiFeil.callId).toBeUndefined();
        });

        test('viser nettverksmeldingen ved ERR_NETWORK', async () => {
            vi.spyOn(client['client'], 'request').mockRejectedValueOnce(
                new AxiosError('Network Error', AxiosError.ERR_NETWORK)
            );

            const apiFeil = await fangApiFeil(client.request({ method: 'GET', url: '/api/test' }));

            expect(apiFeil.message).toBe(
                'Får ikke kontakt med serveren. Sjekk internettforbindelsen din og prøv igjen.'
            );
            expect(apiFeil.status).toBeUndefined();
            expect(apiFeil.ressursStatus).toBeUndefined();
            expect(apiFeil.callId).toBeUndefined();
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
            await client.request<void, TestData>({ method: 'GET', url: '/api/test' });

            expect(onFulfilled).toHaveBeenCalledOnce();
        });

        test('kjører onRejected-interceptoren ved nettverksfeil', async () => {
            const onRejected = vi.fn((error: AxiosError) => Promise.reject(error));

            server.use(http.get(`${BASE_URL}/api/network-error`, () => HttpResponse.error()));

            client.addResponseInterceptor({ onRejected });
            await expect(client.request({ method: 'GET', url: '/api/network-error' })).rejects.toThrow();

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

            await client.request<void, TestData>({ method: 'GET', url: '/api/test' });
            expect(onFulfilled).not.toHaveBeenCalled();
        });
    });
});
