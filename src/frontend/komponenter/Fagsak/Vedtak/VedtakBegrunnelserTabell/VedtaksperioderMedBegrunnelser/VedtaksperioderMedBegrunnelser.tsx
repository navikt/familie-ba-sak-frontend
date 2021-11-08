import React, { Fragment } from 'react';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { IBehandling } from '../../../../../typer/behandling';
import {
    IVedtaksperiodeMedBegrunnelser,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import { partition } from '../../../../../utils/commons';
import { filtrerOgSorterPerioderMedBegrunnelseBehov2 } from '../../../../../utils/vedtakUtils';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
import { VedtaksperiodeMedBegrunnelserProvider } from '../Context/VedtaksperiodeMedBegrunnelserContext';
import OverskriftMedHjelpetekst from '../Felles/OverskriftMedHjelpetekst';
import VedtaksperiodeMedBegrunnelserPanel from './VedtaksperiodeMedBegrunnelserPanel';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
    erLesevisning: boolean;
}

const VedtaksperioderMedBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({
    åpenBehandling,
    erLesevisning,
}) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    const vedtaksperioderSomSkalvises = filtrerOgSorterPerioderMedBegrunnelseBehov2(
        åpenBehandling.vedtak?.vedtaksperioderMedBegrunnelser ?? [],
        erLesevisning,
        åpenBehandling.resultat
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
            <VedtaksperiodeListe
                vedtaksperioderMedBegrunnelser={avslagOgResterende[1]}
                overskrift={'Begrunnelser i vedtaksbrev'}
                hjelpetekst={
                    'Her skal du sette begrunnelsestekster for innvilgelse, reduksjon og opphør.'
                }
                åpenBehandling={åpenBehandling}
            />

            <VedtaksperiodeListe
                vedtaksperioderMedBegrunnelser={avslagOgResterende[0]}
                overskrift={'Begrunnelser for avslag i vedtaksbrev'}
                hjelpetekst={
                    'Her har vi hentet begrunnelsestekster for avslag som du har satt i vilkårsvurderingen.'
                }
                åpenBehandling={åpenBehandling}
            />
        </>
    ) : (
        <Fragment />
    );
};

const VedtaksperiodeListe: React.FC<{
    vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[];
    overskrift: string;
    hjelpetekst: string;
    åpenBehandling: IBehandling;
}> = ({ vedtaksperioderMedBegrunnelser, overskrift, hjelpetekst, åpenBehandling }) => {
    if (vedtaksperioderMedBegrunnelser.length === 0) {
        return null;
    }

    return (
        <>
            <OverskriftMedHjelpetekst overskrift={overskrift} hjelpetekst={hjelpetekst} />

            {vedtaksperioderMedBegrunnelser.map(
                (vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser) => (
                    <VedtaksperiodeMedBegrunnelserProvider
                        key={vedtaksperiodeMedBegrunnelser.id}
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
    );
};

export default VedtaksperioderMedBegrunnelser;
