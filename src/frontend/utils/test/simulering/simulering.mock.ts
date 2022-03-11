import type { ISimuleringPeriode } from '../../../typer/simulering';

interface IMockSimuleringPeriode {
    fom?: string;
    tom?: string;
}

export const mockSimuleringPeriode = ({
    fom = '2020-01-01',
    tom = '',
}: IMockSimuleringPeriode = {}): ISimuleringPeriode => {
    return {
        fom,
        tom,
        forfallsdato: '',
        nyttBeløp: 1054,
        tidligereUtbetalt: 0,
        resultat: 1054,
    };
};
