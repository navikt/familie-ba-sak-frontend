import { parseIso8601String } from './io';
import { antallDagerIMåned, DagMånedÅr, FamilieIsoDate } from './typer';
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

export const nå = (): DagMånedÅr => kalenderDatoFraDate(new Date());

export const førsteDagIInneværendeMåned = () => {
    const idag = nå();
    return {
        ...idag,
        dag: 1,
    };
};

export const sisteDagIInneværendeMåned = () => {
    const idag = nå();
    return {
        ...idag,
        dag: antallDagerIMåned({ måned: idag.måned, år: idag.år }),
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

// Aritmetikk
export const minusMåneder = (dagMånedÅr: DagMånedÅr, måneder: number): DagMånedÅr => {
    const nyttÅr = dagMånedÅr.år - Math.abs(Math.floor((dagMånedÅr.måned - måneder) / 12));
    const nyMåned = mod(dagMånedÅr.måned - måneder, 12);
    return {
        år: nyttÅr,
        måned: nyMåned,
        dag: dagVedEndringPåÅr(
            {
                ...dagMånedÅr,
                måned: nyMåned,
            },
            nyttÅr
        ),
    };
};

export const leggTilMåneder = (dagMånedÅr: DagMånedÅr, måneder: number): DagMånedÅr => {
    const nyttÅr = dagMånedÅr.år + Math.floor((dagMånedÅr.måned + måneder) / 12);
    const nyMåned = mod(dagMånedÅr.måned + måneder, 12);
    return {
        år: nyttÅr,
        måned: nyMåned,
        dag: dagVedEndringPåÅr(
            {
                ...dagMånedÅr,
                måned: nyMåned,
            },
            nyttÅr
        ),
    };
};

export const leggTilÅr = (dagMånedÅr: DagMånedÅr, år: number) => {
    const nyttÅr = dagMånedÅr.år + år;
    return {
        ...dagMånedÅr,
        år: nyttÅr,
        dag: dagVedEndringPåÅr(dagMånedÅr, nyttÅr),
    };
};

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

export const erSamme = (dato1: DagMånedÅr, dato2: DagMånedÅr) => {
    return dato1.dag === dato2.dag && dato1.måned === dato2.måned && dato1.år === dato2.år;
};

export const dagVedEndringPåÅr = (dagMånedÅr: DagMånedÅr, nyttÅr: number) => {
    const antallDagerIMånedINyttÅr = antallDagerIMåned({ år: nyttÅr, måned: dagMånedÅr.måned });
    if (antallDagerIMånedINyttÅr <= dagMånedÅr.dag) {
        return antallDagerIMånedINyttÅr;
    } else {
        return dagMånedÅr.dag;
    }
};
