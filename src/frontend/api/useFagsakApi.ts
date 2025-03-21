import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';

import type { IMinimalFagsak } from '../typer/fagsak';

export const useFagsakApi = () => {
    const { request } = useHttp();

    const hentFagsakerForPerson = async (personId: string) => {
        return request<{ personIdent: string }, IMinimalFagsak[]>({
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person`,
            data: {
                personIdent: personId,
            },
        }).then((fagsaker: Ressurs<IMinimalFagsak[]>) => {
            return fagsaker;
        });
    };

    return {
        hentFagsakerForPerson,
    };
};
