import React from 'react';

import styled from 'styled-components';

import { BodyShort, Table } from '@navikt/ds-react';
import {
    NavdsSemanticColorBorderMuted,
    NavdsSemanticColorFeedbackDangerBorder,
    NavdsSemanticColorFeedbackWarningBorder,
    NavdsSemanticColorInteractionPrimary,
} from '@navikt/ds-tokens/dist/tokens';

import { mapEøsPeriodeStatusTilStatus } from '../../../../context/Eøs/EøsContext';
import StatusIkon from '../../../../ikoner/StatusIkon';
import { EøsPeriodeStatus } from '../../../../typer/eøsPerioder';
import type { IGrunnlagPerson } from '../../../../typer/person';
import { datoformat, formaterIsoDato, lagPersonLabel } from '../../../../utils/formatter';
import type { IYearMonthPeriode } from '../../../../utils/kalender';

interface IEøsPeriodeSkjemaContainerProps {
    maxWidth?: number;
    lesevisning: boolean;
    status: EøsPeriodeStatus;
}

export const EøsPeriodeSkjemaContainer = styled.div`
    max-width: ${(props: IEøsPeriodeSkjemaContainerProps) =>
        props.maxWidth ? `${props.maxWidth}rem` : '30rem'};
    border-left: 0.125rem solid
        ${(props: IEøsPeriodeSkjemaContainerProps) => {
            if (props.lesevisning) return NavdsSemanticColorBorderMuted;
            if (props.status === EøsPeriodeStatus.IKKE_UTFYLT)
                return NavdsSemanticColorFeedbackWarningBorder;
            if (props.status === EøsPeriodeStatus.UFULLSTENDIG)
                return NavdsSemanticColorFeedbackDangerBorder;
            return NavdsSemanticColorInteractionPrimary;
        }};
    padding-left: 2rem;
    margin-left: -3rem;
`;

export const StyledLegend = styled.legend`
    && {
        display: flex;
        margin-bottom: 0;
    }
`;

export const Knapperad = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    margin-top: 2rem;
`;

const EøsPeriodeVurdertCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const BarnDiv = styled.div`
    display: inline-block;
    margin-top: 1px;
`;

const formatterPeriode = (periode: IYearMonthPeriode): string => {
    return `${formaterIsoDato(periode.fom, datoformat.MÅNED_ÅR_KORTNAVN)} - ${
        periode.tom ? formaterIsoDato(periode.tom, datoformat.MÅNED_ÅR_KORTNAVN) : ''
    }`;
};

interface IStatusBarnCelleOgPeriodeCelleProps {
    status: EøsPeriodeStatus;
    barnIdenter: string[];
    personer: IGrunnlagPerson[];
    periode: IYearMonthPeriode;
}

export const StatusBarnCelleOgPeriodeCelle = (props: IStatusBarnCelleOgPeriodeCelleProps) => {
    return (
        <>
            <Table.DataCell>
                <EøsPeriodeVurdertCelle>
                    <div>
                        <StatusIkon
                            status={mapEøsPeriodeStatusTilStatus[props.status]}
                            width={20}
                            height={20}
                        />
                    </div>
                    <BarnDiv>
                        {props.barnIdenter.map(barn => (
                            <BodyShort size="small" key={barn}>
                                {lagPersonLabel(barn, props.personer)}
                            </BodyShort>
                        ))}
                    </BarnDiv>
                </EøsPeriodeVurdertCelle>
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size="small">{formatterPeriode(props.periode)}</BodyShort>
            </Table.DataCell>
        </>
    );
};
