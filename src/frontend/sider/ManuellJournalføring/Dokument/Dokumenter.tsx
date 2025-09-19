import React from 'react';

import { Alert, ErrorMessage } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';

import { DokumentVelger } from './DokumentVelger';
import { useManuellJournalføringContext } from '../ManuellJournalføringContext';

export const Dokumenter: React.FC = () => {
    const { skjema } = useManuellJournalføringContext();

    return skjema.felter.dokumenter.verdi.length === 0 ? (
        <Alert variant="warning" children={'Ingen innhold'} />
    ) : (
        <div id={skjema.felter.dokumenter.id}>
            {skjema.felter.dokumenter.verdi.map((dokument, index) => (
                <DokumentVelger
                    dokument={dokument}
                    key={index}
                    visFeilmeldinger={
                        skjema.visFeilmeldinger && skjema.felter.dokumenter.valideringsstatus === Valideringsstatus.FEIL
                    }
                />
            ))}

            {skjema.visFeilmeldinger && skjema.felter.dokumenter.valideringsstatus === Valideringsstatus.FEIL && (
                <>
                    <br />
                    <ErrorMessage>{skjema.felter.dokumenter.feilmelding}</ErrorMessage>
                </>
            )}
        </div>
    );
};
