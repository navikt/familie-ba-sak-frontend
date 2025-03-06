import React from 'react';

import styled from 'styled-components';

import { Alert, Checkbox, Heading, Table } from '@navikt/ds-react';
import { ASpacing8 } from '@navikt/ds-tokens/dist/tokens';

import { KnyttTilNyBehandling } from './KnyttTilNyBehandling';
import { useApp } from '../../context/AppContext';
import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import type { BehandlingÅrsak } from '../../typer/behandling';
import {
    behandlingsstatuser,
    BehandlingStatus,
    behandlingstyper,
    behandlingÅrsak,
} from '../../typer/behandling';
import { ToggleNavn } from '../../typer/toggles';
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
    const { toggles } = useApp();

    const {
        skjema,
        minimalFagsak,
        hentSorterteJournalføringsbehandlinger,
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

    const sorterteJournalføringsbehandlinger = hentSorterteJournalføringsbehandlinger();

    const skalViseKnyttTilNyBehandling =
        toggles[ToggleNavn.kanBehandleKlage] || // Skal alltid vises når klage er implementert
        !åpenBehandling ||
        åpenBehandling.status === BehandlingStatus.AVSLUTTET;

    return (
        <KnyttDiv>
            {sorterteJournalføringsbehandlinger.length > 0 && (
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
                            {sorterteJournalføringsbehandlinger.map(behandling => {
                                return (
                                    <Table.Row
                                        key={behandling.id}
                                        aria-selected={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                            behandling.id
                                        )}
                                    >
                                        <Table.DataCell>
                                            <Checkbox
                                                id={behandling.id}
                                                value={behandling.id}
                                                checked={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                    behandling.id
                                                )}
                                                onChange={() => {
                                                    skjema.felter.tilknyttedeBehandlingIder.validerOgSettFelt(
                                                        [
                                                            ...skjema.felter.tilknyttedeBehandlingIder.verdi.filter(
                                                                it => it !== behandling.id
                                                            ),
                                                            ...(skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                                behandling.id
                                                            )
                                                                ? []
                                                                : [behandling.id]),
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
                                            {behandlingÅrsak[behandling.årsak as BehandlingÅrsak]}
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
                </>
            )}
            {skalViseKnyttTilNyBehandling && <KnyttTilNyBehandling />}
            {visGenerellSakInfoStripe && (
                <StyledAlert variant="info">
                    <GenerellSakInfoStripeTittel>
                        {sorterteJournalføringsbehandlinger.length > 0
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
