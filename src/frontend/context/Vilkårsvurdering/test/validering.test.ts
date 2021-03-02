import { Valideringsstatus } from '@navikt/familie-skjema';

import { PersonType } from '../../../typer/person';
import { Resultat } from '../../../typer/vilkår';
import { kjørValidering } from '../validering';
import { mapFraRestPersonResultatTilPersonResultat } from '../vilkårsvurdering';
import { lagAndreVurderingResultater, testFagsak } from './TestData';

describe('vilkårsvurdering/validering', () => {
    describe('validering', () => {
        const testFagsakIkkeVurdert = lagAndreVurderingResultater(
            testFagsak,
            Resultat.IKKE_VURDERT
        );

        const personResultaterIkkeVurdert = mapFraRestPersonResultatTilPersonResultat(
            testFagsakIkkeVurdert.behandlinger[0].personResultater,
            testFagsakIkkeVurdert.behandlinger[0].personer
        );

        const testFagsakOppfylt = lagAndreVurderingResultater(testFagsak, Resultat.OPPFYLT);

        const personResultaterOppfylt = mapFraRestPersonResultatTilPersonResultat(
            testFagsakOppfylt.behandlinger[0].personResultater,
            testFagsakOppfylt.behandlinger[0].personer
        );

        const søkerPersonResultatOppfylt = personResultaterOppfylt.find(
            resultat => resultat.person.type === PersonType.SØKER
        );

        const søkerPersonResultatIkkeVurdert = personResultaterIkkeVurdert.find(
            resultat => resultat.person.type === PersonType.SØKER
        );

        test('Skal validere gjennom å returnere tom liste', () => {
            const validert =
                søkerPersonResultatIkkeVurdert && kjørValidering([søkerPersonResultatIkkeVurdert]);
            expect(!!validert).toBe(true);
            const personResultatMedAndreVurderingerIkkeFeil = validert?.find(personresultat =>
                personresultat.andreVurderinger.find(
                    annenVurdering => annenVurdering.valideringsstatus !== Valideringsstatus.FEIL
                )
            );
            expect(!!personResultatMedAndreVurderingerIkkeFeil).toBe(false);
        });

        test('Skal validere gjennom å returnere tom liste', () => {
            const validert =
                søkerPersonResultatOppfylt && kjørValidering([søkerPersonResultatOppfylt]);
            expect(!!validert).toBe(true);
            const personResultatMedAndreVurderingerFeil = validert?.find(personresultat =>
                personresultat.andreVurderinger.find(
                    annenVurdering => annenVurdering.valideringsstatus === Valideringsstatus.FEIL
                )
            );
            expect(!!personResultatMedAndreVurderingerFeil).toBe(false);
        });
    });
});
