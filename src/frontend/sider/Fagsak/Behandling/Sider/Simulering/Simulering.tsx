import * as React from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Alert, Box } from '@navikt/ds-react';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { MigreringAlerts } from './MigreringAlerts';
import { useSimuleringContext } from './SimuleringContext';
import TilbakekrevingSkjema from './TilbakekrevingSkjema';
import { useAppContext } from '../../../../../context/AppContext';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import { BehandlingSteg, type IBehandling, SettPåVentÅrsak } from '../../../../../typer/behandling';
import type { ITilbakekreving } from '../../../../../typer/simulering';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentSøkersMålform } from '../../../../../utils/behandling';
import { useBehandlingContext } from '../../context/BehandlingContext';
import Skjemasteg from '../Skjemasteg';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';
import AvregningAlert from './UlovfestetMotregning/AvregningAlert';
import { ForenkletTilbakekrevingsvedtak } from './UlovfestetMotregning/ForenkletTilbakekrevingsvedtak';
import { useForenkletTilbakekrevingsvedtak } from './UlovfestetMotregning/useForenkletTilbakekrevingsvedtak';

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
        erAvregning,
        behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
        behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
        behandlingErMigreringMedManuellePosteringer,
        behandlingErMigreringFraInfotrygdMedKun0Utbetalinger,
        behandlingErEndreMigreringsdato,
    } = useSimuleringContext();
    const { vurderErLesevisning, settÅpenBehandling } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    const {
        forenkletTilbakekrevingsvedtak,
        slettForenkletTilbakekrevingsvedtak,
        oppdaterForenkletTilbakekrevingSamtykke,
        heleBeløpetSkalKrevesTilbake,
        settHeleBeløpetSkalKrevesTilbake,
    } = useForenkletTilbakekrevingsvedtak(åpenBehandling);

    const erAvregningOgToggleErPå =
        erAvregning && toggles[ToggleNavn.brukFunksjonalitetForUlovfestetMotregning];
    const erBehandlingSattPåVentMedÅrsakAvventerSamtykke =
        åpenBehandling.aktivSettPåVent?.årsak ===
        SettPåVentÅrsak.AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING;

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

    return (
        <Skjemasteg
            senderInn={tilbakekrevingSkjema.submitRessurs.status === RessursStatus.HENTER}
            tittel="Simulering"
            className="simulering"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
            steg={BehandlingSteg.VURDER_TILBAKEKREVING}
            skalDisableNesteKnapp={erAvregningOgToggleErPå && !heleBeløpetSkalKrevesTilbake}
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
                            <Box marginBlock={'8 0'}>
                                {erBehandlingSattPåVentMedÅrsakAvventerSamtykke && (
                                    <Alert variant="info">
                                        Saken venter på samtykke fra bruker for ulovfestet
                                        motregning. Hvis bruker har gitt samtykke før det har gått
                                        14 dager, kan saken tas av vent manuelt.
                                    </Alert>
                                )}

                                {forenkletTilbakekrevingsvedtak.status === RessursStatus.SUKSESS &&
                                    forenkletTilbakekrevingsvedtak.data === null && (
                                        <AvregningAlert
                                            harÅpenTilbakekrevingRessurs={
                                                harÅpenTilbakekrevingRessurs
                                            }
                                        />
                                    )}

                                {!erLesevisning &&
                                    forenkletTilbakekrevingsvedtak.status ===
                                        RessursStatus.SUKSESS &&
                                    forenkletTilbakekrevingsvedtak.data !== null && (
                                        <ForenkletTilbakekrevingsvedtak
                                            forenkletTilbakekrevingsvedtak={
                                                forenkletTilbakekrevingsvedtak.data
                                            }
                                            slettForenkletTilbakekrevingsvedtak={
                                                slettForenkletTilbakekrevingsvedtak
                                            }
                                            oppdaterForenkletTilbakekrevingSamtykke={
                                                oppdaterForenkletTilbakekrevingSamtykke
                                            }
                                            heleBeløpetSkalKrevesTilbake={
                                                heleBeløpetSkalKrevesTilbake
                                            }
                                            settHeleBeløpetSkalKrevesTilbake={
                                                settHeleBeløpetSkalKrevesTilbake
                                            }
                                        />
                                    )}
                            </Box>
                        )}

                        {erFeilutbetaling &&
                            (!erAvregningOgToggleErPå || heleBeløpetSkalKrevesTilbake) && (
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
