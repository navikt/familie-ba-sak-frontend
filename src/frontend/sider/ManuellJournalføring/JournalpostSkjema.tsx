import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorMessage, ErrorSummary, HStack, LocalAlert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import { BrukerOgAvsender } from '@sider/ManuellJournalføring/BrukerOgAvsender';
import { Journalpost } from '@sider/ManuellJournalføring/Journalpost';
import { FagsakType } from '@typer/fagsak';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Dokumenter } from './Dokument/Dokumenter';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';

export function JournalpostSkjema() {
    const {
        skjema,
        journalfør,
        erLesevisning,
        hentFeilTilOppsummering,
        lukkOppgaveOgKnyttJournalpostTilBehandling,
        kanKnytteJournalpostTilBehandling,
    } = useManuellJournalføringContext();

    const navigate = useNavigate();
    const [valideringsfeilmelding, settValideringsfeilmelding] = useState<string>('');

    const validerOgJournalfør = (): void => {
        if (skjema.felter.fagsakType.verdi === FagsakType.INSTITUSJON && skjema.felter.samhandler.verdi === undefined) {
            settValideringsfeilmelding(
                'Det er registrert at søker er institusjon. For å journalføre, må fagsak av typen institusjon først opprettes i saksbehandlingsløsningen. Deretter kan fagsaken velges i nedtrekkslisten i bruker/søker-panelet over.'
            );
        } else {
            journalfør();
        }
    };

    return (
        <Box padding={'space-32'} overflowY={'scroll'}>
            <Journalpost />
            <Dokumenter />
            <BrukerOgAvsender />
            {kanKnytteJournalpostTilBehandling() && <KnyttJournalpostTilBehandling />}

            <br />
            {(skjema.submitRessurs.status === RessursStatus.FEILET ||
                skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>{skjema.submitRessurs.frontendFeilmelding}</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
            {skjema.visFeilmeldinger && hentFeilTilOppsummering().length > 0 && (
                <ErrorSummary heading={'For å gå videre må du rette opp følgende'} size="small">
                    {hentFeilTilOppsummering().map(item => (
                        <ErrorSummary.Item href={`#${item.skjemaelementId}`} key={item.skjemaelementId}>
                            {item.feilmelding}
                        </ErrorSummary.Item>
                    ))}
                </ErrorSummary>
            )}

            <HStack marginBlock="space-16 space-0" justify="space-between">
                <Button
                    size="small"
                    variant={'secondary'}
                    onClick={() => navigate(`/oppgaver`)}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    icon={erLesevisning() && <ChevronLeftIcon />}
                >
                    {erLesevisning() ? 'Tilbake' : 'Avbryt'}
                </Button>
                {!erLesevisning() && (
                    <Button
                        size="small"
                        variant="primary"
                        onClick={validerOgJournalfør}
                        loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    >
                        Journalfør
                    </Button>
                )}
                {erLesevisning() && kanKnytteJournalpostTilBehandling() && (
                    <Button
                        size="small"
                        variant="primary"
                        onClick={lukkOppgaveOgKnyttJournalpostTilBehandling}
                        loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    >
                        Ferdigstill oppgave
                    </Button>
                )}
            </HStack>
            {valideringsfeilmelding && <ErrorMessage>{valideringsfeilmelding}</ErrorMessage>}
        </Box>
    );
}
