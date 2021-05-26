import React, { Fragment } from 'react';

import { IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { hentAktivVedtakPåBehandlig } from '../../../../../utils/fagsak';
import OverskriftMedHjelpetekst from '../Felles/OverskriftMedHjelpetekst';
import VedtaksperiodeMedBegrunnelserPanel from './VedtaksperiodeMedBegrunnelserPanel';

interface IVedtakBegrunnelserTabell {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const VedtaksperioderMedBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({
    fagsak,
    åpenBehandling,
}) => {
    const vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[] =
        hentAktivVedtakPåBehandlig(åpenBehandling)?.vedtaksperioderMedBegrunnelser ?? [];

    return vedtaksperioderMedBegrunnelser.length > 0 ? (
        <>
            <OverskriftMedHjelpetekst
                overskrift={'Begrunnelser i vedtaksbrev (POC)'}
                hjelpetekst={'Her skal du sette begrunnelsestekster for fortsatt innvilgelse'}
            />
            {vedtaksperioderMedBegrunnelser.map(
                (vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser) => (
                    <VedtaksperiodeMedBegrunnelserPanel
                        fagsak={fagsak}
                        vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                        åpenBehandling={åpenBehandling}
                        key={vedtaksperiodeMedBegrunnelser.id}
                    />
                )
            )}
        </>
    ) : (
        <Fragment />
    );
};

export default VedtaksperioderMedBegrunnelser;
