import { Regelverk, VilkårType } from '../typer/vilkår';

export const erIkkeGenereltVilkår = (vilkårType: VilkårType): boolean =>
    [
        VilkårType.BOR_MED_SØKER,
        VilkårType.BOSATT_I_RIKET,
        VilkårType.LOVLIG_OPPHOLD,
        VilkårType.UTVIDET_BARNETRYGD,
    ].includes(vilkårType);

export const alleRegelverk: Record<Regelverk, string> = {
    [Regelverk.NASJONALE_REGLER]: 'Nasjonale regler',
    [Regelverk.EØS_FORORDNINGEN]: 'Eøs forordningen',
};
