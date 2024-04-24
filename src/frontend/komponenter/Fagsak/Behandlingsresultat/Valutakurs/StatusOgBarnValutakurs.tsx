import React from 'react';

import styled from 'styled-components';

import { CogRotationIcon, PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import {
    ABorderDanger,
    ABorderDefault,
    ABorderWarning,
    ASurfaceAction,
} from '@navikt/ds-tokens/dist/tokens';

import { mapEøsPeriodeStatusTilStatus } from '../../../../context/Eøs/EøsContext';
import StatusIkon from '../../../../ikoner/StatusIkon';
import { type IBehandling, VurderingsstrategiForValutakurser } from '../../../../typer/behandling';
import {
    EøsPeriodeStatus,
    type IRestValutakurs,
    Vurderingsform,
} from '../../../../typer/eøsPerioder';
import { lagPersonLabel } from '../../../../utils/formatter';

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
    margin: 2rem 0 1rem;
`;

const GulPencilIcon = styled(PencilIcon)`
    color: var(--a-icon-warning);
`;

const BarnDiv = styled.div`
    display: inline-block;
    margin-top: 1px;
`;

interface Props {
    valutakurs: IRestValutakurs;
    åpenBehandling: IBehandling;
}

interface StatusProps {
    valutakurs: IRestValutakurs;
    vurderingsstrategiForValutakurser: VurderingsstrategiForValutakurser | null;
}

const PeriodeStatus: React.FC<StatusProps> = ({
    valutakurs,
    vurderingsstrategiForValutakurser,
}) => {
    if (valutakurs.vurderingsform === Vurderingsform.AUTOMATISK) {
        return (
            <HStack wrap={false} align="center" gap="2">
                {vurderingsstrategiForValutakurser ===
                    VurderingsstrategiForValutakurser.MANUELL && (
                    <GulPencilIcon title="Automatisk vurdert" fontSize="1.5rem" width="1.5rem" />
                )}
                <CogRotationIcon title="Automatisk vurdert" fontSize="1.5rem" width="1.5rem" />
            </HStack>
        );
    } else {
        return <StatusIkon status={mapEøsPeriodeStatusTilStatus[valutakurs.status]} />;
    }
};

export const StatusOgBarnValutakurs: React.FC<Props> = ({ valutakurs, åpenBehandling }) => (
    <HStack wrap={false} align="center" gap="4">
        <PeriodeStatus
            valutakurs={valutakurs}
            vurderingsstrategiForValutakurser={åpenBehandling.vurderingsstrategiForValutakurser}
        />
        <BarnDiv>
            {valutakurs.barnIdenter.map(barn => (
                <BodyShort size="small" key={barn}>
                    {lagPersonLabel(barn, åpenBehandling.personer)}
                </BodyShort>
            ))}
        </BarnDiv>
    </HStack>
);
