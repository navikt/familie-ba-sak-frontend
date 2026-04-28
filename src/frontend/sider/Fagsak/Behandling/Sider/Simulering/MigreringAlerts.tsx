import * as React from 'react';

import { Box, LocalAlert } from '@navikt/ds-react';

interface IProps {
    behandlingErEndreMigreringsdato: boolean;
    behandlingErMigreringMedAvvikInnenforBeløpsgrenser: boolean;
    behandlingErMigreringMedAvvikUtenforBeløpsgrenser: boolean;
    behandlingErMigreringMedManuellePosteringer: boolean | undefined;
    behandlingErMigreringFraInfotrygdMedKun0Utbetalinger: boolean;
}

export const MigreringAlerts = ({
    behandlingErEndreMigreringsdato,
    behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
    behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
    behandlingErMigreringMedManuellePosteringer,
    behandlingErMigreringFraInfotrygdMedKun0Utbetalinger,
}: IProps) => {
    return (
        <>
            {behandlingErMigreringFraInfotrygdMedKun0Utbetalinger && (
                <Box marginBlock={'space-32 space-0'} maxWidth={'48rem'}>
                    <LocalAlert status="warning">
                        <LocalAlert.Header>
                            <LocalAlert.Title>
                                Migrering av denne saken gir ingen utbetaling for periodene etter migreringsdato.
                            </LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>
                            Når behandlingsresultatet blir 0 kr i alle perioder, får vi ikke simulert mot økonomi for å
                            se eventuelle avvik. Det er derfor viktig at du selv sjekker at det ikke har vært noen
                            utbetalinger fra Infotrygd i disse periodene.
                        </LocalAlert.Content>
                    </LocalAlert>
                </Box>
            )}
            {behandlingErMigreringFraInfotrygdMedKun0Utbetalinger && (
                <Box marginBlock={'space-32 space-0'} maxWidth={'48rem'}>
                    <LocalAlert status="warning">
                        <LocalAlert.Header>
                            <LocalAlert.Title>
                                Simuleringen viser en feilutbetaling eller etterbetaling.
                            </LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>
                            Du trenger ikke sende oppgave til NØS, da beløpet ikke sendes til oppdrag. Hvis bruker skal
                            ha en etterbetaling eller feilutbetaling må dette behandles i en egen revurderingsbehandling
                            med vedtaksbrev til bruker.
                        </LocalAlert.Content>
                    </LocalAlert>
                </Box>
            )}
            {behandlingErEndreMigreringsdato &&
                (behandlingErMigreringMedAvvikInnenforBeløpsgrenser ||
                    behandlingErMigreringMedAvvikUtenforBeløpsgrenser) && (
                    <Box marginBlock={'space-32 space-0'} maxWidth={'48rem'}>
                        <LocalAlert status="warning">
                            <LocalAlert.Header>
                                <LocalAlert.Title>Behandlingen medfører avvik i simulering.</LocalAlert.Title>
                            </LocalAlert.Header>
                            <LocalAlert.Content>
                                Ved avvik på mindre enn totalt 100 kroner, kan du gå videre i behandlingen uten
                                totrinnskontroll. Du må huske å sende oppgave til NØS om at det ikke skal etterbetales /
                                opprettes kravgrunnlag.
                            </LocalAlert.Content>
                        </LocalAlert>
                    </Box>
                )}
            {!behandlingErEndreMigreringsdato && behandlingErMigreringMedAvvikUtenforBeløpsgrenser && (
                <Box marginBlock={'space-32 space-0'} maxWidth={'48rem'}>
                    <LocalAlert status="warning">
                        <LocalAlert.Header>
                            <LocalAlert.Title>
                                Simuleringen viser en feilutbetaling eller etterbetaling.
                            </LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>
                            Hvis du velger å gå videre i behandlingen kreves det totrinnskontroll. Det må sendes manuell
                            oppgave til NØS for å sikre at det ikke går ut etterbetaling eller blir opprettet
                            feilutbetalingssak i migreringsbehandlingen. Hvis bruker skal ha en etterbetaling eller
                            feilutbetaling, må dette behandles i en egen revurderingsbehandling med vedtaksbrev til
                            bruker.
                        </LocalAlert.Content>
                    </LocalAlert>
                </Box>
            )}
            {!behandlingErEndreMigreringsdato && behandlingErMigreringMedManuellePosteringer && (
                <Box marginBlock={'space-32 space-0'} maxWidth={'48rem'}>
                    <LocalAlert status="warning">
                        <LocalAlert.Header>
                            <LocalAlert.Title>
                                Det finnes manuelle posteringer tilknyttet tidligere behandling.
                            </LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>
                            Hvis du velger å gå videre i behandlingen kreves det totrinnskontroll.
                        </LocalAlert.Content>
                    </LocalAlert>
                </Box>
            )}
        </>
    );
};
