import React, { useEffect } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import type { VedtaksbegrunnelseTekster } from '../../../../../../../typer/vilkår';

const [VedtaksbegrunnelseTeksterProvider, useVedtaksbegrunnelseTekster] = constate(() => {
    const { request } = useHttp();

    const [vedtaksbegrunnelseTekster, settVedtaksbegrunnelseTekster] =
        React.useState<Ressurs<VedtaksbegrunnelseTekster>>(byggTomRessurs());

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
