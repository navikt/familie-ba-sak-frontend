import { BehandlingResultat, erBehandlingHenlagt } from '../behandling';

describe('Behandlingstester', () => {
    test('Alle henleggelsesresultater skal trigge erHenlagt', () => {
        Object.values(BehandlingResultat).forEach(resultat => {
            if (resultat.includes('HENLAGT')) {
                expect(erBehandlingHenlagt(resultat)).toBe(true);
            } else {
                expect(erBehandlingHenlagt(resultat)).toBe(false);
            }
        });
    });
});
