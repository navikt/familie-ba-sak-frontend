import { BehandlingSteg } from '../../../typer/behandling';
import { saksbehandlerHarKunLesevisning } from '../util';

describe('BehandlingContext', () => {
    describe('erBehandlingILesevisning', () => {
        test('Skal returnere true dersom saksbehandler ikke har skrivetilgang.', () => {
            expect(
                saksbehandlerHarKunLesevisning(false, true, BehandlingSteg.REGISTRERE_SØKNAD)
            ).toBeTruthy();
        });
        test('Skal returnere false dersom saksbehandler har skrivetilgang og steget er før beslutte vedtak.', () => {
            expect(
                saksbehandlerHarKunLesevisning(true, true, BehandlingSteg.SEND_TIL_BESLUTTER)
            ).toBeFalsy();
        });
        test('Skal returnere true dersom saksbehandler har skrivetilgang, men ikke tilgang til enhet og steget er før beslutte vedtak.', () => {
            expect(
                saksbehandlerHarKunLesevisning(true, false, BehandlingSteg.SEND_TIL_BESLUTTER)
            ).toBeTruthy();
        });
        test('Skal returnere true dersom saksbehandler har skrivetilgang, men steget er likt eller etter beslutte vedtak.', () => {
            expect(
                saksbehandlerHarKunLesevisning(true, true, BehandlingSteg.BESLUTTE_VEDTAK)
            ).toBeTruthy();
        });
        test('Skal returnere true dersom saksbehandler har skrivetilgang, men ikke tilgang til enhet.', () => {
            expect(
                saksbehandlerHarKunLesevisning(true, false, BehandlingSteg.BESLUTTE_VEDTAK)
            ).toBeTruthy();
        });
        test('Skal returnere false dersom saksbehandler har skrivetilgang, men ikke tilgang til enhet. Men man skal ikke sjekke tilgang til enhet.', () => {
            expect(
                saksbehandlerHarKunLesevisning(
                    true,
                    false,
                    BehandlingSteg.SEND_TIL_BESLUTTER,
                    false
                )
            ).toBeFalsy();
        });
    });
});
