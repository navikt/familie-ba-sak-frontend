import { kjønnType } from '@navikt/familie-typer';

import { IGrunnlagPerson, PersonType } from '../../../typer/person';
import { Målform } from '../../../typer/søknad';

export const mockBarn: IGrunnlagPerson = {
    personIdent: '12345678903',
    fødselsdato: '2006-11-20',
    type: PersonType.BARN,
    kjønn: 'KVINNE' as kjønnType,
    navn: 'Mock Barn',
    målform: Målform.NB,
};

export const mockSøker: IGrunnlagPerson = {
    personIdent: '12345678930',
    fødselsdato: '1979-01-14',
    type: PersonType.SØKER,
    kjønn: 'KVINNE' as kjønnType,
    navn: 'Mock Søker',
    målform: Målform.NB,
};
