import React from 'react';

import styled from 'styled-components';

import { CogRotationIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Table, VStack } from '@navikt/ds-react';
import {
    ABorderDanger,
    ABorderDefault,
    ABorderWarning,
    ASurfaceAction,
} from '@navikt/ds-tokens/dist/tokens';

import { mapEøsPeriodeStatusTilStatus } from '../../../../../context/Eøs/EøsContext';
import StatusIkon from '../../../../../ikoner/StatusIkon';
import { EøsPeriodeStatus, Vurderingsform } from '../../../../../typer/eøsPerioder';
import type { IGrunnlagPerson } from '../../../../../typer/person';
import { Datoformat, isoMånedPeriodeTilFormatertString } from '../../../../../utils/dato';
import type { IIsoMånedPeriode } from '../../../../../utils/dato';
import { lagPersonLabel } from '../../../../../utils/formatter';

interface IEøsPeriodeSkjemaContainerProps {
    $lesevisning: boolean;
    $status: EøsPeriodeStatus;
}

export const EøsPeriodeSkjemaContainer = styled(VStack)<IEøsPeriodeSkjemaContainerProps>`
    max-width: 34rem;
    border-left: 0.125rem solid
        ${props => {
            if (props.$lesevisning) return ABorderDefault;
            if (props.$status === EøsPeriodeStatus.IKKE_UTFYLT) return ABorderWarning;
            if (props.$status === EøsPeriodeStatus.UFULLSTENDIG) return ABorderDanger;
            return ASurfaceAction;
        }};
    padding-left: 2rem;
    margin-left: -3rem;
`;

export const Knapperad = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;

const StyledCogRotationIcon = styled(CogRotationIcon)`
    min-width: 1.5rem;
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
    vurderingsform?: Vurderingsform;
}

export const StatusBarnCelleOgPeriodeCelle = (props: IStatusBarnCelleOgPeriodeCelleProps) => {
    return (
        <>
            <Table.DataCell>
                <HStack wrap={false} align="center" gap="4">
                    {props.vurderingsform === Vurderingsform.AUTOMATISK ? (
                        <StyledCogRotationIcon
                            title="Automatisk vurdert"
                            fontSize="1.5rem"
                            width="1.5rem"
                        />
                    ) : (
                        <StatusIkon status={mapEøsPeriodeStatusTilStatus[props.status]} />
                    )}
                    <BarnDiv>
                        {props.barnIdenter.map(barn => (
                            <BodyShort size="small" key={barn}>
                                {lagPersonLabel(barn, props.personer)}
                            </BodyShort>
                        ))}
                    </BarnDiv>
                </HStack>
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
