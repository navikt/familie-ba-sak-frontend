import React from 'react';

import { addMonths, differenceInMilliseconds, format } from 'date-fns';
import { Link as ReactRouterLink } from 'react-router';
import styled from 'styled-components';

import { Alert, Box, Heading, Link, VStack } from '@navikt/ds-react';

import { Behandlinger } from './Behandlinger';
import FagsakLenkepanel, { SaksoversiktPanelBredde } from './FagsakLenkepanel';
import { GjennomførValutajusteringKnapp } from './GjennomførValutajusteringKnapp';
import Utbetalinger from './Utbetalinger';
import type { VisningBehandling } from './visningBehandling';
import { useAppContext } from '../../../context/AppContext';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingStatus, erBehandlingHenlagt } from '../../../typer/behandling';
import { behandlingKategori, BehandlingKategori, behandlingUnderkategori } from '../../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakStatus } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import { ToggleNavn } from '../../../typer/toggles';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { Datoformat, isoStringTilDate, periodeOverlapperMedValgtDato } from '../../../utils/dato';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../utils/fagsak';

interface IProps {
    bruker: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}

const StyledAlert = styled(Alert)`
    width: ${SaksoversiktPanelBredde};
`;

const Saksoversikt: React.FunctionComponent<IProps> = ({ minimalFagsak }) => {
    const { toggles } = useAppContext();

    const iverksatteBehandlinger = minimalFagsak.behandlinger.filter(
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

    const aktivBehandling = hentAktivBehandlingPåMinimalFagsak(minimalFagsak);

    if (!gjeldendeBehandling) {
        gjeldendeBehandling = aktivBehandling;
    }

    const gjeldendeUtbetalingsperioder = minimalFagsak.gjeldendeUtbetalingsperioder;
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
                <Link
                    as={ReactRouterLink}
                    to={`/fagsak/${minimalFagsak.id}/${aktivBehandling.behandlingId}/tilkjent-ytelse`}
                >
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
                <StyledAlert variant="info">
                    Siste gjeldende vedtak er en EØS-sak uten månedlige utbetalinger fra Nav
                </StyledAlert>
            ) : (
                <>
                    {utbetalingsperiodeNesteMåned &&
                        utbetalingsperiodeNesteMåned !== utbetalingsperiodeInneværendeMåned && (
                            <StyledAlert variant="info">
                                <VStack>
                                    {`Utbetalingen endres fra og med ${format(nesteMåned, Datoformat.MÅNED_ÅR_NAVN)}.`}
                                    {lenkeTilBehandlingsresultat()}
                                </VStack>
                            </StyledAlert>
                        )}
                    <Utbetalinger vedtaksperiode={utbetalingsperiodeInneværendeMåned} />
                </>
            );
        } else if (utbetalingsperiodeNesteMåned) {
            return (
                <StyledAlert variant="info">
                    <VStack>
                        {`Utbetalingen starter ${format(nesteMåned, Datoformat.MÅNED_ÅR_NAVN)}.`}
                        {lenkeTilBehandlingsresultat()}
                    </VStack>
                </StyledAlert>
            );
        } else {
            return (
                <StyledAlert variant="error">
                    Noe gikk galt ved henting av utbetalinger. Prøv igjen eller kontakt brukerstøtte hvis problemet
                    vedvarer.
                </StyledAlert>
            );
        }
    };

    return (
        <Box maxWidth="70rem" marginBlock="10" marginInline="16">
            <Heading size="large" level="1" children="Saksoversikt" />

            {toggles[ToggleNavn.kanKjøreAutomatiskValutajusteringBehandlingForEnkeltSak] &&
                minimalFagsak.løpendeKategori === BehandlingKategori.EØS && (
                    <GjennomførValutajusteringKnapp fagsakId={minimalFagsak.id} />
                )}

            <VStack gap="14">
                <FagsakLenkepanel minimalFagsak={minimalFagsak} />
                {minimalFagsak.status === FagsakStatus.LØPENDE && (
                    <>
                        <Heading size="medium" level="2" spacing>
                            Løpende månedlig utbetaling
                        </Heading>
                        {løpendeMånedligUtbetaling()}
                    </>
                )}
                <Behandlinger fagsakId={minimalFagsak.id} />
            </VStack>
        </Box>
    );
};

export const sakstype = (behandling?: IBehandling) => {
    if (!behandling) {
        return 'Ikke satt';
    }

    return `${behandling?.kategori ? behandlingKategori[behandling?.kategori] : behandling?.kategori}, ${
        behandling?.underkategori ? behandlingUnderkategori[behandling?.underkategori] : behandling?.underkategori
    }`;
};

export default Saksoversikt;
