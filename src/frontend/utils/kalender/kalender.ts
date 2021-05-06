import { parseIso8601String } from './io';
import { antallDagerIMåned, DagMånedÅr, FamilieIsoDate } from './typer';

export const TIDENES_MORGEN: DagMånedÅr = {
    dag: 1,
    måned: 1,
    år: 1000,
};
export const TIDENES_ENDE: DagMånedÅr = {
    dag: 1,
    måned: 1,
    år: 3000,
};

export const iDag = (): DagMånedÅr => kalenderDatoFraDate(new Date());

export const førsteDagIInneværendeMåned = () => {
    const inneværende = iDag();
    return {
        ...inneværende,
        dag: 1,
    };
};

export const sisteDagIInneværendeMåned = () => {
    const inneværende = iDag();
    return {
        ...inneværende,
        dag: antallDagerIMåned({ måned: inneværende.måned, år: inneværende.år }),
    };
};

export const kalenderDatoFraDate = (date: Date): DagMånedÅr => ({
    dag: date.getDate(),
    måned: date.getMonth(),
    år: date.getFullYear(),
});

export const kalenderDatoTilDate = (
    dagMånedÅr: DagMånedÅr,
    timer?: number,
    minutter?: number
): Date =>
    new Date(
        dagMånedÅr.år,
        dagMånedÅr.måned,
        dagMånedÅr.dag,
        timer ? timer : 0,
        minutter ? minutter : 0
    );

export const kalenderDatoMedFallback = (
    dato: FamilieIsoDate | undefined,
    fallbackDato: DagMånedÅr
): DagMånedÅr => (dato ? parseIso8601String(dato) : fallbackDato);

export const kalenderDato = (dato: FamilieIsoDate): DagMånedÅr => parseIso8601String(dato);

// Sammenligningsfunksjoner
export const erISammeMåned = (dato1: DagMånedÅr, dato2: DagMånedÅr) => {
    return dato1.måned === dato2.måned && dato1.år === dato2.år;
};

export const erFør = (dato1: DagMånedÅr, dato2: DagMånedÅr) => {
    if (dato1.dag < dato2.dag && dato1.måned <= dato2.måned && dato1.år <= dato2.år) {
        return true;
    }

    if (dato1.måned < dato2.måned && dato1.år <= dato2.år) {
        return true;
    }

    return dato1.år < dato2.år;
};

export const erEtter = (dato1: DagMånedÅr, dato2: DagMånedÅr) => {
    if (dato1.dag > dato2.dag && dato1.måned >= dato2.måned && dato1.år >= dato2.år) {
        return true;
    }

    if (dato1.måned > dato2.måned && dato1.år >= dato2.år) {
        return true;
    }

    return dato1.år > dato2.år;
};

export const erSamme = (dato1: DagMånedÅr, dato2: DagMånedÅr) => {
    return dato1.dag === dato2.dag && dato1.måned === dato2.måned && dato1.år === dato2.år;
};
