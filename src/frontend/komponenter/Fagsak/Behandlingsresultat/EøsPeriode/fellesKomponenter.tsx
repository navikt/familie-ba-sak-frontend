import React from 'react';

import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';

import { mapEøsPeriodeStatusTilStatus } from '../../../../context/Eøs/EøsContext';
import StatusIkon from '../../../../ikoner/StatusIkon';
import type { EøsPeriodeStatus } from '../../../../typer/eøsPerioder';
import type { IGrunnlagPerson } from '../../../../typer/person';
import { datoformat, formaterIsoDato, lagPersonLabel } from '../../../../utils/formatter';
import type { IYearMonthPeriode } from '../../../../utils/kalender';

interface IEkspanderbarTrProps {
    ekspandert?: boolean;
}

export const EkspanderbarTr = styled.tr`
    td {
        border-bottom: ${(props: IEkspanderbarTrProps) =>
            props.ekspandert
                ? 'none'
                : '1px solid rgba(0, 0, 0, 0.15)'} !important; // Denne !important er nødvendig
        vertical-align: top;
    }

    & td:last-child {
        text-align: right;
        padding-right: 0;
    }
`;

export const EkspandertTd = styled.td`
    padding: 0 1rem 1rem 1.6rem;
`;

export const EøsPeriodeSkjemaContainer = styled.div`
    max-width: 30rem;
    border-left: 0.0625rem solid var(--navds-global-color-orange-500);
    padding-left: 2rem;
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
            <td>
                <EøsPeriodeVurdertCelle>
                    <div>
                        <StatusIkon
                            status={mapEøsPeriodeStatusTilStatus[props.status]}
                            width={20}
                            heigth={20}
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
            </td>
            <td>
                <BodyShort size="small">{formatterPeriode(props.periode)}</BodyShort>
            </td>
        </>
    );
};
