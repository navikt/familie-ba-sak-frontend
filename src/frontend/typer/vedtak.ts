import { IPersonBeregning } from './beregning';
import { INøkkelPar } from './common';

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    personBeregninger: IPersonBeregning[];
    stønadBrevMetadata?: IStønadBrevMetadata;
    vedtaksdato: string;
    id: number;
    begrunnelse: Begrunnelse;
}

export interface IStønadBrevMetadata {
    begrunnelser: {
        [key: string]: string;
    };
}

export enum Begrunnelse {
    INNVILGELSE = 'INNVILGELSE',
    REDUKSJON = 'REDUKSJON',
}

export const bergunnelseTyper: INøkkelPar = {
    INNVILGELSE: { id: 'INNVILGELSE', navn: 'Innvilgelse' },
    REDUKSJON: { id: 'REDUKSJON', navn: 'Reduksjon' },
};
