import { IPersonBeregning } from './beregning';

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    personBeregninger: IPersonBeregning[];
    stønadBrevMetadata?: IStønadBrevMetadata;
    vedtaksdato: string;
    id: number;
}

export interface IStønadBrevMetadata {
    begrunnelser: {
        [key: string]: string;
    };
}
