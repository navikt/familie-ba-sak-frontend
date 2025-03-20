import type { PropsWithChildren } from 'react';
import React from 'react';

import { endOfMonth, isAfter } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Label, ExpansionCard } from '@navikt/ds-react';

import type { IIsoMånedPeriode } from '../../../../../../../utils/dato';
import {
    dagensDato,
    isoDatoPeriodeTilFormatertString,
    isoStringTilDateMedFallback,
    tidenesEnde,
} from '../../../../../../../utils/dato';
import { formaterBeløp } from '../../../../../../../utils/formatter';

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

interface IEkspanderbartBegrunnelsePanelProps extends PropsWithChildren {
    åpen: boolean;
    onClick?: () => void;
    periode: IIsoMånedPeriode;
    skalViseSum: boolean;
    summer: () => number;
    tittel: string;
}

const slutterSenereEnnInneværendeMåned = (tom?: string) =>
    isAfter(
        isoStringTilDateMedFallback({ isoString: tom, fallbackDate: tidenesEnde }),
        endOfMonth(dagensDato)
    );

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
        <StyledExpansionCard open={åpen} onToggle={onClick} size="small" aria-label="Begrunnelser">
            <StyledExpansionHeader>
                <StyledExpansionTitle>
                    {periode.fom && (
                        <Label>
                            {isoDatoPeriodeTilFormatertString({
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
