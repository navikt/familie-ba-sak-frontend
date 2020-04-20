import moment from 'moment';
export declare enum datoformat {
    MÅNED = "MM.YY",
    DATO = "DD.MM.YYYY",
    DATO_FORKORTTET = "DD.MM.YY",
    DATO_FORLENGET = "LL",
    ISO_MÅNED = "YYYY-MM",
    ISO_DAG = "YYYY-MM-DD",
    DATO_TID = "DD.MM.YY HH:mm",
    TID = "HH:mm"
}
export declare enum datoformatNorsk {
    DATO = "DD.MM.\u00C5\u00C5\u00C5\u00C5"
}
export declare const formaterIsoDato: (dato: string | undefined, tilFormat: datoformat, defaultString?: string | undefined) => string;
export declare const formaterDato: (dato: moment.Moment, tilFormat: datoformat) => string;
export declare const hentAlder: (dato: string) => number;
export declare const formaterBeløp: (beløp: number) => string;
