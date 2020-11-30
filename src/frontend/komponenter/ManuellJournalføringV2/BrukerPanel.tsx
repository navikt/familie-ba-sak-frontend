import { RessursStatus } from '@navikt/familie-typer';
import React from 'react';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { KontoSirkel } from '../../ikoner/KontoSirkel';
import { Deltager } from './Deltager';

export const BrukerPanel: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføringV2();
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const bruker = dataForManuellJournalføring.data.person;
            const navn = bruker?.navn || 'Ingen brukernavn';
            const type = bruker?.type || 'Ingen brukertype';
            const ident = bruker?.personIdent || 'Ingen brukerident';
            return (
                <Deltager ikon={<KontoSirkel />} navn={navn} type={type} ident={ident}></Deltager>
            );
        default:
            return <></>;
    }
};
