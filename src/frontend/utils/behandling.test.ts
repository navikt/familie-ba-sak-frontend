import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';

import { erBehandlingMedVedtaksbrevutsending, hentTilgjengeligeBehandlingsårsaker } from './behandling';

describe('hentTilgjengeligeBehandlingsårsaker', () => {
    test('skal ikke inneholde automatiske behandlingsårsaker ved vanlig revurdering', () => {
        const tilgjengeligeÅrsaker = hentTilgjengeligeBehandlingsårsaker(false, false, false);

        expect(tilgjengeligeÅrsaker).not.toContain(BehandlingÅrsak.SATSENDRING);
        expect(tilgjengeligeÅrsaker).not.toContain(BehandlingÅrsak.SATSENDRING_EØS);
        expect(tilgjengeligeÅrsaker).not.toContain(BehandlingÅrsak.MIGRERING);
        expect(tilgjengeligeÅrsaker).not.toContain(BehandlingÅrsak.ENDRE_MIGRERINGSDATO);
        expect(tilgjengeligeÅrsaker).not.toContain(BehandlingÅrsak.HELMANUELL_MIGRERING);
    });

    test('skal inneholde manuelle behandlingsårsaker ved vanlig revurdering', () => {
        const tilgjengeligeÅrsaker = hentTilgjengeligeBehandlingsårsaker(false, false, false);

        expect(tilgjengeligeÅrsaker).toContain(BehandlingÅrsak.SØKNAD);
        expect(tilgjengeligeÅrsaker).toContain(BehandlingÅrsak.ÅRLIG_KONTROLL);
        expect(tilgjengeligeÅrsaker).toContain(BehandlingÅrsak.DØDSFALL_BRUKER);
        expect(tilgjengeligeÅrsaker).toContain(BehandlingÅrsak.NYE_OPPLYSNINGER);
        expect(tilgjengeligeÅrsaker).toContain(BehandlingÅrsak.SMÅBARNSTILLEGG);
        expect(tilgjengeligeÅrsaker).toContain(BehandlingÅrsak.SMÅBARNSTILLEGG_ENDRING_FRAM_I_TID);
        expect(tilgjengeligeÅrsaker).toContain(BehandlingÅrsak.IVERKSETTE_KA_VEDTAK);
        expect(tilgjengeligeÅrsaker).toContain(BehandlingÅrsak.FALSK_IDENTITET);
    });

    test('skal kun inneholde helmanuell migrering når det er tillatt ved migrering fra Infotrygd', () => {
        const tilgjengeligeÅrsaker = hentTilgjengeligeBehandlingsårsaker(true, true, false);

        expect(tilgjengeligeÅrsaker).toEqual([BehandlingÅrsak.HELMANUELL_MIGRERING]);
    });

    test('skal kun inneholde endre migreringsdato når det er tillatt ved migrering fra Infotrygd', () => {
        const tilgjengeligeÅrsaker = hentTilgjengeligeBehandlingsårsaker(true, false, true);

        expect(tilgjengeligeÅrsaker).toEqual([BehandlingÅrsak.ENDRE_MIGRERINGSDATO]);
    });

    test('skal være tom liste ved migrering fra Infotrygd når ingen av migreringsalternativene er tillatt', () => {
        const tilgjengeligeÅrsaker = hentTilgjengeligeBehandlingsårsaker(true, false, false);

        expect(tilgjengeligeÅrsaker).toEqual([]);
    });
});

describe('erBehandlingMedVedtaksbrevutsending', () => {
    test('skal returnere true for satsendring EØS', () => {
        const behandling = lagBehandling({
            type: Behandlingstype.REVURDERING,
            årsak: BehandlingÅrsak.SATSENDRING_EØS,
        });

        expect(erBehandlingMedVedtaksbrevutsending(behandling)).toBe(true);
    });

    test('skal returnere false for satsendring', () => {
        const behandling = lagBehandling({
            type: Behandlingstype.REVURDERING,
            årsak: BehandlingÅrsak.SATSENDRING,
        });

        expect(erBehandlingMedVedtaksbrevutsending(behandling)).toBe(false);
    });

    test('skal returnere true for søknad', () => {
        const behandling = lagBehandling({
            type: Behandlingstype.FØRSTEGANGSBEHANDLING,
            årsak: BehandlingÅrsak.SØKNAD,
        });

        expect(erBehandlingMedVedtaksbrevutsending(behandling)).toBe(true);
    });
});
