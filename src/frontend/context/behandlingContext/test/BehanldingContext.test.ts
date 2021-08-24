import { BehandlingSteg } from '../../../typer/behandling';
import { saksbehandlerHarKunLesevisning } from '../util';

describe('BehandlingContext', () => {
    describe('erBehandlingILesevisning', () => {
        test('Skal returnere true dersom saksbehandler ikke har skrivetilgang.', () => {
            expect(
                saksbehandlerHarKunLesevisning(false, BehandlingSteg.REGISTRERE_SØKNAD)
            ).toBeTruthy();
        });
        test('Skal returnere false dersom saksbehandler har skrivetilgang og steget er før beslutte vedtak.', () => {
            expect(
                saksbehandlerHarKunLesevisning(true, BehandlingSteg.SEND_TIL_BESLUTTER)
            ).toBeFalsy();
        });
        test('Skal returnere false dersom saksbehandler har skrivetilgang, men steget er likt eller etter beslutte vedtak.', () => {
            expect(
                saksbehandlerHarKunLesevisning(true, BehandlingSteg.BESLUTTE_VEDTAK)
            ).toBeTruthy();
        });
    });
});
