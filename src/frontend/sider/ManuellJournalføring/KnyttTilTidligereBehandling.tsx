import { Checkbox, Heading, LocalAlert, Table, VStack } from '@navikt/ds-react';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { behandlingsstatuser, behandlingstyper } from '@typer/behandling';
import { finnVisningstekstForJournalføringsbehandlingsårsak } from '@typer/journalføringsbehandling';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import { ressursHarFeilet } from '@utils/ressursUtils';

export function KnyttTilTidligereBehandling() {
    const { skjema, hentSorterteJournalføringsbehandlinger, kanKnytteJournalpostTilBehandling, klageStatus } =
        useManuellJournalføringContext();

    const sorterteJournalføringsbehandlinger = hentSorterteJournalføringsbehandlinger();

    return (
        <VStack gap="space-24">
            {ressursHarFeilet(klageStatus) && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Klagebehandlinger er ikke tilgjengelig for øyeblikket.</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
            <div>
                <Heading size={'small'} level={'2'}>
                    Knytt til tidligere behandling(er)
                </Heading>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.DataCell></Table.DataCell>
                            <Table.HeaderCell>{'Dato'}</Table.HeaderCell>
                            <Table.HeaderCell>{'Årsak'}</Table.HeaderCell>
                            <Table.HeaderCell>{'Behandlingstype'}</Table.HeaderCell>
                            <Table.HeaderCell>{'Status'}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sorterteJournalføringsbehandlinger.map(behandling => {
                            return (
                                <Table.Row
                                    key={behandling.id}
                                    aria-selected={skjema.felter.tilknyttedeBehandlinger.verdi.some(
                                        it => it.behandlingId === behandling.id
                                    )}
                                >
                                    <Table.DataCell>
                                        <Checkbox
                                            id={behandling.id}
                                            value={behandling.id}
                                            checked={skjema.felter.tilknyttedeBehandlinger.verdi.some(
                                                it => it.behandlingId === behandling.id
                                            )}
                                            onChange={() => {
                                                skjema.felter.tilknyttedeBehandlinger.validerOgSettFelt([
                                                    ...skjema.felter.tilknyttedeBehandlinger.verdi.filter(
                                                        it => it.behandlingId !== behandling.id
                                                    ),
                                                    ...(skjema.felter.tilknyttedeBehandlinger.verdi.some(
                                                        it => it.behandlingId === behandling.id
                                                    )
                                                        ? []
                                                        : [
                                                              {
                                                                  behandlingstype: behandling.type,
                                                                  behandlingId: behandling.id,
                                                              },
                                                          ]),
                                                ]);
                                            }}
                                            readOnly={!kanKnytteJournalpostTilBehandling()}
                                            hideLabel={true}
                                        >
                                            {behandling.id}
                                        </Checkbox>
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {isoStringTilFormatertString({
                                            isoString: behandling.opprettetTidspunkt,
                                            tilFormat: Datoformat.DATO_FORKORTTET,
                                        })}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {finnVisningstekstForJournalføringsbehandlingsårsak(behandling.årsak)}
                                    </Table.DataCell>
                                    <Table.DataCell>{behandlingstyper[behandling.type].navn}</Table.DataCell>
                                    <Table.DataCell>{behandlingsstatuser[behandling.status]}</Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
        </VStack>
    );
}
