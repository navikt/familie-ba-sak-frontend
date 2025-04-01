import React from 'react';

import styled from 'styled-components';

import { CogRotationIcon, PencilWritingIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack } from '@navikt/ds-react';

import { useBehandlingContext } from '../../../../../../../context/behandlingContext/BehandlingContext';
import StatusIkon from '../../../../../../../ikoner/StatusIkon';
import {
    type IBehandling,
    VurderingsstrategiForValutakurser,
} from '../../../../../../../typer/behandling';
import { type IRestValutakurs, Vurderingsform } from '../../../../../../../typer/eøsPerioder';
import { mapEøsPeriodeStatusTilStatus } from '../../../../../../../utils/eøs';
import { lagPersonLabel } from '../../../../../../../utils/formatter';

const BlåPencilIcon = styled(PencilWritingIcon)`
    min-width: 1.5rem;
    color: var(--a-blue-700);
`;
const StyledCogRotationIcon = styled(CogRotationIcon)`
    min-width: 1.5rem;
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
    const { vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    if (valutakurs.vurderingsform === Vurderingsform.AUTOMATISK) {
        if (
            !erLesevisning &&
            vurderingsstrategiForValutakurser === VurderingsstrategiForValutakurser.MANUELL
        ) {
            return (
                <BlåPencilIcon
                    title="Automatisk vurdert valutakurs åpen for redigering"
                    fontSize="1.5rem"
                    width="1.5rem"
                />
            );
        } else {
            return (
                <StyledCogRotationIcon
                    title="Automatisk vurdert"
                    fontSize="1.5rem"
                    width="1.5rem"
                />
            );
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
