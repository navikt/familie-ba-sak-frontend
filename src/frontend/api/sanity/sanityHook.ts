import { byggFeiletRessurs, byggSuksessRessurs, Ressurs } from '@navikt/familie-typer';

import { VedtakBegrunnelseType } from '../../typer/vedtak';
import { VedtaksbegrunnelseTekster, VilkårType } from '../../typer/vilkår';
import { hentBegrunnelserQuery } from './queries';
import { sanity } from './sanity';
import { sanityApiNavnTilBegrunnelseDictionary } from './typer';

export interface Begrunnelsedata {
    apiNavn: string;
    navnISystem: string;
    vilkår: VilkårType;
    begrunnelsetype: VedtakBegrunnelseType;
}

const byggVedtaksbegrunnelsesteksterFraSanitydata = (begrunnelsedataFraSanity: Begrunnelsedata[]) =>
    begrunnelsedataFraSanity.reduce(
        (
            acc: VedtaksbegrunnelseTekster,
            begrunnelseMetadata: Begrunnelsedata
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

export const useSanity = () => {
    const hentBegrunnelser = (): Promise<Ressurs<VedtaksbegrunnelseTekster>> =>
        sanity
            .fetch(hentBegrunnelserQuery)
            .then(begrunnelsedata =>
                byggSuksessRessurs(byggVedtaksbegrunnelsesteksterFraSanitydata(begrunnelsedata))
            )
            .catch(error => byggFeiletRessurs(error));

    return { hentBegrunnelser };
};
