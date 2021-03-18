import React from 'react';

import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';
import { DokumentVelger } from './DokumentVelger';

export const Dokumenter: React.FC = () => {
    const { skjema } = useManuellJournalfør();

    return (
        <div>
            {skjema.felter.dokumenter.verdi.length === 0 ? (
                <AlertStripeAdvarsel children={'Ingen innhold'} />
            ) : (
                skjema.felter.dokumenter.verdi.map((dokument, index) => (
                    <DokumentVelger dokument={dokument} key={index} />
                ))
            )}
        </div>
    );
};
