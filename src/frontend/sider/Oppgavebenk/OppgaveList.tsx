import React from 'react';

import styled from 'styled-components';

import { Alert, Heading, Table, Tooltip } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { oppgaveSideLimit, useOppgavebenkContext } from './OppgavebenkContext';
import OppgaveDirektelenke from './OppgaveDirektelenke';
import OppgavelisteNavigator from './OppgavelisteNavigator';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';
import { intDatoTilNorskDato, Sorteringsnøkkel } from './utils';
import {
    type GjelderFilter,
    gjelderFilter,
    oppgaveTypeFilter,
    PrioritetFilter,
    type OppgavetypeFilter,
} from '../../typer/oppgave';
import { Datoformat, isoStringTilFormatertString } from '../../utils/dato';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

const HeaderMedPaginering = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Beskrivelse = styled(Table.DataCell)`
    max-width: 15rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const ForkortetTooltip = styled(Tooltip)`
    max-width: 30rem;
`;

const StyledColumnHeader = styled(Table.ColumnHeader)`
    white-space: nowrap;
`;

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver, sorterteOppgaverader, sortering, settOgLagreSortering, side } =
        useOppgavebenkContext();

    const oppgaverPåDenneSiden = sorterteOppgaverader.slice(
        (side - 1) * oppgaveSideLimit,
        side * oppgaveSideLimit
    );

    return (
        <section>
            <HeaderMedPaginering>
                <Heading size={'medium'} level={'1'}>
                    Oppgaveliste
                </Heading>
                <OppgavelisteNavigator />
            </HeaderMedPaginering>
            <Table
                sort={sortering}
                onSortChange={(nøkkel?: string) =>
                    nøkkel && settOgLagreSortering(nøkkel as Sorteringsnøkkel)
                }
            >
                <Table.Header>
                    <Table.Row>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.OPPRETTET_TIDSPUNKT} sortable>
                            Reg. dato
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.OPPGAVETYPE} sortable>
                            Oppgavetype
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.BEHANDLINGSTEMA} sortable>
                            Gjelder
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.BEHANDLINGSTYPE} sortable>
                            Behandlingstype
                        </StyledColumnHeader>
                        <StyledColumnHeader
                            sortKey={Sorteringsnøkkel.FRIST_FERDIGSTILLELSE}
                            sortable
                        >
                            Frist
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.PRIORITET} sortable>
                            Prioritet
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.BESKRIVELSE} sortable>
                            Beskrivelse
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.IDENT} sortable>
                            Bruker
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.TILDELT_ENHETSNR} sortable>
                            Enhet
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.TILORDNET_RESSURS} sortable>
                            Saksbehandler
                        </StyledColumnHeader>
                        <StyledColumnHeader sortKey={Sorteringsnøkkel.HANDLINGER} sortable>
                            Handlinger
                        </StyledColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {oppgaverPåDenneSiden.map(rad => (
                        <Table.Row key={rad.id}>
                            <Tooltip
                                content={isoStringTilFormatertString({
                                    isoString: rad.opprettetTidspunkt,
                                    tilFormat: Datoformat.DATO_TID,
                                })}
                            >
                                <Table.DataCell>
                                    {rad.opprettetTidspunkt
                                        ? intDatoTilNorskDato(rad.opprettetTidspunkt)
                                        : 'Ukjent'}
                                </Table.DataCell>
                            </Tooltip>
                            <Tooltip content={rad.oppgavetype || 'Ukjent'}>
                                <Table.DataCell>
                                    {rad.oppgavetype
                                        ? (oppgaveTypeFilter[rad.oppgavetype as OppgavetypeFilter]
                                              ?.navn ?? rad.oppgavetype)
                                        : 'Ukjent'}
                                </Table.DataCell>
                            </Tooltip>
                            <Tooltip content={rad.behandlingstema || 'Ikke satt'}>
                                <Table.DataCell>
                                    {rad.behandlingstema
                                        ? (gjelderFilter[rad.behandlingstema as GjelderFilter]
                                              ?.navn ?? rad.behandlingstema)
                                        : 'Ikke satt'}
                                </Table.DataCell>
                            </Tooltip>
                            <Table.DataCell>{rad.behandlingstype}</Table.DataCell>
                            <Table.DataCell>
                                {rad.fristFerdigstillelse
                                    ? intDatoTilNorskDato(rad.fristFerdigstillelse)
                                    : 'Ukjent'}
                            </Table.DataCell>
                            <Table.DataCell>
                                {PrioritetFilter[rad.prioritet as keyof typeof PrioritetFilter]}
                            </Table.DataCell>
                            <ForkortetTooltip content={rad.beskrivelse}>
                                <Beskrivelse>{rad.beskrivelse}</Beskrivelse>
                            </ForkortetTooltip>
                            <Table.DataCell>
                                {hentFnrFraOppgaveIdenter(rad.ident) || 'Ukjent'}
                            </Table.DataCell>
                            <Table.DataCell>{rad.tildeltEnhetsnr}</Table.DataCell>
                            <Table.DataCell>
                                <OppgavelisteSaksbehandler
                                    oppgave={rad.tilordnetRessurs.oppg}
                                    innloggetSaksbehandler={
                                        rad.tilordnetRessurs.innloggetSaksbehandler
                                    }
                                />
                            </Table.DataCell>
                            <Table.DataCell>
                                <OppgaveDirektelenke oppgave={rad.handlinger} />
                            </Table.DataCell>
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
