import * as React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';

const StyledBeløpsgrenseAlert = styled(Alert)`
    margin-top: 2rem;
    width: fit-content;
`;

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
                <StyledBeløpsgrenseAlert variant="warning">
                    Migrering av denne saken gir ingen utbetaling for periodene etter migreringsdato. Når
                    behandlingsresultatet blir 0 kr i alle perioder, får vi ikke simulert mot økonomi for å se
                    eventuelle avvik. Det er derfor viktig at du selv sjekker at det ikke har vært noen utbetalinger fra
                    Infotrygd i disse periodene.
                </StyledBeløpsgrenseAlert>
            )}
            {behandlingErEndreMigreringsdato &&
                (behandlingErMigreringMedAvvikInnenforBeløpsgrenser ||
                    behandlingErMigreringMedAvvikUtenforBeløpsgrenser) && (
                    <StyledBeløpsgrenseAlert variant="warning" size="medium">
                        Simuleringen viser en feilutbetaling eller etterbetaling. Du trenger ikke sende oppgave til NØS,
                        da beløpet ikke sendes til oppdrag. Hvis bruker skal ha en etterbetaling eller feilutbetaling må
                        dette behandles i en egen revurderingsbehandling med vedtaksbrev til bruker.
                    </StyledBeløpsgrenseAlert>
                )}
            {!behandlingErEndreMigreringsdato && behandlingErMigreringMedAvvikInnenforBeløpsgrenser && (
                <StyledBeløpsgrenseAlert variant="warning" size="medium">
                    Behandlingen medfører avvik i simulering. Ved avvik på mindre enn totalt 100 kroner, kan du gå
                    videre i behandlingen uten totrinnskontroll. Du må huske å sende oppgave til NØS om at det ikke skal
                    etterbetales / opprettes kravgrunnlag.
                </StyledBeløpsgrenseAlert>
            )}
            {!behandlingErEndreMigreringsdato && behandlingErMigreringMedAvvikUtenforBeløpsgrenser && (
                <StyledBeløpsgrenseAlert variant="warning" size="medium">
                    Simuleringen viser en feilutbetaling eller etterbetaling. Hvis du velger å gå videre i behandlingen
                    kreves det totrinnskontroll. Det må sendes manuell oppgave til NØS for å sikre at det ikke går ut
                    etterbetaling eller blir opprettet feilutbetalingssak i migreringsbehandlingen. Hvis bruker skal ha
                    en etterbetaling eller feilutbetaling, må dette behandles i en egen revurderingsbehandling med
                    vedtaksbrev til bruker.
                </StyledBeløpsgrenseAlert>
            )}
            {!behandlingErEndreMigreringsdato && behandlingErMigreringMedManuellePosteringer && (
                <StyledBeløpsgrenseAlert variant="warning" size="medium">
                    Det finnes manuelle posteringer tilknyttet tidligere behandling. Hvis du velger å gå videre i
                    behandlingen kreves det totrinnskontroll.
                </StyledBeløpsgrenseAlert>
            )}
        </>
    );
};
