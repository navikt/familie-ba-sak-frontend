import React from 'react';

import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { IRestAvslagbegrunnelser } from '../../../../typer/vedtak';
import { RessursStatus } from '@navikt/familie-typer';
import AvslagBegrunnelsePanel from './AvslagBegrunnelsePanel';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat } from '../../../../utils/formatter';
import OverskriftMedHjelpetekst from './OverskriftMedHjelpetekst';

interface IAvslagTabell {
    åpenBehandling: IBehandling;
}

const AvslagBegrunnelser: React.FC<IAvslagTabell> = ({ åpenBehandling }) => {
    const { avslagBegrunnelser } = useVedtakBegrunnelser();

    return avslagBegrunnelser.status == RessursStatus.SUKSESS && avslagBegrunnelser.data.length ? (
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
                .sort((a, b) =>
                    !a.periodeFom && !a.periodeTom
                        ? 1
                        : familieDayjsDiff(
                              familieDayjs(a.periodeFom, datoformat.ISO_DAG),
                              familieDayjs(b.periodeFom, datoformat.ISO_DAG)
                          )
                )
                .map((periode: Vedtaksperiode) => (
                    <AvslagBegrunnelsePanel
                        vedtaksperiode={periode}
                        begrunnelser={
                            avslagBegrunnelser.data.find(
                                (avslagBegrunnelser: IRestAvslagbegrunnelser) =>
                                    avslagBegrunnelser.fom === periode.periodeFom &&
                                    avslagBegrunnelser.tom === periode.periodeTom
                            )?.brevBegrunnelser ?? []
                        }
                    />
                ))}
        </>
    ) : null;
};

export default AvslagBegrunnelser;
