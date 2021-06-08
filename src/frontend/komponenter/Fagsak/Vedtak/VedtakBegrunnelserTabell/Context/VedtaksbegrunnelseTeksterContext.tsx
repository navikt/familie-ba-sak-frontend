import React, { useEffect } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { Ressurs, byggTomRessurs } from '@navikt/familie-typer';

import { VedtaksbegrunnelseTekster } from '../../../../../typer/vilkår';

const [VedtaksbegrunnelseTeksterProvider, useVedtaksbegrunnelseTekster] = constate(() => {
    const { request } = useHttp();

    const [vedtaksbegrunnelseTekster, settVedtaksbegrunnelseTekster] = React.useState<
        Ressurs<VedtaksbegrunnelseTekster>
    >(byggTomRessurs());

    useEffect(() => {
        request<void, VedtaksbegrunnelseTekster>({
            method: 'GET',
            url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
            påvirkerSystemLaster: true,
        }).then((data: Ressurs<VedtaksbegrunnelseTekster>) => {
            settVedtaksbegrunnelseTekster(data);
        });
    }, []);

    return { vedtaksbegrunnelseTekster };
});

export { VedtaksbegrunnelseTeksterProvider, useVedtaksbegrunnelseTekster };
