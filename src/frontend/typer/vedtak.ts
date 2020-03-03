import { IBarnBeregning } from './behandle';

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    barnasBeregning: IBarnBeregning[];
    vedtaksdato: string;
}
