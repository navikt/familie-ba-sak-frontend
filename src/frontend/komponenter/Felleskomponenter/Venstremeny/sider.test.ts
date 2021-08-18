import { BehandlingSteg, BehandlingÅrsak } from '../../../typer/behandling';
import { mockBehandling } from '../../../utils/test/behandling/behandling.mock';
import { finnSideForBehandlingssteg, ISide, SideId, sider, siderForBehandling } from './sider';

// TODO: Flytt sider.ts til behandling
describe('sider.ts', () => {
    //erSidenAktiv

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

    describe('finnSideForBehandlingssteg', () => {
        // TODO: Er dette korrekt? Siden simulering returneres aldri.
        describe('Korrekte sider returneres for gitt steg', () => {
            const sideForSteg = (side: ISide | undefined, steg: BehandlingSteg) =>
                expect(finnSideForBehandlingssteg(mockBehandling({ steg: steg }))).toEqual(side);
            sideForSteg(undefined, BehandlingSteg.HENLEGG_BEHANDLING);
            sideForSteg(sider.REGISTRERE_SØKNAD, BehandlingSteg.REGISTRERE_SØKNAD);
            sideForSteg(undefined, BehandlingSteg.REGISTRERE_PERSONGRUNNLAG);
            sideForSteg(
                sider.FILTRERING_FØDSELSHENDELSER,
                BehandlingSteg.FILTRERING_FØDSELSHENDELSER
            );
            sideForSteg(sider.VILKÅRSVURDERING, BehandlingSteg.VILKÅRSVURDERING);
            sideForSteg(sider.BEHANDLINGRESULTAT, BehandlingSteg.VURDER_TILBAKEKREVING);
            sideForSteg(sider.VEDTAK, BehandlingSteg.SEND_TIL_BESLUTTER);
            sideForSteg(sider.VEDTAK, BehandlingSteg.BESLUTTE_VEDTAK);
            sideForSteg(sider.VEDTAK, BehandlingSteg.IVERKSETT_MOT_OPPDRAG);
            sideForSteg(sider.VEDTAK, BehandlingSteg.VENTE_PÅ_STATUS_FRA_ØKONOMI);
            sideForSteg(sider.VEDTAK, BehandlingSteg.JOURNALFØR_VEDTAKSBREV);
            sideForSteg(sider.VEDTAK, BehandlingSteg.DISTRIBUER_VEDTAKSBREV);
            sideForSteg(sider.VEDTAK, BehandlingSteg.FERDIGSTILLE_BEHANDLING);
            sideForSteg(sider.VEDTAK, BehandlingSteg.BEHANDLING_AVSLUTTET);
        });

        test('Legg til/fjern sjekk for tilhørende side ved endring', () => {
            const steg = [
                BehandlingSteg.HENLEGG_BEHANDLING,
                BehandlingSteg.REGISTRERE_SØKNAD,
                BehandlingSteg.REGISTRERE_PERSONGRUNNLAG,
                BehandlingSteg.FILTRERING_FØDSELSHENDELSER,
                BehandlingSteg.VILKÅRSVURDERING,
                BehandlingSteg.VURDER_TILBAKEKREVING,
                BehandlingSteg.SEND_TIL_BESLUTTER,
                BehandlingSteg.BESLUTTE_VEDTAK,
                BehandlingSteg.IVERKSETT_MOT_OPPDRAG,
                BehandlingSteg.VENTE_PÅ_STATUS_FRA_ØKONOMI,
                BehandlingSteg.JOURNALFØR_VEDTAKSBREV,
                BehandlingSteg.DISTRIBUER_VEDTAKSBREV,
                BehandlingSteg.FERDIGSTILLE_BEHANDLING,
                BehandlingSteg.BEHANDLING_AVSLUTTET,
            ];
            expect(Object.values(BehandlingSteg)).toEqual(steg);
        });
    });

    //erViPåUdefinertFagsakSide
    //erViPåUlovligSteg
    // generell test som trigges ved endring av sider?
});
