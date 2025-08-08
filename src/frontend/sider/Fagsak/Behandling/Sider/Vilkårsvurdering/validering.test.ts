import { Valideringsstatus } from '@navikt/familie-skjema';

import { mapFraRestPersonResultatTilPersonResultat } from './utils';
import { kjørValidering } from './validering';
import {
    genererPerson,
    genererPersonresultat,
} from '../../../../../testdata/vilkårsvurderingTestdata';

describe('vilkårsvurdering/validering', () => {
    describe('validering', () => {
        test('List med to andrevurderinger som begge validerer OK', () => {
            const p = mapFraRestPersonResultatTilPersonResultat(
                [genererPersonresultat('OPPFYLT', 'IKKE_OPPFYLT')],
                [genererPerson]
            );
            const validert = kjørValidering(p);
            expect(!!validert).toBe(true);

            const anneVurderingMedOKValidering = validert
                ?.flatMap(personResultat => personResultat.andreVurderinger)
                .filter(
                    annenVurdering => annenVurdering.valideringsstatus !== Valideringsstatus.FEIL
                );

            expect(anneVurderingMedOKValidering?.length).toBe(2);
        });

        test('List med to andrevurderinger som begge validerer FEIL', () => {
            const p = mapFraRestPersonResultatTilPersonResultat(
                [genererPersonresultat('IKKE_VURDERT', 'IKKE_VURDERT')],
                [genererPerson]
            );
            const validert = kjørValidering(p);
            expect(!!validert).toBe(true);
            const anneVurderingMedOKValidering = validert
                ?.flatMap(personResultat => personResultat.andreVurderinger)
                .filter(
                    annenVurdering => annenVurdering.valideringsstatus !== Valideringsstatus.FEIL
                );

            expect(anneVurderingMedOKValidering?.length).toBe(0);
        });

        test('List med to andrevurderinger hvor en validerer FEIL og en OK', () => {
            const p = mapFraRestPersonResultatTilPersonResultat(
                [genererPersonresultat('OPPFYLT', 'IKKE_VURDERT')],
                [genererPerson]
            );
            const validert = kjørValidering(p);
            expect(!!validert).toBe(true);

            const anneVurderingMedOKValidering = validert
                ?.flatMap(personResultat => personResultat.andreVurderinger)
                .filter(
                    annenVurdering => annenVurdering.valideringsstatus !== Valideringsstatus.FEIL
                );

            expect(anneVurderingMedOKValidering?.length).toBe(1);
        });
    });
});
