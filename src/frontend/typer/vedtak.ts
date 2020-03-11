import { IPersonBeregning } from './behandle';

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    personBeregninger: IPersonBeregning[];
    vedtaksdato: string;
    id: number;
}
