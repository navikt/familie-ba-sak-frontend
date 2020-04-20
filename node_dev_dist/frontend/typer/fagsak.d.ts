import { IBehandling } from './behandling';
import { INøkkelPar } from './common';
export declare enum FagsakStatus {
    OPPRETTET = "OPPRETTET",
    LØPENDE = "L\u00D8PENDE"
}
export interface IFagsak {
    behandlinger: IBehandling[];
    id: number;
    opprettetTidspunkt: string;
    saksnummer: string;
    status: FagsakStatus;
    søkerFødselsnummer: string;
}
export declare const fagsakStatus: INøkkelPar;
