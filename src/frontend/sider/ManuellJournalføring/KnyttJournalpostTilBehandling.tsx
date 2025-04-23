import React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Checkbox, Heading, Table, VStack } from '@navikt/ds-react';
import { ASpacing8 } from '@navikt/ds-tokens/dist/tokens';

import { KnyttTilNyBehandling } from './KnyttTilNyBehandling';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';
import { useAppContext } from '../../context/AppContext';
import { behandlingsstatuser, BehandlingStatus, behandlingstyper } from '../../typer/behandling';
import { finnVisningstekstForJournalføringsbehandlingsårsak } from '../../typer/journalføringsbehandling';
import { ToggleNavn } from '../../typer/toggles';
import { Datoformat, isoStringTilFormatertString } from '../../utils/dato';
import { hentAktivBehandlingPåMinimalFagsak } from '../../utils/fagsak';
import { ressursHarFeilet } from '../../utils/ressursUtils';
import type { VisningBehandling } from '../Fagsak/Saksoversikt/visningBehandling';

const KnyttDiv = styled.div`
    margin-top: 20px;
`;

const GenerellSakInfoStripeTittel = styled.div`
    font-weight: bold;
`;

const StyledAlert = styled(Alert)`
    margin-top: ${ASpacing8};
`;

export const KnyttJournalpostTilBehandling: React.FC = () => {
    const { toggles } = useAppContext();

    const {
        skjema,
        minimalFagsak,
        hentSorterteJournalføringsbehandlinger,
        kanKnytteJournalpostTilBehandling,
        erLesevisning,
        klageStatus,
    } = useManuellJournalføringContext();

    const åpenBehandling: VisningBehandling | undefined = minimalFagsak
        ? hentAktivBehandlingPåMinimalFagsak(minimalFagsak)
        : undefined;

    const visGenerellSakInfoStripe =
        !erLesevisning() &&
        skjema.felter.tilknyttedeBehandlinger.verdi.length === 0 &&
        !skjema.felter.knyttTilNyBehandling.verdi;

    const sorterteJournalføringsbehandlinger = hentSorterteJournalføringsbehandlinger();

    const skalViseKnyttTilNyBehandling =
        toggles[ToggleNavn.kanBehandleKlage] || // Skal alltid vises når klage er implementert
        !åpenBehandling ||
        åpenBehandling.status === BehandlingStatus.AVSLUTTET;

    return (
        <KnyttDiv>
            {sorterteJournalføringsbehandlinger.length > 0 && (
                <VStack gap="6">
                    {ressursHarFeilet(klageStatus) && (
                        <Alert variant="warning">
                            <BodyShort>
                                Klagebehandlinger er ikke tilgjengelig for øyeblikket.
                            </BodyShort>
                        </Alert>
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
                                                        skjema.felter.tilknyttedeBehandlinger.validerOgSettFelt(
                                                            [
                                                                ...skjema.felter.tilknyttedeBehandlinger.verdi.filter(
                                                                    it =>
                                                                        it.behandlingId !==
                                                                        behandling.id
                                                                ),
                                                                ...(skjema.felter.tilknyttedeBehandlinger.verdi.some(
                                                                    it =>
                                                                        it.behandlingId ===
                                                                        behandling.id
                                                                )
                                                                    ? []
                                                                    : [
                                                                          {
                                                                              behandlingstype:
                                                                                  behandling.type,
                                                                              behandlingId:
                                                                                  behandling.id,
                                                                          },
                                                                      ]),
                                                            ]
                                                        );
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
                                                {finnVisningstekstForJournalføringsbehandlingsårsak(
                                                    behandling.årsak
                                                )}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {behandlingstyper[behandling.type].navn}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {behandlingsstatuser[behandling.status]}
                                            </Table.DataCell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                </VStack>
            )}
            {skalViseKnyttTilNyBehandling && <KnyttTilNyBehandling />}
            {visGenerellSakInfoStripe && (
                <StyledAlert variant="info">
                    <GenerellSakInfoStripeTittel>
                        {sorterteJournalføringsbehandlinger.length > 0
                            ? `Du velger å journalføre uten å knytte til behandling(er).`
                            : `Du velger å journalføre uten å knytte til ny behandling.`}
                    </GenerellSakInfoStripeTittel>
                </StyledAlert>
            )}
        </KnyttDiv>
    );
};
