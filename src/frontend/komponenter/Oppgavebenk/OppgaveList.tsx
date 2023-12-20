import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, Heading, Table, type SortState } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import OppgaveDirektelenke from './OppgaveDirektelenke';
import OppgavelisteNavigator from './OppgavelisteNavigator';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';
import { useOppgaver } from '../../context/OppgaverContext';
import { intDatoTilNorskDato } from '../../context/OppgaverContextUtils';
import {
    type GjelderFilter,
    gjelderFilter,
    oppgaveTypeFilter,
    PrioritetFilter,
    type OppgavetypeFilter,
} from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';
import {
    Sorteringsrekkefølge,
    hentSortState,
    hentNesteSorteringsrekkefølge,
} from '../../utils/tabell';

const OPPGAVEBENK_SORTERINGSNØKKEL = 'OPPGAVEBENK_SORTERINGSNØKKEL';

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

const HeaderMedPaginering = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

enum Sorteringsnøkkel {
    OPPRETTET_TIDSPUNKT = 'OPPRETTET_TIDSPUNKT',
    OPPGAVETYPE = 'OPPGAVETYPE',
    BEHANDLINGSTEMA = 'BEHANDLINGSTEMA',
    BEHANDLINGSTYPE = 'BEHANDLINGSTYPE',
    FRIST_FERDIGSTILLELSE = 'FRIST_FERDIGSTILLELSE',
    PRIORITET = 'PRIORITET',
    BESKRIVELSE = 'BESKRIVELSE',
    IDENT = 'IDENT',
    TILDELT_ENHETSNR = 'TILDELT_ENHETSNR',
    TILORDNET_RESSURS = 'TILORDNET_RESSURS',
    HANDLINGER = 'HANDLINGER',
}

const DataCellSmall: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    // Har laget issue i Aksel om å få size som tillatt prop direkte på DataCell https://github.com/navikt/aksel/issues/2551
    <Table.DataCell className="navds-body-short--small">{children}</Table.DataCell>
);

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver, oppgaverader } = useOppgaver();

    const lagretSortering = localStorage.getItem(OPPGAVEBENK_SORTERINGSNØKKEL);
    const [sortering, settSortering] = useState<SortState | undefined>(
        lagretSortering
            ? JSON.parse(lagretSortering)
            : hentSortState(Sorteringsrekkefølge.STIGENDE, Sorteringsnøkkel.OPPRETTET_TIDSPUNKT)
    );

    const settOgLagreSortering = (sorteringsnøkkel: Sorteringsnøkkel): void => {
        const nyRekkefølge =
            sorteringsnøkkel === sortering?.orderBy
                ? hentNesteSorteringsrekkefølge(sortering.direction as Sorteringsrekkefølge)
                : Sorteringsrekkefølge.STIGENDE;
        const nySortering = hentSortState(nyRekkefølge, sorteringsnøkkel);
        localStorage.setItem(OPPGAVEBENK_SORTERINGSNØKKEL, JSON.stringify(nySortering));
        settSortering(nySortering);
    };

    return (
        <section>
            <HeaderMedPaginering>
                <Heading size={'medium'} level={'1'}>
                    Oppgaveliste
                </Heading>
                <OppgavelisteNavigator />
            </HeaderMedPaginering>
            <Table
                size="small"
                sort={sortering}
                onSortChange={(nøkkel?: string) =>
                    nøkkel && settOgLagreSortering(nøkkel as Sorteringsnøkkel)
                }
            >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.OPPRETTET_TIDSPUNKT} sortable>
                            Reg. dato
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.OPPGAVETYPE} sortable>
                            Oppgavetype
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.BEHANDLINGSTEMA} sortable>
                            Gjelder
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.BEHANDLINGSTYPE} sortable>
                            Behandlingstype
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                            sortKey={Sorteringsnøkkel.FRIST_FERDIGSTILLELSE}
                            sortable
                        >
                            Frist
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.PRIORITET} sortable>
                            Prioritet
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.BESKRIVELSE} sortable>
                            Beskrivelse
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.IDENT} sortable>
                            Bruker
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.TILDELT_ENHETSNR} sortable>
                            Enhet
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.TILORDNET_RESSURS} sortable>
                            Saksbehandler
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey={Sorteringsnøkkel.HANDLINGER} sortable>
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
