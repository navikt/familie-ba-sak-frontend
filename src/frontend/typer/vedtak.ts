import { IPersonBeregning } from './beregning';
import { INøkkelPar } from './common';

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    personBeregninger: IPersonBeregning[];
    stønadBrevBegrunnelser?: IRestStønadBrevBegrunnelse[];
    vedtaksdato: string;
    id: number;
    begrunnelse: Begrunnelse;
}

export interface IRestStønadBrevBegrunnelse {
    id?: number;
    fom: string;
    tom: string;
    begrunnelse: string;
    årsak: string;
}

export enum Begrunnelse {
    INNVILGELSE = 'INNVILGELSE',
    REDUKSJON = 'REDUKSJON',
}

export const bergunnelseTyper: INøkkelPar = {
    INNVILGELSE: { id: 'INNVILGELSE', navn: 'Innvilgelse' },
    REDUKSJON: { id: 'REDUKSJON', navn: 'Reduksjon' },
};
