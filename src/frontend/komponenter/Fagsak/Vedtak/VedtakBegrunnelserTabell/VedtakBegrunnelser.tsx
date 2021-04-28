import React from 'react';

import { useBehandling } from '../../../../context/BehandlingContext';
import { FritekstVedtakBegrunnelserProvider } from '../../../../context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { IBehandling } from '../../../../typer/behandling';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../utils/vedtakUtils';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';
import VedtakBegrunnelsePanel from './VedtakBegrunnelsePanel';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const VedtakBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();

    const utbetalingsperioder = åpenBehandling.vedtaksperioder.filter(
        (periode: Vedtaksperiode) => periode.vedtaksperiodetype !== Vedtaksperiodetype.AVSLAG
    );
    const harVedtaksperioder = utbetalingsperioder.length > 0;
    const vedtaksperioderMedBegrunnelseBehov = filtrerOgSorterPerioderMedBegrunnelseBehov(
        utbetalingsperioder,
        vedtakBegrunnelser,
        erLesevisning()
    );

    return harVedtaksperioder ? (
        <>
            <OverskriftMedHjelpetekst
                overskrift={'Begrunnelser i vedtaksbrev'}
                hjelpetekst={
                    'Her skal du sette begrunnelsestekster for innvilgelse, reduksjon og opphør.'
                }
            />
            {vedtaksperioderMedBegrunnelseBehov.map((vedtaksperiode: Vedtaksperiode) => (
                <FritekstVedtakBegrunnelserProvider
                    vedtaksperiode={vedtaksperiode}
                    behandlingstype={åpenBehandling.type}
                    key={vedtaksperiode.periodeFom}
                >
                    <VedtakBegrunnelsePanel
                        vedtaksperiode={vedtaksperiode}
                        åpenBehandling={åpenBehandling}
                    />
                </FritekstVedtakBegrunnelserProvider>
            ))}
        </>
    ) : null;
};

export default VedtakBegrunnelser;
