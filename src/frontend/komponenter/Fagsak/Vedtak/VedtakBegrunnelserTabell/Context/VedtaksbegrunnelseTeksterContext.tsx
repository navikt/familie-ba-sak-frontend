import React, { useEffect } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { Ressurs, byggTomRessurs } from '@navikt/familie-typer';
import { byggSuksessRessurs } from '@navikt/familie-typer/dist/ressurs';

import { useSanity, BegrunnelseMetadata } from '../../../../../api/sanity/sanityHook';
import { sanityApiNavnTilBegrunnelseDictionary } from '../../../../../api/sanity/typer';
import { useApp } from '../../../../../context/AppContext';
import { ToggleNavn } from '../../../../../typer/toggles';
import { VedtakBegrunnelseType } from '../../../../../typer/vedtak';
import { VedtaksbegrunnelseTekster } from '../../../../../typer/vilkår';

const [VedtaksbegrunnelseTeksterProvider, useVedtaksbegrunnelseTekster] = constate(() => {
    const { request } = useHttp();
    const { toggles } = useApp();
    const { hentBegrunnelser } = useSanity();

    const [vedtaksbegrunnelseTekster, settVedtaksbegrunnelseTekster] = React.useState<
        Ressurs<VedtaksbegrunnelseTekster>
    >(byggTomRessurs());

    const byggVedtaksbegrunnelsesteksterFraSanitydata = (
        begrunnelsedataFraSanity: BegrunnelseMetadata[]
    ) =>
        begrunnelsedataFraSanity.reduce(
            (
                acc: VedtaksbegrunnelseTekster,
                begrunnelseMetadata: BegrunnelseMetadata
            ): VedtaksbegrunnelseTekster => {
                // Løser dette kun for "Norsk, nordisk bosatt i Norge"-begrunnelsen for POCen
                begrunnelseMetadata.apiNavn === 'norskNordiskBosattINorge' &&
                    sanityApiNavnTilBegrunnelseDictionary[begrunnelseMetadata.apiNavn] &&
                    acc[begrunnelseMetadata.begrunnelsetype].push({
                        id: sanityApiNavnTilBegrunnelseDictionary[begrunnelseMetadata.apiNavn],
                        navn: begrunnelseMetadata.navnISystem,
                        vilkår: begrunnelseMetadata.vilkår,
                    });
                return acc;
            },
            {
                [VedtakBegrunnelseType.INNVILGELSE]: [],
                [VedtakBegrunnelseType.AVSLAG]: [],
                [VedtakBegrunnelseType.REDUKSJON]: [],
                [VedtakBegrunnelseType.OPPHØR]: [],
                [VedtakBegrunnelseType.FORTSATT_INNVILGET]: [],
            }
        );

    useEffect(() => {
        if (toggles[ToggleNavn.brukBegrunnelserFraSanity]) {
            hentBegrunnelser().then(begrunnelsedataFraSanity => {
                settVedtaksbegrunnelseTekster(
                    byggSuksessRessurs(
                        byggVedtaksbegrunnelsesteksterFraSanitydata(begrunnelsedataFraSanity)
                    )
                );
            });
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
