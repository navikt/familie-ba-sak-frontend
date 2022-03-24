import React, { useState, useEffect } from 'react';

import { useRouteMatch } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, type Ressurs, RessursStatus } from '@navikt/familie-typer';

const TidslinjeVisualisering: React.FC<> = () => {
    const matchBehandlingId = useRouteMatch<{ behandlingId: string }>('/tidslinjer/:behandlingId');
    const behandlingId = matchBehandlingId?.params.behandlingId;
    const [tidslinjerRessurs, settTidslinjerRessurs] = useState<Ressurs<any>>(byggTomRessurs());
    const { request } = useHttp();

    useEffect(() => {
        if (behandlingId) {
            console.log('Hente tidslinjer for: ', behandlingId);
            request<void, any>({
                method: 'GET',
                url: `/familie-ba-sak/api/tidslinjer/${behandlingId}`,
            }).then((tidslinjer: Ressurs<any>) => {
                settTidslinjerRessurs(tidslinjer);
            });
        }
    }, []);

    switch (tidslinjerRessurs.status) {
        case RessursStatus.SUKSESS:
            return <div>Tidslinjer hentet</div>;
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <div>Feilet med feilmeldingen: {tidslinjerRessurs.frontendFeilmelding}</div>;
        default:
            return <div>Henter</div>;
    }
};

export default TidslinjeVisualisering;
