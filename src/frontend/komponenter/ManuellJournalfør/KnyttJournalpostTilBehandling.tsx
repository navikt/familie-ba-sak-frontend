import React from 'react';

import styled from 'styled-components';

import { Alert, Checkbox, Heading, Table } from '@navikt/ds-react';
import { ASpacing8 } from '@navikt/ds-tokens/dist/tokens';

import { KnyttTilNyBehandling } from './KnyttTilNyBehandling';
import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import type { BehandlingÅrsak } from '../../typer/behandling';
import {
    behandlingsstatuser,
    BehandlingStatus,
    behandlingstyper,
    behandlingÅrsak,
} from '../../typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '../../utils/dato';
import { hentAktivBehandlingPåMinimalFagsak } from '../../utils/fagsak';
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
    const {
        skjema,
        minimalFagsak,
        hentSorterteBehandlinger,
        kanKnytteJournalpostTilBehandling,
        erLesevisning,
    } = useManuellJournalfør();
    const åpenBehandling: VisningBehandling | undefined = minimalFagsak
        ? hentAktivBehandlingPåMinimalFagsak(minimalFagsak)
        : undefined;

    const visGenerellSakInfoStripe =
        !erLesevisning() &&
        skjema.felter.tilknyttedeBehandlingIder.verdi.length === 0 &&
        !skjema.felter.knyttTilNyBehandling.verdi;
    return (
        <KnyttDiv>
            {!!minimalFagsak?.behandlinger.length && (
                <>
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
                            {hentSorterteBehandlinger().map((behandling: VisningBehandling) => {
                                const behandlingId: number | undefined =
                                    typeof behandling.behandlingId == 'number'
                                        ? behandling.behandlingId
                                        : undefined;

                                return (
                                    behandlingId !== undefined && (
                                        <Table.Row
                                            key={behandlingId}
                                            aria-selected={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                behandlingId
                                            )}
                                        >
                                            <Table.DataCell>
                                                <Checkbox
                                                    id={behandlingId.toString()}
                                                    value={behandlingId.toString()}
                                                    checked={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                        behandlingId
                                                    )}
                                                    onChange={() => {
                                                        skjema.felter.tilknyttedeBehandlingIder.validerOgSettFelt(
                                                            [
                                                                ...skjema.felter.tilknyttedeBehandlingIder.verdi.filter(
                                                                    it => it !== behandlingId
                                                                ),
                                                                ...(skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                                    behandlingId
                                                                )
                                                                    ? []
                                                                    : [behandlingId]),
                                                            ]
                                                        );
                                                    }}
                                                    readOnly={!kanKnytteJournalpostTilBehandling()}
                                                    hideLabel
                                                >
                                                    {behandlingId.toString()}
                                                </Checkbox>
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {isoStringTilFormatertString({
                                                    isoString: behandling.opprettetTidspunkt,
                                                    tilFormat: Datoformat.DATO_FORKORTTET,
                                                })}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {
                                                    behandlingÅrsak[
                                                        behandling.årsak as BehandlingÅrsak
                                                    ]
                                                }
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {behandlingstyper[behandling.type].navn}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {behandlingsstatuser[behandling.status]}
                                            </Table.DataCell>
                                        </Table.Row>
                                    )
                                );
                            })}
                        </Table.Body>
                    </Table>
                </>
            )}
            {(!åpenBehandling || åpenBehandling.status === BehandlingStatus.AVSLUTTET) && (
                <KnyttTilNyBehandling />
            )}
            {visGenerellSakInfoStripe && (
                <StyledAlert variant="info">
                    <GenerellSakInfoStripeTittel>
                        {hentSorterteBehandlinger().length > 0
                            ? `Du velger å journalføre uten å knytte til behandling(er).`
                            : `Du velger å journalføre uten å knytte til ny behandling.`}
                    </GenerellSakInfoStripeTittel>
                    <div>
                        {`Journalposten knyttes kun til person (tilsvarende "Knytt til generell
                            sak" i Gosys)`}
                    </div>
                </StyledAlert>
            )}
        </KnyttDiv>
    );
};
