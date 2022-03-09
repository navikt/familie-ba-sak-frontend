import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';

import { DownFilled, LeftFilled, RightFilled } from '@navikt/ds-icons';
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
import { EksternLenke } from '../../../ikoner/EksternLenke';
import type { IPersonInfo } from '../../../typer/person';
import FamilieBaseKnapp from '../../Felleskomponenter/FamilieBaseKnapp';
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

const StyledSidetittel = styled(Sidetittel)`
    margin-bottom: 1rem;
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

const EksternLenkeWrapper = styled(FamilieBaseKnapp)`
    margin-left: 10px;
`;

const DokumentTittelMedLenkeWrapper = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
`;

const EllipsisNormaltekst = styled(Normaltekst)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledTabell = styled.table`
    table-layout: fixed;
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
                <AlertStripeFeil>Klarte ikke å hente inn journalposter for fagsak.</AlertStripeFeil>
            </Container>
        );
    }

    if (journalposterRessurs.status === RessursStatus.SUKSESS) {
        return (
            <Container>
                <StyledSidetittel>Dokumentoversikt</StyledSidetittel>

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
                                                            <EllipsisNormaltekst
                                                                title={dokument.tittel}
                                                            >
                                                                <Lenke
                                                                    href="#"
                                                                    onClick={() =>
                                                                        hentPdfDokument(
                                                                            journalpost.journalpostId,
                                                                            dokument.dokumentInfoId
                                                                        )
                                                                    }
                                                                >
                                                                    {dokument.tittel}
                                                                </Lenke>
                                                            </EllipsisNormaltekst>

                                                            {
                                                                <EksternLenkeWrapper
                                                                    onClick={() => {
                                                                        window.open(
                                                                            `/familie-ba-sak/api/journalpost/${journalpost.journalpostId}/dokument/${dokument.dokumentInfoId}`,
                                                                            '_blank'
                                                                        );
                                                                    }}
                                                                    aria-label="Åpne dokument i ny fane"
                                                                    title="Åpne dokument i ny fane"
                                                                >
                                                                    <EksternLenke />
                                                                </EksternLenkeWrapper>
                                                            }
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
                                                                            <EllipsisNormaltekst
                                                                                title={
                                                                                    vedlegg.tittel
                                                                                }
                                                                            >
                                                                                {vedlegg.tittel}
                                                                            </EllipsisNormaltekst>
                                                                        </ListeElement>
                                                                    )
                                                                )}
                                                        </Vedleggsliste>
                                                    </ListeElement>
                                                ))}
                                            </Vedleggsliste>
                                        ) : (
                                            <Normaltekst>Ingen dokumenter</Normaltekst>
                                        )}
                                    </Td>

                                    <Td>
                                        <EllipsisNormaltekst
                                            title={formaterFagsak(
                                                journalpost.sak?.fagsaksystem,
                                                journalpost.sak?.fagsakId
                                            )}
                                        >
                                            {formaterFagsak(
                                                journalpost.sak?.fagsaksystem,
                                                journalpost.sak?.fagsakId
                                            )}
                                        </EllipsisNormaltekst>
                                    </Td>
                                    <Td>
                                        <EllipsisNormaltekst
                                            title={journalpost.avsenderMottaker?.navn}
                                        >
                                            {journalpost.avsenderMottaker?.navn}
                                        </EllipsisNormaltekst>
                                    </Td>
                                    <Td>
                                        <EllipsisNormaltekst title={journalpost.tittel}>
                                            {journalpost.tittel}
                                        </EllipsisNormaltekst>
                                    </Td>
                                    <Td>
                                        <EllipsisNormaltekst
                                            title={journalpoststatus[journalpost.journalstatus]}
                                        >
                                            {journalpoststatus[journalpost.journalstatus]}
                                        </EllipsisNormaltekst>
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
        return <></>;
    }
};

export default JournalpostListe;
