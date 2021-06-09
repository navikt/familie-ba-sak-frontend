import React from 'react';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { IBehandling } from '../../../../typer/behandling';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../utils/vedtakUtils';
import { FritekstVedtakBegrunnelserProvider } from './Context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from './Context/VedtakBegrunnelserContext';
import { useVedtaksbegrunnelseTekster } from './Context/VedtaksbegrunnelseTeksterContext';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';
import VedtakBegrunnelsePanel from './VedtakBegrunnelsePanel';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const VedtakBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

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
                    'Her skal du sette begrunnelsestekster for innvilgelse, reduksjon og opphør'
                }
            />
            {vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS ? (
                vedtaksperioderMedBegrunnelseBehov.map((vedtaksperiode: Vedtaksperiode) => (
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
                ))
            ) : (
                <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vedtak.</AlertStripeFeil>
            )}
        </>
    ) : null;
};

export default VedtakBegrunnelser;
