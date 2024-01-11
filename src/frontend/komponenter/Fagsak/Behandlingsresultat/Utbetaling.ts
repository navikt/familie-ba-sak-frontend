export enum Utbetaling {
    FULL_UTBETALING = 'FULL_UTBETALING',
    DELT_UTBETALING = 'DELT_UTBETALING',
    INGEN_UTBETALING = 'INGEN_UTBETALING',
}

export function prosentTilUtbetaling(prosent?: number) {
    switch (prosent) {
        case 100:
            return Utbetaling.FULL_UTBETALING;
        case 50:
            return Utbetaling.DELT_UTBETALING;
        case 0:
            return Utbetaling.INGEN_UTBETALING;
        case undefined:
            return undefined;
        case null:
            return undefined;
        default:
            throw new Error(`Klarer ikke å konvertere fra ${prosent} til Utbetaling-enum`);
    }
}

export function utbetalingTilProsent(utbetaling?: Utbetaling) {
    switch (utbetaling) {
        case Utbetaling.FULL_UTBETALING:
            return 100;
        case Utbetaling.DELT_UTBETALING:
            return 50;
        case Utbetaling.INGEN_UTBETALING:
            return 0;
        case undefined:
            return undefined;
        default:
            throw new Error(`Klarer ikke å konvertere fra ${utbetaling} til prosent`);
    }
}

export function utbetalingTilLabel(utbetaling?: Utbetaling) {
    switch (utbetaling) {
        case Utbetaling.FULL_UTBETALING:
            return 'Perioden skal utbetales fullt';
        case Utbetaling.DELT_UTBETALING:
            return 'Perioden skal utbetales delt';
        case Utbetaling.INGEN_UTBETALING:
            return 'Perioden skal ikke utbetales';
        case undefined:
            return 'Ikke valgt';
    }
}
