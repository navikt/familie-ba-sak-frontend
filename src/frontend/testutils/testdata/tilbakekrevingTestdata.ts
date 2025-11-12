import {
    Behandlingsresultatstype,
    Behandlingsstatus,
    type ITilbakekrevingsbehandling,
    Tilbakekrevingsbehandlingstype,
    TilbakekrevingsbehandlingÅrsak,
} from '../../typer/tilbakekrevingsbehandling';
import { randomUUID } from '../../utils/commons';

export function lagTilbakekrevingbehandling(
    tilbakekrevingsbehandling?: Partial<ITilbakekrevingsbehandling>
): ITilbakekrevingsbehandling {
    return {
        behandlingId: randomUUID(),
        opprettetTidspunkt: '2025-09-29T15:00:00.00',
        aktiv: true,
        årsak: TilbakekrevingsbehandlingÅrsak.REVURDERING_KLAGE_KA,
        type: Tilbakekrevingsbehandlingstype.REVURDERING_TILBAKEKREVING,
        status: Behandlingsstatus.AVSLUTTET,
        resultat: Behandlingsresultatstype.DELVIS_TILBAKEBETALING,
        vedtaksdato: '2025-09-30T15:00:00.00',
        ...tilbakekrevingsbehandling,
    };
}

export * as TilbakekrevingTestdata from './tilbakekrevingTestdata';
