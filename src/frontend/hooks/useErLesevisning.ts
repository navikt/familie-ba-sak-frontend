import { useErViPåUgyldigSideForBehandling } from '@hooks/useErViPåUgyldigSideForBehandling';
import { BehandlingStatus, BehandlingSteg, BehandlingÅrsak, hentStegnummer } from '@typer/behandling';
import { harTilgangTilEnhet } from '@typer/enhet';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '@utils/behandling';

import { useBehandling } from './useBehandling';
import { useErLesevisningFagsak } from './useErLesevisningFagsak';
import { useSaksbehandler } from './useSaksbehandler';

const ÅRSAKER_ÅPEN_FOR_ALLE = new Set([BehandlingÅrsak.TEKNISK_ENDRING]);

interface Parameters {
    sjekkTilgangTilEnhet?: boolean;
    skalIgnorereOmEnhetErMidlertidig?: boolean;
}

export function useErLesevisning({
    sjekkTilgangTilEnhet = true,
    skalIgnorereOmEnhetErMidlertidig = false,
}: Parameters = {}) {
    const saksbehandler = useSaksbehandler();
    const behandling = useBehandling();
    const erLesevisningFagsak = useErLesevisningFagsak();
    const erViPåUgyldigSideForBehandling = useErViPåUgyldigSideForBehandling(behandling);

    if (erLesevisningFagsak) {
        return true;
    }

    if (erViPåUgyldigSideForBehandling) {
        return true;
    }

    const behandlendeEnhetId = behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId;
    const erBehandlingenAvsluttet = behandling.status === BehandlingStatus.AVSLUTTET;
    const erBehandlingenPåVent = behandling.status === BehandlingStatus.SATT_PÅ_VENT;
    const erBehandlingenPåMaskinellVent = behandling.status === BehandlingStatus.SATT_PÅ_MASKINELL_VENT;
    const erBehandleneEnhetMidlertidig = behandlendeEnhetId === MIDLERTIDIG_BEHANDLENDE_ENHET_ID;
    const harAlleTilgangTilBehandlingen = ÅRSAKER_ÅPEN_FOR_ALLE.has(behandling.årsak);
    const harSaksbehandlerTilgangTilEnhet = harTilgangTilEnhet(behandlendeEnhetId, saksbehandler.groups);
    const erEtterBeslutteVedtak = hentStegnummer(behandling.steg) >= hentStegnummer(BehandlingSteg.BESLUTTE_VEDTAK);

    if (erBehandlingenAvsluttet) {
        return true;
    }

    if (erBehandlingenPåVent || erBehandlingenPåMaskinellVent) {
        return true;
    }

    if (erBehandleneEnhetMidlertidig && !skalIgnorereOmEnhetErMidlertidig) {
        return true;
    }

    if (
        sjekkTilgangTilEnhet &&
        !saksbehandler.harSuperbrukertilgang &&
        !harAlleTilgangTilBehandlingen &&
        !harSaksbehandlerTilgangTilEnhet
    ) {
        return true;
    }

    return erEtterBeslutteVedtak;
}
