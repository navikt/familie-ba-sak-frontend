import React from 'react';

import { IBehandling } from '../../../../typer/behandling';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import {
    kalenderDatoMedFallback,
    kalenderDatoTilDate,
    kalenderDiff,
    TIDENES_MORGEN,
} from '../../../../utils/kalender';
import AvslagBegrunnelsePanel from './AvslagBegrunnelsePanel';
import { FritekstVedtakBegrunnelserProvider } from './Context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from './Context/VedtakBegrunnelserContext';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';

interface IAvslagTabell {
    åpenBehandling: IBehandling;
}

const AvslagBegrunnelser: React.FC<IAvslagTabell> = ({ åpenBehandling }) => {
    const { avslagBegrunnelser } = useVedtakBegrunnelser();

    const sorterTommePerioderSist = (a: Vedtaksperiode, b: Vedtaksperiode) =>
        !a.periodeFom && !a.periodeTom
            ? 1
            : kalenderDiff(
                  kalenderDatoTilDate(kalenderDatoMedFallback(a.periodeFom, TIDENES_MORGEN)),
                  kalenderDatoTilDate(kalenderDatoMedFallback(b.periodeFom, TIDENES_MORGEN))
              );

    return avslagBegrunnelser.length ? (
        <>
            <OverskriftMedHjelpetekst
                overskrift={'Begrunnelser for avslag i vedtaksbrev'}
                hjelpetekst={
                    'Her har vi hentet begrunnelsestekster for avslag som du har satt i vilkårsvurderingen.'
                }
            />
            {åpenBehandling.vedtaksperioder
                .filter(
                    (periode: Vedtaksperiode) =>
                        periode.vedtaksperiodetype === Vedtaksperiodetype.AVSLAG
                )
                .sort(sorterTommePerioderSist)
                .map((periode: Vedtaksperiode) => (
                    <FritekstVedtakBegrunnelserProvider
                        vedtaksperiode={periode}
                        behandlingstype={åpenBehandling.type}
                    >
                        <AvslagBegrunnelsePanel vedtaksperiode={periode} />
                    </FritekstVedtakBegrunnelserProvider>
                ))}
        </>
    ) : null;
};

export default AvslagBegrunnelser;
