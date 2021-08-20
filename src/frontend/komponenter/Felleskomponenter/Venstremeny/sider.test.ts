import { BehandlingÅrsak } from '../../../typer/behandling';
import { mockBehandling } from '../../../utils/test/behandling/behandling.mock';
import { SideId, hentTrinnForBehandling } from './sider';

describe('sider.ts', () => {
    describe('siderForBehandling', () => {
        test('REGISTRERE_SØKNAD returneres ved årsak SØKNAD', () => {
            const behandling = mockBehandling({ årsak: BehandlingÅrsak.SØKNAD });
            expect(Object.keys(hentTrinnForBehandling(behandling))).toContain(
                SideId.REGISTRERE_SØKNAD
            );
        });
        test('FILTRERING_FØDSELSHENDELSER returneres ved årsak FØDSELSHENDELSE', () => {
            const behandling = mockBehandling({ årsak: BehandlingÅrsak.FØDSELSHENDELSE });
            expect(Object.keys(hentTrinnForBehandling(behandling))).toContain(
                SideId.FILTRERING_FØDSELSHENDELSER
            );
        });
        test('SIMULERING returneres ikke ved automatisk behandling', () => {
            const behandling = mockBehandling({ skalBehandlesAutomatisk: true });
            expect(Object.keys(hentTrinnForBehandling(behandling))).not.toContain(
                SideId.SIMULERING
            );
        });
        test('VEDTAK returneres ikke ved årsak SATSENDRING', () => {
            const behandling = mockBehandling({ årsak: BehandlingÅrsak.SATSENDRING });
            expect(Object.keys(hentTrinnForBehandling(behandling))).not.toContain(SideId.VEDTAK);
        });
        test('Standard revurdering uten søknad viser alle sider bortsett fra FILTRERING_FØDSELSHENDELSER og REGISTRERE_SØKNAD', () => {
            const behandling = mockBehandling({ årsak: BehandlingÅrsak.NYE_OPPLYSNINGER });
            expect(Object.keys(hentTrinnForBehandling(behandling))).toEqual(
                Object.values(SideId).filter(
                    side =>
                        side !== SideId.FILTRERING_FØDSELSHENDELSER &&
                        side !== SideId.REGISTRERE_SØKNAD
                )
            );
        });
    });

    describe('Sjekk ved endring av sider', () => {
        test('Oppdater siderForBehandling-tester ved nye/fjernede sider', () => {
            const sider = [
                SideId.REGISTRERE_SØKNAD,
                SideId.FILTRERING_FØDSELSHENDELSER,
                SideId.VILKÅRSVURDERING,
                SideId.BEHANDLINGRESULTAT,
                SideId.SIMULERING,
                SideId.VEDTAK,
            ];
            expect(Object.values(SideId)).toEqual(sider);
        });
    });
});
