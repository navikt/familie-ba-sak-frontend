import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading, HStack, LocalAlert, Table, VStack } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { IJournalpost, Ressurs, Utsendingsinfo } from '@navikt/familie-typer';
import {
    byggHenterRessurs,
    byggTomRessurs,
    Journalposttype,
    journalpoststatus,
    RessursStatus,
} from '@navikt/familie-typer';
import type { ITilgangsstyrtJournalpost } from '@typer/journalpost';
import { hentSortState, Sorteringsrekkefølge } from '@utils/tabell';
import { useEffect, useState } from 'react';
import { useBrukerContext } from '../BrukerContext';
import { JournalpostDokument } from './JournalpostDokument';
import styles from './JournalpostListe.module.css';
import {
    formaterDatoRegistrertSendtMottatt,
    formaterFagsak,
    hentDatoRegistrertSendt,
    hentSorterteJournalposter,
} from './journalpostUtils';
import { UtsendingsinfoModal } from './UtsendingsinfoModal';

const hentIkonForJournalpostType = (journalposttype: Journalposttype) => {
    switch (journalposttype) {
        case Journalposttype.I:
            return <ArrowRightIcon title="Inngående" fontSize={'1.3rem'} />;
        case Journalposttype.U:
            return <ArrowLeftIcon title="Utgående" fontSize={'1.3rem'} />;
        case Journalposttype.N:
            return <ArrowDownIcon title="Notat" fontSize={'1.3rem'} />;
    }
};

const settRiktigDatoMottatForJournalpost = (journalpost: IJournalpost): IJournalpost => {
    return {
        ...journalpost,
        datoMottatt:
            journalpost.datoMottatt ||
            hentDatoRegistrertSendt(journalpost.relevanteDatoer, journalpost.journalposttype),
    };
};

