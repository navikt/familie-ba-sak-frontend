import { RessursStatus } from '@navikt/familie-typer';
import React from 'react';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { EmailIkon } from '../../ikoner/EmailIkon';
import { Deltager } from './Deltager';

export const AvsenderPanel: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføringV2();
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const navn = 'Sender navn';
            const type = 'Sender';
            const ident = '123456 11111';
            return <Deltager ikon={<EmailIkon />} navn={navn} type={type} ident={ident}></Deltager>;
        default:
            return <></>;
    }
};
