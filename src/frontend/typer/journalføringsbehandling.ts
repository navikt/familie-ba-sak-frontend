import type { BehandlingStatus } from './behandling';
import { Behandlingstype, type BehandlingÅrsak } from './behandling';
import type { KlageStatus, IKlagebehandling } from './klage';
import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import type { IsoDatoString } from '../utils/dato';

export type Journalføringsbehandling = {
    id: string;
    opprettetTidspunkt: IsoDatoString;
    årsak?: BehandlingÅrsak;
    type: Behandlingstype;
    status: BehandlingStatus | KlageStatus;
};

export function opprettJournalføringsbehandlingFraKlagebehandling(
    klagebehandling: IKlagebehandling
): Journalføringsbehandling {
    return {
        id: klagebehandling.id,
        opprettetTidspunkt: klagebehandling.opprettet,
        type: Behandlingstype.KLAGE,
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
