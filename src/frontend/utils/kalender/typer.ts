export type YearMonth = string; // Format YYYY-MM (ISO)
export type FamilieIsoDate = string; // Format YYYY-MM-DD (ISO)

/**
 * Interfacer for å representere dag, måned og år.
 * dag 1-31
 * måned jan-des
 * år 0-MAX
 */
export type År = { år: number };
export type MånedÅr = { måned: number } & År;
export type DagMånedÅr = { dag: number } & MånedÅr;

export enum KalenderEnhet {
    DAG,
    MÅNED,
    ÅR,
}

export interface IPeriode {
    // Format YYYY-MM-DD (ISO)
    fom?: FamilieIsoDate;
    tom?: FamilieIsoDate;
}

export interface IYearMonthPeriode {
    // Format YYYY-MM
    fom?: YearMonth;
    tom?: YearMonth;
}

export const erSkuddår = ({ år }: År) => {
    if (år % 400 === 0) {
        return true;
    }
    if (år % 100 === 0) {
        return false;
    }
    return år % 4 === 0;
};

export const antallDagerIMåned = ({ år, måned }: MånedÅr): number => {
    switch (måned) {
        case 0:
            return 31;
        case 1:
            if (erSkuddår({ år })) {
                return 29;
            } else {
                return 28;
            }
        case 2:
            return 31;
        case 3:
            return 30;
        case 4:
            return 31;
        case 5:
            return 30;
        case 6:
            return 31;
        case 7:
            return 31;
        case 8:
            return 30;
        case 9:
            return 31;
        case 10:
            return 30;
        case 11:
            return 31;
        default:
            throw new Error(`Ugyldig måned ${måned}`);
    }
};
