import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { BehandlingSteg, BehandlingStegStatus, BehandlingÅrsak } from '@typer/behandling';

import { erSidenAktiv, erStegEtter, finnSideForBehandlingssteg, finnSiderForBehandling, SideId, sider } from './sider';

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

        test('skal vise registrer søknad når årsaken er automatisk behandling av søknad', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.AUTOMATISK_BEHANDLING_AV_SØKNAD });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.REGISTRERE_SØKNAD);
        });

        test('skal ikke vise registrer søknad når årsaken ikke er søknad', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.FØDSELSHENDELSE });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(SideId.REGISTRERE_SØKNAD);
        });

        test('skal vise filtreringsregler når årsaken er fødselshendelse', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.FØDSELSHENDELSE });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.FILTRERINGSREGLER);
        });

        test('skal vise filtreringsregler når årsaken er automatisk behandling av søknad', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.AUTOMATISK_BEHANDLING_AV_SØKNAD });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.FILTRERINGSREGLER);
        });

        test('skal ikke vise filtreringsregler når årsaken ikke er fødselshendelse eller automatisk behandling av søknad', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SØKNAD });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(SideId.FILTRERINGSREGLER);
        });

        test('skal vise simulering når behandlingen ikke skal behandles automatisk', () => {
            const behandling = lagBehandling({ skalBehandlesAutomatisk: false });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.SIMULERING);
        });

        test('skal ikke vise simulering når behandlingen skal behandles automatisk', () => {
            const behandling = lagBehandling({ skalBehandlesAutomatisk: true });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(SideId.SIMULERING);
        });

        test('skal vise simulering når behandlingen er automatisk behandling av søknad', () => {
            const behandling = lagBehandling({
                skalBehandlesAutomatisk: true,
                årsak: BehandlingÅrsak.AUTOMATISK_BEHANDLING_AV_SØKNAD,
            });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.SIMULERING);
        });

        test('skal vise vedtak når årsaken ikke er satsendring', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SØKNAD });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.VEDTAK);
        });

        test('skal ikke vise vedtak når årsaken er satsendring', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SATSENDRING });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).not.toContain(SideId.VEDTAK);
        });

        test('skal vise vedtak når årsaken er satsendring EØS', () => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SATSENDRING_EØS });

            expect(finnSiderForBehandling(behandling).map(side => side.id)).toContain(SideId.VEDTAK);
        });
    });

    describe('Sjekk ved endring av sider', () => {
        test('Oppdater siderForBehandling-tester ved nye/fjernede sider', () => {
            const sider = [
                SideId.REGISTRER_INSTITUSJON,
                SideId.REGISTRERE_SØKNAD,
                SideId.FILTRERINGSREGLER,
                SideId.VILKÅRSVURDERING,
                SideId.BEHANDLINGRESULTAT,
                SideId.SIMULERING,
                SideId.VEDTAK,
            ];
            expect(Object.values(SideId)).toEqual(sider);
        });
    });

    describe('erStegEtter', () => {
        test('skal bruke rekkefølgen fra backend når stegene har ulik rekkefølge', () => {
            expect(erStegEtter(BehandlingSteg.VILKÅRSVURDERING, BehandlingSteg.REGISTRERE_SØKNAD)).toBe(true);
            expect(erStegEtter(BehandlingSteg.REGISTRERE_SØKNAD, BehandlingSteg.VILKÅRSVURDERING)).toBe(false);
        });

        test('skal bruke rekkefølgen på sidene når stegene har lik rekkefølge i backend', () => {
            expect(erStegEtter(BehandlingSteg.REGISTRERE_SØKNAD, BehandlingSteg.REGISTRERE_INSTITUSJON)).toBe(true);
            expect(erStegEtter(BehandlingSteg.REGISTRERE_INSTITUSJON, BehandlingSteg.REGISTRERE_SØKNAD)).toBe(false);
        });

        test('skal returnere false når et av stegene med lik rekkefølge ikke har en egen side', () => {
            expect(erStegEtter(BehandlingSteg.REGISTRERE_SØKNAD, BehandlingSteg.REGISTRERE_PERSONGRUNNLAG)).toBe(false);
        });
    });

    describe('erSidenAktiv', () => {
        test('skal ikke vise registrer søknad som aktiv når institusjonssaken er på registrering av institusjon', () => {
            const behandling = lagBehandling({
                årsak: BehandlingÅrsak.SØKNAD,
                steg: BehandlingSteg.REGISTRERE_INSTITUSJON,
            });

            expect(erSidenAktiv(sider.REGISTRER_INSTITUSJON, behandling)).toBe(true);
            expect(erSidenAktiv(sider.REGISTRERE_SØKNAD, behandling)).toBe(false);
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

        test(
            'Skal returnere Vedtak-siden dersom behandlingssteget er etter "send til beslutter" ' +
                'og behandlinsårsaken er "satsendring EØS"',
            () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.SATSENDRING_EØS,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.VEDTAK);
            }
        );

        test.each([
            [BehandlingSteg.REGISTRERE_SØKNAD, sider.REGISTRERE_SØKNAD],
            [BehandlingSteg.VILKÅRSVURDERING, sider.VILKÅRSVURDERING],
            [BehandlingSteg.BEHANDLINGSRESULTAT, sider.BEHANDLINGRESULTAT],
            [BehandlingSteg.VURDER_TILBAKEKREVING, sider.SIMULERING],
            [BehandlingSteg.SEND_TIL_BESLUTTER, sider.VEDTAK],
        ])('skal returnere siden som tilhører steget %s', (steg, forventetSide) => {
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.SØKNAD, steg });
            expect(finnSideForBehandlingssteg(behandling)).toEqual(forventetSide);
        });

        test('skal returnere undefined dersom steget ikke har en egen side', () => {
            const behandling = lagBehandling({ steg: BehandlingSteg.REGISTRERE_PERSONGRUNNLAG });
            expect(finnSideForBehandlingssteg(behandling)).toBeUndefined();
        });

        test('skal returnere undefined dersom siden for steget er skjult for behandlingen', () => {
            const behandling = lagBehandling({
                årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
                steg: BehandlingSteg.REGISTRERE_SØKNAD,
            });
            expect(finnSideForBehandlingssteg(behandling)).toBeUndefined();
        });

        test('skal returnere Behandlingsresultat-siden dersom behandlingssteget er etter "send til beslutter" og verken vedtak eller simulering vises', () => {
            const behandling = lagBehandling({
                årsak: BehandlingÅrsak.SATSENDRING,
                skalBehandlesAutomatisk: true,
                steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
            });
            expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.BEHANDLINGRESULTAT);
        });

        describe('henlagt behandling', () => {
            function lagHenlagtStegTilstand(stegene: BehandlingSteg[]) {
                const henlagtPåSteg = stegene[stegene.length - 1];
                return [
                    BehandlingSteg.REGISTRERE_PERSONGRUNNLAG,
                    ...stegene,
                    BehandlingSteg.HENLEGG_BEHANDLING,
                    BehandlingSteg.FERDIGSTILLE_BEHANDLING,
                    BehandlingSteg.BEHANDLING_AVSLUTTET,
                ].map(behandlingSteg => ({
                    behandlingSteg,
                    behandlingStegStatus:
                        behandlingSteg === henlagtPåSteg
                            ? BehandlingStegStatus.IKKE_UTFØRT
                            : BehandlingStegStatus.UTFØRT,
                }));
            }

            test('skal returnere Vilkårsvurdering-siden for revurdering henlagt på vilkårsvurdering', () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                    stegTilstand: lagHenlagtStegTilstand([BehandlingSteg.VILKÅRSVURDERING]),
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.VILKÅRSVURDERING);
            });

            test('skal returnere Registrer søknad-siden for søknad henlagt på registrering av søknad', () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.SØKNAD,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                    stegTilstand: lagHenlagtStegTilstand([BehandlingSteg.REGISTRERE_SØKNAD]),
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.REGISTRERE_SØKNAD);
            });

            test('skal returnere Behandlingsresultat-siden for behandling henlagt på behandlingsresultat', () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.SØKNAD,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                    stegTilstand: lagHenlagtStegTilstand([
                        BehandlingSteg.REGISTRERE_SØKNAD,
                        BehandlingSteg.VILKÅRSVURDERING,
                        BehandlingSteg.BEHANDLINGSRESULTAT,
                    ]),
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.BEHANDLINGRESULTAT);
            });

            test('skal returnere Vedtak-siden for behandling henlagt på send til beslutter', () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.SØKNAD,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                    stegTilstand: lagHenlagtStegTilstand([
                        BehandlingSteg.REGISTRERE_SØKNAD,
                        BehandlingSteg.VILKÅRSVURDERING,
                        BehandlingSteg.BEHANDLINGSRESULTAT,
                        BehandlingSteg.VURDER_TILBAKEKREVING,
                        BehandlingSteg.SEND_TIL_BESLUTTER,
                    ]),
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.VEDTAK);
            });

            test('skal returnere Registrer institusjon-siden for institusjonssak henlagt på registrering av institusjon', () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.SØKNAD,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                    stegTilstand: lagHenlagtStegTilstand([BehandlingSteg.REGISTRERE_INSTITUSJON]),
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.REGISTRER_INSTITUSJON);
            });

            test('skal returnere Behandlingsresultat-siden for fødselshendelse henlagt automatisk etter behandlingsresultat', () => {
                const behandling = lagBehandling({
                    årsak: BehandlingÅrsak.FØDSELSHENDELSE,
                    skalBehandlesAutomatisk: true,
                    steg: BehandlingSteg.BEHANDLING_AVSLUTTET,
                    stegTilstand: [
                        BehandlingSteg.REGISTRERE_PERSONGRUNNLAG,
                        BehandlingSteg.FILTRERING_AUTOMATISK_BEHANDLING,
                        BehandlingSteg.VILKÅRSVURDERING,
                        BehandlingSteg.BEHANDLINGSRESULTAT,
                        BehandlingSteg.HENLEGG_BEHANDLING,
                        BehandlingSteg.FERDIGSTILLE_BEHANDLING,
                        BehandlingSteg.BEHANDLING_AVSLUTTET,
                    ].map(behandlingSteg => ({ behandlingSteg, behandlingStegStatus: BehandlingStegStatus.UTFØRT })),
                });
                expect(finnSideForBehandlingssteg(behandling)).toEqual(sider.BEHANDLINGRESULTAT);
            });
        });
    });
});
