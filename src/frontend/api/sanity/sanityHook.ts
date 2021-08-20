import { byggFeiletRessurs, byggSuksessRessurs, Ressurs } from '@navikt/familie-typer';

import { VedtakBegrunnelseType } from '../../typer/vedtak';
import { VedtaksbegrunnelseTekster, VilkårType } from '../../typer/vilkår';
import { hentBegrunnelserQuery } from './queries';
import { sanity } from './sanity';
import { sanityApiNavnTilBegrunnelseDictionary } from './typer';

export interface SanityBegrunnelse {
    apiNavn: string;
    navnISystem: string;
    vilkår: VilkårType;
    begrunnelsetype: VedtakBegrunnelseType;
}

const byggVedtaksbegrunnelsesteksterFraSanitydata = (sanityBegrunnelse: SanityBegrunnelse[]) =>
    sanityBegrunnelse.reduce(
        (
            acc: VedtaksbegrunnelseTekster,
            begrunnelseMetadata: SanityBegrunnelse
        ): VedtaksbegrunnelseTekster => {
            if (sanityApiNavnTilBegrunnelseDictionary[begrunnelseMetadata.apiNavn]) {
                return {
                    ...acc,
                    [begrunnelseMetadata.begrunnelsetype]: [
                        ...acc[begrunnelseMetadata.begrunnelsetype],
                        {
                            id: sanityApiNavnTilBegrunnelseDictionary[begrunnelseMetadata.apiNavn],
                            navn: begrunnelseMetadata.navnISystem,
                            vilkår: begrunnelseMetadata.vilkår,
                        },
                    ],
                };
            }
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

export const useSanity = () => {
    const hentBegrunnelser = (): Promise<Ressurs<VedtaksbegrunnelseTekster>> =>
        sanity
            .fetch(hentBegrunnelserQuery)
            .then(sanityBegrunnelse =>
                byggSuksessRessurs(byggVedtaksbegrunnelsesteksterFraSanitydata(sanityBegrunnelse))
            )
            .catch(error => byggFeiletRessurs(error));

    return { hentBegrunnelser };
};
