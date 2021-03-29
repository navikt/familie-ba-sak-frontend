import React from 'react';

import { FritekstVedtakBegrunnelserProvider } from '../../../../context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { IBehandling } from '../../../../typer/behandling';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat } from '../../../../utils/formatter';
import AvslagBegrunnelsePanel from './AvslagBegrunnelsePanel';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';

interface IAvslagTabell {
    åpenBehandling: IBehandling;
}

const AvslagBegrunnelser: React.FC<IAvslagTabell> = ({ åpenBehandling }) => {
    const { avslagBegrunnelser } = useVedtakBegrunnelser();

    const sorterTommePerioderSist = (a: Vedtaksperiode, b: Vedtaksperiode) =>
        !a.periodeFom && !a.periodeTom
            ? 1
            : familieDayjsDiff(
                  familieDayjs(a.periodeFom, datoformat.ISO_DAG),
                  familieDayjs(b.periodeFom, datoformat.ISO_DAG)
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
