import React, { useEffect } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { Ressurs, byggTomRessurs } from '@navikt/familie-typer';

import { useSanity } from '../../../../../api/sanity/sanityHook';
import { useApp } from '../../../../../context/AppContext';
import { ToggleNavn } from '../../../../../typer/toggles';
import { VedtaksbegrunnelseTekster } from '../../../../../typer/vilkår';

const [VedtaksbegrunnelseTeksterProvider, useVedtaksbegrunnelseTekster] = constate(() => {
    const { request } = useHttp();
    const { toggles } = useApp();
    const { hentBegrunnelser } = useSanity();

    const [vedtaksbegrunnelseTekster, settVedtaksbegrunnelseTekster] = React.useState<
        Ressurs<VedtaksbegrunnelseTekster>
    >(byggTomRessurs());

    useEffect(() => {
        if (toggles[ToggleNavn.brukBegrunnelserFraSanity]) {
            hentBegrunnelser().then((begrunnelseData: Ressurs<VedtaksbegrunnelseTekster>) =>
                settVedtaksbegrunnelseTekster(begrunnelseData)
            );
        } else {
            request<void, VedtaksbegrunnelseTekster>({
                method: 'GET',
                url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
                påvirkerSystemLaster: true,
            }).then((data: Ressurs<VedtaksbegrunnelseTekster>) => {
                settVedtaksbegrunnelseTekster(data);
            });
        }
    }, []);

    return { vedtaksbegrunnelseTekster };
});

export { VedtaksbegrunnelseTeksterProvider, useVedtaksbegrunnelseTekster };
