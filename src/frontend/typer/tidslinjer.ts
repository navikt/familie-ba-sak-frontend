import type { Regelverk, Resultat, VilkårType } from './vilkår';

export interface ITidslinjer {
    barnasTidslinjer: Record<string, IRestTidslinjerForBarn>;
    søkersTidslinjer: IRestTidslinjerForSøker;
}

export interface IRestTidslinjerForBarn {
    vilkårTidslinjer: IRestVilkårRegelverkResultatTidslinjePeriode[][];
    oppfyllerEgneVilkårIKombinasjonMedSøkerTidslinje: IRestResultatTidslinjePeriode[];
    regelverkTidslinje: IRestRegelverkTidslinjePeriode[];
}

export interface IRestTidslinjerForSøker {
    vilkårTidslinjer: IRestVilkårRegelverkResultatTidslinjePeriode[][];
    oppfyllerEgneVilkårTidslinje: IRestResultatTidslinjePeriode[];
}

export interface IRestVilkårRegelverkResultatTidslinjePeriode {
    fraOgMed: string;
    tilOgMed: string;
    innhold: IVilkårRegelverkResultat;
}

export interface IRestResultatTidslinjePeriode {
    fraOgMed: string;
    tilOgMed: string;
    innhold: Resultat;
}

export interface IVilkårRegelverkResultat {
    vilkår: VilkårType;
    regelverk: Regelverk;
    resultat: Resultat;
}

export interface IRestRegelverkTidslinjePeriode {
    fraOgMed: string;
    tilOgMed: string;
    innhold: Regelverk;
}
