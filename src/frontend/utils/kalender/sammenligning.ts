import type { DagMånedÅr } from '.';

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
