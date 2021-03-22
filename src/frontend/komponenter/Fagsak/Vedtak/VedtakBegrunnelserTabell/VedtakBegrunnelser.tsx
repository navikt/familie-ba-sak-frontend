import React from 'react';

import styled from 'styled-components';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/BehandlingContext';
import {
    FritekstVedtakBegrunnelserProvider,
    useFritekstVedtakBegrunnelser,
} from '../../../../context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { Behandlingstype, IBehandling } from '../../../../typer/behandling';
import { ToggleNavn } from '../../../../typer/toggles';
import { IRestVedtakBegrunnelse } from '../../../../typer/vedtak';
import {
    IUtbetalingsperiodeDetalj,
    Vedtaksperiode,
    Vedtaksperiodetype,
} from '../../../../typer/vedtaksperiode';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat, formaterBeløp, formaterPersonIdent } from '../../../../utils/formatter';
import EkspanderbartBegrunnelsePanel from './Felles/EkspanderbartBegrunnelsePanel';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';
import FritekstVedtakbegrunnelser from './FritekstVedtakbegrunnelser';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const UtbetalingsperiodepanelBody = styled.div`
    display: grid;
    grid-template-columns: 5fr 4fr;
`;

const UtbetalingsperiodeDetalj = styled.div`
    display: flex;
    flex-direction: row;

    .typo-normal {
        margin-right: 1.5rem;
    }
`;

const VedtakBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({ åpenBehandling }) => {
    const { toggles } = useApp();
    const { erLesevisning } = useBehandling();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();
    const { toggleForm } = useFritekstVedtakBegrunnelser();

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
                    <FritekstVedtakBegrunnelserProvider vedtaksperiode={vedtaksperiode}>
                        <EkspanderbartBegrunnelsePanel
                            vedtaksperiode={vedtaksperiode}
                            åpen={åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING}
                        >
                            <UtbetalingsperiodepanelBody>
                                {vedtaksperiode.vedtaksperiodetype ===
                                Vedtaksperiodetype.UTBETALING ? (
                                    <div>
                                        <Element>Resultat</Element>

                                        {vedtaksperiode.utbetalingsperiodeDetaljer.map(
                                            (detalj: IUtbetalingsperiodeDetalj) => (
                                                <UtbetalingsperiodeDetalj
                                                    key={detalj.person.personIdent}
                                                >
                                                    <Normaltekst title={detalj.person.navn}>
                                                        {formaterPersonIdent(
                                                            detalj.person.personIdent
                                                        )}
                                                    </Normaltekst>

                                                    <Normaltekst>
                                                        {formaterBeløp(detalj.utbetaltPerMnd)}
                                                    </Normaltekst>
                                                </UtbetalingsperiodeDetalj>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div />
                                )}
                                <div>
                                    <VedtakBegrunnelserMultiselect
                                        erLesevisning={erLesevisning()}
                                        personResultater={åpenBehandling.personResultater}
                                        vedtaksperiode={vedtaksperiode}
                                    />
                                </div>
                                {vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.OPPHØR &&
                                    toggles[ToggleNavn.begrgrunnelseFritekst] && (
                                        <FritekstVedtakbegrunnelser
                                            vedtaksperiode={vedtaksperiode}
                                            toggleForm={toggleForm}
                                        />
                                    )}
                            </UtbetalingsperiodepanelBody>
                        </EkspanderbartBegrunnelsePanel>
                    </FritekstVedtakBegrunnelserProvider>
                ))}
        </>
    ) : null;
};

export default VedtakBegrunnelser;
