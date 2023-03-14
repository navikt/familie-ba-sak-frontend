import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useSimulering } from '../../../context/SimuleringContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingSteg } from '../../../typer/behandling';
import type { ITilbakekreving } from '../../../typer/simulering';
import { ToggleNavn } from '../../../typer/toggles';
import { hentSøkersMålform } from '../../../utils/behandling';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';
import TilbakekrevingSkjema from './TilbakekrevingSkjema';

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
    const { fagsakId } = useSakOgBehandlingParams();
    const navigate = useNavigate();
    const {
        hentSkjemadata,
        onSubmit,
        simuleringsresultat,
        tilbakekrevingSkjema,
        harÅpenTilbakekrevingRessurs,
        erMigreringMedStoppISimulering,
        erFeilutbetaling,
        harStoppetMigreringAvvikInnenforBeløpsgrenser,
        erMaks1KroneIAvvikPerBarn,
    } = useSimulering();
    const { vurderErLesevisning, settÅpenBehandling } = useBehandling();
    const { toggles } = useApp();
    const skalIkkeStoppeMigreringsbehandlinger =
        toggles[ToggleNavn.skalIkkeStoppeMigreringsbehandlig];

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
            skalViseNesteKnapp={
                !erMigreringMedStoppISimulering ||
                harStoppetMigreringAvvikInnenforBeløpsgrenser ||
                skalIkkeStoppeMigreringsbehandlinger
            }
            steg={BehandlingSteg.VURDER_TILBAKEKREVING}
        >
            {simuleringsresultat?.status === RessursStatus.SUKSESS ? (
                simuleringsresultat.data.perioder.length === 0 ? (
                    <Alert variant="info">
                        Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                    </Alert>
                ) : (
                    <>
                        <SimuleringPanel simulering={simuleringsresultat.data} />
                        <SimuleringTabell simulering={simuleringsresultat.data} />
                        {(!erMigreringMedStoppISimulering ||
                            harStoppetMigreringAvvikInnenforBeløpsgrenser ||
                            skalIkkeStoppeMigreringsbehandlinger) && (
                            <>
                                {harStoppetMigreringAvvikInnenforBeløpsgrenser &&
                                    (erMaks1KroneIAvvikPerBarn ? (
                                        <StyledBeløpsgrenseAlert variant="warning" size="medium">
                                            Behandlingen medfører avvik i simulering. Ved avvik på
                                            mindre enn totalt 100 kroner, kan du gå videre i
                                            behandlingen. Du må huske å sende oppgave til NØS om at
                                            det ikke skal etterbetales / opprettes kravgrunnlag.
                                        </StyledBeløpsgrenseAlert>
                                    ) : (
                                        <StyledBeløpsgrenseAlert variant="warning" size="medium">
                                            Simuleringen viser en feilutbetaling eller
                                            etterbetaling. Hvis du velger å gå videre i behandlingen
                                            kreves det to-trinnskontroll. Det må sendes manuell
                                            oppgave til NØS for å sikre at det ikke går ut
                                            etterbetaling eller blir opprettet feilutbetalingssak i
                                            migreringsbehandlingen. Hvis bruker skal ha en
                                            etterbetaling eller feilutbetaling, må dette behandles i
                                            en egen revurderingsbehandling med vedtaksbrev til
                                            bruker.
                                        </StyledBeløpsgrenseAlert>
                                    ))}
                                {erFeilutbetaling && (
                                    <TilbakekrevingSkjema
                                        søkerMålform={hentSøkersMålform(åpenBehandling)}
                                        harÅpenTilbakekrevingRessurs={harÅpenTilbakekrevingRessurs}
                                    />
                                )}
                            </>
                        )}
                        {erMigreringMedStoppISimulering &&
                            !harStoppetMigreringAvvikInnenforBeløpsgrenser && (
                                <Alert variant="error">
                                    Utbetalingen må være lik utbetalingen i Infotrygd.
                                    <br />
                                    Du må tilbake og gjøre nødvendige endringer for å komme videre i
                                    behandlingen
                                </Alert>
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
