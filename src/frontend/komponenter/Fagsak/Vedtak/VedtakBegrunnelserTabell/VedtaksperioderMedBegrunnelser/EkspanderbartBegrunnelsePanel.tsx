import React from 'react';

import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import { BodyShort, Label } from '@navikt/ds-react';

import { formaterBeløp } from '../../../../../utils/formatter';
import type { IYearMonthPeriode } from '../../../../../utils/kalender';
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
    .ekspanderbartPanel__tittel {
        width: 100%;
    }
    .ekspanderbartPanel__innhold {
        padding: 0.5rem 2.75rem 1.5rem 1.6rem;
    }
`;

const PanelTittel = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1rem 1rem 1rem 0rem;
`;
interface IEkspanderbartBegrunnelsePanelProps {
    åpen: boolean;
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    periode: IYearMonthPeriode;
    skalViseSum: boolean;
    summer: () => number;
    tittel: string;
}

const slutterSenereEnnInneværendeMåned = (tom?: string) =>
    erEtter(kalenderDatoMedFallback(tom, TIDENES_ENDE), sisteDagIInneværendeMåned());

const EkspanderbartBegrunnelsePanel: React.FC<IEkspanderbartBegrunnelsePanelProps> = ({
    åpen,
    onClick,
    children,
    periode,
    skalViseSum,
    summer,
    tittel,
}) => {
    return (
        <StyledEkspanderbartpanelBase
            key={`${periode.fom}_${periode.tom}`}
            apen={åpen}
            onClick={onClick}
            tittel={
                <PanelTittel>
                    {periode.fom ? (
                        <Label>
                            {periodeToString({
                                fom: periode.fom,
                                tom: slutterSenereEnnInneværendeMåned(periode.tom)
                                    ? ''
                                    : periode.tom,
                            })}
                        </Label>
                    ) : (
                        <Label>mm.åååå</Label>
                    )}
                    <BodyShort>{tittel}</BodyShort>
                    {skalViseSum && <BodyShort>{formaterBeløp(summer())}</BodyShort>}
                </PanelTittel>
            }
        >
            {children}
        </StyledEkspanderbartpanelBase>
    );
};

export default EkspanderbartBegrunnelsePanel;
