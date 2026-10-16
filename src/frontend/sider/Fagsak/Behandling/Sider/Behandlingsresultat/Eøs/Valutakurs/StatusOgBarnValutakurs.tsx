import { useErLesevisning } from '@hooks/useErLesevisning';
import { CogRotationIcon, PencilWritingIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, HStack } from '@navikt/ds-react';
import { type IBehandling, VurderingsstrategiForValutakurser } from '@typer/behandling';
import { type IRestValutakurs, Vurderingsform } from '@typer/eøsPerioder';
import { mapEøsPeriodeStatusTilStatus } from '@utils/eøs';
import { lagPersonLabel } from '@utils/formatter';
import StatusIkon from '../../../../../../../ikoner/StatusIkon';
import Styles from './StatusOgBarnValutakurs.module.css';

interface Props {
    valutakurs: IRestValutakurs;
    åpenBehandling: IBehandling;
}

interface StatusProps {
    valutakurs: IRestValutakurs;
    vurderingsstrategiForValutakurser: VurderingsstrategiForValutakurser | null;
}

const PeriodeStatus = ({ valutakurs, vurderingsstrategiForValutakurser }: StatusProps) => {
    const erLesevisning = useErLesevisning();

    if (valutakurs.vurderingsform == Vurderingsform.AUTOMATISK) {
        if (!erLesevisning && vurderingsstrategiForValutakurser === VurderingsstrategiForValutakurser.MANUELL) {
            return (
                <PencilWritingIcon
                    className={Styles.pencilIcon}
                    title="Automatisk vurdert valutakurs åpen for redigering"
                    fontSize="1.5rem"
                    width="1.5rem"
                />
            );
        } else {
            return (
                <CogRotationIcon
                    className={Styles.cogIcon}
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

export const StatusOgBarnValutakurs = ({ valutakurs, åpenBehandling }: Props) => (
    <HStack wrap={false} align="center" gap="space-16">
        <PeriodeStatus
            valutakurs={valutakurs}
            vurderingsstrategiForValutakurser={åpenBehandling.vurderingsstrategiForValutakurser}
        />
        <Box marginBlock={'space-1 space-0'}>
            {valutakurs.barnIdenter.map(barn => (
                <BodyShort size="small" key={barn}>
                    {lagPersonLabel(barn, åpenBehandling.personer)}
                </BodyShort>
            ))}
        </Box>
    </HStack>
);
