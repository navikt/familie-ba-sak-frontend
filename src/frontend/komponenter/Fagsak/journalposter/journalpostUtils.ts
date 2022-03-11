import {
    type IJournalpost,
    type IJournalpostRelevantDato,
    JournalpostDatotype,
} from '@navikt/familie-typer';

import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import { erEtter, kalenderDato } from '../../../utils/kalender';

export const sorterJournalposterStigende = (a: IJournalpost, b: IJournalpost) => {
    if (!a.datoMottatt) {
        return -1;
    }
    if (!b.datoMottatt) {
        return 1;
    }
    return erEtter(kalenderDato(a.datoMottatt), kalenderDato(b.datoMottatt)) ? 1 : -1;
};

export const sorterJournalposterSynkende = (a: IJournalpost, b: IJournalpost) =>
    -1 * sorterJournalposterStigende(a, b);

export enum Sorteringsrekkefølge {
    STIGENDE,
    SYNKENDE,
    INGEN_SORTERING,
}

export const hentSorterteJournalposter = (
    journalposter: IJournalpost[],
    sortering: Sorteringsrekkefølge
) => {
    switch (sortering) {
        case Sorteringsrekkefølge.INGEN_SORTERING:
            return journalposter;
        case Sorteringsrekkefølge.STIGENDE:
            return [...journalposter].sort(sorterJournalposterStigende);
        case Sorteringsrekkefølge.SYNKENDE:
            return [...journalposter].sort(sorterJournalposterSynkende);
    }
};

export const hentSorteringsknappCss = (sortering: Sorteringsrekkefølge) => {
    switch (sortering) {
        case Sorteringsrekkefølge.INGEN_SORTERING:
            return '';
        case Sorteringsrekkefølge.STIGENDE:
            return 'tabell__th--sortert-asc';
        case Sorteringsrekkefølge.SYNKENDE:
            return 'tabell__th--sortert-desc';
    }
};

export const mapFagsystemkodeTilTekst = (kode: string | undefined) => {
    switch (kode) {
        case 'BA':
            return 'NAV Barnetrygd';
        case 'IT01':
            return 'Infotrygd';
        case undefined:
            return '-';
        default:
            return kode;
    }
};

export const hentDatoRegistrertSendt = (
    relevanteDatoer: IJournalpostRelevantDato[],
    journalposttype: string
) => {
    const datoMottatt = relevanteDatoer.find(dato => {
        if (journalposttype === 'I') {
            return dato.datotype === JournalpostDatotype.DATO_REGISTRERT;
        } else {
            return dato.datotype === JournalpostDatotype.DATO_JOURNALFOERT;
        }
    })?.dato;

    return datoMottatt ? formaterIsoDato(datoMottatt, datoformat.DATO_TID) : '-';
};

export const formaterFagsak = (fagsystemKode: string | undefined, fagsakId: string | undefined) => {
    const fagsystem = mapFagsystemkodeTilTekst(fagsystemKode);
    const saksid = fagsakId ?? '-';
    return fagsystem + ' | ' + saksid;
};
