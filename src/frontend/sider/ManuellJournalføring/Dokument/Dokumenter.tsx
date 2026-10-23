import { Box, ErrorMessage, Heading, LocalAlert } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { useManuellJournalføringContext } from '../ManuellJournalføringContext';
import { DokumentVelger } from './DokumentVelger';

export function Dokumenter() {
    const { skjema } = useManuellJournalføringContext();

    const finnesDokumentFeilmeldinger =
        skjema.visFeilmeldinger && skjema.felter.dokumenter.valideringsstatus === Valideringsstatus.FEIL;

    return skjema.felter.dokumenter.verdi.length === 0 ? (
        <LocalAlert status="warning">
            <LocalAlert.Header>
                <LocalAlert.Title>Ingen innhold</LocalAlert.Title>
            </LocalAlert.Header>
        </LocalAlert>
    ) : (
        <Box id={skjema.felter.dokumenter.id} marginBlock={'space-40 space-0'}>
            <Heading size={'small'} level={'2'}>
                Dokumenter
            </Heading>
            {skjema.felter.dokumenter.verdi.map((dokument, index) => (
                <DokumentVelger dokument={dokument} key={index} visFeilmeldinger={finnesDokumentFeilmeldinger} />
            ))}

            {finnesDokumentFeilmeldinger && (
                <>
                    <br />
                    <ErrorMessage>{skjema.felter.dokumenter.feilmelding}</ErrorMessage>
                </>
            )}
        </Box>
    );
}
