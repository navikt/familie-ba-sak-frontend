import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';

import { LeftFilled, RightFilled, DownFilled } from '@navikt/ds-icons';
import { useHttp } from '@navikt/familie-http';
import {
    RessursStatus,
    Ressurs,
    byggTomRessurs,
    byggHenterRessurs,
    IJournalpost,
    Journalposttype,
    journalpoststatus,
} from '@navikt/familie-typer';

import 'nav-frontend-tabell-style';
import { EksternLenke } from '../../../ikoner/EksternLenke';
import { IPersonInfo } from '../../../typer/person';
import FamilieBaseKnapp from '../../Felleskomponenter/FamilieBaseKnapp';
import {
    formaterFagsak,
    hentDatoMottatt,
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
`;

const EllipsisTd = styled(Td)`
    max-width: 20rem;
    width: 100%;
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

const TittelWrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

interface IProps {
    bruker: IPersonInfo;
}

const hentIkonForJournalpostType = (journalposttype: Journalposttype) => {
    switch (journalposttype) {
        case Journalposttype.I:
            return <RightFilled />;
        case Journalposttype.U:
            return <LeftFilled />;
        case Journalposttype.N:
            return <DownFilled />;
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

                <table className="tabell tabell--stripet">
                    <thead>
                        <tr>
                            <th>Inn/ut</th>
                            <th className={hentSorteringsknappCss(sortering)}>
                                <button onClick={() => settNesteSorteringsrekkefølge()}>
                                    Dato mottatt
                                </button>
                            </th>

                            <th>Dokumenter</th>
                            <th>Fagsystem | Saksid</th>
                            <th>Avsender/Mottaker</th>
                            <th>Journalpost</th>
                            <th>Status</th>
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
                                        {hentDatoMottatt(journalpost.relevanteDatoer)}
                                    </Td>

                                    <EllipsisTd>
                                        {(journalpost.dokumenter?.length ?? []) > 0 ? (
                                            <Vedleggsliste>
                                                {journalpost.dokumenter?.map(dokument => (
                                                    <ListeElement key={dokument.dokumentInfoId}>
                                                        <DokumentTittelMedLenkeWrapper>
                                                            <TittelWrapper title={dokument.tittel}>
                                                                {dokument.tittel}
                                                            </TittelWrapper>

                                                            {
                                                                <EksternLenkeWrapper
                                                                    onClick={() => {
                                                                        window.open(
                                                                            `/api/pdf/journalpost/${journalpost.journalpostId}/hent/${dokument.dokumentInfoId}`,
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
                                                                            <TittelWrapper
                                                                                title={
                                                                                    vedlegg.tittel
                                                                                }
                                                                            >
                                                                                {vedlegg.tittel}
                                                                            </TittelWrapper>
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
                                    </EllipsisTd>

                                    <EllipsisTd>
                                        <TittelWrapper>
                                            {formaterFagsak(
                                                journalpost.sak?.fagsaksystem,
                                                journalpost.sak?.fagsakId
                                            )}
                                        </TittelWrapper>
                                    </EllipsisTd>
                                    <Td>{journalpost.avsenderMottaker?.navn}</Td>
                                    <EllipsisTd>
                                        <TittelWrapper title={journalpost.tittel}>
                                            {journalpost.tittel}
                                        </TittelWrapper>
                                    </EllipsisTd>
                                    <Td>{journalpoststatus[journalpost.journalstatus]}</Td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </Container>
        );
    } else {
        return <></>;
    }
};

export default JournalpostListe;
