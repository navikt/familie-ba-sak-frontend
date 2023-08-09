import type { ReactNode } from 'react';
import React from 'react';

import { StarsEuIcon, FlagCrossIcon } from '@navikt/aksel-icons';

import { Regelverk, VilkårType } from '../typer/vilkår';

export const erIkkeGenereltVilkår = (vilkårType: VilkårType): boolean =>
    [
        VilkårType.BOR_MED_SØKER,
        VilkårType.BOSATT_I_RIKET,
        VilkårType.LOVLIG_OPPHOLD,
        VilkårType.UTVIDET_BARNETRYGD,
    ].includes(vilkårType);

export const alleRegelverk: Record<Regelverk, { tekst: string; symbol: ReactNode }> = {
    [Regelverk.NASJONALE_REGLER]: {
        tekst: 'Nasjonale regler',
        symbol: <FlagCrossIcon width={24} height={24} viewBox={'0 0 24 24'} />,
    },
    [Regelverk.EØS_FORORDNINGEN]: {
        tekst: 'EØS-forordningen',
        symbol: <StarsEuIcon width={24} height={24} viewBox={'0 0 24 24'} />,
    },
};
