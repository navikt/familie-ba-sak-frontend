import { describe, it, expect, vi, beforeEach } from 'vitest';

import { BehandlerRolle } from './behandling';
import { utledBehandlerRolle, harSuperbrukertilgang, harSkrivetilgang } from './saksbehandler';
import { lagSaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';
import { erProd } from '../utils/miljø';

vi.mock('../utils/miljø', () => ({
    erProd: vi.fn(),
}));

describe('Saksbehandler', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe('Når miljø ikke er prod (Dev/Preprod)', () => {
        beforeEach(() => {
            vi.mocked(erProd).mockReturnValue(false);
        });

        const devGrupper = {
            veileder: '93a26831-9866-4410-927b-74ff51a9107c',
            saksbehandler: 'd21e00a4-969d-4b28-8782-dc818abfae65',
            beslutter: '9449c153-5a1e-44a7-84c6-7cc7a8867233',
            superbruker: '314fa714-f13c-4cdc-ac5c-e13ce08e241c',
            ukjent: 'en-tilfeldig-gruppe-id',
        };

        describe('utledBehandlerRolle', () => {
            it('skal returnere høyeste rolle (BESLUTTER) ved flere grupper', () => {
                const saksbehandler = lagSaksbehandler({ groups: [devGrupper.veileder, devGrupper.beslutter] });
                expect(utledBehandlerRolle(saksbehandler)).toBe(BehandlerRolle.BESLUTTER);
            });

            it('skal kaste feil hvis ingen gyldige grupper finnes', () => {
                const saksbehandler = lagSaksbehandler({ groups: [devGrupper.ukjent] });
                expect(() => utledBehandlerRolle(saksbehandler)).toThrow('Finner ikke rolle til saksbehandler.');
            });
        });

        describe('harSuperbrukerTilgang', () => {
            it('skal returnere true hvis bruker har superbruker-gruppe', () => {
                const saksbehandler = lagSaksbehandler({ groups: [devGrupper.superbruker] });
                expect(harSuperbrukertilgang(saksbehandler)).toBe(true);
            });
        });

        describe('harSkrivetilgang', () => {
            it('skal returnere true for SAKSBEHANDLER', () => {
                const saksbehandler = lagSaksbehandler({ groups: [devGrupper.saksbehandler] });
                expect(harSkrivetilgang(saksbehandler)).toBe(true);
            });

            it('skal returnere false for kun VEILEDER', () => {
                const saksbehandler = lagSaksbehandler({ groups: [devGrupper.veileder] });
                expect(harSkrivetilgang(saksbehandler)).toBe(false);
            });
        });
    });

    describe('Når miljø ER prod', () => {
        beforeEach(() => {
            vi.mocked(erProd).mockReturnValue(true);
        });

        const prodGrupper = {
            veileder: '199c2b39-e535-4ae8-ac59-8ccbee7991ae',
            saksbehandler: '847e3d72-9dc1-41c3-80ff-f5d4acdd5d46',
            beslutter: '7a271f87-39fb-468b-a9ee-6cf3c070f548',
            superbruker: '9b8239c4-cca7-440b-b359-51a64e3f0f00',
        };

        describe('utledBehandlerRolle', () => {
            it('skal returnere riktig rolle basert på prod-grupper', () => {
                const saksbehandler = lagSaksbehandler({ groups: [prodGrupper.saksbehandler] });
                expect(utledBehandlerRolle(saksbehandler)).toBe(BehandlerRolle.SAKSBEHANDLER);
            });

            it('skal kaste feil hvis en bruker i prod kun har dev-grupper', () => {
                const devVeilederGruppe = '93a26831-9866-4410-927b-74ff51a9107c';
                const saksbehandler = lagSaksbehandler({ groups: [devVeilederGruppe] });
                expect(() => utledBehandlerRolle(saksbehandler)).toThrow('Finner ikke rolle til saksbehandler.');
            });
        });

        describe('harSuperbrukerTilgang', () => {
            it('skal returnere true for prod-superbruker', () => {
                const saksbehandler = lagSaksbehandler({ groups: [prodGrupper.superbruker] });
                expect(harSuperbrukertilgang(saksbehandler)).toBe(true);
            });
        });
    });
});
