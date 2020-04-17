import { IPersonBeregning } from './beregning';

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    personBeregninger: IPersonBeregning[];
    vedtaksdato: string;
    id: number;
}
