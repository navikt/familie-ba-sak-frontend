import React from 'react';

import { FamilieInput } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { EmailIkon } from '../../ikoner/EmailIkon';
import { Deltager } from './Deltager';

export const AvsenderPanel: React.FC = () => {
    const { dataForManuellJournalføring, settAvsender } = useManuellJournalføringV2();
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const avsender = dataForManuellJournalføring.data.journalpost.avsenderMottaker;
            const navn = avsender?.navn || 'Ukjent';
            const ident = avsender?.id || 'Ukjent';
            return (
                <Deltager ikon={<EmailIkon />} navn={navn} ident={ident} undertittel="Avsender">
                    <FamilieInput
                        erLesevisning={false}
                        id={'avsender'}
                        label={'Skriv inn avsender'}
                        bredde={'XL'}
                        placeholder={'avsender'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (dataForManuellJournalføring.data.journalpost.avsenderMottaker) {
                                settAvsender(event.target.value);
                            }
                        }}
                    />
                </Deltager>
            );
        default:
            return <></>;
    }
};
