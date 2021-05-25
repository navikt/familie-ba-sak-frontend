import React from 'react';

import { useBehandling } from '../../../../context/BehandlingContext';
import { FritekstVedtakBegrunnelserProvider } from '../../../../context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { IBehandling } from '../../../../typer/behandling';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../utils/vedtakUtils';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';
import VedtakBegrunnelsePanel from './VedtakBegrunnelsePanel';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const VedtakBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();

    const vedtaksperioderMedBegrunnelseBehov = filtrerOgSorterPerioderMedBegrunnelseBehov(
        åpenBehandling.vedtaksperioder,
        vedtakBegrunnelser,
        erLesevisning()
    );

    return vedtaksperioderMedBegrunnelseBehov.length > 0 ? (
        <>
            <OverskriftMedHjelpetekst
                overskrift={'Begrunnelser i vedtaksbrev'}
                hjelpetekst={
                    'Her skal du sette begrunnelsestekster for innvilgelse, reduksjon, opphør og fortsatt innvilgelse.'
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
