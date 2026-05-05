import { useBehandling } from './useBehandling';
import { useFagsak } from './useFagsak';
import { useSaksbehandler } from './useSaksbehandler';
import { BehandlingStatus, BehandlingSteg, BehandlingÅrsak, hentStegNummer } from '../typer/behandling';
import { harTilgangTilEnhet } from '../typer/enhet';
import { FagsakStatus } from '../typer/fagsak';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '../utils/behandling';

const ÅRSAKER_ÅPEN_FOR_ALLE = new Set([BehandlingÅrsak.TEKNISK_ENDRING, BehandlingÅrsak.KORREKSJON_VEDTAKSBREV]);

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
    const fagsak = useFagsak();

    if (fagsak.status === FagsakStatus.LÅST) {
        return true;
    }

    const behandlendeEnhetId = behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId;
    const erBehandlingenAvsluttet = behandling.status === BehandlingStatus.AVSLUTTET;
    const erBehandlingenPåVent = behandling.status === BehandlingStatus.SATT_PÅ_VENT;
    const erBehandlingenPåMaskinellVent = behandling.status === BehandlingStatus.SATT_PÅ_MASKINELL_VENT;
    const erBehandleneEnhetMidlertidig = behandlendeEnhetId === MIDLERTIDIG_BEHANDLENDE_ENHET_ID;
    const harAlleTilgangTilBehandlingen = ÅRSAKER_ÅPEN_FOR_ALLE.has(behandling.årsak);
    const harSaksbehandlerTilgangTilEnhet = harTilgangTilEnhet(behandlendeEnhetId, saksbehandler.groups);
    const erEtterBeslutteVedtak = hentStegNummer(behandling.steg) >= hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

    if (erBehandlingenAvsluttet) {
        return true;
    }

    if (erBehandlingenPåVent || erBehandlingenPåMaskinellVent) {
        return true;
    }

    if (erBehandleneEnhetMidlertidig && !skalIgnorereOmEnhetErMidlertidig) {
        return true;
    }

    if (!saksbehandler.harSkrivetilgang) {
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
