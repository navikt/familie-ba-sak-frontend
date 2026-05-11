import { describe, expect, test } from 'vitest';

import { utledAdressebeskyttelseGradering } from './Personlinje';
import { lagPerson } from '../../testutils/testdata/personTestdata';
import { FagsakType } from '../../typer/fagsak';
import { Adressebeskyttelsegradering } from '../../typer/person';

describe('utledAdressebeskyttelseGradering', () => {
    test('skal bruke barns gradering når fagsakType er SKJERMET_BARN', () => {
        const barn = lagPerson({
            adressebeskyttelseGradering: Adressebeskyttelsegradering.STRENGT_FORTROLIG,
        });
        const søkerData = lagPerson({
            adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
        });

        const resultat = utledAdressebeskyttelseGradering(FagsakType.SKJERMET_BARN, barn, søkerData);

        expect(resultat).toBe(Adressebeskyttelsegradering.STRENGT_FORTROLIG);
    });

    test('skal bruke søkers gradering når fagsakType er NORMAL', () => {
        const barn = lagPerson({
            adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
        });
        const søkerData = lagPerson({
            adressebeskyttelseGradering: Adressebeskyttelsegradering.FORTROLIG,
        });

        const resultat = utledAdressebeskyttelseGradering(FagsakType.NORMAL, barn, søkerData);

        expect(resultat).toBe(Adressebeskyttelsegradering.FORTROLIG);
    });
});
