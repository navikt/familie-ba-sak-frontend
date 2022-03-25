import type { Regelverk, Resultat, VilkårType } from './vilkår';

export interface ITidslinjer {
    barnasTidslinjer: Record<string, IRestTidslinjerForBarn>;
    søkersTidslinjer: IRestTidslinjerForSøker;
}

export interface IRestTidslinjerForBarn {
    vilkårTidslinjer: IRestTidslinjePeriode<IVilkårRegelverkResultat>[][];
    oppfyllerEgneVilkårIKombinasjonMedSøkerTidslinje: IRestTidslinjePeriode<Resultat>[];
    regelverkTidslinje: IRestTidslinjePeriode<Regelverk | undefined>[];
}

export interface IRestTidslinjerForSøker {
    vilkårTidslinjer: IRestTidslinjePeriode<IVilkårRegelverkResultat>[][];
    oppfyllerEgneVilkårTidslinje: IRestTidslinjePeriode<Resultat>[];
}

export interface IVilkårRegelverkResultat {
    vilkår: VilkårType;
    regelverk: Regelverk;
    resultat: Resultat;
}

export interface IRestTidslinjePeriode<T> {
    fraOgMed: string;
    tilOgMed: string;
    innhold: T;
}
