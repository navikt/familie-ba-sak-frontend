import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { DownFilled, LeftFilled, RightFilled, ExternalLink } from '@navikt/ds-icons';
import { BodyShort, Heading, Link, Alert, Table } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { IJournalpost, Ressurs } from '@navikt/familie-typer';
import {
    byggHenterRessurs,
    byggTomRessurs,
    journalpoststatus,
    Journalposttype,
    RessursStatus,
} from '@navikt/familie-typer';

import 'nav-frontend-tabell-style';

import useDokument from '../../../hooks/useDokument';
import type { IPersonInfo } from '../../../typer/person';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import {
    formaterFagsak,
    formaterDatoRegistrertSendtMottatt,
    hentDatoRegistrertSendt,
    hentSorterteJournalposter,
    hentSortState,
    Sorteringsrekkefølge,
} from './journalpostUtils';

const Container = styled.div`
    padding: 2rem;
    overflow: auto;
`;

const InnUtWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
`;

const IkonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
`;

const StyledTable = styled(Table)`
    table-layout: fixed;
`;

const StyledDataCell = styled(Table.DataCell)`
    vertical-align: top;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledHeaderCell = styled(Table.HeaderCell)`
    white-space: nowrap;

    &:nth-of-type(1) {
        width: 3.5rem;
    }
    &:nth-of-type(3) {
        width: 25%;
    }
    &:nth-of-type(4) {
        width: 15%;
    }
    &:nth-of-type(5) {
        width: 20%;
    }
    &:nth-of-type(6) {
        width: 22%;
    }
    &:nth-of-type(7) {
        width: 8%;
    }
`;

const StyledColumnHeader = styled(Table.ColumnHeader)`
    white-space: nowrap;
    width: 10rem;
`;

const Vedleggsliste = styled.ul`
    list-style-type: none;
    margin: 0;
    &:first-child {
        padding-inline-start: 0;
    }
`;

const ListeElement = styled.li`
    margin-bottom: 1rem;
    &:last-child {
        margin-bottom: 0;
    }
`;

const DokumentTittelMedLenkeWrapper = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
`;

const EllipsisBodyShort = styled(BodyShort)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledLink = styled(Link)`
    margin-left: 0.5rem;
`;

interface IProps {
    bruker: IPersonInfo;
}

const hentIkonForJournalpostType = (journalposttype: Journalposttype) => {
    switch (journalposttype) {
        case Journalposttype.I:
            return <RightFilled title="Inngående" />;
        case Journalposttype.U:
            return <LeftFilled title="Utgående" />;
        case Journalposttype.N:
            return <DownFilled title="Notat" />;
    }
};

