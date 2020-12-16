import React from 'react';

import { kjønnType, RessursStatus } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';
import { formaterPersonIdent, hentAlder } from '../../utils/formatter';

export const BrukerHeader: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføring();
    const person =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.person
            : undefined;
    return (
        <Visittkort
            navn={person?.navn || 'Ukjent bruker'}
            ident={formaterPersonIdent(person?.personIdent || '')}
            alder={hentAlder(person?.fødselsdato || '')}
            kjønn={person?.kjønn || kjønnType.UKJENT}
        />
    );
};
