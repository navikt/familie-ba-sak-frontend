import React from 'react';

import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import { BodyShort, Label } from '@navikt/ds-react';

import type { Periode } from '../../../../../typer/periode';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { hentVedtaksperiodeTittel } from '../../../../../typer/vedtaksperiode';
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
    periode: Periode;
    skalViseSum: boolean;
    summer: () => number;
}

const slutterSenereEnnInneværendeMåned = (tom?: string) =>
    erEtter(kalenderDatoMedFallback(tom, TIDENES_ENDE), sisteDagIInneværendeMåned());

const EkspanderbartBegrunnelsePanel: React.FC<IEkspanderbartBegrunnelsePanelProps> = ({
    vedtaksperiodeMedBegrunnelser,
    åpen,
    onClick,
    children,
    periode,
    skalViseSum,
    summer,
}) => {
    const vedtaksperiodeTittel = hentVedtaksperiodeTittel(vedtaksperiodeMedBegrunnelser);

    return (
        <StyledEkspanderbartpanelBase
            key={`${periode.fom}_${periode.tom}`}
            apen={åpen}
            onClick={onClick}
            tittel={
                <PanelTittel>
                    {periode.fom && (
                        <Label>
                            {periodeToString({
                                fom: periode.fom,
                                tom: slutterSenereEnnInneværendeMåned(periode.tom)
                                    ? ''
                                    : periode.tom,
                            })}
                        </Label>
                    )}
                    <BodyShort>{vedtaksperiodeTittel}</BodyShort>
                    {skalViseSum && <BodyShort>{formaterBeløp(summer())}</BodyShort>}
                </PanelTittel>
            }
        >
            {children}
        </StyledEkspanderbartpanelBase>
    );
};

export default EkspanderbartBegrunnelsePanel;
