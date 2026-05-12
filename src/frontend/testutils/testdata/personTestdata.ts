import { type IPersonMedAndelerTilkjentYtelse, YtelseType } from '@typer/beregning';
import { Adressebeskyttelsegradering, type IGrunnlagPerson, type IPersonInfo, PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';

import { kjønnType } from '@navikt/familie-typer';

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
        harFalskIdentitet: false,
        ...person,
    };
}

export function lagGrunnlagPerson(person: Partial<IGrunnlagPerson> = {}): IGrunnlagPerson {
    return {
        fødselsdato: '1995-01-01',
        kjønn: kjønnType.MANN,
        navn: 'Test Testersen',
        personIdent: '12345678903',
        registerhistorikk: undefined,
        type: PersonType.SØKER,
        målform: Målform.NB,
        dødsfallDato: undefined,
        erManueltLagtTilISøknad: false,
        harFalskIdentitet: false,
        skjermesForBruker: false,
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
