import React from 'react';

import { Alert, ErrorMessage } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';
import { DokumentVelger } from './DokumentVelger';

export const Dokumenter: React.FC = () => {
    const { skjema } = useManuellJournalfør();

    return skjema.felter.dokumenter.verdi.length === 0 ? (
        <Alert variant="warning" children={'Ingen innhold'} />
    ) : (
        <div id={skjema.felter.dokumenter.id}>
            {skjema.felter.dokumenter.verdi.map((dokument, index) => (
                <DokumentVelger
                    dokument={dokument}
                    key={index}
                    visFeilmeldinger={
                        skjema.visFeilmeldinger &&
                        skjema.felter.dokumenter.valideringsstatus === Valideringsstatus.FEIL
                    }
                />
            ))}

            {skjema.visFeilmeldinger &&
                skjema.felter.dokumenter.valideringsstatus === Valideringsstatus.FEIL && (
                    <>
                        <br />
                        <ErrorMessage>{skjema.felter.dokumenter.feilmelding}</ErrorMessage>
                    </>
                )}
        </div>
    );
};
