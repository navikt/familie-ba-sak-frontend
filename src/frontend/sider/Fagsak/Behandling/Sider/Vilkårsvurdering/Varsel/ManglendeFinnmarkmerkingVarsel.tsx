import React from 'react';

import { Alert, BodyLong, Heading, Table, VStack } from '@navikt/ds-react';

import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { useBehandlingContext } from '../../../context/BehandlingContext';

export const ManglendeFinnmarkmerkingVarsel: React.FC = () => {
    const { behandling } = useBehandlingContext();

    const manglendeFinnmarkmerking = behandling.manglendeFinnmarkmerking;
    const skalViseVarsel = manglendeFinnmarkmerking !== null;

    if (!skalViseVarsel) {
        return null;
    } else {
        return (
            <Alert variant={'warning'}>
                <Heading spacing size="small" level="3">
                    Forretningsadresse i Finnmark eller Nord-Troms
                </Heading>
                <VStack gap={'space-8'}>
                    <BodyLong>
                        Institusjonen har forretningsadresse i Finnmark eller Nord-Troms i en
                        periode hvor «Bosatt i Finnmark/Nord-Troms» ikke er lagt til i "Bosatt i
                        riket"-vilkåret. Dette gjelder:
                    </BodyLong>
                    <Table size={'small'} style={{ width: '20rem' }}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell scope="col">Person</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {manglendeFinnmarkmerking?.manglendeFinnmarkSvalbardMerkingPerioder.map(
                                (manglendeFinnmarkSvalbardMerkingPeriode, i) => {
                                    return (
                                        <Table.Row
                                            key={i + manglendeFinnmarkmerking.ident}
                                            shadeOnHover={false}
                                        >
                                            <Table.DataCell>
                                                {manglendeFinnmarkmerking.ident}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {isoDatoPeriodeTilFormatertString({
                                                    fom: manglendeFinnmarkSvalbardMerkingPeriode.fom,
                                                    tom: manglendeFinnmarkSvalbardMerkingPeriode.tom,
                                                })}
                                            </Table.DataCell>
                                        </Table.Row>
                                    );
                                }
                            )}
                        </Table.Body>
                    </Table>
                </VStack>
            </Alert>
        );
    }
};
