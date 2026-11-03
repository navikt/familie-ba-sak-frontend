import { enhetsgrupper, harTilgangTilEnhet } from './enhet';

describe('harTilgangTilEnhet', () => {
    test('Skal sjekke tilgangsstyring på enheter', () => {
        expect(harTilgangTilEnhet('4806', ['c2cf4114-1f5d-47f2-bb6e-c7a06fd26412'], () => false)).toBe(true);
        expect(harTilgangTilEnhet('4806', [], () => false)).toBe(false);
    });

    test('Skal sjekke at man har tilgang til alle enheter i non-prod', () => {
        Object.values(enhetsgrupper).forEach(enhet => {
            expect(harTilgangTilEnhet(enhet, [])).toBe(true);
        });
    });
});
