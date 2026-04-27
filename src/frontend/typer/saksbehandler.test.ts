import { describe, it, expect, vi, beforeEach } from 'vitest';

import { BehandlerRolle } from './behandling';
import {
    utledBehandlerRolle,
    harSuperbrukertilgang,
    harSkrivetilgang,
    mapISaksbehandlerTilSaksbehandler,
} from './saksbehandler';
import { lagISaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';
import { erProd } from '../utils/miljø';

vi.mock('../utils/miljø', () => ({
    erProd: vi.fn(),
}));

describe('Saksbehandler', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    const devGrupper = {
        veileder: '93a26831-9866-4410-927b-74ff51a9107c',
        saksbehandler: 'd21e00a4-969d-4b28-8782-dc818abfae65',
        beslutter: '9449c153-5a1e-44a7-84c6-7cc7a8867233',
        superbruker: '314fa714-f13c-4cdc-ac5c-e13ce08e241c',
        ukjent: 'en-tilfeldig-gruppe-id',
    };

    const prodGrupper = {
        veileder: '199c2b39-e535-4ae8-ac59-8ccbee7991ae',
        saksbehandler: '847e3d72-9dc1-41c3-80ff-f5d4acdd5d46',
        beslutter: '7a271f87-39fb-468b-a9ee-6cf3c070f548',
        superbruker: '9b8239c4-cca7-440b-b359-51a64e3f0f00',
    };

    describe('utledBehandlerRolle - ikke prod', () => {
        beforeEach(() => {
            vi.mocked(erProd).mockReturnValue(false);
        });

        it('skal returnere høyeste rolle (BESLUTTER) ved flere grupper', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [devGrupper.veileder, devGrupper.beslutter] });
            expect(utledBehandlerRolle(iSaksbehandler)).toBe(BehandlerRolle.BESLUTTER);
        });

        it('skal kaste feil hvis ingen gyldige grupper finnes', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [devGrupper.ukjent] });
            expect(() => utledBehandlerRolle(iSaksbehandler)).toThrow('Finner ikke rolle til saksbehandler.');
        });
    });

    describe('utledBehandlerRolle - prod', () => {
        beforeEach(() => {
            vi.mocked(erProd).mockReturnValue(true);
        });

        it('skal returnere riktig rolle basert på prod-grupper', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [prodGrupper.saksbehandler] });
            expect(utledBehandlerRolle(iSaksbehandler)).toBe(BehandlerRolle.SAKSBEHANDLER);
        });

        it('skal kaste feil hvis en bruker i prod kun har dev-grupper', () => {
            const devVeilederGruppe = '93a26831-9866-4410-927b-74ff51a9107c';
            const iSaksbehandler = lagISaksbehandler({ groups: [devVeilederGruppe] });
            expect(() => utledBehandlerRolle(iSaksbehandler)).toThrow('Finner ikke rolle til saksbehandler.');
        });
    });

    describe('harSuperbrukerTilgang - ikke prod', () => {
        beforeEach(() => {
            vi.mocked(erProd).mockReturnValue(false);
        });

        it('skal returnere true hvis bruker har superbruker-gruppe', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [devGrupper.superbruker] });
            expect(harSuperbrukertilgang(iSaksbehandler)).toBe(true);
        });
    });

    describe('harSuperbrukerTilgang - prod', () => {
        beforeEach(() => {
            vi.mocked(erProd).mockReturnValue(true);
        });

        it('skal returnere true for prod-superbruker', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [prodGrupper.superbruker] });
            expect(harSuperbrukertilgang(iSaksbehandler)).toBe(true);
        });
    });

    describe('harSkrivetilgang - ikke prod', () => {
        beforeEach(() => {
            vi.mocked(erProd).mockReturnValue(false);
        });

        it('skal returnere true for SAKSBEHANDLER', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [devGrupper.saksbehandler] });
            expect(harSkrivetilgang(iSaksbehandler)).toBe(true);
        });

        it('skal returnere false for kun VEILEDER', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [devGrupper.veileder] });
            expect(harSkrivetilgang(iSaksbehandler)).toBe(false);
        });
    });

    describe('harSkrivetilgang - prod', () => {
        beforeEach(() => {
            vi.mocked(erProd).mockReturnValue(true);
        });

        it('skal returnere true for SAKSBEHANDLER', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [prodGrupper.saksbehandler] });
            expect(harSkrivetilgang(iSaksbehandler)).toBe(true);
        });

        it('skal returnere false for kun VEILEDER', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: [prodGrupper.veileder] });
            expect(harSkrivetilgang(iSaksbehandler)).toBe(false);
        });
    });

    describe('mapISaksbehandlerTilSaksbehandler', () => {
        it('skal kaste feil hvis groups er undefined for ISaksbehandler', () => {
            // Arrange
            const iSaksbehandler = lagISaksbehandler({ groups: undefined });

            // Act & assert
            expect(() => mapISaksbehandlerTilSaksbehandler(iSaksbehandler)).toThrow(
                'Finner ikke rolle til saksbehandler.'
            );
        });

        it('skal bevare gruppene fra ISaksbehandler', () => {
            const iSaksbehandler = lagISaksbehandler({ groups: ['93a26831-9866-4410-927b-74ff51a9107c'] });

            // Act
            const result = mapISaksbehandlerTilSaksbehandler(iSaksbehandler);

            // Assert
            expect(result).toEqual({
                ...iSaksbehandler,
                groups: ['93a26831-9866-4410-927b-74ff51a9107c'],
                rolle: BehandlerRolle.VEILEDER,
                harSkrivetilgang: false,
                harSuperbrukertilgang: false,
            });
        });
    });
});
