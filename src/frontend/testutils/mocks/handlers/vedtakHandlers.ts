import { byggSuksessRessurs } from '@navikt/familie-typer';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { HttpResponse, http } from 'msw';

import { VedtaksperiodeTestdata } from '../../testdata/vedtaksperiodeTestdata';

export const vedtakHandlers = [
    http.get<{ behandlingId: string }>(
        '/familie-ba-sak/api/vedtaksperioder/behandling/:behandlingId/hent-vedtaksperioder',
        () => {
            return HttpResponse.json(byggSuksessRessurs<IVedtaksperiodeMedBegrunnelser[]>([]));
        }
    ),
    http.get<{ vedtaksperiodeId: string }>(
        '/familie-ba-sak/api/vedtaksperioder/brevbegrunnelser/:vedtaksperiodeId',
        () => {
            return HttpResponse.json(byggSuksessRessurs<string[]>([]));
        }
    ),
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/korrigertetterbetaling/behandling/:behandlingId', () => {
        return HttpResponse.json(byggSuksessRessurs(null));
    }),
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/korrigertvedtak/behandling/:behandlingId', () => {
        return HttpResponse.json(byggSuksessRessurs(null));
    }),
    http.get('/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser', () => {
        return HttpResponse.json(byggSuksessRessurs(VedtaksperiodeTestdata.lagAlleBegrunnelser()));
    }),
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/sammensatt-kontrollsak/:behandlingId', () => {
        return HttpResponse.json(byggSuksessRessurs(null));
    }),
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/feilutbetalt-valuta/behandling/:behandlingId', () => {
        return HttpResponse.json(byggSuksessRessurs<IRestFeilutbetaltValuta[]>([]));
    }),
    http.get<{ behandlingId: string }>(encodeURI('/familie-ba-sak/api/refusjon-eøs/behandlinger/:behandlingId'), () => {
        return HttpResponse.json(byggSuksessRessurs<IRestRefusjonEøs[]>([]));
    }),
    http.get<{ behandlingId: string }>(
        '/familie-ba-sak/api/behandling/:behandlingId/tilbakekrevingsvedtak-motregning',
        () => {
            return HttpResponse.json(byggSuksessRessurs(null));
        }
    ),
];
