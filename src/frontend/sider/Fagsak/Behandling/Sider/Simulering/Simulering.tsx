import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsakId } from '@hooks/useFagsakId';
import { BehandlingSteg, type IBehandling } from '@typer/behandling';
import type { ITilbakekreving } from '@typer/simulering';
import { hentSøkersMålform } from '@utils/behandling';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import { useNavigate } from 'react-router';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, GlobalAlert, InfoCard, List, LocalAlert } from '@navikt/ds-react';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { MigreringAlerts } from './MigreringAlerts';
import { useSimuleringContext } from './SimuleringContext';
import TilbakekrevingSkjema from './TilbakekrevingSkjema';
import { useBehandlingContext } from '../../context/BehandlingContext';
import Skjemasteg from '../Skjemasteg';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';
import { TilbakekrevingsvedtakMotregning } from './UlovfestetMotregning/TilbakekrevingsvedtakMotregning';

interface ISimuleringProps {
    åpenBehandling: IBehandling;
}

const Simulering = ({ åpenBehandling }: ISimuleringProps) => {
    const {
        hentSkjemadata,
        onSubmit,
        simuleringsresultat,
        tilbakekrevingSkjema,
        harÅpenTilbakekrevingRessurs,
        erFeilutbetaling,
        avregningsperioder,
        overlappendePerioderMedAndreFagsaker,
        behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
        behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
        behandlingErMigreringMedManuellePosteringer,
        behandlingErMigreringFraInfotrygdMedKun0Utbetalinger,
        behandlingErEndreMigreringsdato,
    } = useSimuleringContext();

    const { settÅpenBehandling } = useBehandlingContext();

    const fagsakId = useFagsakId();
    const erLesevisning = useErLesevisning();
    const navigate = useNavigate();

    const harOverlappendePerioderMedAndreFagsakerOgSkalStanses =
        !behandlingErEndreMigreringsdato &&
        overlappendePerioderMedAndreFagsaker.flatMap(periode => periode.fagsaker).length > 0;

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

    const erAvregning = avregningsperioder.length > 0;

    const tilbakekrevingsvedtakMotregning = åpenBehandling.tilbakekrevingsvedtakMotregning;

    const heleBeløpetSkalKrevesTilbake = tilbakekrevingsvedtakMotregning?.heleBeløpetSkalKrevesTilbake === true;

    const skalDisableNesteKnapp =
        (erAvregning && !heleBeløpetSkalKrevesTilbake) || harOverlappendePerioderMedAndreFagsakerOgSkalStanses;

    const skalViseTilbakekrevingSkjema = erFeilutbetaling && (!erAvregning || heleBeløpetSkalKrevesTilbake);

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
                    <Box marginBlock={'space-0 space-32'}>
                        <InfoCard data-color="info">
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                            </InfoCard.Message>
                        </InfoCard>
                    </Box>
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
                            behandlingErMigreringMedManuellePosteringer={behandlingErMigreringMedManuellePosteringer}
                            behandlingErMigreringFraInfotrygdMedKun0Utbetalinger={
                                behandlingErMigreringFraInfotrygdMedKun0Utbetalinger
                            }
                        />

                        {harOverlappendePerioderMedAndreFagsakerOgSkalStanses && (
                            <Box marginBlock="space-40 space-0" maxWidth="40rem">
                                <LocalAlert status="warning">
                                    <LocalAlert.Header>
                                        <LocalAlert.Title>
                                            En annen fagsak tilknyttet personen inneholder en feilutbetaling eller
                                            etterbetaling.
                                        </LocalAlert.Title>
                                    </LocalAlert.Header>
                                    <LocalAlert.Content>
                                        <BodyShort spacing>
                                            Dersom det er en feilutbetaling må den behandles ferdig før du fullfører
                                            denne behandlingen. Det er for å hindre at beløpene motregnes.
                                            <br />
                                            <br />
                                            Dersom det er en etterbetaling må du vente til den er utbetalt før du
                                            fullfører denne behandlingen. Det er for å hindre at etterbetalingen hentes
                                            inn i denne fagsaken.
                                        </BodyShort>
                                        <BodyShort spacing>
                                            Fagsak med feilutbetaling eller etterbetaling:{' '}
                                            {overlappendePerioderMedAndreFagsaker.map(
                                                overlappendePeriode => overlappendePeriode.fagsaker
                                            )}
                                        </BodyShort>
                                        <BodyShort>Perioder med overlapp:</BodyShort>
                                        <List as="ul">
                                            {overlappendePerioderMedAndreFagsaker.map(periode => (
                                                <List.Item>
                                                    {`${isoStringTilFormatertString({
                                                        isoString: periode.fom,
                                                        tilFormat: Datoformat.MÅNED_ÅR_KORTNAVN,
                                                    })} - ${isoStringTilFormatertString({
                                                        isoString: periode.tom,
                                                        tilFormat: Datoformat.MÅNED_ÅR_KORTNAVN,
                                                    })}`}
                                                </List.Item>
                                            ))}
                                        </List>
                                    </LocalAlert.Content>
                                </LocalAlert>
                            </Box>
                        )}
                        {erAvregning && (
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
                <Box marginBlock={'space-0 space-32'}>
                    <GlobalAlert status={'error'}>
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>Det har skjedd en feil</GlobalAlert.Title>
                        </GlobalAlert.Header>
                        <GlobalAlert.Content>{simuleringsresultat?.frontendFeilmelding}</GlobalAlert.Content>
                    </GlobalAlert>
                </Box>
            )}

            {(tilbakekrevingSkjema.submitRessurs.status === RessursStatus.FEILET ||
                tilbakekrevingSkjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                tilbakekrevingSkjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                <Box marginBlock={'space-32'}>
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>
                                Det har skjedd en feil og vi klarte ikke å lagre tilbakekrevingsvalget
                            </LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>
                            {tilbakekrevingSkjema.submitRessurs.frontendFeilmelding}
                        </LocalAlert.Content>
                    </LocalAlert>
                </Box>
            )}
        </Skjemasteg>
    );
};

export default Simulering;
