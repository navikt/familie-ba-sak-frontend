import { addMonths, differenceInMilliseconds, format } from 'date-fns';
import { Link as ReactRouterLink } from 'react-router';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Heading, InfoCard, Link, LocalAlert, VStack } from '@navikt/ds-react';

import { Behandlinger } from './Behandlinger';
import { FagsakLenkepanel, SaksoversiktPanelBredde } from './FagsakLenkepanel';
import { GjennomførValutajusteringKnapp } from './GjennomførValutajusteringKnapp';
import Utbetalinger from './Utbetalinger';
import type { VisningBehandling } from './visningBehandling';
import { useSaksbehandler } from '../../../hooks/useSaksbehandler';
import { BehandlingStatus, erBehandlingHenlagt } from '../../../typer/behandling';
import { BehandlingKategori } from '../../../typer/behandlingstema';
import { FagsakStatus } from '../../../typer/fagsak';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { Datoformat, isoStringTilDate, periodeOverlapperMedValgtDato } from '../../../utils/dato';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../utils/fagsak';
import { useFagsakContext } from '../FagsakContext';

export function Saksoversikt() {
    const { fagsak } = useFagsakContext();
    const saksbehandler = useSaksbehandler();

    const iverksatteBehandlinger = fagsak.behandlinger.filter(
        (behandling: VisningBehandling) =>
            behandling.status === BehandlingStatus.AVSLUTTET && !erBehandlingHenlagt(behandling.resultat)
    );

    let gjeldendeBehandling =
        iverksatteBehandlinger.length > 0
            ? iverksatteBehandlinger.sort((a, b) =>
                  differenceInMilliseconds(
                      isoStringTilDate(b.opprettetTidspunkt),
                      isoStringTilDate(a.opprettetTidspunkt)
                  )
              )[0]
            : undefined;

    const aktivBehandling = hentAktivBehandlingPåMinimalFagsak(fagsak);

    if (!gjeldendeBehandling) {
        gjeldendeBehandling = aktivBehandling;
    }

    const gjeldendeUtbetalingsperioder = fagsak.gjeldendeUtbetalingsperioder;
    const utbetalingsperiodeInneværendeMåned = gjeldendeUtbetalingsperioder.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, new Date())
    );

    const nesteMåned = addMonths(new Date(), 1);

    const utbetalingsperiodeNesteMåned = gjeldendeUtbetalingsperioder.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, nesteMåned)
    );

    const lenkeTilBehandlingsresultat = () => {
        return (
            aktivBehandling && (
                <Link as={ReactRouterLink} to={`/fagsak/${fagsak.id}/${aktivBehandling.behandlingId}/tilkjent-ytelse`}>
                    Se detaljer
                </Link>
            )
        );
    };

    const løpendeMånedligUtbetaling = () => {
        if (
            utbetalingsperiodeInneværendeMåned &&
            utbetalingsperiodeInneværendeMåned.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING
        ) {
            return utbetalingsperiodeInneværendeMåned.utbetaltPerMnd < 1 &&
                gjeldendeBehandling?.kategori === BehandlingKategori.EØS ? (
                <InfoCard data-color="info" style={{ maxWidth: SaksoversiktPanelBredde }}>
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        Siste gjeldende vedtak er en EØS-sak uten månedlige utbetalinger fra Nav
                    </InfoCard.Message>
                </InfoCard>
            ) : (
                <>
                    {utbetalingsperiodeNesteMåned &&
                        utbetalingsperiodeNesteMåned !== utbetalingsperiodeInneværendeMåned && (
                            <InfoCard data-color="info" style={{ maxWidth: SaksoversiktPanelBredde }}>
                                <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                    <VStack>
                                        {`Utbetalingen endres fra og med ${format(nesteMåned, Datoformat.MÅNED_ÅR_NAVN)}.`}
                                        {lenkeTilBehandlingsresultat()}
                                    </VStack>
                                </InfoCard.Message>
                            </InfoCard>
                        )}
                    <Utbetalinger vedtaksperiode={utbetalingsperiodeInneværendeMåned} />
                </>
            );
        } else if (utbetalingsperiodeNesteMåned) {
            return (
                <InfoCard data-color="info" style={{ maxWidth: SaksoversiktPanelBredde }}>
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        <VStack>
                            {`Utbetalingen starter ${format(nesteMåned, Datoformat.MÅNED_ÅR_NAVN)}.`}
                            {lenkeTilBehandlingsresultat()}
                        </VStack>
                    </InfoCard.Message>
                </InfoCard>
            );
        } else {
            return (
                <LocalAlert status="error" style={{ maxWidth: SaksoversiktPanelBredde }}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            Noe gikk galt ved henting av utbetalinger. Prøv igjen eller kontakt brukerstøtte hvis
                            problemet vedvarer.
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            );
        }
    };

    return (
        <Box maxWidth="70rem" marginBlock="space-40" marginInline="space-64">
            <Heading size="large" level="1" children="Saksoversikt" />

            {saksbehandler.harSuperbrukertilgang && fagsak.løpendeKategori === BehandlingKategori.EØS && (
                <GjennomførValutajusteringKnapp fagsakId={fagsak.id} />
            )}

            <VStack gap="space-56">
                <FagsakLenkepanel />
                {fagsak.status === FagsakStatus.LØPENDE && (
                    <>
                        <Heading size="medium" level="2" spacing>
                            Løpende månedlig utbetaling
                        </Heading>
                        {løpendeMånedligUtbetaling()}
                    </>
                )}
                <Behandlinger />
            </VStack>
        </Box>
    );
}
