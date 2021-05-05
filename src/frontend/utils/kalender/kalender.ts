import { FamilieIsoDate } from '../../typer/tid';
import { parseIso8601String } from './io';
import { antallDagerIMåned, DagMånedÅr, MånedÅr, År } from './typer';
import { mod } from './utils';

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

export const nå = (): DagMånedÅr => {
    const dato = new Date();

    return {
        dag: dato.getDate(),
        måned: dato.getMonth(),
        år: dato.getFullYear(),
    };
};

export const kalenderDatoMedFallback = (
    dato: FamilieIsoDate | undefined,
    fallbackDato: DagMånedÅr
): DagMånedÅr => (dato ? parseIso8601String(dato) : fallbackDato);

export const kalenderDato = (dato: FamilieIsoDate): DagMånedÅr => parseIso8601String(dato);

export const kalenderMåned = (dato: FamilieIsoDate): MånedÅr => {
    const dagMånedÅr = parseIso8601String(dato);
    return {
        måned: dagMånedÅr.måned,
        år: dagMånedÅr.år,
    };
};

export const kalenderÅr = (dato: FamilieIsoDate): År => {
    const dagMånedÅr = parseIso8601String(dato);
    return {
        år: dagMånedÅr.år,
    };
};

export const sisteDagInneværendeMåned = (): DagMånedÅr => {
    const dagMånedÅr: DagMånedÅr = nå();

    return {
        ...dagMånedÅr,
        dag: antallDagerIMåned({ år: dagMånedÅr.år, måned: dagMånedÅr.måned }),
    };
};

export const dagenFør = (dagMånedÅr: DagMånedÅr): DagMånedÅr => {
    if (dagMånedÅr.dag > 1) {
        return {
            ...dagMånedÅr,
            dag: dagMånedÅr.dag - 1,
        };
    } else if (dagMånedÅr.dag === 1 && dagMånedÅr.måned > 0) {
        const månedFør = dagMånedÅr.måned - 1;

        return {
            ...dagMånedÅr,
            måned: månedFør,
            dag: antallDagerIMåned({ år: dagMånedÅr.år, måned: månedFør }),
        };
    } else if (dagMånedÅr.dag === 1 && dagMånedÅr.måned === 0) {
        const månedFør = 11;

        return {
            ...dagMånedÅr,
            år: dagMånedÅr.år - 1,
            måned: månedFør,
            dag: antallDagerIMåned({ år: dagMånedÅr.år, måned: månedFør }),
        };
    } else {
        throw new Error(`Dagen før ${dagMånedÅr} er ikke støttet`);
    }
};

export const minusMåneder = (dagMånedÅr: DagMånedÅr, måneder: number): DagMånedÅr => {
    return {
        ...dagMånedÅr,
        år: dagMånedÅr.år - Math.abs(Math.floor((dagMånedÅr.måned - måneder) / 12)),
        måned: mod(dagMånedÅr.måned - måneder, 12),
    };
};

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

    if (dato1.år < dato2.år) {
        return true;
    }

    return false;
};

export const erEtter = (dato1: DagMånedÅr, dato2: DagMånedÅr) => {
    if (dato1.dag > dato2.dag && dato1.måned >= dato2.måned && dato1.år >= dato2.år) {
        return true;
    }

    if (dato1.måned > dato2.måned && dato1.år >= dato2.år) {
        return true;
    }

    if (dato1.år > dato2.år) {
        return true;
    }

    return false;
};
