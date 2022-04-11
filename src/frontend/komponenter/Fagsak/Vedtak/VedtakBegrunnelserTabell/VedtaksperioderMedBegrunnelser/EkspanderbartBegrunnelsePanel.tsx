import React from 'react';

import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { hentVedtaksperiodeTittel, Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import { formaterBeløp, summer } from '../../../../../utils/formatter';
import {
    erEtter,
    kalenderDatoMedFallback,
    periodeToString,
    sisteDagIInneværendeMåned,
    TIDENES_ENDE,
} from '../../../../../utils/kalender';

const StyledEkspanderbartpanelBase = styled(EkspanderbartpanelBase)`
    margin-bottom: 1rem;

    .ekspanderbartPanel__hode {
        padding: 0 1rem 0 1.6rem;
    }
    .ekspanderbartPanel__innhold {
        padding: 0.5rem 2.75rem 1.5rem 1.6rem;
    }
`;

const PanelTittel = styled.div`
    display: grid;
    grid-template-columns: minmax(6rem, 12rem) minmax(6rem, 15rem) auto;
    grid-gap: 0.5rem;
    margin: 1rem;
    margin-left: 0;
`;

interface IEkspanderbartBegrunnelsePanelProps {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpen: boolean;
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const slutterSenereEnnInneværendeMåned = (tom?: string) =>
    erEtter(kalenderDatoMedFallback(tom, TIDENES_ENDE), sisteDagIInneværendeMåned());

const EkspanderbartBegrunnelsePanel: React.FC<IEkspanderbartBegrunnelsePanelProps> = ({
    vedtaksperiodeMedBegrunnelser,
    åpen,
    onClick,
    children,
}) => {
    const periode = {
        fom: vedtaksperiodeMedBegrunnelser.fom,
        tom: vedtaksperiodeMedBegrunnelser.tom,
    };

    const vedtaksperiodeTittel = hentVedtaksperiodeTittel(vedtaksperiodeMedBegrunnelser);

    return (
        <StyledEkspanderbartpanelBase
            key={`${periode.fom}_${periode.tom}`}
            apen={åpen}
            onClick={onClick}
            tittel={
                <PanelTittel>
                    {periode.fom && (
                        <Element>
                            {periodeToString({
                                fom: periode.fom,
                                tom: slutterSenereEnnInneværendeMåned(periode.tom)
                                    ? ''
                                    : periode.tom,
                            })}
                        </Element>
                    )}
                    <Normaltekst>{vedtaksperiodeTittel}</Normaltekst>
                    {(vedtaksperiodeMedBegrunnelser.type === Vedtaksperiodetype.UTBETALING ||
                        vedtaksperiodeMedBegrunnelser.type ===
                            Vedtaksperiodetype.UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING) &&
                        vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.length > 0 && (
                            <Normaltekst>
                                {formaterBeløp(
                                    summer(
                                        vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.map(
                                            utbetalingsperiodeDetalj =>
                                                utbetalingsperiodeDetalj.utbetaltPerMnd
                                        )
                                    )
                                )}
                            </Normaltekst>
                        )}
                </PanelTittel>
            }
        >
            {children}
        </StyledEkspanderbartpanelBase>
    );
};

export default EkspanderbartBegrunnelsePanel;
