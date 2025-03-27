import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, type Ressurs } from '@navikt/familie-typer';

import type { ITilbakekrevingsbehandling } from '../typer/tilbakekrevingsbehandling';

export const useTilbakekrevingApi = () => {
    const { request } = useHttp();

    const hentTilbakekrevingsbehandlinger = (
        fagsakId: number | undefined
    ): Promise<Ressurs<ITilbakekrevingsbehandling[]>> => {
        if (!fagsakId) {
            return Promise.resolve(byggTomRessurs());
        }

        return request<void, ITilbakekrevingsbehandling[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/tilbakekreving/${fagsakId}/hent-tilbakekrevingsbehandlinger`,
            påvirkerSystemLaster: true,
        });
    };

    return {
        hentTilbakekrevingsbehandlinger,
    };
};
