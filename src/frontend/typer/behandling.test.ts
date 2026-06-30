import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import { BehandlingKategori } from '@typer/behandlingstema';
import { PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';
import { describe, expect } from 'vitest';

import {
    Behandlingstype,
    BehandlingÅrsak,
    erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna,
    kanLeggeTilUtvidetVilkår,
    MIDLERTIDIG_BEHANDLENDE_ENHET_ID,
    sjekkErBehandleneEnhetMidlertidig,
    utledSøkersMålform,
} from './behandling';

describe('behandling', () => {
    describe('sjekkErBehandleneEnhetMidlertidig', () => {
        test('skal returnere true hvis behandling er på midlertidig enhet', () => {
            const behandling = lagBehandling({
                arbeidsfordelingPåBehandling: {
                    behandlendeEnhetId: MIDLERTIDIG_BEHANDLENDE_ENHET_ID,
                    behandlendeEnhetNavn: 'midlertidig enhet',
                    manueltOverstyrt: false,
                },
            });

            const erBehandleneEnhetMidlertidig = sjekkErBehandleneEnhetMidlertidig(behandling);

            expect(erBehandleneEnhetMidlertidig).toBeTruthy();
        });

        test('skal returnere false hvis behandling er på midlertidig enhet', () => {
            const behandling = lagBehandling({
                arbeidsfordelingPåBehandling: {
                    behandlendeEnhetId: '0001',
                    behandlendeEnhetNavn: 'Oslo',
                    manueltOverstyrt: false,
                },
            });

            const erBehandleneEnhetMidlertidig = sjekkErBehandleneEnhetMidlertidig(behandling);

            expect(erBehandleneEnhetMidlertidig).toBeFalsy();
        });
    });

    describe('kanLeggeTilUtvidetVilkår', () => {
        test('returnerer true når type er MIGRERING_FRA_INFOTRYGD', () => {
            // Arrange
            const behandling = lagBehandling({ type: Behandlingstype.MIGRERING_FRA_INFOTRYGD });

            // Act
            const result = kanLeggeTilUtvidetVilkår(behandling);

            // Assert
            expect(result).toBe(true);
        });

        test('returnerer true når årsak er TEKNISK_ENDRING', () => {
            // Arrange
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.TEKNISK_ENDRING });

            // Act
            const result = kanLeggeTilUtvidetVilkår(behandling);

            // Assert
            expect(result).toBe(true);
        });

        test('returnerer true når årsak er KLAGE', () => {
            // Arrange
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.KLAGE });

            // Act
            const result = kanLeggeTilUtvidetVilkår(behandling);

            // Assert
            expect(result).toBe(true);
        });

        test('returnerer true når årsak er ENDRE_MIGRERINGSDATO', () => {
            // Arrange
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.ENDRE_MIGRERINGSDATO });

            // Act
            const result = kanLeggeTilUtvidetVilkår(behandling);

            // Assert
            expect(result).toBe(true);
        });

        test('returnerer true når årsak er IVERKSETTE_KA_VEDTAK', () => {
            // Arrange
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.IVERKSETTE_KA_VEDTAK });

            // Act
            const result = kanLeggeTilUtvidetVilkår(behandling);

            // Assert
            expect(result).toBe(true);
        });

        test('returnerer false når man ikke skal kunne legge til utvidet vilkår', () => {
            // Arrange
            const behandling = lagBehandling({ type: Behandlingstype.REVURDERING, årsak: BehandlingÅrsak.SØKNAD });

            // Act
            const result = kanLeggeTilUtvidetVilkår(behandling);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('utledSøkersMålform', () => {
        test('skal finne søkers målform', () => {
            // Arrange
            const behandling = lagBehandling({
                personer: [lagGrunnlagPerson({ type: PersonType.SØKER, målform: Målform.NN })],
            });

            // Act
            const målform = utledSøkersMålform(behandling);

            // Assert
            expect(målform).toBe(Målform.NN);
        });

        test('skal falle tilbake til NB målform hvis man ikke finner søker', () => {
            // Arrange
            const behandling = lagBehandling({ personer: [] });

            // Act
            const målform = utledSøkersMålform(behandling);

            // Assert
            expect(målform).toBe(Målform.NB);
        });
    });

    describe('erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna', () => {
        test('skal returnere true for eøs førstegangsbehandling', () => {
            // Arrange
            const behandling = lagBehandling({
                kategori: BehandlingKategori.EØS,
                type: Behandlingstype.FØRSTEGANGSBEHANDLING,
                årsak: BehandlingÅrsak.SØKNAD,
                personer: [
                    lagGrunnlagPerson({
                        personIdent: '12345678901',
                        navn: 'Søker Søkeresen',
                        fødselsdato: '1990-01-01',
                        type: PersonType.SØKER,
                        erNyttBarn: false,
                    }),
                    lagGrunnlagPerson({
                        personIdent: '12345678902',
                        navn: 'Barn Barnesen',
                        fødselsdato: '2026-01-01',
                        type: PersonType.BARN,
                        erNyttBarn: true,
                    }),
                ],
            });

            // Act
            const erRiktigBehandling = erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

            // Assert
            expect(erRiktigBehandling).toBe(true);
        });

        test('skal returnere true for eøs revurdering søknad med minst ett nytt barn', () => {
            // Arrange
            const behandling = lagBehandling({
                kategori: BehandlingKategori.EØS,
                type: Behandlingstype.REVURDERING,
                årsak: BehandlingÅrsak.SØKNAD,
                personer: [
                    lagGrunnlagPerson({
                        personIdent: '12345678901',
                        navn: 'Søker Søkeresen',
                        fødselsdato: '1990-01-01',
                        type: PersonType.SØKER,
                        erNyttBarn: false,
                    }),
                    lagGrunnlagPerson({
                        personIdent: '12345678902',
                        navn: 'Barn Barnesen',
                        fødselsdato: '2026-01-01',
                        type: PersonType.BARN,
                        erNyttBarn: true,
                    }),
                ],
            });

            // Act
            const erRiktigBehandling = erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

            // Assert
            expect(erRiktigBehandling).toBe(true);
        });

        test('skal returnere false for nasjonal førstegangsbehandling', () => {
            // Arrange
            const behandling = lagBehandling({
                kategori: BehandlingKategori.NASJONAL,
                type: Behandlingstype.FØRSTEGANGSBEHANDLING,
                årsak: BehandlingÅrsak.SØKNAD,
                personer: [
                    lagGrunnlagPerson({
                        personIdent: '12345678901',
                        navn: 'Søker Søkeresen',
                        fødselsdato: '1990-01-01',
                        type: PersonType.SØKER,
                        erNyttBarn: false,
                    }),
                    lagGrunnlagPerson({
                        personIdent: '12345678902',
                        navn: 'Barn Barnesen',
                        fødselsdato: '2026-01-01',
                        type: PersonType.BARN,
                        erNyttBarn: true,
                    }),
                ],
            });

            // Act
            const erRiktigBehandling = erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

            // Assert
            expect(erRiktigBehandling).toBe(false);
        });

        test('skal returnere false for eøs revurdering søknad uten nytt barn', () => {
            // Arrange
            const behandling = lagBehandling({
                kategori: BehandlingKategori.EØS,
                type: Behandlingstype.REVURDERING,
                årsak: BehandlingÅrsak.SØKNAD,
                personer: [
                    lagGrunnlagPerson({
                        personIdent: '12345678901',
                        navn: 'Søker Søkeresen',
                        fødselsdato: '1990-01-01',
                        type: PersonType.SØKER,
                        erNyttBarn: false,
                    }),
                    lagGrunnlagPerson({
                        personIdent: '12345678902',
                        navn: 'Barn Barnesen',
                        fødselsdato: '2020-01-01',
                        type: PersonType.BARN,
                        erNyttBarn: false,
                    }),
                ],
            });

            // Act
            const erRiktigBehandling = erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

            // Assert
            expect(erRiktigBehandling).toBe(false);
        });

        test('skal returnere false for eøs revurdering med annen årsak enn søknad selv med nytt barn', () => {
            // Arrange
            const behandling = lagBehandling({
                kategori: BehandlingKategori.EØS,
                type: Behandlingstype.REVURDERING,
                årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
                personer: [
                    lagGrunnlagPerson({
                        personIdent: '12345678901',
                        navn: 'Søker Søkeresen',
                        fødselsdato: '1990-01-01',
                        type: PersonType.SØKER,
                        erNyttBarn: false,
                    }),
                    lagGrunnlagPerson({
                        personIdent: '12345678902',
                        navn: 'Barn Barnesen',
                        fødselsdato: '2026-01-01',
                        type: PersonType.BARN,
                        erNyttBarn: true,
                    }),
                ],
            });

            // Act
            const erRiktigBehandling = erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

            // Assert
            expect(erRiktigBehandling).toBe(false);
        });

        test('skal returnere false for nasjonal revurdering søknad med nytt barn', () => {
            // Arrange
            const behandling = lagBehandling({
                kategori: BehandlingKategori.NASJONAL,
                type: Behandlingstype.REVURDERING,
                årsak: BehandlingÅrsak.SØKNAD,
                personer: [
                    lagGrunnlagPerson({
                        personIdent: '12345678901',
                        navn: 'Søker Søkeresen',
                        fødselsdato: '1990-01-01',
                        type: PersonType.SØKER,
                        erNyttBarn: false,
                    }),
                    lagGrunnlagPerson({
                        personIdent: '12345678902',
                        navn: 'Barn Barnesen',
                        fødselsdato: '2026-01-01',
                        type: PersonType.BARN,
                        erNyttBarn: true,
                    }),
                ],
            });

            // Act
            const erRiktigBehandling = erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

            // Assert
            expect(erRiktigBehandling).toBe(false);
        });
    });
});
