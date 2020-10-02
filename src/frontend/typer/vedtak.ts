import { IPersonBeregning } from './beregning';
import { INøkkelPar } from './common';
import { BehandlingResultat } from './behandling';

export interface IVedtakForBehandling {
    aktiv: boolean;
    personBeregninger: IPersonBeregning[];
    utbetalingBegrunnelser: IRestUtbetalingBegrunnelse[];
    vedtaksdato: string;
    id: number;
    begrunnelse: Begrunnelse;
}

export interface IRestUtbetalingBegrunnelse {
    id?: number;
    fom: string;
    tom?: string;
    resultat?: BehandlingResultat;
    behandlingresultatOgVilkårBegrunnelse?: BehandlingresultatOgVilkårBegrunnelse;
}

export interface IRestPutUtbetalingBegrunnelse {
    resultat?: BehandlingResultat;
    behandlingresultatOgVilkårBegrunnelse?: BehandlingresultatOgVilkårBegrunnelse;
}

export interface IRestVedtakBegrunnelse {
    id: BehandlingresultatOgVilkårBegrunnelse;
    navn: string;
}

export enum Begrunnelse {
    INNVILGELSE = 'INNVILGELSE',
    REDUKSJON = 'REDUKSJON',
}

export enum BehandlingresultatOgVilkårBegrunnelse {
    INNVILGET_BOSATT_I_RIKTET = 'INNVILGET_BOSATT_I_RIKTET',
    INNVILGET_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE = 'INNVILGET_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE',
    INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER = 'INNVILGET_LOVLIG_OPPHOLD_EØS_BORGER',
    INNVILGET_LOVLIG_OPPHOLD_AAREG = 'INNVILGET_LOVLIG_OPPHOLD_AAREG',
    INNVILGET_OMSORG_FOR_BARN = 'INNVILGET_OMSORG_FOR_BARN',
    INNVILGET_BOR_HOS_SØKER = 'INNVILGET_BOR_HOS_SØKER',
    INNVILGET_FAST_OMSORG_FOR_BARN = 'INNVILGET_FAST_OMSORG_FOR_BARN',
    SATSENDRING = 'SATSENDRING',
}

export const bergunnelseTyper: INøkkelPar = {
    INNVILGELSE: { id: 'INNVILGELSE', navn: 'Innvilgelse' },
    REDUKSJON: { id: 'REDUKSJON', navn: 'Reduksjon' },
};
