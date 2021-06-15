import React, { ReactNode } from 'react';

import classNames from 'classnames';

import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { ExternalLink } from '@navikt/ds-icons';

import {
    behandlingsresultater,
    behandlingstyper,
    behandlingsstatuser,
    kategorier,
    underkategorier,
    BehandlingStatus,
    behandlingÅrsak,
    Behandlingstype,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import { kalenderDiff } from '../../../utils/kalender';
import { VisningBehandling, VisningVedtakForBehandling } from './visningBehandling';

const tilbakekrevingstyper = [
    Behandlingstype.TILBAKEKREVING,
    Behandlingstype.REVURDERING_TILBAKEKREVING,
];

interface IBehandlingshistorikkProps {
    fagsak: IFagsak;
}

const lagLenkePåType = (fagsak: IFagsak, behandling: VisningBehandling): ReactNode => {
    return behandling.status === BehandlingStatus.AVSLUTTET ? (
        behandlingstyper[behandling.type].navn
    ) : tilbakekrevingstyper.some(type => type === behandling.type) ? (
        <Lenke
            href={`/redirect/familie-tilbake/fagsystem/BA/fagsak/${fagsak.id}/behandling/${behandling.behandlingId}`}
            onMouseDown={e => e.preventDefault()}
            target="_blank"
        >
            <span>{behandlingstyper[behandling.type].navn}</span>
            <ExternalLink />
        </Lenke>
    ) : (
        <Lenke href={`/fagsak/${fagsak.id}/${behandling.behandlingId}`}>
            {behandlingstyper[behandling.type].navn}
        </Lenke>
    );
};

const lagLenkePåResultat = (fagsak: IFagsak, behandling: VisningBehandling): ReactNode => {
    return !behandling.resultat ? (
        '-'
    ) : tilbakekrevingstyper.some(type => type === behandling.type) ? (
        <Lenke
            href={`/redirect/familie-tilbake/fagsystem/BA/fagsak/${fagsak.id}/behandling/${behandling.behandlingId}`}
            onMouseDown={e => e.preventDefault()}
            target="_blank"
        >
            <span>{behandlingsresultater[behandling.resultat]}</span>
            <ExternalLink />
        </Lenke>
    ) : behandling.status === BehandlingStatus.AVSLUTTET ? (
        <Lenke href={`/fagsak/${fagsak.id}/${behandling.behandlingId}`}>
            {behandling ? behandlingsresultater[behandling.resultat] : '-'}
        </Lenke>
    ) : (
        behandlingsresultater[behandling.resultat]
    );
};

const finnÅrsak = (behandling: VisningBehandling): ReactNode => {
    return behandling.type === Behandlingstype.TILBAKEKREVING
        ? 'Feilutbetaling'
        : behandling.årsak
        ? behandlingÅrsak[behandling.årsak]
        : '-';
};

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ fagsak }) => {
    const behandlinger: Array<VisningBehandling> = [
        ...fagsak.behandlinger,
        ...fagsak.tilbakekrevingsbehandlinger,
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
                            <th children={'Fagsaktype'} />
                            <th children={'Gjelder'} />
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
                                const aktivVedtakForBehandling = behandling.vedtakForBehandling.find(
                                    (vedtak: VisningVedtakForBehandling) => vedtak.aktiv
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
                                        <td>{lagLenkePåType(fagsak, behandling)}</td>
                                        <td>
                                            {behandling.kategori
                                                ? kategorier[behandling.kategori].navn
                                                : '-'}
                                        </td>
                                        <td>
                                            {behandling.underkategori
                                                ? underkategorier[behandling.underkategori].navn
                                                : '-'}
                                        </td>
                                        <td>{behandlingsstatuser[behandling.status]}</td>
                                        <td
                                            children={
                                                aktivVedtakForBehandling
                                                    ? formaterIsoDato(
                                                          aktivVedtakForBehandling.vedtaksdato,
                                                          datoformat.DATO
                                                      )
                                                    : '-'
                                            }
                                        />
                                        <td>{lagLenkePåResultat(fagsak, behandling)}</td>
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
