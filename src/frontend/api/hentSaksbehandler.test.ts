import { http, HttpResponse } from 'msw';
import { describe, it, expect } from 'vitest';

import { hentSaksbehandler } from './hentSaksbehandler';
import { server } from '../testutils/mocks/node';
import { lagSaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';

describe('hentSaksbehandler', () => {
    it('skal hente saksbehandler', async () => {
        // Arrange
        const saksbehandler = lagSaksbehandler();

        server.use(
            http.get('/user/profile', () => {
                return HttpResponse.json(saksbehandler);
            })
        );

        // Act
        const result = await hentSaksbehandler();

        // Assert
        expect(result).toEqual(saksbehandler);
    });

    it('skal returnere en tom liste for groups hvis ingen gruppe er definert', async () => {
        // Arrange
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { groups, ...saksbehandlerUtenGrupper } = lagSaksbehandler();

        server.use(
            http.get('/user/profile', () => {
                return HttpResponse.json(saksbehandlerUtenGrupper);
            })
        );

        // Act
        const result = await hentSaksbehandler();

        // Assert
        expect(result.groups).toEqual([]);
        expect(result.displayName).toBe('Sak Behandler');
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
