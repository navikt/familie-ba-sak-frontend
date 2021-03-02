import { Valideringsstatus } from '@navikt/familie-skjema';

import { PersonType } from '../../../typer/person';
import { Resultat } from '../../../typer/vilkår';
import { kjørValidering } from '../validering';
import { mapFraRestPersonResultatTilPersonResultat } from '../vilkårsvurdering';
import {
    barnIdent,
    lagAndreVurderingResultater,
    lagPersonAndreVurderingResultater,
    søkerIdent,
    testFagsak,
} from './TestData';

describe('vilkårsvurdering/validering', () => {
    describe('validering', () => {
        test('Skal validere gjennom å returnere tom liste', () => {
            const testFagsakIkkeVurdert = lagAndreVurderingResultater(
                testFagsak,
                Resultat.IKKE_VURDERT
            );
            const personResultaterIkkeVurdert = mapFraRestPersonResultatTilPersonResultat(
                testFagsakIkkeVurdert.behandlinger[0].personResultater,
                testFagsakIkkeVurdert.behandlinger[0].personer
            );

            const søkerPersonResultatIkkeVurdert = personResultaterIkkeVurdert.find(
                resultat => resultat.person.type === PersonType.SØKER
            );

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
            const testFagsakOppfylt = lagAndreVurderingResultater(testFagsak, Resultat.OPPFYLT);

            const personResultaterOppfylt = mapFraRestPersonResultatTilPersonResultat(
                testFagsakOppfylt.behandlinger[0].personResultater,
                testFagsakOppfylt.behandlinger[0].personer
            );

            const søkerPersonResultatOppfylt = personResultaterOppfylt.find(
                resultat => resultat.person.type === PersonType.SØKER
            );

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

        test('Skal validere gjennom å returnere riktig resultater', () => {
            const testFagsakOppfylt = lagAndreVurderingResultater(testFagsak, Resultat.OPPFYLT);
            const testFagsakMikst = lagPersonAndreVurderingResultater(
                testFagsakOppfylt,
                søkerIdent,
                Resultat.IKKE_VURDERT
            );
            const personResultater = mapFraRestPersonResultatTilPersonResultat(
                testFagsakMikst.behandlinger[0].personResultater,
                testFagsakMikst.behandlinger[0].personer
            );

            const søkerResultat = personResultater.find(
                personResultat => personResultat.personIdent === søkerIdent
            );
            const søkerValidert = søkerResultat && kjørValidering([søkerResultat]);
            expect(!!søkerValidert).toBe(true);
            const søkeResultatMedAndreVurderingIkkeFeil = søkerValidert?.find(personresultat =>
                personresultat.andreVurderinger.find(
                    annenVurdering => annenVurdering.valideringsstatus !== Valideringsstatus.FEIL
                )
            );
            expect(!!søkeResultatMedAndreVurderingIkkeFeil).toBe(false);

            const barnResultat = personResultater.find(
                personResultat => personResultat.personIdent === barnIdent
            );
            const barnValidert = barnResultat && kjørValidering([barnResultat]);
            expect(!!barnValidert).toBe(true);
            const barnResultatMedAndreVurderingerFeil = barnValidert?.find(personresultat =>
                personresultat.andreVurderinger.find(
                    annenVurdering => annenVurdering.valideringsstatus === Valideringsstatus.FEIL
                )
            );
            expect(!!barnResultatMedAndreVurderingerFeil).toBe(false);
        });
    });
});
