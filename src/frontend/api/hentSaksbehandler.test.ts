import { http, HttpResponse } from 'msw';
import { describe, it, expect } from 'vitest';

import { hentSaksbehandler } from './hentSaksbehandler';
import { server } from '../testutils/mocks/node';
import { lagISaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';

describe('hentSaksbehandler', () => {
    it('skal hente saksbehandler', async () => {
        // Arrange
        const iSaksbehandler = lagISaksbehandler();

        server.use(
            http.get('/user/profile', () => {
                return HttpResponse.json(iSaksbehandler);
            })
        );

        // Act
        const result = await hentSaksbehandler();

        // Assert
        expect(result).toEqual(iSaksbehandler);
    });

    it('skal kaste en feil hvis API-kallet feiler', async () => {
        // Arrange
        server.use(
            http.get('/user/profile', () => {
                return new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
            })
        );

        // Act & assert
        expect(hentSaksbehandler()).rejects.toThrow();
    });
});
