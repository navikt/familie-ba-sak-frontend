import { lagAnnenVurdering } from '@testutils/testdata/annenVurderingTestdata';
import { Resultat } from '@typer/vilkår';
import { describe, expect, test } from 'vitest';

import { erAnnenVurderingGyldig } from './validering';

describe('vilkårsvurdering/validering', () => {
    describe('erAnnenVurderingGyldig', () => {
        test('vurdert annen vurdering er gyldig', () => {
            expect(erAnnenVurderingGyldig(lagAnnenVurdering({ resultat: Resultat.OPPFYLT }))).toBe(true);
            expect(erAnnenVurderingGyldig(lagAnnenVurdering({ resultat: Resultat.IKKE_OPPFYLT }))).toBe(true);
        });

        test('ikke vurdert annen vurdering er ugyldig', () => {
            expect(erAnnenVurderingGyldig(lagAnnenVurdering({ resultat: Resultat.IKKE_VURDERT }))).toBe(false);
        });
    });
});
