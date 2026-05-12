import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import { PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';
import { describe, expect } from 'vitest';

import {
    Behandlingstype,
    BehandlingÅrsak,
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

        test('returnerer true når årsak er KORREKSJON_VEDTAKSBREV', () => {
            // Arrange
            const behandling = lagBehandling({ årsak: BehandlingÅrsak.KORREKSJON_VEDTAKSBREV });

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
});
