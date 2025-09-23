import type { ReactNode } from 'react';
import React from 'react';

import { differenceInMilliseconds } from 'date-fns';
import { Link as ReactRouterLink } from 'react-router';

import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { HStack, Link, Tooltip } from '@navikt/ds-react';

import type { VisningBehandling } from './visningBehandling';
import StatusIkon, { Status } from '../../../ikoner/StatusIkon';
import {
    behandlingsresultater,
    BehandlingStatus,
    behandlingstyper,
    BehandlingÅrsak,
    behandlingÅrsak,
    erBehandlingHenlagt,
} from '../../../typer/behandling';
import type { IBehandlingstema } from '../../../typer/behandlingstema';
import { tilBehandlingstema } from '../../../typer/behandlingstema';
import {
    erKlageFeilregistrertAvKA,
    harAnkeEksistertPåKlagebehandling,
    type IKlagebehandling,
    utledKlagebehandlingResultattekst,
} from '../../../typer/klage';
import { Klagebehandlingstype } from '../../../typer/klage';
import type { ITilbakekrevingsbehandling } from '../../../typer/tilbakekrevingsbehandling';
import { Behandlingsresultatstype, Tilbakekrevingsbehandlingstype } from '../../../typer/tilbakekrevingsbehandling';
import { isoStringTilDate } from '../../../utils/dato';

enum Saksoversiktbehandlingstype {
    BARNETRYGD = 'BARNETRYGD',
    TILBAKEBETALING = 'TILBAKEBETALING',
    KLAGE = 'KLAGE',
}

export function filtrertOgSorterSaksoversiktbehandlinger(
    saksoversiktbehandling: Saksoversiktsbehandling[],
    visHenlagteBehandlinger: boolean,
    visMånedligeValutajusteringer: boolean
): Saksoversiktsbehandling[] {
    return saksoversiktbehandling
        .filter(
            behandling =>
                skalVisesNårHenlagtBehandlingerSkjules(behandling, visHenlagteBehandlinger) &&
                skalVisesNårMånedligeValutajusteringerSkjules(behandling, visMånedligeValutajusteringer)
        )
        .sort((saksoversiktbehandling1, saksoversiktbehandling2) =>
            differenceInMilliseconds(
                isoStringTilDate(hentTidspunktforSortering(saksoversiktbehandling2)),
                isoStringTilDate(hentTidspunktforSortering(saksoversiktbehandling1))
            )
        );
}

export type Saksoversiktsbehandling =
    | (VisningBehandling & {
          saksoversiktbehandlingstype: Saksoversiktbehandlingstype.BARNETRYGD;
      })
    | (ITilbakekrevingsbehandling & {
          saksoversiktbehandlingstype: Saksoversiktbehandlingstype.TILBAKEBETALING;
      })
    | (IKlagebehandling & {
          saksoversiktbehandlingstype: Saksoversiktbehandlingstype.KLAGE;
      });

export const skalVisesNårHenlagtBehandlingerSkjules = (
    behandling: Saksoversiktsbehandling,
    visHenlagteBehandlinger: boolean
): boolean => {
    if (visHenlagteBehandlinger) return true;
    if (!behandling.resultat) return true;
    if (behandling.saksoversiktbehandlingstype === Saksoversiktbehandlingstype.BARNETRYGD) {
        return !erBehandlingHenlagt(behandling.resultat);
    }
    return Behandlingsresultatstype.HENLAGT !== behandling.resultat;
};

export const skalVisesNårMånedligeValutajusteringerSkjules = (
    behandling: Saksoversiktsbehandling,
    visMånedligValutajusteringer: boolean
): boolean => {
    if (visMånedligValutajusteringer) return true;

    return behandling.årsak !== BehandlingÅrsak.MÅNEDLIG_VALUTAJUSTERING;
};

export const hentOpprettetTidspunkt = (saksoversiktsbehandling: Saksoversiktsbehandling) => {
    switch (saksoversiktsbehandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
        case Saksoversiktbehandlingstype.TILBAKEBETALING:
            return saksoversiktsbehandling.opprettetTidspunkt;
        case Saksoversiktbehandlingstype.KLAGE:
            return saksoversiktsbehandling.opprettet;
    }
};

export const hentTidspunktforSortering = (saksoversiktsbehandling: Saksoversiktsbehandling) => {
    switch (saksoversiktsbehandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
            return saksoversiktsbehandling.aktivertTidspunkt;
        case Saksoversiktbehandlingstype.TILBAKEBETALING:
            return saksoversiktsbehandling.opprettetTidspunkt;
        case Saksoversiktbehandlingstype.KLAGE:
            return saksoversiktsbehandling.opprettet;
    }
};

export const hentBehandlingId = (saksoversiktsbehandling: Saksoversiktsbehandling) => {
    switch (saksoversiktsbehandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
        case Saksoversiktbehandlingstype.TILBAKEBETALING:
            return saksoversiktsbehandling.behandlingId;
        case Saksoversiktbehandlingstype.KLAGE:
            return saksoversiktsbehandling.id;
    }
};

