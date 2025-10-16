import { useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs, type Ressurs } from '@navikt/familie-typer';

import type { IInternstatistikk } from '../../typer/fagsak';

export const useInternstatistikk = () => {
    const { request } = useHttp();
    const [internstatistikk, settInternstatistikk] = useState<Ressurs<IInternstatistikk>>(byggTomRessurs());

    const hentInternstatistikk = (): void => {
        settInternstatistikk(byggHenterRessurs());
        request<void, IInternstatistikk>({
            method: 'GET',
            url: `/familie-ba-sak/api/internstatistikk`,
        })
            .then((hentetInternstatistikk: Ressurs<IInternstatistikk>) => {
                settInternstatistikk(hentetInternstatistikk);
            })
            .catch(() => {
                settInternstatistikk(byggFeiletRessurs('Feil ved lasting av internstatistikk'));
            });
    };

    return {
        internstatistikk,
        hentInternstatistikk,
    };
};
