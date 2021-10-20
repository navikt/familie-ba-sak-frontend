import { Regelverk, VilkårType } from '../typer/vilkår';

export const tilRegelverkVerdi = (value: string): Regelverk | null => {
    switch (value) {
        case Regelverk.NASJONALE_REGLER:
            return Regelverk.NASJONALE_REGLER;
        case Regelverk.EØS_FORORDNINGEN:
            return Regelverk.EØS_FORORDNINGEN;
        default:
            return null;
    }
};

export const erIkkeGenereltVilkår = (vilkårType: VilkårType): boolean => {
    switch (vilkårType) {
        case VilkårType.BOR_MED_SØKER:
            return true;
        case VilkårType.BOSATT_I_RIKET:
            return true;
        case VilkårType.LOVLIG_OPPHOLD:
            return true;
        case VilkårType.UTVIDET_BARNETRYGD:
            return true;
        default:
            return false;
    }
};
