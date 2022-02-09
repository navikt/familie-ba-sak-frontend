import { Behandlingstype, BehandlingÅrsak } from '../../typer/behandling';

export const erBehandlingstypeOgÅrsakLovSammen = (
    behandlingType: Behandlingstype,
    behandlingÅrsak: BehandlingÅrsak
): boolean => gyldigeÅrsaker[behandlingType].includes(behandlingÅrsak);

const gyldigeÅrsaker: Record<Behandlingstype, BehandlingÅrsak[]> = {
    FØRSTEGANGSBEHANDLING: [],
    REVURDERING: [
        BehandlingÅrsak.SØKNAD,
        BehandlingÅrsak.ÅRLIG_KONTROLL,
        BehandlingÅrsak.DØDSFALL_BRUKER,
        BehandlingÅrsak.NYE_OPPLYSNINGER,
        BehandlingÅrsak.KLAGE,
        BehandlingÅrsak.KORREKSJON_VEDTAKSBREV,
        BehandlingÅrsak.SMÅBARNSTILLEGG,
        BehandlingÅrsak.OMREGNING_SMÅBARNSTILLEGG,
    ],
    TEKNISK_ENDRING: [],
    TEKNISK_OPPHØR: [],
    MIGRERING_FRA_INFOTRYGD: [
        BehandlingÅrsak.HELMANUELL_MIGRERING,
        BehandlingÅrsak.ENDRE_MIGRERINGSDATO,
    ],
};
