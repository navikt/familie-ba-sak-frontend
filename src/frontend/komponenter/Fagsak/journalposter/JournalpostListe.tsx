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
} from '@navikt/familie-typer';

import { IPersonInfo } from '../../../typer/person';
import { tilVisning, kalenderDato, erEtter } from '../../../utils/kalender';
import 'nav-frontend-tabell-style';

const Container = styled.div`
    margin: 4.1875rem 3.3125rem;
`;

const TittelWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const IkonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
`;

const StyledSidetittel = styled(Sidetittel)`
    margin-bottom: 1rem;
`;

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
                return <LeftFilled />;
            case Journalposttype.U:
                return <RightFilled />;
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
                            <th className={hentSorteringsknappCss()}>
                                <button onClick={() => settNesteSorteringsrekkefølge()}>
                                    Dato mottatt
                                </button>
                            </th>
                            <th>Tittel</th>
                            <th>Fagsystem</th>
                            <th>Avsender/Mottaker</th>
                            <th>Journalstatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hentSorterteJournalposter(journalposterRessurs.data).map(journalpost => (
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
                                    <TittelWrapper>
                                        <IkonWrapper>
                                            {hentIkonForJournalpostType(
                                                journalpost.journalposttype
                                            )}{' '}
                                        </IkonWrapper>
                                        {journalpost.tittel}
                                    </TittelWrapper>
                                </td>
                                <td>{journalpost.sak?.fagsaksystem}</td>
                                <td>{journalpost.avsenderMottaker?.navn}</td>
                                <td>{journalpost.journalstatus}</td>
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
