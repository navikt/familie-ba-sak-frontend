import { ArrowUndoIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading, InlineMessage } from '@navikt/ds-react';
import { EndreFagsaktypeFelt } from '@sider/ManuellJournalføring/felter/EndreFagsaktypeFelt';
import { EndreInstitusjonFelt } from '@sider/ManuellJournalføring/felter/EndreInstitusjonFelt';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { FagsakType } from '@typer/fagsak';

interface Props {
    nullstillFagsaktype: () => void;
    valgtInstitusjon: string;
    settValgtInstitusjon: (orgnummer: string) => void;
    settSamhandlerFeilmelding: (feilmelding: string) => void;
}

export function EndreFagsaktypeSkjema({
    nullstillFagsaktype,
    valgtInstitusjon,
    settValgtInstitusjon,
    settSamhandlerFeilmelding,
}: Props) {
    const { skjema } = useManuellJournalføringContext();

    const erBrukerPåInstitusjon = skjema.felter.fagsakType.verdi === FagsakType.INSTITUSJON;

    return (
        <>
            <EndreFagsaktypeFelt settValgtInstitusjon={settValgtInstitusjon} />
            {erBrukerPåInstitusjon && (
                <EndreInstitusjonFelt
                    valgtInstitusjon={valgtInstitusjon}
                    settValgtInstitusjon={settValgtInstitusjon}
                    settSamhandlerFeilmelding={settSamhandlerFeilmelding}
                />
            )}
            {skjema.felter.fagsakType.verdi !== FagsakType.NORMAL && (
                <Button variant="tertiary" size="xsmall" onClick={nullstillFagsaktype} icon={<ArrowUndoIcon />}>
                    Tilbakestill
                </Button>
            )}

            {valgtInstitusjon === 'ny-institusjon' && (
                <Box marginBlock={'space-32 space-0'}>
                    <InlineMessage status="warning">
                        <Heading size="xsmall" level="3">
                            Institusjonssak på bruker må opprettes
                        </Heading>
                        For å journalføre dokumentet, må ny fagsak av typen institusjon opprettes via
                        saksbehandlerløsningen. Når fagsaken er tilknyttet godkjent institusjon, kan dokumentet
                        journalføres.
                    </InlineMessage>
                </Box>
            )}
        </>
    );
}
