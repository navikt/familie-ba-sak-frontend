import React, { ReactNode } from 'react';

import classNames from 'classnames';

import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { ExternalLink } from '@navikt/ds-icons';

import {
    behandlingsresultater,
    behandlingsstatuser,
    BehandlingStatus,
    behandlingstyper,
    behandlingÅrsak,
} from '../../../typer/behandling';
import { IBehandlingstema, tilBehandlingstema } from '../../../typer/behandlingstema';
import { IMinimalFagsak } from '../../../typer/fagsak';
import {
    Tilbakekrevingsbehandlingstype,
    tilbakekrevingstyper,
} from '../../../typer/tilbakekrevingsbehandling';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import { kalenderDiff } from '../../../utils/kalender';
import { VisningBehandling } from './visningBehandling';

interface IBehandlingshistorikkProps {
    minimalFagsak: IMinimalFagsak;
}

const lagLenkePåType = (fagsakId: number, behandling: VisningBehandling): ReactNode => {
    return behandling.status === BehandlingStatus.AVSLUTTET ? (
        behandlingstyper[behandling.type].navn
    ) : tilbakekrevingstyper.some(type => type === behandling.type) ? (
        <Lenke
            href={`/redirect/familie-tilbake/fagsystem/BA/fagsak/${fagsakId}/behandling/${behandling.behandlingId}`}
            onMouseDown={e => e.preventDefault()}
            target="_blank"
        >
            <span>{behandlingstyper[behandling.type].navn}</span>
            <ExternalLink />
        </Lenke>
    ) : (
        <Lenke href={`/fagsak/${fagsakId}/${behandling.behandlingId}`}>
            {behandlingstyper[behandling.type].navn}
        </Lenke>
    );
};

const lagLenkePåResultat = (
    minimalFagsak: IMinimalFagsak,
    behandling: VisningBehandling
): ReactNode => {
    return !behandling.resultat ? (
        '-'
    ) : tilbakekrevingstyper.some(type => type === behandling.type) ? (
        <Lenke
            href={`/redirect/familie-tilbake/fagsystem/BA/fagsak/${minimalFagsak.id}/behandling/${behandling.behandlingId}`}
            onMouseDown={e => e.preventDefault()}
            target="_blank"
        >
            <span>{behandlingsresultater[behandling.resultat]}</span>
            <ExternalLink />
        </Lenke>
    ) : behandling.status === BehandlingStatus.AVSLUTTET ? (
        <Lenke href={`/fagsak/${minimalFagsak.id}/${behandling.behandlingId}`}>
            {behandling ? behandlingsresultater[behandling.resultat] : '-'}
        </Lenke>
    ) : (
        behandlingsresultater[behandling.resultat]
    );
};

const finnÅrsak = (behandling: VisningBehandling): ReactNode => {
    return behandling.type === Tilbakekrevingsbehandlingstype.TILBAKEKREVING
        ? 'Feilutbetaling'
        : behandling.årsak
        ? behandlingÅrsak[behandling.årsak]
        : '-';
};

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ minimalFagsak }) => {
    const behandlinger: VisningBehandling[] = [
        ...minimalFagsak.behandlinger,
        ...minimalFagsak.tilbakekrevingsbehandlinger,
    ];

    return (
        <div className={'saksoversikt__behandlingshistorikk'}>
            <Systemtittel children={'Behandlinger'} />
            {behandlinger.length > 0 ? (
                <table
                    className={classNames('tabell', 'saksoversikt__behandlingshistorikk__tabell')}
                >
                    <thead>
                        <tr>
                            <th children={'Opprettet'} />
                            <th children={'Årsak'} />
                            <th children={'Type'} />
                            <th children={'Behandlingstema'} />
                            <th children={'Status'} />
                            <th children={'Vedtaksdato'} />
                            <th children={'Resultat'} />
                        </tr>
                    </thead>
                    <tbody>
                        {behandlinger
                            .sort((a, b) =>
                                kalenderDiff(
                                    new Date(b.opprettetTidspunkt),
                                    new Date(a.opprettetTidspunkt)
                                )
                            )
                            .map((behandling: VisningBehandling) => {
                                const behandlingstema: IBehandlingstema | undefined =
                                    tilBehandlingstema(
                                        behandling.kategori,
                                        behandling.underkategori
                                    );
                                return (
                                    <tr key={behandling.behandlingId}>
                                        <td
                                            children={`${formaterIsoDato(
                                                behandling.opprettetTidspunkt,
                                                datoformat.DATO
                                            )}`}
                                        />
                                        <td>{finnÅrsak(behandling)}</td>
                                        <td>{lagLenkePåType(minimalFagsak.id, behandling)}</td>
                                        <td>{behandlingstema ? behandlingstema.navn : '-'}</td>
                                        <td>{behandlingsstatuser[behandling.status]}</td>
                                        <td
                                            children={
                                                behandling.vedtaksdato
                                                    ? formaterIsoDato(
                                                          behandling.vedtaksdato,
                                                          datoformat.DATO
                                                      )
                                                    : '-'
                                            }
                                        />
                                        <td>{lagLenkePåResultat(minimalFagsak, behandling)}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : (
                <Normaltekst children={'Ingen tidligere behandlinger'} />
            )}
        </div>
    );
};

export default Behandlinger;
