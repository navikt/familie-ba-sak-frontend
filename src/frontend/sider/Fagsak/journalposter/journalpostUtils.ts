import { isAfter } from 'date-fns';

import { JournalpostDatotype } from '@navikt/familie-typer';
import type { IJournalpostRelevantDato } from '@navikt/familie-typer';

import type { ITilgangsstyrtJournalpost } from '../../../typer/journalpost';
import { Datoformat, isoStringTilDate, isoStringTilFormatertString } from '../../../utils/dato';
import { Sorteringsrekkefølge } from '../../../utils/tabell';

const sorterJournalposterStigende = (a: ITilgangsstyrtJournalpost, b: ITilgangsstyrtJournalpost) => {
    if (!a.journalpost.datoMottatt) {
        return -1;
    }
    if (!b.journalpost.datoMottatt) {
        return 1;
    }
    return isAfter(isoStringTilDate(a.journalpost.datoMottatt), isoStringTilDate(b.journalpost.datoMottatt)) ? 1 : -1;
};

const sorterJournalposterSynkende = (a: ITilgangsstyrtJournalpost, b: ITilgangsstyrtJournalpost) =>
    -1 * sorterJournalposterStigende(a, b);

export const hentSorterteJournalposter = (
    tilgangsstyrtJournalpost: ITilgangsstyrtJournalpost[],
    sortering: Sorteringsrekkefølge
) => {
    switch (sortering) {
        case Sorteringsrekkefølge.INGEN_SORTERING:
            return tilgangsstyrtJournalpost;
        case Sorteringsrekkefølge.STIGENDE:
            return [...tilgangsstyrtJournalpost].sort(sorterJournalposterStigende);
        case Sorteringsrekkefølge.SYNKENDE:
            return [...tilgangsstyrtJournalpost].sort(sorterJournalposterSynkende);
    }
};

const mapFagsystemkodeTilTekst = (kode: string | undefined) => {
    switch (kode) {
        case 'BA':
            return 'Nav Barnetrygd';
        case 'IT01':
            return 'Infotrygd';
        case undefined:
            return '-';
        default:
            return kode;
    }
};

export const hentDatoRegistrertSendt = (relevanteDatoer: IJournalpostRelevantDato[], journalposttype: string) => {
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