const JournalpostListe: React.FC<IProps> = ({ bruker }) => {
    const { request } = useHttp();
    const [journalposterRessurs, settJournalposterRessurs] = useState<Ressurs<IJournalpost[]>>(
        byggTomRessurs()
    );
    const [sortering, settSortering] = useState<Sorteringsrekkefølge>(
        Sorteringsrekkefølge.INGEN_SORTERING
    );
    const { hentForhåndsvisning, visDokumentModal, hentetDokument, settVisDokumentModal } =
        useDokument();

    useEffect(() => {
        settJournalposterRessurs(byggHenterRessurs());

        request<undefined, IJournalpost[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/for-bruker/${bruker.personIdent}`,
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

    const hentPdfDokument = (journalpostId: string, dokumentId: string | undefined) => {
        if (dokumentId !== undefined) {
            hentForhåndsvisning({
                method: 'GET',
                url: `/familie-ba-sak/api/journalpost/${journalpostId}/hent/${dokumentId}`,
            });
        } else {
            alert('Klarer ikke å åpne dokument. Ta kontakt med teamet.');
        }
    };

    if (
        journalposterRessurs.status === RessursStatus.FEILET ||
        journalposterRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
        journalposterRessurs.status === RessursStatus.IKKE_TILGANG
    ) {
        return (
            <Container>
                <Alert variant="error">Klarte ikke å hente inn journalposter for fagsak.</Alert>
            </Container>
        );
    }

    if (journalposterRessurs.status === RessursStatus.SUKSESS) {
        const journalposterMedOverstyrtDato = journalposterRessurs.data?.map(journalpost => ({
            ...journalpost,
            datoMottatt:
                journalpost.datoMottatt ||
                hentDatoRegistrertSendt(journalpost.relevanteDatoer, journalpost.journalposttype),
        }));
        const sorterteJournalPoster = hentSorterteJournalposter(
            journalposterMedOverstyrtDato,
            sortering
        );
        return (
            <Container>
                <Heading level="2" size="xlarge" spacing>
                    Dokumentoversikt
                </Heading>

                <StyledTable
                    size="small"
                    zebraStripes
                    sort={hentSortState(sortering, 'datoRegistrertSendt')}
                    onSortChange={settNesteSorteringsrekkefølge}
                >
                    <Table.Header>
                        <Table.Row>
                            <StyledHeaderCell>Inn/ut</StyledHeaderCell>
                            <StyledColumnHeader sortKey="datoRegistrertSendt" sortable>
                                Registrert/sendt
                            </StyledColumnHeader>

                            <StyledHeaderCell>Dokumenter</StyledHeaderCell>
                            <StyledHeaderCell>Fagsystem | Saksid</StyledHeaderCell>
                            <StyledHeaderCell>Avsender/Mottaker</StyledHeaderCell>
                            <StyledHeaderCell>Journalpost</StyledHeaderCell>
                            <StyledHeaderCell>Status</StyledHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sorterteJournalPoster.map(journalpost => (
                            <Table.Row key={journalpost.journalpostId}>
                                <StyledDataCell>
                                    <InnUtWrapper>
                                        <IkonWrapper>
                                            {hentIkonForJournalpostType(
                                                journalpost.journalposttype
                                            )}{' '}
                                        </IkonWrapper>
                                        {journalpost.journalposttype}
                                    </InnUtWrapper>
                                </StyledDataCell>
                                <StyledDataCell>
                                    {formaterDatoRegistrertSendtMottatt(journalpost.datoMottatt)}
                                </StyledDataCell>

                                <StyledDataCell>
                                    {(journalpost.dokumenter?.length ?? []) > 0 ? (
                                        <Vedleggsliste>
                                            {journalpost.dokumenter?.map(dokument => (
                                                <ListeElement key={dokument.dokumentInfoId}>
                                                    <DokumentTittelMedLenkeWrapper>
                                                        <EllipsisBodyShort
                                                            size="small"
                                                            title={dokument.tittel}
                                                        >
                                                            <Link
                                                                href="#"
                                                                onClick={() =>
                                                                    hentPdfDokument(
                                                                        journalpost.journalpostId,
                                                                        dokument.dokumentInfoId
                                                                    )
                                                                }
                                                            >
                                                                {dokument.tittel}
                                                            </Link>
                                                        </EllipsisBodyShort>

                                                        <StyledLink
                                                            href={`/familie-ba-sak/api/journalpost/${journalpost.journalpostId}/dokument/${dokument.dokumentInfoId}`}
                                                            target="_blank"
                                                            aria-label="Åpne dokument i ny fane"
                                                            title="Åpne dokument i ny fane"
                                                        >
                                                            <ExternalLink />
                                                        </StyledLink>
                                                    </DokumentTittelMedLenkeWrapper>

                                                    <Vedleggsliste>
                                                        {dokument.logiskeVedlegg &&
                                                            dokument.logiskeVedlegg.map(vedlegg => (
                                                                <ListeElement
                                                                    key={vedlegg.logiskVedleggId}
                                                                >
                                                                    <EllipsisBodyShort
                                                                        size="small"
                                                                        title={vedlegg.tittel}
                                                                    >
                                                                        {vedlegg.tittel}
                                                                    </EllipsisBodyShort>
                                                                </ListeElement>
                                                            ))}
                                                    </Vedleggsliste>
                                                </ListeElement>
                                            ))}
                                        </Vedleggsliste>
                                    ) : (
                                        <BodyShort>Ingen dokumenter</BodyShort>
                                    )}
                                </StyledDataCell>

                                <StyledDataCell>
                                    <EllipsisBodyShort
                                        size="small"
                                        title={formaterFagsak(
                                            journalpost.sak?.fagsaksystem,
                                            journalpost.sak?.fagsakId
                                        )}
                                    >
                                        {formaterFagsak(
                                            journalpost.sak?.fagsaksystem,
                                            journalpost.sak?.fagsakId
                                        )}
                                    </EllipsisBodyShort>
                                </StyledDataCell>
                                <StyledDataCell>
                                    <EllipsisBodyShort
                                        size="small"
                                        title={journalpost.avsenderMottaker?.navn}
                                    >
                                        {journalpost.avsenderMottaker?.navn}
                                    </EllipsisBodyShort>
                                </StyledDataCell>
                                <StyledDataCell>
                                    <EllipsisBodyShort size="small" title={journalpost.tittel}>
                                        {journalpost.tittel}
                                    </EllipsisBodyShort>
                                </StyledDataCell>
                                <StyledDataCell>
                                    <EllipsisBodyShort
                                        size="small"
                                        title={journalpoststatus[journalpost.journalstatus]}
                                    >
                                        {journalpoststatus[journalpost.journalstatus]}
                                    </EllipsisBodyShort>
                                </StyledDataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </StyledTable>
                <PdfVisningModal
                    åpen={visDokumentModal}
                    onRequestClose={() => settVisDokumentModal(false)}
                    pdfdata={hentetDokument}
                />
            </Container>
        );
    } else {
        return null;
    }
};

export default JournalpostListe;
