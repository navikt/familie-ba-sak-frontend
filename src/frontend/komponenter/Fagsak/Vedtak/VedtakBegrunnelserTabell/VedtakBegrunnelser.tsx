import React from 'react';

import { useBehandling } from '../../../../context/BehandlingContext';
import { FritekstVedtakBegrunnelserProvider } from '../../../../context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { IBehandling } from '../../../../typer/behandling';
import { IRestVedtakBegrunnelse } from '../../../../typer/vedtak';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat } from '../../../../utils/formatter';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';
import VedtakBegrunnelsePanel from './VedtakBegrunnelsePanel';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const VedtakBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();

    const harVedtaksperioder =
        åpenBehandling.vedtaksperioder.filter(
            (periode: Vedtaksperiode) => periode.vedtaksperiodetype !== Vedtaksperiodetype.AVSLAG
        ).length > 0;
    const vedtaksperioderMedBegrunnelseBehov = åpenBehandling.vedtaksperioder
        .slice()
        .sort((a, b) =>
            familieDayjsDiff(
                familieDayjs(a.periodeFom, datoformat.ISO_DAG),
                familieDayjs(b.periodeFom, datoformat.ISO_DAG)
            )
        )
        .filter((vedtaksperiode: Vedtaksperiode) => {
            const vedtakBegrunnelserForPeriode = vedtakBegrunnelser.filter(
                (vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                    return (
                        vedtakBegrunnelse.fom === vedtaksperiode.periodeFom &&
                        vedtakBegrunnelse.tom === vedtaksperiode.periodeTom
                    );
                }
            );

            // Viser kun perioder som har begrunnelse dersom man er i lesemodus.
            if (erLesevisning()) {
                return vedtakBegrunnelserForPeriode.length !== 0;
            }

            // Fjern perioder hvor fom er mer enn 2 måneder frem i tid.
            return (
                familieDayjsDiff(familieDayjs(vedtaksperiode.periodeFom), familieDayjs(), 'month') <
                2
            );
        });

    return harVedtaksperioder ? (
        <>
            <OverskriftMedHjelpetekst
                overskrift={'Begrunnelser i vedtaksbrev'}
                hjelpetekst={
                    'Her skal du sette begrunnelsestekster for innvilgelse, reduksjon og opphør.'
                }
            />
            {vedtaksperioderMedBegrunnelseBehov
                .filter((vedtaksperiode: Vedtaksperiode) => {
                    return (
                        vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING ||
                        vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.OPPHØR
                    );
                })
                .map((vedtaksperiode: Vedtaksperiode) => (
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
