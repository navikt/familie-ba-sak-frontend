import React from 'react';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { EmailIkon } from '../../ikoner/EmailIkon';
import { Deltager } from './Deltager';

export const AvsenderPanel: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføringV2();
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const avsender = dataForManuellJournalføring.data.journalpost.avsenderMottaker;
            const navn = avsender?.navn || 'Ukjent avsender';
            const type = avsender?.type || 'Ukjent avsenderstype';
            const ident = avsender?.id || 'Ukjent avsenderident';
            return <Deltager ikon={<EmailIkon />} navn={navn} type={type} ident={ident}></Deltager>;
        default:
            return <></>;
    }
};
