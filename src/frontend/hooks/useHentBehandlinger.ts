import { useQueries } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { utledKlagebehandlingerQueryKey } from './useHentKlagebehandlinger';
import { utledTilbakekrevingsbehandlingerQueryKey } from './useHentTilbakekrevingsbehandlinger';
import { hentKlagebehandlinger } from '../api/hentKlagebehandlinger';
import { hentTilbakekrevingbehandlinger } from '../api/hentTilbakekrevingbehandlinger';
import type { IMinimalFagsak } from '../typer/fagsak';

export function useHentBehandlinger(fagsak: IMinimalFagsak) {
    const { id: fagsakId, behandlinger } = fagsak;
    const { request } = useHttp();
    const query = useQueries({
        queries: [
            {
                queryKey: utledKlagebehandlingerQueryKey(fagsakId),
                queryFn: () => hentKlagebehandlinger(request, fagsakId),
            },
            {
                queryKey: utledTilbakekrevingsbehandlingerQueryKey(fagsakId),
                queryFn: () => hentTilbakekrevingbehandlinger(request, fagsakId),
            },
        ],
        combine: results => {
            return {
                data: {
                    barnetrygdbehandlinger: behandlinger, // TODO : Dette burde hentes ut i et eget endepunkt
                    klagebehandlinger: results[0].data,
                    tilbakekrevingsbehandlinger: results[1].data,
                },
                isPending: results.some(result => result.isPending),
                isFetching: results.some(result => result.isFetching),
                errors: {
                    barnetrygdbehandlingerError: null,
                    klagebehandlingerError: results[0].error,
                    tilbakekrevingsbehandlingerError: results[1].error,
                },
            };
        },
    });
    return { ...query };
}
