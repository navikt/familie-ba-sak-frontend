import type { DagMånedÅr } from '.';
import { kalenderDato, kalenderDatoFraDate } from '.';

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
    return erFør(dato2, dato1);
};

export const erSamme = (dato1: DagMånedÅr, dato2: DagMånedÅr) => {
    return dato1.dag === dato2.dag && dato1.måned === dato2.måned && dato1.år === dato2.år;
};

export const valgtDatoErNesteMånedEllerSenere = (valgtDato: DagMånedÅr, today: DagMånedÅr) =>
    valgtDato.år > today.år || (valgtDato.år === today.år && valgtDato.måned > today.måned);

export const sammenlignDatoer = (dato1: string, dato2: Date): number => {
    const dato1SomKalenderdato = kalenderDato(dato1);
    const dato2SomKalenderdato = kalenderDatoFraDate(dato2);
    if (erFør(dato1SomKalenderdato, dato2SomKalenderdato)) {
        return -1;
    } else if (erEtter(dato1SomKalenderdato, dato2SomKalenderdato)) {
        return 1;
    } else {
        return 0;
    }
};
