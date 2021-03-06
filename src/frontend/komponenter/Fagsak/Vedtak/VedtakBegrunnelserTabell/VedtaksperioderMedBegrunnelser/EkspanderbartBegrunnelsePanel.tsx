import React from 'react';

import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import {
    hentVedtaksperiodeTittel,
    IVedtaksperiodeMedBegrunnelser,
} from '../../../../../typer/vedtaksperiode';
import { formaterBeløp } from '../../../../../utils/formatter';
import {
    erEtter,
    kalenderDatoMedFallback,
    periodeToString,
    sisteDagIInneværendeMåned,
    TIDENES_ENDE,
} from '../../../../../utils/kalender';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';

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
    width: 100%;
    display: grid;
    grid-template-columns: 12rem 7.5rem auto;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
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

    const { utbetalingsperiode } = useVedtaksperiodeMedBegrunnelser();

    const vedtaksperiodeTittel = hentVedtaksperiodeTittel(
        vedtaksperiodeMedBegrunnelser.type,
        utbetalingsperiode
    );

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
                    {utbetalingsperiode && (
                        <Normaltekst>
                            {formaterBeløp(utbetalingsperiode.utbetaltPerMnd)}
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
