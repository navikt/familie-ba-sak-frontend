import type { ReactNode } from 'react';
import React from 'react';

import { ExternalLink, Warning } from '@navikt/ds-icons';
import { Link, Tooltip } from '@navikt/ds-react';

import {
    behandlingsresultater,
    BehandlingStatus,
    behandlingstyper,
    behandlingÅrsak,
    erBehandlingHenlagt,
} from '../../../typer/behandling';
import type { IBehandlingstema } from '../../../typer/behandlingstema';
import { tilBehandlingstema } from '../../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import {
    type IKlagebehandling,
    KlageinstansEventType,
    klageinstansUtfallTilTekst,
} from '../../../typer/klage';
import { Klagebehandlingstype } from '../../../typer/klage';
import type { ITilbakekrevingsbehandling } from '../../../typer/tilbakekrevingsbehandling';
import {
    Behandlingsresultatstype,
    Tilbakekrevingsbehandlingstype,
} from '../../../typer/tilbakekrevingsbehandling';
import type { VisningBehandling } from './visningBehandling';

export enum Saksoversiktbehandlingstype {
    BARNETRYGD = 'BARNETRYGD',
    TILBAKEBETALING = 'TILBAKEBETALING',
    KLAGE = 'KLAGE',
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

export const skalRadVises = (
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

export const hentOpprettetTidspunkt = (saksoversiktsbehandling: Saksoversiktsbehandling) => {
    switch (saksoversiktsbehandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
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
    minimalFagsak: IMinimalFagsak,
    klagebehandlinger: IKlagebehandling[]
): Saksoversiktsbehandling[] => {
    const barnetrygdBehandlinger: Saksoversiktsbehandling[] = minimalFagsak.behandlinger.map(
        behandling => ({
            ...behandling,
            saksoversiktbehandlingstype: Saksoversiktbehandlingstype.BARNETRYGD,
        })
    );
    const tilbakekrevingsbehandlinger: Saksoversiktsbehandling[] =
        minimalFagsak.tilbakekrevingsbehandlinger.map(behandling => ({
            ...behandling,
            saksoversiktbehandlingstype: Saksoversiktbehandlingstype.TILBAKEBETALING,
        }));
    const saksoversiktKlagebehandlinger: Saksoversiktsbehandling[] = klagebehandlinger.map(
        behandling => ({
            ...behandling,
            saksoversiktbehandlingstype: Saksoversiktbehandlingstype.KLAGE,
        })
    );
    return [
        ...barnetrygdBehandlinger,
        ...tilbakekrevingsbehandlinger,
        ...saksoversiktKlagebehandlinger,
    ];
};

export const lagLenkePåType = (
    fagsakId: number,
    behandling: Saksoversiktsbehandling
): ReactNode => {
    switch (behandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
            if (behandling.status === BehandlingStatus.AVSLUTTET) {
                return behandlingstyper[behandling.type].navn;
            }
            return (
                <Link href={`/fagsak/${fagsakId}/${behandling.behandlingId}`}>
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
                    <ExternalLink />
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
                    <ExternalLink />
                </Link>
            );
    }
};

const utledKlageBehandlingsresultatTilTekst = (behandling: IKlagebehandling) => {
    const klageBehandlingAvsluttetUtfall = behandling.klageinstansResultat?.find(
        resultat =>
            resultat.utfall && resultat.type === KlageinstansEventType.KLAGEBEHANDLING_AVSLUTTET
    )?.utfall;

    if (klageBehandlingAvsluttetUtfall) {
        return klageinstansUtfallTilTekst[klageBehandlingAvsluttetUtfall];
    }
};

const ankeHarEksistertPåBehandling = (behandling: IKlagebehandling) => {
    return behandling.klageinstansResultat?.some(
        resultat =>
            resultat.type === KlageinstansEventType.ANKEBEHANDLING_OPPRETTET ||
            resultat.type === KlageinstansEventType.ANKEBEHANDLING_AVSLUTTET
    );
};

export const lagLenkePåResultat = (
    minimalFagsak: IMinimalFagsak,
    behandling: Saksoversiktsbehandling
): ReactNode => {
    if (!behandling.resultat) {
        return '-';
    }
    switch (behandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
            if (behandling.status === BehandlingStatus.AVSLUTTET) {
                return (
                    <Link href={`/fagsak/${minimalFagsak.id}/${behandling.behandlingId}`}>
                        {behandling ? behandlingsresultater[behandling.resultat] : '-'}
                    </Link>
                );
            }
            return behandlingsresultater[behandling.resultat];
        case Saksoversiktbehandlingstype.TILBAKEBETALING:
            return (
                <Link
                    href={`/redirect/familie-tilbake/fagsystem/BA/fagsak/${minimalFagsak.id}/behandling/${behandling.behandlingId}`}
                    onMouseDown={e => e.preventDefault()}
                    target="_blank"
                >
                    <span>{behandlingsresultater[behandling.resultat]}</span>
                    <ExternalLink />
                </Link>
            );
        case Saksoversiktbehandlingstype.KLAGE:
            return (
                <>
                    <Link
                        href={`/redirect/familie-klage/behandling/${behandling.id}`}
                        onMouseDown={e => e.preventDefault()}
                        target="_blank"
                    >
                        <span>{utledKlageBehandlingsresultatTilTekst(behandling)}</span>
                        <ExternalLink />
                    </Link>
                    {ankeHarEksistertPåBehandling(behandling) && (
                        <Tooltip content="Det finnes informasjon om anke på denne klagen. Gå inn på klagebehandlingens resultatside for å se detaljer.">
                            <Warning title={'Har ankeinformasjon'} />
                        </Tooltip>
                    )}
                </>
            );
    }
};

export const finnÅrsak = (saksoversiktsbehandling: Saksoversiktsbehandling): ReactNode => {
    if (
        saksoversiktsbehandling.saksoversiktbehandlingstype ===
            Saksoversiktbehandlingstype.TILBAKEBETALING &&
        saksoversiktsbehandling.type === Tilbakekrevingsbehandlingstype.TILBAKEKREVING
    ) {
        return 'Feilutbetaling';
    }
    return saksoversiktsbehandling.årsak ? behandlingÅrsak[saksoversiktsbehandling.årsak] : '-';
};

export const hentBehandlingstema = (
    saksoversiktsbehandling: Saksoversiktsbehandling
): IBehandlingstema | undefined => {
    switch (saksoversiktsbehandling.saksoversiktbehandlingstype) {
        case Saksoversiktbehandlingstype.BARNETRYGD:
            return tilBehandlingstema(
                saksoversiktsbehandling.kategori,
                saksoversiktsbehandling.underkategori
            );
        case Saksoversiktbehandlingstype.TILBAKEBETALING:
        case Saksoversiktbehandlingstype.KLAGE:
            return undefined;
    }
};
