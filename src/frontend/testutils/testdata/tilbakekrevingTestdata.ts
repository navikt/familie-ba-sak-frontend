import { type ITilbakekreving, Tilbakekrevingsvalg } from '@typer/simulering';

import {
    Behandlingsresultatstype,
    Behandlingsstatus,
    type ITilbakekrevingsbehandling,
    Tilbakekrevingsbehandlingstype,
    TilbakekrevingsbehandlingÅrsak,
} from '../../typer/tilbakekrevingsbehandling';

export function lagTilbakekrevingbehandling(
    tilbakekrevingsbehandling?: Partial<ITilbakekrevingsbehandling>
): ITilbakekrevingsbehandling {
    return {
        behandlingId: crypto.randomUUID(),
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

export function lagTilbakekreving(tilbakekreving?: Partial<ITilbakekreving>): ITilbakekreving {
    return {
        vedtakId: 1,
        valg: Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL,
        begrunnelse: 'Begrunnelse for tilbakekreving',
        ...tilbakekreving,
    };
}

export * as TilbakekrevingTestdata from './tilbakekrevingTestdata';
