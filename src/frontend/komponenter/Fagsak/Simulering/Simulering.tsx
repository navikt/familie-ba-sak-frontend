import * as React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useSimulering } from '../../../context/SimuleringContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import { BehandlingSteg, IBehandling } from '../../../typer/behandling';
import { ITilbakekreving } from '../../../typer/simulering';
import { ToggleNavn } from '../../../typer/toggles';
import { hentSøkersMålform } from '../../../utils/behandling';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';
import TilbakekrevingSkjema from './TilbakekrevingSkjema';

interface ISimuleringProps {
    åpenBehandling: IBehandling;
}

const StyledAlertstripe = styled(Alertstripe)`
    margin-bottom: 2rem;
`;

const Simulering: React.FunctionComponent<ISimuleringProps> = ({ åpenBehandling }) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const history = useHistory();
    const {
        hentSkjemadata,
        onSubmit,
        simuleringsresultat,
        tilbakekrevingSkjema,
        harÅpenTilbakekrevingRessurs,
        erMigreringMedStoppISimulering,
        erFeilutbetaling,
    } = useSimulering();
    const { erLesevisning, settÅpenBehandling } = useBehandling();
    const { toggles } = useApp();
    const skalIkkeStoppeMigreringsbehandlinger =
        toggles[ToggleNavn.skalIkkeStoppeMigreringsbehandlig];

    const nesteOnClick = () => {
        if (erLesevisning()) {
            history.push(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/vedtak`);
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
                        history.push(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/vedtak`);
                    }
                }
            );
        }
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/tilkjent-ytelse`);
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
                !erMigreringMedStoppISimulering || skalIkkeStoppeMigreringsbehandlinger
            }
            steg={BehandlingSteg.VURDER_TILBAKEKREVING}
        >
            {simuleringsresultat?.status === RessursStatus.SUKSESS ? (
                simuleringsresultat.data.perioder.length === 0 ? (
                    <Alertstripe type="info">
                        Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                    </Alertstripe>
                ) : (
                    <>
                        <SimuleringPanel simulering={simuleringsresultat.data} />
                        <SimuleringTabell simulering={simuleringsresultat.data} />
                        {(!erMigreringMedStoppISimulering ||
                            skalIkkeStoppeMigreringsbehandlinger) &&
                            erFeilutbetaling && (
                                <TilbakekrevingSkjema
                                    søkerMålform={hentSøkersMålform(åpenBehandling)}
                                    harÅpenTilbakekrevingRessurs={harÅpenTilbakekrevingRessurs}
                                />
                            )}
                        {erMigreringMedStoppISimulering && (
                            <Alertstripe type="feil">
                                Utbetalingen må være lik utbetalingen i Infotrygd.
                                <br />
                                Du må tilbake og gjøre nødvendige endringer for å komme videre i
                                behandlingen
                            </Alertstripe>
                        )}
                    </>
                )
            ) : (
                <Alertstripe type="info">
                    Det har skjedd en feil: {simuleringsresultat?.frontendFeilmelding}
                </Alertstripe>
            )}

            {(tilbakekrevingSkjema.submitRessurs.status === RessursStatus.FEILET ||
                tilbakekrevingSkjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                tilbakekrevingSkjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                <StyledAlertstripe type="feil">
                    Det har skjedd en feil og vi klarte ikke å lagre tilbakekrevingsvalget:{' '}
                    {tilbakekrevingSkjema.submitRessurs.frontendFeilmelding}
                </StyledAlertstripe>
            )}
        </Skjemasteg>
    );
};

export default Simulering;
