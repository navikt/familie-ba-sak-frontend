import { kjønnType } from '@navikt/familie-typer';

import { type IPersonMedAndelerTilkjentYtelse, YtelseType } from '../../typer/beregning';
import { Adressebeskyttelsegradering, type IPersonInfo, PersonType } from '../../typer/person';

export function lagPerson(person: Partial<IPersonInfo> = {}): IPersonInfo {
    return {
        kommunenummer: '0001',
        adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
        harTilgang: true,
        forelderBarnRelasjon: [],
        forelderBarnRelasjonMaskert: [],
        fødselsdato: '1995-01-01',
        kjønn: kjønnType.MANN,
        navn: 'Test Testersen',
        personIdent: '12345678903',
        type: PersonType.SØKER,
        dødsfallDato: undefined,
        bostedsadresse: undefined,
        erEgenAnsatt: false,
        ...person,
    };
}

export function lagPersonMedAndelerTilkjentYtelse(
    person: Partial<IPersonMedAndelerTilkjentYtelse>
): IPersonMedAndelerTilkjentYtelse {
    return {
        personIdent: '12345678910',
        ytelsePerioder: [
            {
                beløp: 1000,
                stønadFom: '2020-01-01',
                stønadTom: '2038-12-31',
                ytelseType: YtelseType.ORDINÆR_BARNETRYGD,
                skalUtbetales: true,
            },
        ],
        beløp: 1000,
        stønadFom: '2020-01-01',
        stønadTom: '2038-12-31',
        ...person,
    };
}

export * as PersonTestdata from './personTestdata';
