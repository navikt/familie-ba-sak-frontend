import { kjønnType } from '@navikt/familie-typer';

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

export * as PersonTestdata from './personTestdata';
