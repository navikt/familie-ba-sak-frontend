import { useEffect, useState } from 'react';

import type { ISODateString } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { byggHenterRessurs } from '@navikt/familie-typer';

export const useHentEndringstidspunkt = (behandlingId: number) => {
    const { request } = useHttp();
    const [endringstidspunktRessurs, settEndringstidspunktRessurs] = useState(
        byggHenterRessurs<ISODateString>()
    );

    const hentEndringstidspunkt = () =>
        request<void, ISODateString>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/endringstidspunkt`,
            påvirkerSystemLaster: true,
        });

    useEffect(() => {
        hentEndringstidspunkt().then(ressurs => settEndringstidspunktRessurs(ressurs));
    }, [behandlingId]);

    return { endringstidspunktRessurs };
};
