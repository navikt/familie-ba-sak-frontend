import React from 'react';

import styled from 'styled-components';

import { BodyShort, Table } from '@navikt/ds-react';
import {
    ABorderDanger,
    ABorderDefault,
    ABorderWarning,
    ASurfaceAction,
} from '@navikt/ds-tokens/dist/tokens';

import { mapEøsPeriodeStatusTilStatus } from '../../../../context/Eøs/EøsContext';
import StatusIkon from '../../../../ikoner/StatusIkon';
import { EøsPeriodeStatus } from '../../../../typer/eøsPerioder';
import type { IGrunnlagPerson } from '../../../../typer/person';
import type { IIsoMånedPeriode } from '../../../../utils/dato';
import { Datoformat, isoMånedPeriodeTilFormatertString } from '../../../../utils/dato';
import { lagPersonLabel } from '../../../../utils/formatter';

interface IEøsPeriodeSkjemaContainerProps {
    lesevisning: boolean;
    status: EøsPeriodeStatus;
}

export const EøsPeriodeSkjemaContainer = styled.div`
    max-width: 34rem;
    border-left: 0.125rem solid
        ${(props: IEøsPeriodeSkjemaContainerProps) => {
            if (props.lesevisning) return ABorderDefault;
            if (props.status === EøsPeriodeStatus.IKKE_UTFYLT) return ABorderWarning;
            if (props.status === EøsPeriodeStatus.UFULLSTENDIG) return ABorderDanger;
            return ASurfaceAction;
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

interface IStatusBarnCelleOgPeriodeCelleProps {
    status: EøsPeriodeStatus;
    barnIdenter: string[];
    personer: IGrunnlagPerson[];
    periode: IIsoMånedPeriode;
}

export const StatusBarnCelleOgPeriodeCelle = (props: IStatusBarnCelleOgPeriodeCelleProps) => {
    return (
        <>
            <Table.DataCell>
                <EøsPeriodeVurdertCelle>
                    <div>
                        <StatusIkon status={mapEøsPeriodeStatusTilStatus[props.status]} />
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
                <BodyShort size="small">
                    {isoMånedPeriodeTilFormatertString({
                        periode: props.periode,
                        tilFormat: Datoformat.MÅNED_ÅR_KORTNAVN,
                    })}
                </BodyShort>
            </Table.DataCell>
        </>
    );
};
