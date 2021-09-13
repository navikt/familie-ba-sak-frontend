import { IJournalpost, IJournalpostRelevantDato, JournalpostDatotype } from '@navikt/familie-typer';

import { erEtter, kalenderDato, tilVisning } from '../../../utils/kalender';

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

export const hentDatoMottatt = (relevanteDatoer: IJournalpostRelevantDato[]) => {
    const datoMottatt = relevanteDatoer.find(
        dato => dato.datotype === JournalpostDatotype.DATO_REGISTRERT
    )?.dato;

    return datoMottatt ? tilVisning(kalenderDato(datoMottatt)) : '-';
};
