import type { ReactNode } from 'react';
import React from 'react';

import { ExternalLink } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';

import {
    behandlingsresultater,
    behandlingsstatuser,
    BehandlingStatus,
    behandlingstyper,
    behandlingÅrsak,
} from '../../../typer/behandling';
import type { IBehandlingstema } from '../../../typer/behandlingstema';
import {
    hentKategorierHvisVisningBehandling,
    tilBehandlingstema,
} from '../../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { ITilbakekrevingsbehandling } from '../../../typer/tilbakekrevingsbehandling';
import {
    Tilbakekrevingsbehandlingstype,
    tilbakekrevingstyper,
} from '../../../typer/tilbakekrevingsbehandling';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import type { VisningBehandling } from './visningBehandling';

interface IBehandlingshistorikkProps {
    minimalFagsak: IMinimalFagsak;
    behandling: VisningBehandling | ITilbakekrevingsbehandling;
}

const erTilbakekrevingsbetaling = (behandling: VisningBehandling | ITilbakekrevingsbehandling) => {
    return tilbakekrevingstyper.some(type => type === behandling.type);
};

const lagLenkePåType = (
    fagsakId: number,
    behandling: VisningBehandling | ITilbakekrevingsbehandling
): ReactNode =>
    behandling.status === BehandlingStatus.AVSLUTTET ? (
        behandlingstyper[behandling.type].navn
    ) : erTilbakekrevingsbetaling(behandling) ? (
        <Link
            href={`/redirect/familie-tilbake/fagsystem/BA/fagsak/${fagsakId}/behandling/${behandling.behandlingId}`}
            onMouseDown={e => e.preventDefault()}
            target="_blank"
        >
            <span>{behandlingstyper[behandling.type].navn}</span>
            <ExternalLink />
        </Link>
    ) : (
        <Link href={`/fagsak/${fagsakId}/${behandling.behandlingId}`}>
            {behandlingstyper[behandling.type].navn}
        </Link>
    );

const lagLenkePåResultat = (
    minimalFagsak: IMinimalFagsak,
    behandling: VisningBehandling | ITilbakekrevingsbehandling
): ReactNode => {
    if (!behandling.resultat) {
        return '-';
    }
    if (erTilbakekrevingsbetaling(behandling)) {
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
    } else if (behandling.status === BehandlingStatus.AVSLUTTET) {
        return (
            <Link href={`/fagsak/${minimalFagsak.id}/${behandling.behandlingId}`}>
                {behandling ? behandlingsresultater[behandling.resultat] : '-'}
            </Link>
        );
    } else {
        return behandlingsresultater[behandling.resultat];
    }
};

const finnÅrsak = (behandling: VisningBehandling | ITilbakekrevingsbehandling): ReactNode => {
    if (behandling.type === Tilbakekrevingsbehandlingstype.TILBAKEKREVING) {
        return 'Feilutbetaling';
    }
    return behandling.årsak ? behandlingÅrsak[behandling.årsak] : '-';
};

export const Behandling: React.FC<IBehandlingshistorikkProps> = ({ behandling, minimalFagsak }) => {
    const kategorier = hentKategorierHvisVisningBehandling(behandling);

    const behandlingstema: IBehandlingstema | undefined = kategorier
        ? tilBehandlingstema(kategorier.kategori, kategorier.underkategori)
        : undefined;
    return (
        <tr key={behandling.behandlingId}>
            <td children={`${formaterIsoDato(behandling.opprettetTidspunkt, datoformat.DATO)}`} />
            <td>{finnÅrsak(behandling)}</td>
            <td>{lagLenkePåType(minimalFagsak.id, behandling)}</td>
            <td>{behandlingstema ? behandlingstema.navn : '-'}</td>
            <td>{behandlingsstatuser[behandling.status]}</td>
            <td
                children={
                    behandling.vedtaksdato
                        ? formaterIsoDato(behandling.vedtaksdato, datoformat.DATO)
                        : '-'
                }
            />
            <td>{lagLenkePåResultat(minimalFagsak, behandling)}</td>
        </tr>
    );
};
