import * as React from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { MigreringAlerts } from './MigreringAlerts';
import { useSimuleringContext } from './SimuleringContext';
import TilbakekrevingSkjema from './TilbakekrevingSkjema';
import { useAppContext } from '../../../../../context/AppContext';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import { BehandlingSteg, type IBehandling } from '../../../../../typer/behandling';
import type { ITilbakekreving } from '../../../../../typer/simulering';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentSøkersMålform } from '../../../../../utils/behandling';
import { useBehandlingContext } from '../../context/BehandlingContext';
import Skjemasteg from '../Skjemasteg';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';
import { TilbakekrevingsvedtakMotregning } from './UlovfestetMotregning/TilbakekrevingsvedtakMotregning';

interface ISimuleringProps {
    åpenBehandling: IBehandling;
}

const StyledAlert = styled(Alert)`
    margin-bottom: 2rem;
`;

const Simulering: React.FunctionComponent<ISimuleringProps> = ({ åpenBehandling }) => {
    const { toggles } = useAppContext();
    const { fagsakId } = useSakOgBehandlingParams();
    const navigate = useNavigate();
    const {
        hentSkjemadata,
        onSubmit,
        simuleringsresultat,
        tilbakekrevingSkjema,
        harÅpenTilbakekrevingRessurs,
        erFeilutbetaling,
        avregningsperioder,
        behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
        behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
        behandlingErMigreringMedManuellePosteringer,
        behandlingErMigreringFraInfotrygdMedKun0Utbetalinger,
        behandlingErEndreMigreringsdato,
    } = useSimuleringContext();
    const { vurderErLesevisning, settÅpenBehandling } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    const erAvregningOgToggleErPå =
        avregningsperioder.length > 0 &&
        toggles[ToggleNavn.brukFunksjonalitetForUlovfestetMotregning];

    const nesteOnClick = () => {
        if (erLesevisning) {
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

    const tilbakekrevingsvedtakMotregning = åpenBehandling.tilbakekrevingsvedtakMotregning;

    const heleBeløpetSkalKrevesTilbake =
        tilbakekrevingsvedtakMotregning?.heleBeløpetSkalKrevesTilbake === true;

    const skalDisableNesteKnapp = erAvregningOgToggleErPå && !heleBeløpetSkalKrevesTilbake;

    const skalViseTilbakekrevingSkjema =
        erFeilutbetaling && (!erAvregningOgToggleErPå || heleBeløpetSkalKrevesTilbake);

    return (
        <Skjemasteg
            senderInn={tilbakekrevingSkjema.submitRessurs.status === RessursStatus.HENTER}
            tittel="Simulering"
            className="simulering"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
            steg={BehandlingSteg.VURDER_TILBAKEKREVING}
            skalDisableNesteKnapp={skalDisableNesteKnapp}
        >
            {simuleringsresultat?.status === RessursStatus.SUKSESS ? (
                simuleringsresultat.data.perioder.length === 0 ? (
                    <StyledAlert variant="info">
                        Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                    </StyledAlert>
                ) : (
                    <>
                        <SimuleringPanel simulering={simuleringsresultat.data} />
                        <SimuleringTabell simulering={simuleringsresultat.data} />

                        <MigreringAlerts
                            behandlingErEndreMigreringsdato={behandlingErEndreMigreringsdato}
                            behandlingErMigreringMedAvvikInnenforBeløpsgrenser={
                                behandlingErMigreringMedAvvikInnenforBeløpsgrenser
                            }
                            behandlingErMigreringMedAvvikUtenforBeløpsgrenser={
                                behandlingErMigreringMedAvvikUtenforBeløpsgrenser
                            }
                            behandlingErMigreringMedManuellePosteringer={
                                behandlingErMigreringMedManuellePosteringer
                            }
                            behandlingErMigreringFraInfotrygdMedKun0Utbetalinger={
                                behandlingErMigreringFraInfotrygdMedKun0Utbetalinger
                            }
                        />

                        {erAvregningOgToggleErPå && (
                            <TilbakekrevingsvedtakMotregning
                                åpenBehandling={åpenBehandling}
                                tilbakekrevingsvedtakMotregning={tilbakekrevingsvedtakMotregning}
                                avregningsperioder={avregningsperioder}
                                harÅpenTilbakekrevingRessurs={harÅpenTilbakekrevingRessurs}
                            />
                        )}

                        {skalViseTilbakekrevingSkjema && (
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
