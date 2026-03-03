import { format, isValid, parseISO, startOfToday } from 'date-fns';
import { feil, ok } from '@navikt/familie-skjema';
export const dagensDato = startOfToday();
export const tidenesMorgen = new Date(1000, 1, 1);
export const tidenesEnde = new Date(3000, 1, 1);
export var Datoformat;
(function (Datoformat) {
    Datoformat["DATO"] = "dd.MM.yyyy";
    Datoformat["DATO_FORKORTTET"] = "dd.MM.yy";
    Datoformat["DATO_FORLENGET"] = "PPP";
    Datoformat["DATO_FORLENGET_MED_TID"] = "PPPp";
    Datoformat["ISO_M\u00C5NED"] = "yyyy-MM";
    Datoformat["ISO_DAG"] = "yyyy-MM-dd";
    Datoformat["DATO_TID"] = "dd.MM.yy HH:mm";
    Datoformat["DATO_TID_SEKUNDER"] = "dd.MM.yy HH:mm:ss";
    Datoformat["M\u00C5NED_\u00C5R"] = "MM.yyyy";
    Datoformat["M\u00C5NED_\u00C5R_NAVN"] = "MMMM yyyy";
    Datoformat["M\u00C5NED_\u00C5R_KORTNAVN"] = "MMM yyyy";
    Datoformat["M\u00C5NED_NAVN"] = "MMM";
})(Datoformat || (Datoformat = {}));
export const dateTilFormatertString = ({ date, tilFormat, defaultString = '', }) => {
    return date && isValid(date) ? format(date, tilFormat) : defaultString;
};
export const dateTilIsoDatoString = (dato) => dateTilFormatertString({ date: dato, tilFormat: Datoformat.ISO_DAG, defaultString: '' });
export const dateTilIsoDatoStringEllerUndefined = (dato) => dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : undefined;
export const dateTilIsoMånedStringEllerUndefined = (dato) => dato && isValid(dato) ? format(dato, Datoformat.ISO_MÅNED) : undefined;
export const isoStringTilFormatertString = ({ isoString, tilFormat, defaultString = '', }) => {
    const dato = isoString ? parseISO(isoString) : undefined;
    return dateTilFormatertString({
        date: dato,
        tilFormat: tilFormat,
        defaultString: defaultString,
    });
};
export const isoStringTilDate = (isoDatoString) => {
    const dato = parseISO(isoDatoString);
    if (!isValid(dato)) {
        throw new Error(`Dato '${isoDatoString}' er ugyldig`);
    }
    return dato;
};
export const isoStringTilDateEllerUndefined = (isoDatoString) => (isoDatoString ? isoStringTilDate(isoDatoString) : undefined);
export const isoStringTilDateMedFallback = ({ isoString, fallbackDate }) => isoString ? isoStringTilDate(isoString) : fallbackDate;
export const validerGyldigDato = (felt) => felt.verdi && isValid(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge en gyldig dato');
export const erIsoStringGyldig = (isoString) => {
    if (!isoString)
        return false;
    const dato = parseISO(isoString);
    return isValid(dato);
};
