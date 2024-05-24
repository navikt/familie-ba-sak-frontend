import { isAfter } from 'date-fns';

import { JournalpostDatotype } from '@navikt/familie-typer';
import type { IJournalpost, IJournalpostRelevantDato } from '@navikt/familie-typer';

import { Datoformat, isoStringTilDate, isoStringTilFormatertString } from '../../../utils/dato';
import { Sorteringsrekkefølge } from '../../../utils/tabell';

const sorterJournalposterStigende = (a: IJournalpost, b: IJournalpost) => {
    if (!a.datoMottatt) {
        return -1;
    }
    if (!b.datoMottatt) {
        return 1;
    }
    return isAfter(isoStringTilDate(a.datoMottatt), isoStringTilDate(b.datoMottatt)) ? 1 : -1;
};

const sorterJournalposterSynkende = (a: IJournalpost, b: IJournalpost) =>
    -1 * sorterJournalposterStigende(a, b);

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

const mapFagsystemkodeTilTekst = (kode: string | undefined) => {
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
    return relevanteDatoer.find(dato => {
        if (journalposttype === 'I') {
            return dato.datotype === JournalpostDatotype.DATO_REGISTRERT;
        } else {
            return dato.datotype === JournalpostDatotype.DATO_JOURNALFOERT;
        }
    })?.dato;
};

export const formaterDatoRegistrertSendtMottatt = (dato: string | undefined): string =>
    isoStringTilFormatertString({
        isoString: dato,
        tilFormat: Datoformat.DATO_TID,
        defaultString: '-',
    });

export const formaterFagsak = (fagsystemKode: string | undefined, fagsakId: string | undefined) => {
    const fagsystem = mapFagsystemkodeTilTekst(fagsystemKode);
    const saksid = fagsakId ?? '-';
    return fagsystem + ' | ' + saksid;
};
