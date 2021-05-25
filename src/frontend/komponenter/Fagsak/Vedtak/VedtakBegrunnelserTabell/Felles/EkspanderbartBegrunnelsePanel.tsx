import React from 'react';

import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import {
    hentUtbetaltPerMåned,
    hentVedtaksperiodeTittel,
    Vedtaksperiode,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import { formaterBeløp } from '../../../../../utils/formatter';
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
        padding: 0 2.75rem 1.5rem 1.6rem;
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
    vedtaksperiode: Vedtaksperiode;
    åpen: boolean;
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const slutterSenereEnnInneværendeMåned = (tom?: string) =>
    erEtter(kalenderDatoMedFallback(tom, TIDENES_ENDE), sisteDagIInneværendeMåned());

const EkspanderbartBegrunnelsePanel: React.FC<IEkspanderbartBegrunnelsePanelProps> = ({
    vedtaksperiode,
    åpen,
    onClick,
    children,
}) => {
    const utbetaltPerMnd = hentUtbetaltPerMåned(vedtaksperiode);

    return (
        <StyledEkspanderbartpanelBase
            key={`${vedtaksperiode.vedtaksperiodetype}_${vedtaksperiode.periodeFom}_${vedtaksperiode.periodeTom}`}
            apen={åpen}
            onClick={onClick}
            tittel={
                vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.AVSLAG ? (
                    <PanelTittel>
                        {vedtaksperiode.periodeFom && (
                            <Element>
                                {periodeToString({
                                    fom: vedtaksperiode.periodeFom,
                                    tom: vedtaksperiode.periodeTom,
                                })}
                            </Element>
                        )}
                        <Normaltekst>{hentVedtaksperiodeTittel(vedtaksperiode)}</Normaltekst>
                    </PanelTittel>
                ) : (
                    <PanelTittel>
                        <Element>
                            {periodeToString({
                                fom: vedtaksperiode.periodeFom,
                                tom: slutterSenereEnnInneværendeMåned(vedtaksperiode.periodeTom)
                                    ? ''
                                    : vedtaksperiode.periodeTom,
                            })}
                        </Element>
                        <Normaltekst>{hentVedtaksperiodeTittel(vedtaksperiode)}</Normaltekst>
                        {utbetaltPerMnd && (
                            <Normaltekst>{formaterBeløp(utbetaltPerMnd)}</Normaltekst>
                        )}
                    </PanelTittel>
                )
            }
        >
            {children}
        </StyledEkspanderbartpanelBase>
    );
};

export default EkspanderbartBegrunnelsePanel;
