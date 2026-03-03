import type { FeltState } from '@navikt/familie-skjema';
export type IsoDatoString = string;
export type IsoMånedString = string;
export declare const dagensDato: Date;
export declare const tidenesMorgen: Date;
export declare const tidenesEnde: Date;
export declare enum Datoformat {
    DATO = "dd.MM.yyyy",
    DATO_FORKORTTET = "dd.MM.yy",
    DATO_FORLENGET = "PPP",
    DATO_FORLENGET_MED_TID = "PPPp",
    ISO_MÅNED = "yyyy-MM",
    ISO_DAG = "yyyy-MM-dd",
    DATO_TID = "dd.MM.yy HH:mm",
    DATO_TID_SEKUNDER = "dd.MM.yy HH:mm:ss",
    MÅNED_ÅR = "MM.yyyy",
    MÅNED_ÅR_NAVN = "MMMM yyyy",
    MÅNED_ÅR_KORTNAVN = "MMM yyyy",
    MÅNED_NAVN = "MMM"
}
interface DateTilFormatertStringProps {
    date?: Date;
    tilFormat: Datoformat;
    defaultString?: string;
}
export declare const dateTilFormatertString: ({ date, tilFormat, defaultString, }: DateTilFormatertStringProps) => string;
export declare const dateTilIsoDatoString: (dato?: Date) => IsoDatoString;
export declare const dateTilIsoDatoStringEllerUndefined: (dato?: Date | null) => IsoDatoString | undefined;
export declare const dateTilIsoMånedStringEllerUndefined: (dato?: Date) => IsoDatoString | undefined;
interface IsoStringTilFormatertStringProps {
    isoString: IsoDatoString | IsoMånedString | undefined;
    tilFormat: Datoformat;
    defaultString?: string;
}
export declare const isoStringTilFormatertString: ({ isoString, tilFormat, defaultString, }: IsoStringTilFormatertStringProps) => string;
export declare const isoStringTilDate: (isoDatoString: IsoDatoString | IsoMånedString) => Date;
export declare const isoStringTilDateEllerUndefined: (isoDatoString: IsoDatoString | IsoMånedString | undefined) => Date | undefined;
interface IsoStringTilDateProps {
    isoString: IsoDatoString | IsoMånedString | undefined;
    fallbackDate: Date;
}
export declare const isoStringTilDateMedFallback: ({ isoString, fallbackDate }: IsoStringTilDateProps) => Date;
export declare const validerGyldigDato: (felt: FeltState<Date | undefined>) => FeltState<Date | undefined>;
export declare const erIsoStringGyldig: (isoString?: IsoDatoString) => boolean;
export {};
