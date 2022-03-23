import type { DagMånedÅr } from '../kalender';
import { valgtDatoErNesteMånedEllerSenere } from '../kalender';

const today: DagMånedÅr = {
    år: 2100,
    måned: 5,
    dag: 29,
};

describe('Sammenligning av datoer', () => {
    it('er neste måned eller senere', () => {
        const valgtDato: DagMånedÅr = {
            år: 2100,
            måned: 6,
            dag: 1,
        };
        expect(valgtDatoErNesteMånedEllerSenere(valgtDato, today)).toBeTruthy();
    });
    it('er ikke neste måned eller senere', () => {
        const valgtDato: DagMånedÅr = {
            år: 2100,
            måned: 4,
            dag: 1,
        };
        expect(valgtDatoErNesteMånedEllerSenere(valgtDato, today)).toBeFalsy();
    });
});
