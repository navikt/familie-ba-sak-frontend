import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsakId } from '@hooks/useFagsakId';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, InfoCard, List, LocalAlert } from '@navikt/ds-react';
import { TilbakekrevingForm } from '@sider/Fagsak/Behandling/Sider/Simulering/form/TilbakekrevingForm';
import { useTilbakekrevingForm } from '@sider/Fagsak/Behandling/Sider/Simulering/form/useTilbakekrevingForm';
import { MigreringAlerts } from '@sider/Fagsak/Behandling/Sider/Simulering/MigreringAlerts';
import { useSimuleringContext } from '@sider/Fagsak/Behandling/Sider/Simulering/SimuleringContext';
import { TilbakekrevingsvedtakMotregning } from '@sider/Fagsak/Behandling/Sider/Simulering/UlovfestetMotregning/TilbakekrevingsvedtakMotregning';
import { BehandlingSteg } from '@typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Skjemasteg from '../Skjemasteg';
import SimuleringPanel from './SimuleringPanel';
import SimuleringTabell from './SimuleringTabell';

export function Simulering() {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const navigate = useNavigate();

    const {
        simulering,
        erFeilutbetaling,
        avregningsperioder,
        overlappendePerioderMedAndreFagsaker,
        behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
        behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
        behandlingErMigreringMedManuellePosteringer,
        behandlingErMigreringFraInfotrygdMedKun0Utbetalinger,
        behandlingErEndreMigreringsdato,
    } = useSimuleringContext();

    const { form, onSubmit } = useTilbakekrevingForm();

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    const harOverlappendePerioderMedAndreFagsakerOgSkalStanses =
        !behandlingErEndreMigreringsdato &&
        overlappendePerioderMedAndreFagsaker.flatMap(periode => periode.fagsaker).length > 0;

    function nesteOnClick() {
        if (erLesevisning) {
            navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/vedtak`);
            return;
        }
        void handleSubmit(onSubmit)();
    }

    function forrigeOnClick() {
        navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/tilkjent-ytelse`);
    }

    const erAvregning = avregningsperioder.length > 0;

    const tilbakekrevingsvedtakMotregning = behandling.tilbakekrevingsvedtakMotregning;

    const heleBeløpetSkalKrevesTilbake = tilbakekrevingsvedtakMotregning?.heleBeløpetSkalKrevesTilbake === true;

    const skalDisableNesteKnapp =
        (erAvregning && !heleBeløpetSkalKrevesTilbake) || harOverlappendePerioderMedAndreFagsakerOgSkalStanses;

    const skalViseTilbakekrevingForm = erFeilutbetaling && (!erAvregning || heleBeløpetSkalKrevesTilbake);

    return (
        <Skjemasteg
            senderInn={isSubmitting}
            tittel="Simulering"
            className="simulering"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
            steg={BehandlingSteg.VURDER_TILBAKEKREVING}
            skalDisableNesteKnapp={skalDisableNesteKnapp}
        >
            <FormProvider {...form}>
                {simulering.perioder.length === 0 ? (
                    <Box marginBlock={'space-0 space-32'}>
                        <InfoCard data-color="info">
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                Det er ingen etterbetaling, feilutbetaling eller neste utbetaling
                            </InfoCard.Message>
                        </InfoCard>
                    </Box>
                ) : (
                    <>
                        <SimuleringPanel simulering={simulering} />
                        <SimuleringTabell simulering={simulering} />

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
                                                <List.Item key={`${periode.fom}-${periode.tom}`}>
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
                                tilbakekrevingsvedtakMotregning={tilbakekrevingsvedtakMotregning}
                                avregningsperioder={avregningsperioder}
                            />
                        )}
                        {skalViseTilbakekrevingForm && <TilbakekrevingForm />}
                    </>
                )}

                {errors.root?.message && (
                    <Box marginBlock={'space-32'}>
                        <LocalAlert status="error">
                            <LocalAlert.Header>
                                <LocalAlert.Title>
                                    Det har skjedd en feil og vi klarte ikke å lagre tilbakekrevingsvalget
                                </LocalAlert.Title>
                            </LocalAlert.Header>
                            <LocalAlert.Content>{errors.root.message}</LocalAlert.Content>
                        </LocalAlert>
                    </Box>
                )}
            </FormProvider>
        </Skjemasteg>
    );
}
