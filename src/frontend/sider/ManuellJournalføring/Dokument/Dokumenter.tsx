import { ErrorMessage, LocalAlert } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { useManuellJournalføringContext } from '../ManuellJournalføringContext';
import { DokumentVelger } from './DokumentVelger';

export const Dokumenter = () => {
    const { skjema } = useManuellJournalføringContext();

    return skjema.felter.dokumenter.verdi.length === 0 ? (
        <LocalAlert status="warning">
            <LocalAlert.Header>
                <LocalAlert.Title>Ingen innhold</LocalAlert.Title>
            </LocalAlert.Header>
        </LocalAlert>
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
