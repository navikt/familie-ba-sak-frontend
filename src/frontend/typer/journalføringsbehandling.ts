import {
    type BehandlingStatus,
    type Behandlingstype,
    type BehandlingÅrsak,
    behandlingÅrsak,
} from './behandling';
import { Klagebehandlingstype, type KlageStatus, type KlageÅrsak } from './klage';
import { type IKlagebehandling } from './klage';
import type { VisningBehandling } from '../sider/fagsak/Saksoversikt/visningBehandling';
import type { IsoDatoString } from '../utils/dato';

export type Journalføringsbehandlingstype = Behandlingstype | Klagebehandlingstype;

export type Journalføringsbehandlingsstatus = BehandlingStatus | KlageStatus;

export type Journalføringsbehandlingsårsak = BehandlingÅrsak | KlageÅrsak;

export type Journalføringsbehandling = {
    id: string;
    opprettetTidspunkt: IsoDatoString;
    årsak?: Journalføringsbehandlingsårsak;
    type: Journalføringsbehandlingstype;
    status: Journalføringsbehandlingsstatus;
};

export function finnVisningstekstForJournalføringsbehandlingsårsak(
    journalføringsbehandlingsårsak?: Journalføringsbehandlingsårsak
) {
    if (!journalføringsbehandlingsårsak) {
        return '-';
    }
    return behandlingÅrsak[journalføringsbehandlingsårsak];
}

export function opprettJournalføringsbehandlingFraKlagebehandling(
    klagebehandling: IKlagebehandling
): Journalføringsbehandling {
    return {
        id: klagebehandling.id,
        opprettetTidspunkt: klagebehandling.opprettet,
        type: Klagebehandlingstype.KLAGE,
        årsak: klagebehandling.årsak,
        status: klagebehandling.status,
    };
}

export function opprettJournalføringsbehandlingFraBarnetrygdbehandling(
    barnetrygdbehandling: VisningBehandling
): Journalføringsbehandling {
    return {
        id: barnetrygdbehandling.behandlingId.toString(),
        opprettetTidspunkt: barnetrygdbehandling.opprettetTidspunkt,
        årsak: barnetrygdbehandling.årsak,
        type: barnetrygdbehandling.type,
        status: barnetrygdbehandling.status,
    };
}
