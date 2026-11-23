import { senesteRelevanteDato, tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { harTilgangTilEnhet } from '@typer/enhet';
import {
    behandlingstypeFilter,
    EnhetFilter,
    enhetFilter,
    gjelderFilter,
    oppgaveTypeFilter,
    saksbehandlerFilter,
} from '@typer/oppgave';
import type { Saksbehandler } from '@typer/saksbehandler';
import { Datoformat, dateTilFormatertString, erIsoStringGyldig } from '@utils/dato';
import { isValid, isWithinInterval, parse, parseISO } from 'date-fns';

import { OppgavefilterField } from './useOppgavefilterForm';

const gyldigPeriode = { start: tidligsteRelevanteDato, end: senesteRelevanteDato };

const inntastingsformater = ['dd.MM.yyyy', 'ddMMyyyy', 'dd/MM/yyyy', 'dd-MM-yyyy'];

// date-fns tolker 'yyyy' som 1–4 siffer, så uten denne sjekken blir f.eks. «01.01.020» tolket som år 20.
const harFiresifretÅrstall = /^(\d{1,2}[./-]\d{1,2}[./-]\d{4}|\d{8})$/;

export function erGyldigDato(verdi: string): boolean {
    return (
        /^\d{4}-\d{2}-\d{2}$/.test(verdi) &&
        erIsoStringGyldig(verdi) &&
        isWithinInterval(parseISO(verdi), gyldigPeriode)
    );
}

function erDatoUtenforGyldigPeriode(inntastetVerdi: string): boolean {
    if (!harFiresifretÅrstall.test(inntastetVerdi)) {
        return false;
    }
    return inntastingsformater.some(format => {
        const dato = parse(inntastetVerdi, format, new Date());
        return isValid(dato) && !isWithinInterval(dato, gyldigPeriode);
    });
}

export function validerDato(verdi: string): true | string {
    if (verdi === '' || erGyldigDato(verdi)) {
        return true;
    }
    if (erDatoUtenforGyldigPeriode(verdi)) {
        const fra = dateTilFormatertString({ date: tidligsteRelevanteDato, tilFormat: Datoformat.DATO });
        const til = dateTilFormatertString({ date: senesteRelevanteDato, tilFormat: Datoformat.DATO });
        return `Dato må være mellom ${fra} og ${til}.`;
    }
    return 'Dato må skrives på format DD.MM.ÅÅÅÅ.';
}

export function validerEnhet(verdi: string): true | string {
    if (verdi === EnhetFilter.VELG) {
        return 'Du må velge enhet.';
    }
    return true;
}

export function erGyldigValg(verdi: string, valg: Record<string, { id: string }>): boolean {
    return Object.values(valg).some(par => par.id === verdi);
}

export function erGyldigEnhet(verdi: string, saksbehandler: Saksbehandler): boolean {
    return erGyldigValg(verdi, enhetFilter) && harTilgangTilEnhet(verdi.replace('E', ''), saksbehandler.groups);
}

export function lagValideringer(saksbehandler: Saksbehandler): Record<OppgavefilterField, (verdi: string) => boolean> {
    return {
        [OppgavefilterField.REGISTRERT_DATO]: verdi => erGyldigDato(verdi),
        [OppgavefilterField.OPPGAVETYPE]: verdi => erGyldigValg(verdi, oppgaveTypeFilter),
        [OppgavefilterField.BEHANDLINGSTEMA]: verdi => erGyldigValg(verdi, gjelderFilter),
        [OppgavefilterField.BEHANDLINGSTYPE]: verdi => erGyldigValg(verdi, behandlingstypeFilter),
        [OppgavefilterField.FRIST]: verdi => erGyldigDato(verdi),
        [OppgavefilterField.ENHET]: verdi => erGyldigEnhet(verdi, saksbehandler),
        [OppgavefilterField.SAKSBEHANDLER]: verdi => erGyldigValg(verdi, saksbehandlerFilter(saksbehandler)),
    };
}
