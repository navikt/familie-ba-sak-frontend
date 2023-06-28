import React from 'react';

import styled from 'styled-components';

import { BodyShort, Label, ExpansionCard } from '@navikt/ds-react';

import { formaterBeløp } from '../../../../../utils/formatter';
import type { IYearMonthPeriode } from '../../../../../utils/kalender';
import {
    erEtter,
    kalenderDatoMedFallback,
    periodeToString,
    sisteDagIInneværendeMåned,
    TIDENES_ENDE,
} from '../../../../../utils/kalender';

const StyledExpansionCard = styled(ExpansionCard)`
    margin-bottom: 1rem;
`;

const StyledExpansionHeader = styled(ExpansionCard.Header)`
    align-items: center;
`;

const StyledExpansionTitle = styled(ExpansionCard.Title)`
    display: grid;
    grid-template-columns: minmax(6rem, 12rem) minmax(6rem, 15rem) auto;
    grid-gap: 0.5rem;

    margin-left: 0;
`;

interface IEkspanderbartBegrunnelsePanelProps {
    åpen: boolean;
    onClick?: () => void;
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
        <StyledExpansionCard open={åpen} onToggle={onClick} size="small">
            <StyledExpansionHeader>
                <StyledExpansionTitle>
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
                    <BodyShort>{tittel}</BodyShort>
                    {skalViseSum && <BodyShort>{formaterBeløp(summer())}</BodyShort>}
                </StyledExpansionTitle>
            </StyledExpansionHeader>
            <ExpansionCard.Content>{children}</ExpansionCard.Content>
        </StyledExpansionCard>
    );
};

export default EkspanderbartBegrunnelsePanel;
