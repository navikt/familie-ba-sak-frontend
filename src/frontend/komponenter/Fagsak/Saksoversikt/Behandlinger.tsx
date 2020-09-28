import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import {
    behandlingsresultater,
    behandlingstyper,
    IBehandling,
    behandlingsstatuser,
    kategorier,
    underkategorier,
    BehandlingStatus,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IVedtakForBehandling } from '../../../typer/vedtak';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import classNames from 'classnames';

interface IBehandlingshistorikkProps {
    fagsak: IFagsak;
}

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ fagsak }) => {
    return (
        <div className={'saksoversikt__behandlingshistorikk'}>
            <Systemtittel children={'Behandlinger'} />
            {fagsak.behandlinger.length > 0 ? (
                <table
                    className={classNames('tabell', 'saksoversikt__behandlingshistorikk__tabell')}
                >
                    <thead>
                        <tr>
                            <th children={'Opprettet'} />
                            <th children={'Årsak/hendelse'} />
                            <th children={'Type'} />
                            <th children={'Fagsaktype'} />
                            <th children={'Gjelder'} />
                            <th children={'Status'} />
                            <th children={'Vedtaksdato'} />
                            <th children={'Resultat'} />
                        </tr>
                    </thead>
                    <tbody>
                        {fagsak.behandlinger
                            .sort((a, b) => moment(b.opprettetTidspunkt).diff(a.opprettetTidspunkt))
                            .map((behandling: IBehandling) => {
                                const aktivVedtakForBehandling = behandling.vedtakForBehandling.find(
                                    (vedtak: IVedtakForBehandling) => vedtak.aktiv
                                );

                                return (
                                    <tr key={behandling.behandlingId}>
                                        <td
                                            children={`${formaterIsoDato(
                                                behandling.opprettetTidspunkt,
                                                datoformat.DATO
                                            )}`}
                                        />
                                        <td>Årsak</td>
                                        <td>
                                            {behandling.status !== BehandlingStatus.AVSLUTTET ? (
                                                <Lenke
                                                    href={`/fagsak/${fagsak.id}/${behandling.behandlingId}/registrer-soknad`}
                                                >
                                                    {behandlingstyper[behandling.type].navn}
                                                </Lenke>
                                            ) : (
                                                behandlingstyper[behandling.type].navn
                                            )}
                                        </td>
                                        <td>{kategorier[behandling.kategori].navn}</td>
                                        <td>{underkategorier[behandling.underkategori].navn}</td>
                                        <td>{behandlingsstatuser[behandling.status]}</td>
                                        <td
                                            children={
                                                aktivVedtakForBehandling
                                                    ? formaterIsoDato(
                                                          aktivVedtakForBehandling.vedtaksdato,
                                                          datoformat.DATO
                                                      )
                                                    : 'Ukjent'
                                            }
                                        />
                                        <td>
                                            {behandling.status === BehandlingStatus.AVSLUTTET ? (
                                                <Lenke
                                                    href={`/fagsak/${fagsak.id}/${behandling.behandlingId}`}
                                                >
                                                    {behandling
                                                        ? behandlingsresultater[
                                                              behandling.samletResultat
                                                          ].navn
                                                        : 'Ukjent'}
                                                </Lenke>
                                            ) : behandling ? (
                                                behandlingsresultater[behandling.samletResultat]
                                                    .navn
                                            ) : (
                                                'Ukjent'
                                            )}
                                        </td>
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
