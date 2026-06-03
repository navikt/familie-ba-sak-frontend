import { useState } from 'react';

import { FagsakType } from '@typer/fagsak';
import type { OppgavetypeFilter } from '@typer/oppgave';
import { oppgaveTypeFilter } from '@typer/oppgave';
import { useNavigate } from 'react-router';

import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorMessage, ErrorSummary, Heading, LocalAlert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokument/Dokumenter';
import Journalpost from './Journalpost';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';
import Knapperekke from '../../komponenter/Knapperekke';

export const JournalpostSkjema = () => {
    const {
        dataForManuellJournalføring,
        skjema,
        journalfør,
        hentFeilTilOppsummering,
        erLesevisning,
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
            {dataForManuellJournalføring.status === RessursStatus.SUKSESS && (
                <Heading spacing size="medium" level="2">
                    {
                        oppgaveTypeFilter[
                            dataForManuellJournalføring.data.oppgave.oppgavetype as keyof typeof OppgavetypeFilter
                        ].navn
                    }
                </Heading>
            )}
            <Journalpost />
            <Box marginBlock={'space-40 space-0'}>
                <Heading size={'small'} level={'2'} children={'Dokumenter'} />
                <Dokumenter />
            </Box>
            <Box marginBlock={'space-40 space-0'}>
                <Heading size={'small'} level={'2'} children={'Bruker og avsender'} />
                <BrukerPanel />
                <br />
                <AvsenderPanel />
            </Box>

            <Box marginBlock={'space-40 space-0'}>
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
                            <ErrorSummary.Item href={`#${item.skjemaelementId}`}>{item.feilmelding}</ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}
            </Box>

            <Knapperekke>
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
            </Knapperekke>
            {valideringsfeilmelding && <ErrorMessage>{valideringsfeilmelding}</ErrorMessage>}
        </Box>
    );
};
