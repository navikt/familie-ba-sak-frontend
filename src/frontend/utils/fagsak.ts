import { isAfter } from 'date-fns';

import { dagensDato, isoStringTilDateMedFallback, tidenesEnde } from './dato';
import { kalenderDiff } from './kalender';
import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { erBehandlingHenlagt } from '../typer/behandling';
import type { IMinimalFagsak } from '../typer/fagsak';
import { fagsakStatus } from '../typer/fagsak';

export const hentFagsakStatusVisning = (minimalFagsak: IMinimalFagsak): string =>
    minimalFagsak.behandlinger.length === 0
        ? '-'
        : minimalFagsak.underBehandling
        ? 'Under behandling'
        : fagsakStatus[minimalFagsak.status].navn;

export const hentSisteBehandlingPåMinimalFagsak = (
    fagsak: IMinimalFagsak
): VisningBehandling | undefined => {
    if (fagsak.behandlinger.length === 0) {
        return undefined;
    } else {
        return fagsak.behandlinger.sort((a, b) =>
            kalenderDiff(new Date(b.opprettetTidspunkt), new Date(a.opprettetTidspunkt))
        )[0];
    }
};

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
            kalenderDiff(new Date(b.opprettetTidspunkt), new Date(a.opprettetTidspunkt))
        )[0];
    }
};

export const hentBarnMedLøpendeUtbetaling = (minimalFagsak: IMinimalFagsak) =>
    minimalFagsak.gjeldendeUtbetalingsperioder
        .filter(utbetalingsperiode =>
            isAfter(
                isoStringTilDateMedFallback({
                    isoDatoString: utbetalingsperiode.periodeTom,
                    fallbackDate: tidenesEnde,
                }),
                dagensDato
            )
        )
        .reduce((acc, utbetalingsperiode) => {
            utbetalingsperiode.utbetalingsperiodeDetaljer.map(utbetalingsperiodeDetalj =>
                acc.add(utbetalingsperiodeDetalj.person.personIdent)
            );

            return acc;
        }, new Set());