export const hentBehandlingerTilSaksoversikten = (
    barnetrygdbehandlinger: VisningBehandling[],
    klagebehandlinger: IKlagebehandling[],
    tilbakekrevingsbehandlinger: ITilbakekrevingsbehandling[]
): Saksoversiktsbehandling[] => {
    const saksoversiktBarnetrygdbehandlinger: Saksoversiktsbehandling[] = barnetrygdbehandlinger.map(behandling => ({
        ...behandling,
        saksoversiktbehandlingstype: Saksoversiktbehandlingstype.BARNETRYGD,
    }));

    const saksoversiktTilbakekrevingsbehandlinger: Saksoversiktsbehandling[] = tilbakekrevingsbehandlinger.map(
        behandling => ({
            ...behandling,
            saksoversiktbehandlingstype: Saksoversiktbehandlingstype.TILBAKEBETALING,
        })
    );

    const saksoversiktKlagebehandlinger: Saksoversiktsbehandling[] = klagebehandlinger.map(behandling => ({
        ...behandling,
        saksoversiktbehandlingstype: Saksoversiktbehandlingstype.KLAGE,
    }));

    return [
        ...saksoversiktBarnetrygdbehandlinger,
        ...saksoversiktTilbakekrevingsbehandlinger,
        ...saksoversiktKlagebehandlinger,
    ];
};

export const lagLenkePåType = (fagsakId: number, behandling: Saksoversiktsbehandling): ReactNode => {
    switch (behandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
            if (behandling.status === BehandlingStatus.AVSLUTTET) {
                return behandlingstyper[behandling.type].navn;
            }
            return (
                <Link as={ReactRouterLink} to={`/fagsak/${fagsakId}/${behandling.behandlingId}`}>
                    {behandlingstyper[behandling.type].navn}
                </Link>
            );
        case Saksoversiktbehandlingstype.TILBAKEBETALING:
            return (
                <Link
                    href={`/redirect/familie-tilbake/fagsystem/BA/fagsak/${fagsakId}/behandling/${behandling.behandlingId}`}
                    onMouseDown={e => e.preventDefault()}
                    target="_blank"
                >
                    <span>{behandlingstyper[behandling.type].navn}</span>
                    <ExternalLinkIcon fontSize={'1.5rem'} />
                </Link>
            );
        case Saksoversiktbehandlingstype.KLAGE:
            return (
                <Link
                    href={`/redirect/familie-klage/behandling/${behandling.id}`}
                    onMouseDown={e => e.preventDefault()}
                    target="_blank"
                >
                    <span>{behandlingstyper[Klagebehandlingstype.KLAGE].navn}</span>
                    <ExternalLinkIcon fontSize={'1.5rem'} />
                </Link>
            );
    }
};

export const lagLenkePåResultat = (fagsakId: number, behandling: Saksoversiktsbehandling): ReactNode => {
    if (!behandling.resultat) {
        return '-';
    }
    switch (behandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
            if (behandling.status === BehandlingStatus.AVSLUTTET) {
                return (
                    <Link as={ReactRouterLink} to={`/fagsak/${fagsakId}/${behandling.behandlingId}`}>
                        {behandling ? behandlingsresultater[behandling.resultat] : '-'}
                    </Link>
                );
            }
            return behandlingsresultater[behandling.resultat];
        case Saksoversiktbehandlingstype.TILBAKEBETALING:
            return (
                <Link
                    href={`/redirect/familie-tilbake/fagsystem/BA/fagsak/${fagsakId}/behandling/${behandling.behandlingId}`}
                    onMouseDown={e => e.preventDefault()}
                    target="_blank"
                >
                    <span>{behandlingsresultater[behandling.resultat]}</span>
                    <ExternalLinkIcon fontSize={'1.5rem'} />
                </Link>
            );
        case Saksoversiktbehandlingstype.KLAGE: {
            return (
                <HStack gap={'2'}>
                    <Link
                        href={`/redirect/familie-klage/behandling/${behandling.id}`}
                        onMouseDown={event => event.preventDefault()}
                        target={'_blank'}
                    >
                        <span>{utledKlagebehandlingResultattekst(behandling)}</span>
                        <ExternalLinkIcon fontSize={'1.5rem'} />
                    </Link>
                    {harAnkeEksistertPåKlagebehandling(behandling) && (
                        <Tooltip
                            content={
                                'Det finnes informasjon om anke på denne klagen. ' +
                                'Gå inn på klagebehandlingens resultatside for å se detaljer.'
                            }
                        >
                            <StatusIkon status={Status.ADVARSEL} />
                        </Tooltip>
                    )}
                    {erKlageFeilregistrertAvKA(behandling) && (
                        <Tooltip
                            content={
                                'Klagen er feilregistrert av Nav klageinstans. ' +
                                'Gå inn på klagebehandlingens resultatside for å se detaljer'
                            }
                        >
                            <StatusIkon
                                status={Status.ADVARSEL}
                                title={'Behandling feilregistrert av Nav klageinstans'}
                            />
                        </Tooltip>
                    )}
                </HStack>
            );
        }
    }
};

export const finnÅrsak = (saksoversiktsbehandling: Saksoversiktsbehandling): ReactNode => {
    if (
        saksoversiktsbehandling.saksoversiktbehandlingstype === Saksoversiktbehandlingstype.TILBAKEBETALING &&
        saksoversiktsbehandling.type === Tilbakekrevingsbehandlingstype.TILBAKEKREVING
    ) {
        return 'Feilutbetaling';
    }
    return saksoversiktsbehandling.årsak ? behandlingÅrsak[saksoversiktsbehandling.årsak] : '-';
};

export const hentBehandlingstema = (saksoversiktsbehandling: Saksoversiktsbehandling): IBehandlingstema | undefined => {
    switch (saksoversiktsbehandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
            return tilBehandlingstema(saksoversiktsbehandling.kategori, saksoversiktsbehandling.underkategori);
        case Saksoversiktbehandlingstype.TILBAKEBETALING:
        case Saksoversiktbehandlingstype.KLAGE:
            return undefined;
    }
};