export function JournalpostListe() {
    const { bruker } = useBrukerContext();
    const { request } = useHttp();
    const [journalposterRessurs, settJournalposterRessurs] = useState<Ressurs<ITilgangsstyrtJournalpost[]>>(
        byggTomRessurs()
    );
    const [sortering, settSortering] = useState<Sorteringsrekkefølge>(Sorteringsrekkefølge.INGEN_SORTERING);
    const [utsendingsinfo, settUtsendingsinfo] = useState<Utsendingsinfo | undefined>(undefined);

    useEffect(() => {
        settJournalposterRessurs(byggHenterRessurs());

        const ident = bruker.personIdent;

        request<{ ident: string }, ITilgangsstyrtJournalpost[]>({
            method: 'POST',
            data: { ident },
            url: `/familie-ba-sak/api/journalpost/for-bruker`,
            påvirkerSystemLaster: true,
        }).then(journalposterRessurs => {
            settJournalposterRessurs(journalposterRessurs);
        });
    }, [bruker]);

    const settNesteSorteringsrekkefølge = (): void => {
        switch (sortering) {
            case Sorteringsrekkefølge.INGEN_SORTERING:
                settSortering(Sorteringsrekkefølge.STIGENDE);
                break;
            case Sorteringsrekkefølge.STIGENDE:
                settSortering(Sorteringsrekkefølge.SYNKENDE);
                break;
            case Sorteringsrekkefølge.SYNKENDE:
            default:
                settSortering(Sorteringsrekkefølge.INGEN_SORTERING);
                break;
        }
    };

    if (
        journalposterRessurs.status === RessursStatus.FEILET ||
        journalposterRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
        journalposterRessurs.status === RessursStatus.IKKE_TILGANG
    ) {
        return (
            <Box padding={'space-32'} overflow={'auto'}>
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>Klarte ikke å hente inn journalposter for fagsak.</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            </Box>
        );
    }

    if (journalposterRessurs.status === RessursStatus.SUKSESS) {
        const journalposterMedOverstyrtDato: ITilgangsstyrtJournalpost[] = journalposterRessurs.data?.map(
            tilgangsstyrtJournalpost => {
                const { journalpost, journalpostTilgang } = tilgangsstyrtJournalpost;
                return {
                    journalpostTilgang,
                    journalpost: settRiktigDatoMottatForJournalpost(journalpost),
                };
            }
        );
        const sorterteJournalPoster = hentSorterteJournalposter(journalposterMedOverstyrtDato, sortering);
        return (
            <Box padding={'space-32'} overflow={'auto'}>
                <Heading level="2" size="large" spacing>
                    Dokumentoversikt
                </Heading>
                <Table
                    className={styles.table}
                    size="small"
                    zebraStripes
                    sort={hentSortState(sortering, 'datoRegistrertSendt')}
                    onSortChange={settNesteSorteringsrekkefølge}
                >
                    <Table.Header>
                        <Table.Row className={styles.headerRow}>
                            <Table.HeaderCell>Inn/ut</Table.HeaderCell>
                            <Table.ColumnHeader sortKey="datoRegistrertSendt" sortable>
                                Registrert/sendt
                            </Table.ColumnHeader>

                            <Table.HeaderCell>Dokumenter</Table.HeaderCell>
                            <Table.HeaderCell>Fagsystem | Saksid</Table.HeaderCell>
                            <Table.HeaderCell>Avsender/Mottaker</Table.HeaderCell>
                            <Table.HeaderCell>Journalpost</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sorterteJournalPoster.map(tilgangsstyrtJournalpost => (
                            <Table.Row key={tilgangsstyrtJournalpost.journalpost.journalpostId}>
                                <Table.DataCell className={styles.dataCell}>
                                    <HStack align={'center'} gap={'space-8'} wrap={false}>
                                        {hentIkonForJournalpostType(
                                            tilgangsstyrtJournalpost.journalpost.journalposttype
                                        )}
                                        <BodyShort weight={'semibold'}>
                                            {tilgangsstyrtJournalpost.journalpost.journalposttype}
                                        </BodyShort>
                                    </HStack>
                                </Table.DataCell>
                                <Table.DataCell className={styles.dataCell}>
                                    {formaterDatoRegistrertSendtMottatt(
                                        tilgangsstyrtJournalpost.journalpost.datoMottatt
                                    )}
                                </Table.DataCell>

                                <Table.DataCell className={styles.dataCell}>
                                    {tilgangsstyrtJournalpost.journalpost.dokumenter?.length ? (
                                        <ul className={styles.vedleggListe}>
                                            <VStack gap={'space-16'}>
                                                {tilgangsstyrtJournalpost.journalpost.dokumenter?.map(dokument => (
                                                    <JournalpostDokument
                                                        dokument={dokument}
                                                        key={dokument.dokumentInfoId}
                                                        tilgangsstyrtJournalpost={tilgangsstyrtJournalpost}
                                                    />
                                                ))}
                                            </VStack>
                                        </ul>
                                    ) : (
                                        <BodyShort>Ingen dokumenter</BodyShort>
                                    )}
                                </Table.DataCell>

                                <Table.DataCell className={styles.dataCell}>
                                    <BodyShort
                                        className={styles.text}
                                        size="small"
                                        title={formaterFagsak(
                                            tilgangsstyrtJournalpost.journalpost.sak?.fagsaksystem,
                                            tilgangsstyrtJournalpost.journalpost.sak?.fagsakId
                                        )}
                                    >
                                        {formaterFagsak(
                                            tilgangsstyrtJournalpost.journalpost.sak?.fagsaksystem,
                                            tilgangsstyrtJournalpost.journalpost.sak?.fagsakId
                                        )}
                                    </BodyShort>
                                </Table.DataCell>
                                <Table.DataCell className={styles.dataCell}>
                                    {tilgangsstyrtJournalpost.journalpost.utsendingsinfo ? (
                                        <Button
                                            className={styles.searchNameLink}
                                            icon={<MagnifyingGlassIcon />}
                                            iconPosition={'right'}
                                            variant={'tertiary'}
                                            size={'xsmall'}
                                            onClick={() =>
                                                settUtsendingsinfo(tilgangsstyrtJournalpost.journalpost.utsendingsinfo)
                                            }
                                        >
                                            {tilgangsstyrtJournalpost.journalpost.avsenderMottaker?.navn}
                                        </Button>
                                    ) : (
                                        <BodyShort
                                            className={styles.text}
                                            size="small"
                                            title={tilgangsstyrtJournalpost.journalpost.avsenderMottaker?.navn}
                                        >
                                            {tilgangsstyrtJournalpost.journalpost.avsenderMottaker?.navn}
                                        </BodyShort>
                                    )}
                                </Table.DataCell>
                                <Table.DataCell className={styles.dataCell}>
                                    <BodyShort
                                        className={styles.text}
                                        size="small"
                                        title={tilgangsstyrtJournalpost.journalpost.tittel}
                                    >
                                        {tilgangsstyrtJournalpost.journalpost.tittel}
                                    </BodyShort>
                                </Table.DataCell>
                                <Table.DataCell className={styles.dataCell}>
                                    <BodyShort
                                        className={styles.text}
                                        size="small"
                                        title={journalpoststatus[tilgangsstyrtJournalpost.journalpost.journalstatus]}
                                    >
                                        {journalpoststatus[tilgangsstyrtJournalpost.journalpost.journalstatus]}
                                    </BodyShort>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                {utsendingsinfo && (
                    <UtsendingsinfoModal onClose={() => settUtsendingsinfo(undefined)} data={utsendingsinfo} />
                )}
            </Box>
        );
    } else {
        return null;
    }
}
