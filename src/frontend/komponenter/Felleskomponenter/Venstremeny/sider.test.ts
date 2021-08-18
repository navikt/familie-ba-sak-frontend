import { BehandlingÅrsak } from '../../../typer/behandling';
import { mockBehandling } from '../../../utils/test/behandling/behandling.mock';
import { SideId, siderForBehandling } from './sider';

// TODO: Flytt sider.ts til behandling
describe('sider.ts', () => {
    //erSidenAktiv

    //siderForBehandling
    describe('siderForBehandling', () => {
        test('REGISTRERE_SØKNAD returneres ved årsak SØKNAD', () => {
            const behandling = mockBehandling({ årsak: BehandlingÅrsak.SØKNAD });
            expect(Object.keys(siderForBehandling(behandling))).toContain(SideId.REGISTRERE_SØKNAD);
        });
        test('FILTRERING_FØDSELSHENDELSER returneres ved årsak FØDSELSHENDELSE', () => {
            const behandling = mockBehandling({ årsak: BehandlingÅrsak.FØDSELSHENDELSE });
            expect(Object.keys(siderForBehandling(behandling))).toContain(
                SideId.FILTRERING_FØDSELSHENDELSER
            );
        });
        test('SIMULERING returneres ikke ved automatisk behandling', () => {
            const behandling = mockBehandling({ skalBehandlesAutomatisk: true });
            expect(Object.keys(siderForBehandling(behandling))).not.toContain(SideId.SIMULERING);
        });
        test('VEDTAK returneres ikke ved årsak SATSENDRING', () => {
            const behandling = mockBehandling({ årsak: BehandlingÅrsak.SATSENDRING });
            expect(Object.keys(siderForBehandling(behandling))).not.toContain(SideId.VEDTAK);
        });
        test('Standard revurdering uten søknad viser alle sider bortsett fra FILTRERING_FØDSELSHENDELSER og REGISTRERE_SØKNAD', () => {
            const behandling = mockBehandling({ årsak: BehandlingÅrsak.NYE_OPPLYSNINGER });
            expect(Object.keys(siderForBehandling(behandling))).toEqual(
                Object.values(SideId).filter(
                    side =>
                        side !== SideId.FILTRERING_FØDSELSHENDELSER &&
                        side !== SideId.REGISTRERE_SØKNAD
                )
            );
        });
    });

    //finnSideForBehandlingssteg
    //erViPåUdefinertFagsakSide
    //erViPåUlovligSteg
    // generell test som trigges ved endring av sider?
});
