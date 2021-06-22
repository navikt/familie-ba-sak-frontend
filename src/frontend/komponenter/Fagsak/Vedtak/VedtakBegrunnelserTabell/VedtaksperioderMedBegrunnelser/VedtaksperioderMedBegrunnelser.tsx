import React, { Fragment } from 'react';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import {
    IVedtaksperiodeMedBegrunnelser,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import { partition } from '../../../../../utils/commons';
import { hentAktivVedtakPåBehandlig } from '../../../../../utils/fagsak';
import { filtrerOgSorterPerioderMedBegrunnelseBehov2 } from '../../../../../utils/vedtakUtils';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
import { VedtaksperiodeMedBegrunnelserProvider } from '../Context/VedtaksperiodeMedBegrunnelserContext';
import OverskriftMedHjelpetekst from '../Felles/OverskriftMedHjelpetekst';
import VedtaksperiodeMedBegrunnelserPanel from './VedtaksperiodeMedBegrunnelserPanel';

interface IVedtakBegrunnelserTabell {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
    erLesevisning: boolean;
}

const VedtaksperioderMedBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({
    fagsak,
    åpenBehandling,
    erLesevisning,
}) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    const vedtaksperioderSomSkalvises = filtrerOgSorterPerioderMedBegrunnelseBehov2(
        hentAktivVedtakPåBehandlig(åpenBehandling)?.vedtaksperioderMedBegrunnelser ?? [],
        erLesevisning
    );

    if (
        vedtaksbegrunnelseTekster.status === RessursStatus.FEILET ||
        vedtaksbegrunnelseTekster.status === RessursStatus.FUNKSJONELL_FEIL
    ) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vedtak.</AlertStripeFeil>;
    }

    const avslagOgResterende = partition(
        vedtaksperiode => vedtaksperiode.type === Vedtaksperiodetype.AVSLAG,
        vedtaksperioderSomSkalvises
    );

    return vedtaksperioderSomSkalvises.length > 0 ? (
        <>
            <OverskriftMedHjelpetekst
                overskrift={'Begrunnelser i vedtaksbrev'}
                hjelpetekst={'Her skal du sette begrunnelsestekster for fortsatt innvilgelse'}
            />
            {avslagOgResterende[1].map(
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
            {avslagOgResterende[0] && (
                <OverskriftMedHjelpetekst
                    overskrift={'Begrunnelser for avslag i vedtaksbrev'}
                    hjelpetekst={
                        'Her har vi hentet begrunnelsestekster for avslag som du har satt i vilkårsvurderingen.'
                    }
                />
            )}
            {avslagOgResterende[0].map(
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
