import { http, HttpResponse } from 'msw';

import { lagSaksbehandler } from '../../testdata/saksbehandlerTestdata';

export const saksbehandlerHandlers = [
    http.get('/user/profile', () => {
        return HttpResponse.json(lagSaksbehandler());
    }),
];
