import React from 'react';

import { Alert, BodyLong, Heading, Table, VStack } from '@navikt/ds-react';

import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { useBehandlingContext } from '../../../context/BehandlingContext';

export const ManglendeSvalbardmerkingVarsel = () => {
    const { behandling } = useBehandlingContext();

    const skalViseVarsel = behandling.manglendeSvalbardmerking.length > 0;

    if (!skalViseVarsel) {
        return null;
    }
    return (
        <Alert variant={'warning'}>
            <Heading spacing size="small" level="3">
                Bosatt på Svalbard
            </Heading>
            <VStack gap={'space-8'}>
                <BodyLong>
                    Personer i behandlingen har oppholdsadresse på Svalbard i en periode hvor
                    «Bosatt på Svalbard» ikke er lagt til i "Bosatt i riket"-vilkåret. Dette
                    gjelder:
                </BodyLong>
                <Table size={'small'} style={{ width: '20rem' }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Person</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {behandling.manglendeSvalbardmerking.map(manglendeSvalbardmerking => {
                            return manglendeSvalbardmerking.manglendeFinnmarkSvalbardMerkingPerioder.map(
                                (manglendeSvalbardmerkingPeriode, i) => {
                                    return (
                                        <Table.Row
                                            key={i + manglendeSvalbardmerking.ident}
                                            shadeOnHover={false}
                                        >
                                            <Table.DataCell>
                                                {manglendeSvalbardmerking.ident}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {isoDatoPeriodeTilFormatertString({
                                                    fom: manglendeSvalbardmerkingPeriode.fom,
                                                    tom: manglendeSvalbardmerkingPeriode.tom,
                                                })}
                                            </Table.DataCell>
                                        </Table.Row>
                                    );
                                }
                            );
                        })}
                    </Table.Body>
                </Table>
            </VStack>
        </Alert>
    );
};
