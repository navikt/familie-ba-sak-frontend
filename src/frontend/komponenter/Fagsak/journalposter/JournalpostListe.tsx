import React, { useEffect, useState, useLayoutEffect } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
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
} from '@navikt/familie-typer';

import 'nav-frontend-tabell-style';
import { IPersonInfo } from '../../../typer/person';
import { tilVisning, kalenderDato, erEtter } from '../../../utils/kalender';
import Dokument from './Dokument';

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

const ToKolonnerDiv = styled.div`
    display: grid;
    grid-template-columns: 80rem 1fr;
    grid-template-rows: 1fr;
`;

interface IProps {
    bruker: IPersonInfo;
}
enum Sorteringsrekkefølge {
    STIGENDE,
    SYNKENDE,
    INGEN_SORTERING,
}

const useVinduBredde = (): boolean => {
    const [bredde, setBredde] = useState(0);
    useLayoutEffect(() => {
        function oppdaterBredde() {
            setBredde(window.innerWidth);
        }
        window.addEventListener('resize', oppdaterBredde);
        oppdaterBredde();
        return () => window.removeEventListener('resize', oppdaterBredde);
    }, []);
    return bredde > 1900;
};

interface IBredSkjermProps {
    erBredSkjerm: boolean;
    children: (React.ReactChild | Element | undefined)[];
}

const BredSkjermWrapper: React.FC<IBredSkjermProps> = ({ erBredSkjerm, children }) =>
    erBredSkjerm ? <ToKolonnerDiv>{children}</ToKolonnerDiv> : <Container>{children}</Container>;

const JournalpostListe: React.FC<IProps> = ({ bruker }) => {
    const { request } = useHttp();
    const [journalposterRessurs, settJournalposterRessurs] = useState<Ressurs<IJournalpost[]>>(
        byggTomRessurs()
    );
    const [sortering, settSortering] = useState<Sorteringsrekkefølge>(
        Sorteringsrekkefølge.INGEN_SORTERING
    );
    const [aktivJournalpostId, settAktivJournalpostId] = useState<string | undefined>();
    const [aktivtDokumentId, settAktivtDokumentId] = useState<string | undefined>();
    const erBredSkjerm = useVinduBredde();

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

    const visDokument: boolean = aktivtDokumentId && aktivJournalpostId ? true : false;

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
            <BredSkjermWrapper erBredSkjerm={erBredSkjerm && visDokument}>
                <Container>
                    <StyledSidetittel>Dokumentoversikt</StyledSidetittel>

                    <table className="tabell tabell--stripet">
                        <thead>
                            <tr>
                                <th className={hentSorteringsknappCss()}>
                                    <button onClick={() => settNesteSorteringsrekkefølge()}>
                                        Dato mottatt
                                    </button>
                                </th>
                                <th>Inn/ut</th>
                                <th>Tittel</th>
                                <th>Fagsystem</th>
                                <th>Avsender/Mottaker</th>
                                <th>Journalpost</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hentSorterteJournalposter(journalposterRessurs.data).map(
                                journalpost => (
                                    <tr key={journalpost.journalpostId}>
                                        <td
                                            className={
                                                sortering === Sorteringsrekkefølge.STIGENDE ||
                                                sortering === Sorteringsrekkefølge.SYNKENDE
                                                    ? 'tabell__td--sortert'
                                                    : ''
                                            }
                                        >
                                            {journalpost.datoMottatt &&
                                                tilVisning(kalenderDato(journalpost.datoMottatt))}
                                        </td>
                                        <td>
                                            <InnUtWrapper>
                                                <IkonWrapper>
                                                    {hentIkonForJournalpostType(
                                                        journalpost.journalposttype
                                                    )}{' '}
                                                </IkonWrapper>
                                                {journalpost.journalposttype}
                                            </InnUtWrapper>
                                        </td>
                                        <td>
                                            {journalpost.dokumenter?.map(dokument => (
                                                <div key={dokument.dokumentInfoId}>
                                                    <Knapp
                                                        onClick={() => {
                                                            settAktivJournalpostId(
                                                                journalpost.journalpostId
                                                            );
                                                            settAktivtDokumentId(
                                                                dokument.dokumentInfoId
                                                            );
                                                        }}
                                                    >
                                                        {dokument.tittel}
                                                    </Knapp>
                                                    {/* <DokumentInfoStripe
                                                valgt={false}
                                                dokument={dokument}
                                                journalpostId={journalpost.journalpostId}
                                            /> */}
                                                </div>
                                            ))}
                                        </td>

                                        <td>{journalpost.sak?.fagsakId}</td>
                                        <td>{journalpost.avsenderMottaker?.navn}</td>
                                        <td>
                                            <Lenke href="#">{journalpost.tittel}</Lenke>
                                        </td>

                                        <td>{journalpost.journalstatus}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </Container>
                <Container>
                    {aktivtDokumentId && aktivJournalpostId && (
                        <Dokument
                            dokumentInfoId={aktivtDokumentId}
                            journalpostId={aktivJournalpostId}
                        />
                    )}
                </Container>
            </BredSkjermWrapper>
        );
    } else {
        return <></>;
    }
};

export default JournalpostListe;
