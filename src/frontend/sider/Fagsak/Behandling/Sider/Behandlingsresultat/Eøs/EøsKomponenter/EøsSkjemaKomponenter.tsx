import { CogRotationIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, HStack, Table } from '@navikt/ds-react';

import StatusIkon from '../../../../../../../ikoner/StatusIkon';
import type { EøsPeriodeStatus } from '../../../../../../../typer/eøsPerioder';
import { Vurderingsform } from '../../../../../../../typer/eøsPerioder';
import type { IGrunnlagPerson } from '../../../../../../../typer/person';
import type { IIsoMånedPeriode } from '../../../../../../../utils/dato';
import { Datoformat, isoMånedPeriodeTilFormatertString } from '../../../../../../../utils/dato';
import { mapEøsPeriodeStatusTilStatus } from '../../../../../../../utils/eøs';
import { lagPersonLabel } from '../../../../../../../utils/formatter';

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
                <HStack wrap={false} align="center" gap="space-16">
                    {props.vurderingsform === Vurderingsform.AUTOMATISK ? (
                        <Box asChild minWidth={'1.5rem'}>
                            <CogRotationIcon title="Automatisk vurdert" fontSize="1.5rem" width="1.5rem" />
                        </Box>
                    ) : (
                        <StatusIkon status={mapEøsPeriodeStatusTilStatus[props.status]} />
                    )}
                    <Box marginBlock={'space-1 space-0'}>
                        {props.barnIdenter.map(barn => (
                            <BodyShort size="small" key={barn}>
                                {lagPersonLabel(barn, props.personer)}
                            </BodyShort>
                        ))}
                    </Box>
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
