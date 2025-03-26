import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, type Ressurs } from '@navikt/familie-typer';

import type { IKlagebehandling } from '../typer/klage';

export const useKlageApi = () => {
    const { request } = useHttp();

    const hentKlagebehandlingerPåFagsak = (
        fagsakId?: number
    ): Promise<Ressurs<IKlagebehandling[]>> => {
        if (!fagsakId) {
            return Promise.resolve(byggTomRessurs());
        }

        return request<void, IKlagebehandling[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}/hent-klagebehandlinger`,
            påvirkerSystemLaster: true,
        }).then(klagebehandlingerRessurs => {
            return klagebehandlingerRessurs;
        });
    };

    return {
        hentKlagebehandlingerPåFagsak,
    };
};
