import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { BehandlingSteg, BehandlingStegStatus, BehandlingÅrsak } from '@typer/behandling';

import {
    erViPåUdefinertFagsakSide,
    erViPåUlovligSteg,
    finnSideForBehandlingssteg,
    finnSiderForBehandling,
    SideId,
    sider,
} from './sider';

describe('Sider', () => {
    describe('FinnSiderForBehandling', () => {
        test('skal returnere forventede sider for en ordinær søknadsbehandling', () => {
            const sideIder = finnSiderForBehandling(lagBehandling()).map(side => side.id);

            expect(sideIder).toEqual([
                SideId.REGISTRERE_SØKNAD,
                SideId.VILKÅRSVURDERING,
                SideId.BEHANDLINGRESULTAT,
                SideId.SIMULERING,
                SideId.VEDTAK,
            ]);
        });

        test('skal vise info om institusjon når stegtilstanden inneholder REGISTRERE_INSTITUSJON', () => {
            const behandling = lagBehandling({
                stegTilstand: [
                    {
                        behandlingSteg: BehandlingSteg.REGISTRERE_INSTITUSJON,
                        behandlingStegStatus: BehandlingStegStatus.IKKE_UTFØRT,
                    },
                ],
            });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.REGISTRER_INSTITUSJON);
        });

        test('skal ikke vise info om institusjon når stegtilstanden ikke inneholder REGISTRERE_INSTITUSJON', () => {
            const behandling = lagBehandling({
                stegTilstand: [
                    {
                        behandlingSteg: BehandlingSteg.REGISTRERE_SØKNAD,
                        behandlingStegStatus: BehandlingStegStatus.IKKE_UTFØRT,
                    },
                ],
            });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(SideId.REGISTRER_INSTITUSJON);
        });

        test('skal vise registrer søknad når årsaken er søknad', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SØKNAD });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.REGISTRERE_SØKNAD);
        });

        test('skal ikke vise registrer søknad når årsaken ikke er søknad', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.FØDSELSHENDELSE });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(SideId.REGISTRERE_SØKNAD);
        });

        test('skal vise filtreringsregler når årsaken er fødselshendelse', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.FØDSELSHENDELSE });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(
                SideId.FILTRERING_FØDSELSHENDELSER
            );
        });

        test('skal ikke vise filtreringsregler når årsaken ikke er fødselshendelse', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SØKNAD });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(
                SideId.FILTRERING_FØDSELSHENDELSER
            );
        });

        test('skal vise simulering når behandlingen ikke skal behandles automatisk', () => {
            const behandling = lagBehandling({ skalBehandlesAutomatisk: false });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.SIMULERING);
        });

        test('skal ikke vise simulering når behandlingen skal behandles automatisk', () => {
            const behandling = lagBehandling({ skalBehandlesAutomatisk: true });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(SideId.SIMULERING);
        });

        test('skal vise vedtak når årsaken ikke er satsendring', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SØKNAD });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.VEDTAK);
        });

        test('skal ikke vise vedtak når årsaken er satsendring', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SATSENDRING });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(SideId.VEDTAK);
        });
    });

    describe('Sjekk ved endring av sider', () => {
        test('Oppdater siderForBehandling-tester ved nye/fjernede sider', () => {
            const sider = [
                SideId.REGISTRER_INSTITUSJON,
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

    describe('erViPåUdefinertFagsakSide', () => {
        test('Skal returnere false dersom den får inn en kjent side og true ved ukjent', () => {
            const testUrl = 'test-url/';
            Object.values(sider)
                .map(side => side.href)
                .forEach(sideUrl => expect(erViPåUdefinertFagsakSide(testUrl + sideUrl)).toBeFalsy());
            expect(erViPåUdefinertFagsakSide(testUrl + 'saksoversikt')).toBeFalsy();
            expect(erViPåUdefinertFagsakSide(testUrl + 'ny-behandling')).toBeFalsy();

            expect(erViPåUdefinertFagsakSide('dette-skal-ikke-være/en-definert-side')).toBeTruthy();
        });
    });

    describe('erViPåUlovligSteg', () => {
        test('Skal returnere true dersom vi er på ulovlig steg', () => {
            expect(erViPåUlovligSteg('vedtak', sider.REGISTRERE_SØKNAD)).toBeTruthy();
        });
        test('Skal returnere false dersom vi ikke er på ulovlig steg', () => {
            expect(erViPåUlovligSteg('registrer-soknad', sider.FILTRERING_FØDSELSHENDELSER)).toBeFalsy();
        });
    });

    describe('finnSideForBehandlingssteg', () => {
        test('Skal returnere første side for behandlingssteget dersom det er før "send til beslutter"', () => {
            const behandling = lagBehandling({
                årsak: BehandlingÅrsak.SØKNAD,
                steg: BehandlingSteg.REGISTRERE_SØKNAD,
            });
            expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.REGISTRERE_SØKNAD);

            const behandling2 = lagBehandling({
                årsak: BehandlingÅrsak.SØKNAD,
                steg: BehandlingSteg.VURDER_TILBAKEKREVING,
            });
            expect(finnSideForBehandlingssteg(behandling2)).toEqual(sider.SIMULERING);
        });

        test(
            'Skal returnere Vedtak-siden dersom behandlingssteget er er etter "send til beslutter" ' +
                'og behandlinsårsaken ikke er "satsendring"',
            () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.SØKNAD,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.VEDTAK);
            }
        );

        test(
            'Skal returnere Simulering-siden dersom behandlingssteget er etter "send til beslutter" ' +
                'og behandlinsårsaken er "satsendring"',
            () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.SATSENDRING,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.SIMULERING);
            }
        );
    });
});
