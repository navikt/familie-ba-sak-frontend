import React, { Fragment } from 'react';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { hentAktivVedtakPåBehandlig } from '../../../../../utils/fagsak';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
import { VedtaksperiodeMedBegrunnelserProvider } from '../Context/VedtaksperiodeMedBegrunnelserContext';
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
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();
    const vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[] =
        hentAktivVedtakPåBehandlig(åpenBehandling)?.vedtaksperioderMedBegrunnelser ?? [];

    if (
        vedtaksbegrunnelseTekster.status === RessursStatus.FEILET ||
        vedtaksbegrunnelseTekster.status === RessursStatus.FUNKSJONELL_FEIL
    ) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vedtak.</AlertStripeFeil>;
    }

    return vedtaksperioderMedBegrunnelser.length > 0 ? (
        <>
            <OverskriftMedHjelpetekst
                overskrift={'Begrunnelser i vedtaksbrev'}
                hjelpetekst={'Her skal du sette begrunnelsestekster for fortsatt innvilgelse'}
            />
            {vedtaksperioderMedBegrunnelser.map(
                (vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser) => (
                    <VedtaksperiodeMedBegrunnelserProvider
                        key={vedtaksperiodeMedBegrunnelser.id}
                        fagsak={fagsak}
                        åpenBehandling={åpenBehandling}
                        vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                    >
                        <VedtaksperiodeMedBegrunnelserPanel
                            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                        />
                    </VedtaksperiodeMedBegrunnelserProvider>
                )
            )}
        </>
    ) : (
        <Fragment />
    );
};

export default VedtaksperioderMedBegrunnelser;
