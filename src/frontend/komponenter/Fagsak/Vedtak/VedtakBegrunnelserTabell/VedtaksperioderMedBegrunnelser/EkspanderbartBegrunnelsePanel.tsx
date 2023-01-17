import React from 'react';

import styled from 'styled-components';

import { BodyShort, Label, Accordion } from '@navikt/ds-react';
import { AGray500, AGray600, ASpacing1, ASurfaceSubtle } from '@navikt/ds-tokens/dist/tokens';

import { formaterBeløp } from '../../../../../utils/formatter';
import type { IYearMonthPeriode } from '../../../../../utils/kalender';
import {
    erEtter,
    kalenderDatoMedFallback,
    periodeToString,
    sisteDagIInneværendeMåned,
    TIDENES_ENDE,
} from '../../../../../utils/kalender';

const StyledAccordion = styled(Accordion)`
    margin-bottom: 1rem;

    &:hover {
        box-shadow: ${AGray500} 0 2px 1px 0;
    }

    .navds-accordion__item {
        border: 1px solid ${AGray600};
        border-radius: ${ASpacing1};
    }

    .navds-accordion__item--open {
        background-color: ${ASurfaceSubtle};
        & > .navds-accordion__header {
            background-color: transparent;
        }
    }

    .navds-accordion__header {
        padding-left: 1.6rem;
        padding-right: 2.75rem;
        border-bottom: none;
    }
    .navds-accordion__content {
        padding: 0.5rem 2.75rem 1.5rem 1.6rem;
        border-bottom: none;
    }
`;

const PanelTittel = styled.div`
    display: grid;
    grid-template-columns: minmax(6rem, 12rem) minmax(6rem, 15rem) auto;
    grid-gap: 0.5rem;

    margin-left: 0;
`;

interface IEkspanderbartBegrunnelsePanelProps {
    åpen: boolean;
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    periode: IYearMonthPeriode;
    skalViseSum: boolean;
    summer: () => number;
    tittel: string;
    children?: React.ReactNode;
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
    // surface active når åpen
    return (
        <StyledAccordion>
            <Accordion.Item open={åpen}>
                <Accordion.Header onClick={onClick}>
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
                        <BodyShort>{tittel}</BodyShort>
                        {skalViseSum && <BodyShort>{formaterBeløp(summer())}</BodyShort>}
                    </PanelTittel>
                </Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </StyledAccordion>
    );
};

export default EkspanderbartBegrunnelsePanel;

/*
        <StyledAccordion>
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
                    <BodyShort>{tittel}</BodyShort>
                    {skalViseSum && <BodyShort>{formaterBeløp(summer())}</BodyShort>}
                </PanelTittel>
            }
        >
            {children}
        </StyledAccordion>

*/
