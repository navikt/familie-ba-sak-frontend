import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';

import { LeftFilled, RightFilled, DownFilled } from '@navikt/ds-icons';
import { useHttp } from '@navikt/familie-http';
import {
    RessursStatus,
    Ressurs,
    byggTomRessurs,
    byggHenterRessurs,
    IJournalpost,
    Journalposttype,
    ILogiskVedlegg,
    IDokumentInfo,
    Journalstatus,
} from '@navikt/familie-typer';

import 'nav-frontend-tabell-style';
import { EksternLenke } from '../../../ikoner/EksternLenke';
import { IPersonInfo } from '../../../typer/person';
import { tilVisning, kalenderDato, erEtter } from '../../../utils/kalender';
import FamilieBaseKnapp from '../../Felleskomponenter/FamilieBaseKnapp';

const Container = styled.div`
    margin: 4.1875rem 3.3125rem;
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

const StyledTd = styled.td`
    vertical-align: top;
`;

const StyledVedleggsliste = styled.ul`
    list-style-type: none;
    margin-bottom: 0;
`;

const StyledListeElement = styled.li`
    margin-bottom: 1em;
    &:last-child {
        margin-bottom: 0;
    }
`;

const StyledÅpenDokument = styled(FamilieBaseKnapp)`
    margin-left: 10px;
`;

const DokumentTittelMedLenkeWrapper = styled.div`
    margin-bottom: 1em;
`;

const mapJournalstatusTilTekst: Record<Journalstatus, string> = {
    MOTTATT: 'Mottatt',
    JOURNALFOERT: 'Journalført',
    FERDIGSTILT: 'Ferdigstilt',
    EKSPEDERT: 'Ekspedert',
    UNDER_ARBEID: 'Under arbeid',
    FEILREGISTRERT: 'Feilregistrert',
    UTGAAR: 'Utgår',
    AVBRUTT: 'Avbrutt',
    UKJENT_BRUKER: 'Ukjent bruker',
    RESERVERT: 'Reservert',
    OPPLASTING_DOKUMENT: 'Opplasting dokument',
    UKJENT: 'Ukjent',
};

interface IProps {
    bruker: IPersonInfo;
}
enum Sorteringsrekkefølge {
    STIGENDE,
    SYNKENDE,
    INGEN_SORTERING,
}

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

    const sorterJournalposterStigende = (a: IJournalpost, b: IJournalpost) => {
        if (!a.datoMottatt) {
            return -1;
        }
        if (!b.datoMottatt) {
            return 1;
        }
        return erEtter(kalenderDato(a.datoMottatt), kalenderDato(b.datoMottatt)) ? 1 : -1;
    };

    const sorterJournalposterSynkende = (a: IJournalpost, b: IJournalpost) =>
        -1 * sorterJournalposterStigende(a, b);

    const hentSorterteJournalposter = (journalposter: IJournalpost[]) => {
        switch (sortering) {
            case Sorteringsrekkefølge.INGEN_SORTERING:
                return journalposter;
            case Sorteringsrekkefølge.STIGENDE:
                return [...journalposter].sort(sorterJournalposterStigende);
            case Sorteringsrekkefølge.SYNKENDE:
                return [...journalposter].sort(sorterJournalposterSynkende);
        }
    };

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

    const hentSorteringsknappCss = () => {
        switch (sortering) {
            case Sorteringsrekkefølge.INGEN_SORTERING:
                return '';
            case Sorteringsrekkefølge.STIGENDE:
                return 'tabell__th--sortert-asc';
            case Sorteringsrekkefølge.SYNKENDE:
                return 'tabell__th--sortert-desc';
        }
    };

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

    const visLogiskVedlegg = (logiskVedlegg: ILogiskVedlegg) => {
        return (
            <StyledListeElement key={logiskVedlegg.logiskVedleggId}>
                {logiskVedlegg.tittel}
            </StyledListeElement>
        );
    };

    const visDokumentMedLenke = (dokument: IDokumentInfo, journalpostId: string) => {
        return (
            <DokumentTittelMedLenkeWrapper>
                {dokument.tittel}
                {
                    <StyledÅpenDokument
                        onClick={() => {
                            window.open(
                                `/api/pdf/journalpost/${journalpostId}/hent/${dokument.dokumentInfoId}`,
                                '_blank'
                            );
                        }}
                    >
                        <EksternLenke />
                    </StyledÅpenDokument>
                }
            </DokumentTittelMedLenkeWrapper>
        );
    };

    const visDokumentliste = (dokument: IDokumentInfo, journalpostId: string) => {
        return (
            <li key={dokument.dokumentInfoId}>
                {visDokumentMedLenke(dokument, journalpostId)}

                <StyledVedleggsliste>
                    {dokument.logiskeVedlegg &&
                        dokument.logiskeVedlegg.map(vedlegg => visLogiskVedlegg(vedlegg))}
                </StyledVedleggsliste>
            </li>
        );
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
                            <th className={hentSorteringsknappCss()}>
                                <button onClick={() => settNesteSorteringsrekkefølge()}>
                                    Registrert/sendt
                                </button>
                            </th>

                            <th>Tittel</th>
                            <th>Fagsystem</th>
                            <th>Avsender/Mottaker</th>
                            <th>Journalpost</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hentSorterteJournalposter(journalposterRessurs.data).map(journalpost => (
                            <tr key={journalpost.journalpostId}>
                                <StyledTd>
                                    <InnUtWrapper>
                                        <IkonWrapper>
                                            {hentIkonForJournalpostType(
                                                journalpost.journalposttype
                                            )}{' '}
                                        </IkonWrapper>
                                        {journalpost.journalposttype}
                                    </InnUtWrapper>
                                </StyledTd>
                                <StyledTd
                                    className={
                                        sortering === Sorteringsrekkefølge.STIGENDE ||
                                        sortering === Sorteringsrekkefølge.SYNKENDE
                                            ? 'tabell__StyledTd--sortert'
                                            : ''
                                    }
                                >
                                    {journalpost.datoMottatt &&
                                        tilVisning(kalenderDato(journalpost.datoMottatt))}
                                </StyledTd>

                                <StyledTd>
                                    {journalpost.dokumenter && (
                                        <div key={journalpost.dokumenter[0].dokumentInfoId}>
                                            {visDokumentMedLenke(
                                                journalpost.dokumenter[0],
                                                journalpost.journalpostId
                                            )}
                                            {
                                                <StyledVedleggsliste>
                                                    {journalpost.dokumenter[0].logiskeVedlegg.map(
                                                        vedlegg => visLogiskVedlegg(vedlegg)
                                                    )}
                                                    {journalpost.dokumenter
                                                        .slice(1)
                                                        .map(dokument =>
                                                            visDokumentliste(
                                                                dokument,
                                                                journalpost.journalpostId
                                                            )
                                                        )}
                                                </StyledVedleggsliste>
                                            }
                                        </div>
                                    )}
                                </StyledTd>

                                <StyledTd>{journalpost.sak?.fagsakId}</StyledTd>
                                <StyledTd>{journalpost.avsenderMottaker?.navn}</StyledTd>
                                <StyledTd>{journalpost.tittel}</StyledTd>
                                <StyledTd>
                                    {mapJournalstatusTilTekst[journalpost.journalstatus]}
                                </StyledTd>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        );
    } else {
        return <></>;
    }
};

export default JournalpostListe;
