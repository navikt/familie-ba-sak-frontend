import React from 'react';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { lagPeriodeId } from '../../../../typer/periode';
import { ToggleNavn } from '../../../../typer/toggles';
import { IRestVedtakBegrunnelse } from '../../../../typer/vedtak';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat } from '../../../../utils/formatter';
import VedtakBegrunnelsePanel from './VedtaksBegrunnelsePanel';
import OverskriftMedHjelpetekst from './OverskriftMedHjelpetekst';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const VedtakBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
    const { toggles } = useApp();
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();

    const harVedtaksperioder = åpenBehandling.vedtaksperioder.length > 0;
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
                    if (toggles[ToggleNavn.visOpphørsperioder])
                        return (
                            vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING ||
                            vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.OPPHØR
                        );
                    else {
                        return vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING;
                    }
                })
                .map((vedtaksperiode: Vedtaksperiode) => (
                    <VedtakBegrunnelsePanel
                        key={lagPeriodeId({
                            fom: vedtaksperiode.periodeFom,
                            tom: vedtaksperiode.periodeTom,
                        })}
                        behandlingsType={åpenBehandling.type}
                        personResultater={åpenBehandling.personResultater}
                        vedtaksperiode={vedtaksperiode}
                    />
                ))}
        </>
    ) : null;
};

export default VedtakBegrunnelser;
