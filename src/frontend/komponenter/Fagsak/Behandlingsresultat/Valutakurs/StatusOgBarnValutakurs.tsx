import React from 'react';

import styled from 'styled-components';

import { CogRotationIcon, PencilWritingIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack } from '@navikt/ds-react';

import { mapEøsPeriodeStatusTilStatus } from '../../../../context/Eøs/EøsContext';
import StatusIkon from '../../../../ikoner/StatusIkon';
import { type IBehandling, VurderingsstrategiForValutakurser } from '../../../../typer/behandling';
import { type IRestValutakurs, Vurderingsform } from '../../../../typer/eøsPerioder';
import { lagPersonLabel } from '../../../../utils/formatter';

const BlåPencilIcon = styled(PencilWritingIcon)`
    color: var(--a-blue-700);
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
        if (vurderingsstrategiForValutakurser === VurderingsstrategiForValutakurser.MANUELL) {
            return (
                <BlåPencilIcon
                    title="Automatisk vurdert valutakurs åpen for redigering"
                    fontSize="1.5rem"
                    width="1.5rem"
                />
            );
        } else {
            return <CogRotationIcon title="Automatisk vurdert" fontSize="1.5rem" width="1.5rem" />;
        }
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
