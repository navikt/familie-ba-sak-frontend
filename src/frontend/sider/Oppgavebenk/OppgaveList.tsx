import {
    type GjelderFilter,
    gjelderFilter,
    oppgaveTypeFilter,
    type OppgavetypeFilter,
    PrioritetFilter,
} from '@typer/oppgave';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import { hentFnrFraOppgaveIdenter } from '@utils/oppgave';

import { BodyLong, BodyShort, Box, HStack, Loader, LocalAlert, Table, Tooltip } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { oppgaveSideLimit, useOppgavebenkContext } from './OppgavebenkContext';
import { OppgaveDirektelenke } from './OppgaveDirektelenke';
import Styles from './OppgaveList.module.css';
import { OppgavelisteNavigator } from './OppgavelisteNavigator';
import { OppgavelisteSaksbehandler } from './OppgavelisteSaksbehandler';
import { intDatoTilNorskDato, Sorteringsnøkkel } from './utils';

export function OppgaveList() {
    const { oppgaver, sorterteOppgaverader, sortering, settOgLagreSortering, side } = useOppgavebenkContext();

    const oppgaverPåDenneSiden = sorterteOppgaverader.slice((side - 1) * oppgaveSideLimit, side * oppgaveSideLimit);

    return (
        <Box as={'section'}>
            <OppgavelisteNavigator />
            <Box as={'div'} className={Styles.tableWrapper}>
                <Table
                    sort={sortering}
                    onSortChange={(nøkkel?: string) => nøkkel && settOgLagreSortering(nøkkel as Sorteringsnøkkel)}
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
                            <Table.ColumnHeader sortKey={Sorteringsnøkkel.FRIST_FERDIGSTILLELSE} sortable>
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
                        {oppgaverPåDenneSiden.map(rad => (
                            <Table.Row key={rad.id}>
                                <Table.DataCell>
                                    <Tooltip
                                        content={isoStringTilFormatertString({
                                            isoString: rad.opprettetTidspunkt,
                                            tilFormat: Datoformat.DATO_TID,
                                        })}
                                    >
                                        <BodyLong>
                                            {rad.opprettetTidspunkt
                                                ? intDatoTilNorskDato(rad.opprettetTidspunkt)
                                                : 'Ukjent'}
                                        </BodyLong>
                                    </Tooltip>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <Tooltip content={rad.oppgavetype || 'Ukjent'}>
                                        <BodyLong>
                                            {rad.oppgavetype
                                                ? (oppgaveTypeFilter[rad.oppgavetype as OppgavetypeFilter]?.navn ??
                                                  rad.oppgavetype)
                                                : 'Ukjent'}
                                        </BodyLong>
                                    </Tooltip>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <Tooltip content={rad.behandlingstema || 'Ikke satt'}>
                                        <BodyLong>
                                            {rad.behandlingstema
                                                ? (gjelderFilter[rad.behandlingstema as GjelderFilter]?.navn ??
                                                  rad.behandlingstema)
                                                : 'Ikke satt'}
                                        </BodyLong>
                                    </Tooltip>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <BodyLong>{rad.behandlingstype}</BodyLong>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <BodyLong>
                                        {rad.fristFerdigstillelse
                                            ? intDatoTilNorskDato(rad.fristFerdigstillelse)
                                            : 'Ukjent'}
                                    </BodyLong>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <BodyLong>
                                        {PrioritetFilter[rad.prioritet as keyof typeof PrioritetFilter]}
                                    </BodyLong>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <Tooltip content={rad.beskrivelse} className={Styles.tooltip}>
                                        <BodyLong className={Styles.beskrivelse}>{rad.beskrivelse}</BodyLong>
                                    </Tooltip>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <BodyLong>{hentFnrFraOppgaveIdenter(rad.ident) || 'Ukjent'}</BodyLong>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <BodyLong>{rad.tildeltEnhetsnr}</BodyLong>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <OppgavelisteSaksbehandler
                                        oppgave={rad.tilordnetRessurs.oppg}
                                        saksbehandler={rad.tilordnetRessurs.saksbehandler}
                                    />
                                </Table.DataCell>
                                <Table.DataCell>
                                    <OppgaveDirektelenke oppgave={rad.handlinger} />
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Box>
            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length === 0 && (
                <Box marginBlock={'space-16 space-0'}>
                    <LocalAlert status={'warning'}>
                        <LocalAlert.Header>
                            <LocalAlert.Title>Ingen oppgaver</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </Box>
            )}
            {(oppgaver.status === RessursStatus.FEILET ||
                oppgaver.status === RessursStatus.FUNKSJONELL_FEIL ||
                oppgaver.status === RessursStatus.IKKE_TILGANG) && (
                <Box marginBlock={'space-16 space-0'}>
                    <LocalAlert status={'error'}>
                        <LocalAlert.Header>
                            <LocalAlert.Title>{oppgaver.frontendFeilmelding}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </Box>
            )}
            {oppgaver.status === RessursStatus.HENTER && (
                <Box marginBlock={'space-16 space-0'}>
                    <HStack justify={'center'} align={'center'} paddingBlock={'space-32'} gap={'space-8'}>
                        <Loader size={'small'} />
                        <BodyShort>Laster oppgaver...</BodyShort>
                    </HStack>
                </Box>
            )}
        </Box>
    );
}
