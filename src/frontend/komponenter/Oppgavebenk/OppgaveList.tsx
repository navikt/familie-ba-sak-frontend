import React from 'react';

import type { ColumnInstance } from 'react-table';
import styled from 'styled-components';

import { Alert, Heading, Table } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import OppgaveDirektelenke from './OppgaveDirektelenke';
import { ariaSortMap, FeltSortOrder } from './oppgavefelter';
import OppgavelisteNavigator from './OppgavelisteNavigator';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';
import { useOppgaver } from '../../context/OppgaverContext';
import { intDatoTilNorskDato, type IOppgaveRad } from '../../context/OppgaverContextUtils';
import {
    type GjelderFilter,
    gjelderFilter,
    oppgaveTypeFilter,
    PrioritetFilter,
    type OppgavetypeFilter,
} from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';

export const styleFraAccessorEllerId = (id: string) => {
    switch (id) {
        case 'beskrivelse':
            return 'beskrivelse';
        case 'tilordnetRessurs':
            return 'tilordnet-ressurs';
        case 'handlinger':
            return 'handlinger';
        default:
            return null;
    }
};

export const getAriaSort = (
    column: ColumnInstance<IOppgaveRad>
): 'none' | 'descending' | 'ascending' | undefined => {
    if (column.isSortedDesc === true) {
        return ariaSortMap.get(FeltSortOrder.DESCENDANT);
    }
    if (column.isSortedDesc === false) {
        return ariaSortMap.get(FeltSortOrder.ASCENDANT);
    }
    return ariaSortMap.get(FeltSortOrder.NONE);
};

export const getSortLenkClassName = (column: ColumnInstance<IOppgaveRad>) => {
    if (column.isSortedDesc === true) {
        return 'tabell__th--sortert-desc';
    }
    if (column.isSortedDesc === false) {
        return 'tabell__th--sortert-asc';
    }
    return '';
};

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

const HeaderMedPaginering = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DataCellSmall: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    // Har laget issue i Aksel om å få size som tillatt prop direkte på DataCell https://github.com/navikt/aksel/issues/2551
    <Table.DataCell className="navds-body-short--small">{children}</Table.DataCell>
);

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver, oppgaverader } = useOppgaver();

    return (
        <section>
            <HeaderMedPaginering>
                <Heading size={'medium'} level={'1'}>
                    Oppgaveliste
                </Heading>
                <OppgavelisteNavigator />
            </HeaderMedPaginering>
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader sortKey="opprettetTidspunkt" sortable>
                            Reg. dato
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="oppgavetype" sortable>
                            Oppgavetype
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="behandlingstema" sortable>
                            Gjelder
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="behandlingstype" sortable>
                            Behandlingstype
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="fristFerdigstillelse" sortable>
                            Frist
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="prioritet" sortable>
                            Prioritet
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="beskrivelse" sortable>
                            Beskrivelse
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="ident" sortable>
                            Bruker
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="tildeltEnhetsnr" sortable>
                            Enhet
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="tilordnetRessurs" sortable>
                            Saksbehandler
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="handlinger" sortable>
                            Handlinger
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {oppgaverader.map(rad => (
                        <Table.Row>
                            <DataCellSmall>
                                {rad.opprettetTidspunkt
                                    ? intDatoTilNorskDato(rad.opprettetTidspunkt)
                                    : 'Ukjent'}
                            </DataCellSmall>
                            <DataCellSmall>
                                {rad.oppgavetype
                                    ? oppgaveTypeFilter[rad.oppgavetype as OppgavetypeFilter]
                                          ?.navn ?? rad.oppgavetype
                                    : 'Ukjent'}
                            </DataCellSmall>
                            <DataCellSmall>
                                {rad.behandlingstema
                                    ? gjelderFilter[rad.behandlingstema as GjelderFilter]?.navn ??
                                      rad.behandlingstema
                                    : 'Ikke satt'}
                            </DataCellSmall>
                            <DataCellSmall>{rad.behandlingstype}</DataCellSmall>
                            <DataCellSmall>
                                {rad.fristFerdigstillelse
                                    ? intDatoTilNorskDato(rad.fristFerdigstillelse)
                                    : 'Ukjent'}
                            </DataCellSmall>
                            <DataCellSmall>
                                {PrioritetFilter[rad.prioritet as keyof typeof PrioritetFilter]}
                            </DataCellSmall>
                            <DataCellSmall>{rad.beskrivelse}</DataCellSmall>
                            <DataCellSmall>
                                {hentFnrFraOppgaveIdenter(rad.ident) || 'Ukjent'}
                            </DataCellSmall>
                            <DataCellSmall>{rad.tildeltEnhetsnr}</DataCellSmall>
                            <DataCellSmall>
                                <OppgavelisteSaksbehandler
                                    oppgave={rad.tilordnetRessurs.oppg}
                                    innloggetSaksbehandler={
                                        rad.tilordnetRessurs.innloggetSaksbehandler
                                    }
                                />
                            </DataCellSmall>
                            <DataCellSmall>
                                <OppgaveDirektelenke oppgave={rad.handlinger} />
                            </DataCellSmall>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length === 0 && (
                <StyledAlert variant="warning">Ingen oppgaver</StyledAlert>
            )}
            {(oppgaver.status === RessursStatus.FEILET ||
                oppgaver.status === RessursStatus.FUNKSJONELL_FEIL ||
                oppgaver.status === RessursStatus.IKKE_TILGANG) && (
                <StyledAlert variant="error">{oppgaver.frontendFeilmelding}</StyledAlert>
            )}
            {oppgaver.status === RessursStatus.HENTER && (
                <StyledAlert variant="info">Henter...</StyledAlert>
            )}
        </section>
    );
};

export default OppgaveList;
