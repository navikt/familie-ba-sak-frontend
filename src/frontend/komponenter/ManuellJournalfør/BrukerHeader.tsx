import React from 'react';

import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { formaterIdent, hentAlder } from '../../utils/formatter';

export const BrukerHeader: React.FC = () => {
    const { skjema } = useManuellJournalfør();

    return (
        <Visittkort
            navn={skjema.felter.bruker.verdi?.navn || 'Ukjent bruker'}
            ident={formaterIdent(skjema.felter.bruker.verdi?.personIdent || '')}
            alder={hentAlder(skjema.felter.bruker.verdi?.fødselsdato || '')}
            kjønn={skjema.felter.bruker.verdi?.kjønn || kjønnType.UKJENT}
        />
    );
};
