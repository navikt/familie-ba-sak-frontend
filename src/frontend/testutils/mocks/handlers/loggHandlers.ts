import { HttpResponse, http } from 'msw';

export const loggHandlers = [http.post('/logg', () => new HttpResponse(null, { status: 204 }))];
