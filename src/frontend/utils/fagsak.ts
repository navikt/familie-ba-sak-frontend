import { differenceInMilliseconds, isAfter } from 'date-fns';

import { dagensDato, isoStringTilDate, isoStringTilDateMedFallback, tidenesEnde } from './dato';
import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { erBehandlingHenlagt } from '../typer/behandling';
import type { IMinimalFagsak } from '../typer/fagsak';
import { fagsakStatus } from '../typer/fagsak';
import { IEndretUtbetalingAndelÅrsak } from '../typer/utbetalingAndel';

export const hentFagsakStatusVisning = (minimalFagsak: IMinimalFagsak): string =>
    minimalFagsak.behandlinger.length === 0
        ? '-'
        : minimalFagsak.underBehandling
          ? 'Under behandling'
          : fagsakStatus[minimalFagsak.status].navn;

export const hentAktivBehandlingPåMinimalFagsak = (
    minimalFagsak: IMinimalFagsak
): VisningBehandling | undefined => {
    return minimalFagsak.behandlinger.find((behandling: VisningBehandling) => behandling.aktiv);
};

export const hentSisteIkkeHenlagteBehandling = (
    fagsak?: IMinimalFagsak
): VisningBehandling | undefined => {
    const filtrerteBehandlinger =
        fagsak?.behandlinger.filter(behandling => !erBehandlingHenlagt(behandling.resultat)) || [];
    if (filtrerteBehandlinger.length === 0) {
        return undefined;
    } else {
        return filtrerteBehandlinger.sort((a, b) =>
            differenceInMilliseconds(
                isoStringTilDate(b.opprettetTidspunkt),
                isoStringTilDate(a.opprettetTidspunkt)
            )
        )[0];
    }
};

export const hentBarnMedLøpendeUtbetaling = (minimalFagsak: IMinimalFagsak) =>
    minimalFagsak.gjeldendeUtbetalingsperioder
        .filter(utbetalingsperiode =>
            isAfter(
                isoStringTilDateMedFallback({
                    isoString: utbetalingsperiode.periodeTom,
                    fallbackDate: tidenesEnde,
                }),
                dagensDato
            )
        )
        .reduce((acc, utbetalingsperiode) => {
            utbetalingsperiode.utbetalingsperiodeDetaljer
                .filter(
                    utbetalingsperiodeDetalj =>
                        utbetalingsperiodeDetalj.endringsårsak !==
                        IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER
                )
                .map(utbetalingsperiodeDetalj =>
                    acc.add(utbetalingsperiodeDetalj.person.personIdent)
                );

            return acc;
        }, new Set());
