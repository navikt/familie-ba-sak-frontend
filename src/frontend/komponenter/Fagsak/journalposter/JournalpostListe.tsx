import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { DownFilled, LeftFilled, RightFilled, ExternalLink } from '@navikt/ds-icons';
import { BodyShort, Heading, Link, Alert } from '@navikt/ds-react';
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
    hentDatoRegistrertSendt,
    hentSorteringsknappCss,
    hentSorterteJournalposter,
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

const Td = styled.td`
    vertical-align: top;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Th = styled.th`
    white-space: nowrap;
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

const StyledTabell = styled.table`
    table-layout: fixed;
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
                return settSortering(Sorteringsrekkefølge.STIGENDE);
            case Sorteringsrekkefølge.STIGENDE:
                return settSortering(Sorteringsrekkefølge.SYNKENDE);
            case Sorteringsrekkefølge.SYNKENDE:
                return settSortering(Sorteringsrekkefølge.INGEN_SORTERING);
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
        return (
            <Container>
                <Heading level="2" size="xlarge" spacing>
                    Dokumentoversikt
                </Heading>

                <StyledTabell className="tabell tabell--stripet">
                    <colgroup>
                        <col style={{ width: '3.5rem' }} />
                        <col style={{ width: '10.5rem' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '23%' }} />
                        <col style={{ width: '7%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <Th>Inn/ut</Th>
                            <Th className={hentSorteringsknappCss(sortering)}>
                                <button onClick={() => settNesteSorteringsrekkefølge()}>
                                    Registrert/sendt
                                </button>
                            </Th>

                            <Th>Dokumenter</Th>
                            <Th>Fagsystem | Saksid</Th>
                            <Th>Avsender/Mottaker</Th>
                            <Th>Journalpost</Th>
                            <Th>Status</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {hentSorterteJournalposter(journalposterRessurs.data, sortering).map(
                            journalpost => (
                                <tr key={journalpost.journalpostId}>
                                    <Td>
                                        <InnUtWrapper>
                                            <IkonWrapper>
                                                {hentIkonForJournalpostType(
                                                    journalpost.journalposttype
                                                )}{' '}
                                            </IkonWrapper>
                                            {journalpost.journalposttype}
                                        </InnUtWrapper>
                                    </Td>
                                    <Td
                                        className={
                                            sortering === Sorteringsrekkefølge.STIGENDE ||
                                            sortering === Sorteringsrekkefølge.SYNKENDE
                                                ? 'tabell__StyledTd--sortert'
                                                : ''
                                        }
                                    >
                                        {hentDatoRegistrertSendt(
                                            journalpost.relevanteDatoer,
                                            journalpost.journalposttype
                                        )}
                                    </Td>

                                    <Td>
                                        {(journalpost.dokumenter?.length ?? []) > 0 ? (
                                            <Vedleggsliste>
                                                {journalpost.dokumenter?.map(dokument => (
                                                    <ListeElement key={dokument.dokumentInfoId}>
                                                        <DokumentTittelMedLenkeWrapper>
                                                            <EllipsisBodyShort
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
                                                                dokument.logiskeVedlegg.map(
                                                                    vedlegg => (
                                                                        <ListeElement
                                                                            key={
                                                                                vedlegg.logiskVedleggId
                                                                            }
                                                                        >
                                                                            <EllipsisBodyShort
                                                                                title={
                                                                                    vedlegg.tittel
                                                                                }
                                                                            >
                                                                                {vedlegg.tittel}
                                                                            </EllipsisBodyShort>
                                                                        </ListeElement>
                                                                    )
                                                                )}
                                                        </Vedleggsliste>
                                                    </ListeElement>
                                                ))}
                                            </Vedleggsliste>
                                        ) : (
                                            <BodyShort>Ingen dokumenter</BodyShort>
                                        )}
                                    </Td>

                                    <Td>
                                        <EllipsisBodyShort
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
                                    </Td>
                                    <Td>
                                        <EllipsisBodyShort
                                            title={journalpost.avsenderMottaker?.navn}
                                        >
                                            {journalpost.avsenderMottaker?.navn}
                                        </EllipsisBodyShort>
                                    </Td>
                                    <Td>
                                        <EllipsisBodyShort title={journalpost.tittel}>
                                            {journalpost.tittel}
                                        </EllipsisBodyShort>
                                    </Td>
                                    <Td>
                                        <EllipsisBodyShort
                                            title={journalpoststatus[journalpost.journalstatus]}
                                        >
                                            {journalpoststatus[journalpost.journalstatus]}
                                        </EllipsisBodyShort>
                                    </Td>
                                </tr>
                            )
                        )}
                    </tbody>
                </StyledTabell>
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
