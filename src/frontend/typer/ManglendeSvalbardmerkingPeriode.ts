export interface ManglendeSvalbardmerking {
    ident: string;
    manglendeSvalbardmerkingPerioder: ManglendeSvalbardmerkingPeriode[];
}

export interface ManglendeSvalbardmerkingPeriode {
    fom?: string;
    tom?: string;
}
