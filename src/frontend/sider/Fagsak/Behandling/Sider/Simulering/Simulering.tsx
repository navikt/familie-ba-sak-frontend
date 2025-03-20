import * as React from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import AvregningAlert from './AvregningAlert';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';
import TilbakekrevingSkjema from './TilbakekrevingSkjema';
import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useSimulering } from '../../../../../context/SimuleringContext';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingSteg } from '../../../../../typer/behandling';
import type { ITilbakekreving } from '../../../../../typer/simulering';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentSøkersMålform } from '../../../../../utils/behandling';
import Skjemasteg from '../Skjemasteg';

interface ISimuleringProps {
    åpenBehandling: IBehandling;
}

const StyledAlert = styled(Alert)`
    margin-bottom: 2rem;
`;

const StyledBeløpsgrenseAlert = styled(Alert)`
    margin-top: 2rem;
    width: fit-content;
`;

const Simulering: React.FunctionComponent<ISimuleringProps> = ({ åpenBehandling }) => {
    const { toggles } = useApp();
    const { fagsakId } = useSakOgBehandlingParams();
    const navigate = useNavigate();
    const {
        hentSkjemadata,
        onSubmit,
        simuleringsresultat,
        tilbakekrevingSkjema,
        harÅpenTilbakekrevingRessurs,
        erFeilutbetaling,
        erAvregning,
        behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
        behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
        behandlingErMigreringMedManuellePosteringer,
        behandlingErMigreringFraInfotrygdMedKun0Utbetalinger,
        behandlingErEndreMigreringsdato,
    } = useSimulering();
    const { vurderErLesevisning, settÅpenBehandling } = useBehandling();

    const erAvregningOgToggleErPå =
        erAvregning && toggles[ToggleNavn.brukFunksjonalitetForUlovfestetMotregning];

    const nesteOnClick = () => {
        if (vurderErLesevisning()) {
            navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/vedtak`);
        } else {
            onSubmit<ITilbakekreving | undefined>(
                {
                    data: hentSkjemadata(),
                    method: 'POST',
                    url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/steg/tilbakekreving`,
                },
                (ressurs: Ressurs<IBehandling>) => {
                    if (ressurs.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(ressurs);
                        navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/vedtak`);
                    }
                }
            );
        }
    };

    const forrigeOnClick = () => {
        navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/tilkjent-ytelse`);
    };

    if (
        simuleringsresultat.status === RessursStatus.HENTER ||
        simuleringsresultat.status === RessursStatus.IKKE_HENTET
    ) {
        return <div />;
    }

    return (
        <Skjemasteg
            senderInn={tilbakekrevingSkjema.submitRessurs.status === RessursStatus.HENTER}
            tittel="Simulering"
            className="simulering"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
            steg={BehandlingSteg.VURDER_TILBAKEKREVING}
            skalDisableNesteKnapp={erAvregningOgToggleErPå}
        >
            {behandlingErMigreringFraInfotrygdMedKun0Utbetalinger && (
                <StyledAlert variant={'warning'}>
                    Migrering av denne saken gir ingen utbetaling for periodene etter
                    migreringsdato. Når behandlingsresultatet blir 0 kr i alle perioder, får vi ikke
                    simulert mot økonomi for å se eventuelle avvik. Det er derfor viktig at du selv
                    sjekker at det ikke har vært noen utbetalinger fra Infotrygd i disse periodene.
                </StyledAlert>
            )}
            {simuleringsresultat?.status === RessursStatus.SUKSESS ? (
                simuleringsresultat.data.perioder.length === 0 ? (
                    <StyledAlert variant="info">
                        Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                    </StyledAlert>
                ) : (
                    <>
                        <SimuleringPanel simulering={simuleringsresultat.data} />
                        <SimuleringTabell simulering={simuleringsresultat.data} />
                        {behandlingErEndreMigreringsdato &&
                            (behandlingErMigreringMedAvvikUtenforBeløpsgrenser ||
                                behandlingErMigreringMedAvvikUtenforBeløpsgrenser) && (
                                <StyledBeløpsgrenseAlert variant="warning" size="medium">
                                    Simuleringen viser en feilutbetaling eller etterbetaling. Du
                                    trenger ikke sende oppgave til NØS, da beløpet ikke sendes til
                                    oppdrag. Hvis bruker skal ha en etterbetaling eller
                                    feilutbetaling må dette behandles i en egen
                                    revurderingsbehandling med vedtaksbrev til bruker.
                                </StyledBeløpsgrenseAlert>
                            )}
                        {!behandlingErEndreMigreringsdato &&
                            behandlingErMigreringMedAvvikInnenforBeløpsgrenser && (
                                <StyledBeløpsgrenseAlert variant="warning" size="medium">
                                    Behandlingen medfører avvik i simulering. Ved avvik på mindre
                                    enn totalt 100 kroner, kan du gå videre i behandlingen uten
                                    totrinnskontroll. Du må huske å sende oppgave til NØS om at det
                                    ikke skal etterbetales / opprettes kravgrunnlag.
                                </StyledBeløpsgrenseAlert>
                            )}
                        {!behandlingErEndreMigreringsdato &&
                            behandlingErMigreringMedAvvikUtenforBeløpsgrenser && (
                                <StyledBeløpsgrenseAlert variant="warning" size="medium">
                                    Simuleringen viser en feilutbetaling eller etterbetaling. Hvis
                                    du velger å gå videre i behandlingen kreves det
                                    to-trinnskontroll. Det må sendes manuell oppgave til NØS for å
                                    sikre at det ikke går ut etterbetaling eller blir opprettet
                                    feilutbetalingssak i migreringsbehandlingen. Hvis bruker skal ha
                                    en etterbetaling eller feilutbetaling, må dette behandles i en
                                    egen revurderingsbehandling med vedtaksbrev til bruker.
                                </StyledBeløpsgrenseAlert>
                            )}

                        {!behandlingErEndreMigreringsdato &&
                            behandlingErMigreringMedManuellePosteringer && (
                                <StyledBeløpsgrenseAlert variant="warning" size="medium">
                                    Det finnes manuelle posteringer tilknyttet tidligere behandling.
                                    Hvis du velger å gå videre i behandlingen kreves det
                                    to-trinnskontroll.
                                </StyledBeløpsgrenseAlert>
                            )}
                        {erAvregningOgToggleErPå && <AvregningAlert />}
                        {erFeilutbetaling && (
                            <TilbakekrevingSkjema
                                søkerMålform={hentSøkersMålform(åpenBehandling)}
                                harÅpenTilbakekrevingRessurs={harÅpenTilbakekrevingRessurs}
                                åpenBehandling={åpenBehandling}
                            />
                        )}
                    </>
                )
            ) : (
                <Alert variant="info">
                    Det har skjedd en feil: {simuleringsresultat?.frontendFeilmelding}
                </Alert>
            )}

            {(tilbakekrevingSkjema.submitRessurs.status === RessursStatus.FEILET ||
                tilbakekrevingSkjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                tilbakekrevingSkjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                <StyledAlert variant="error">
                    Det har skjedd en feil og vi klarte ikke å lagre tilbakekrevingsvalget:{' '}
                    {tilbakekrevingSkjema.submitRessurs.frontendFeilmelding}
                </StyledAlert>
            )}
        </Skjemasteg>
    );
};

export default Simulering;
