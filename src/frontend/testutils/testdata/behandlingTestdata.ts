import type { VisningBehandling } from '../../sider/Fagsak/Saksoversikt/visningBehandling';
import { BehandlingResultat, BehandlingStatus, Behandlingstype, BehandlingÅrsak } from '../../typer/behandling';
import { BehandlingKategori, BehandlingUnderkategori } from '../../typer/behandlingstema';

export function lagVisningBehandling(visningBehandling?: Partial<VisningBehandling>): VisningBehandling {
    return {
        behandlingId: 1,
        opprettetTidspunkt: '2025-10-22T12:00:00.00',
        aktivertTidspunkt: '2025-10-22T12:00:00.00',
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        aktiv: true,
        årsak: BehandlingÅrsak.SØKNAD,
        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
        status: BehandlingStatus.AVSLUTTET,
        resultat: BehandlingResultat.INNVILGET,
        ...visningBehandling,
    };
}

export * as BehandlingTestdata from './behandlingTestdata';
