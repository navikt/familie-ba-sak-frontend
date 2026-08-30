import type { ISimuleringDTO, ISimuleringPeriode } from '@typer/simulering';

export function lagSimuleringPeriode(periode: Partial<ISimuleringPeriode> = {}): ISimuleringPeriode {
    return {
        fom: '2020-01-01',
        tom: '',
        forfallsdato: '',
        nyttBeløp: 1054,
        tidligereUtbetalt: 0,
        resultat: 1054,
        ...periode,
    };
}

export function lagSimulering(simulering: Partial<ISimuleringDTO> = {}): ISimuleringDTO {
    return {
        perioder: [],
        fomDatoNestePeriode: undefined,
        etterbetaling: 0,
        feilutbetaling: 0,
        fom: '2020-01-01',
        tidSimuleringHentet: undefined,
        tomDatoNestePeriode: undefined,
        tomSisteUtbetaling: undefined,
        avregningsperioder: [],
        overlappendePerioderMedAndreFagsaker: [],
        ...simulering,
    };
}

export * as SimuleringTestdata from './simuleringTestdata';
