import type { kjønnType } from '@navikt/familie-typer';

import type { IGrunnlagPerson } from '../../../typer/person';
import { PersonType } from '../../../typer/person';
import { Målform } from '../../../typer/søknad';

export const mockBarn: IGrunnlagPerson = {
    personIdent: '12345678903',
    fødselsdato: '2006-11-20',
    type: PersonType.BARN,
    kjønn: 'KVINNE' as kjønnType,
    navn: 'Mock Barn',
    målform: Målform.NB,
};

interface IMockSøker {
    målform?: Målform;
    personIdent?: string;
}

export const mockSøker = ({
    målform = Målform.NB,
    personIdent = '12345678930',
}: IMockSøker = {}): IGrunnlagPerson => ({
    personIdent: personIdent,
    fødselsdato: '1979-01-14',
    type: PersonType.SØKER,
    kjønn: 'KVINNE' as kjønnType,
    navn: 'Mock Søker',
    målform: målform,
});
