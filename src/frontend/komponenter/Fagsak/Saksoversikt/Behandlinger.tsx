import React from 'react';

import classNames from 'classnames';

import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { useApp } from '../../../context/AppContext';
import {
    behandlingsresultater,
    behandlingstyper,
    IBehandling,
    behandlingsstatuser,
    kategorier,
    underkategorier,
    BehandlingStatus,
    behandlingÅrsak,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { ToggleNavn } from '../../../typer/toggles';
import { IVedtakForBehandling } from '../../../typer/vedtak';
import familieDayjs, { familieDayjsDiff } from '../../../utils/familieDayjs';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';

interface IBehandlingshistorikkProps {
    fagsak: IFagsak;
}

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ fagsak }) => {
    const { toggles } = useApp();
    const tilbakekrevingErToggletPå = toggles[ToggleNavn.tilbakekreving];
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
                            <th children={'Årsak'} />
                            <th children={'Type'} />
                            <th children={'Fagsaktype'} />
                            <th children={'Gjelder'} />
                            <th children={'Status'} />
                            <th children={'Vedtaksdato'} />
                            <th children={'Resultat'} />
                            {tilbakekrevingErToggletPå === true && (
                                <th children={'Tilbakekreving?'} />
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {fagsak.behandlinger
                            .sort((a, b) =>
                                familieDayjsDiff(
                                    familieDayjs(b.opprettetTidspunkt),
                                    familieDayjs(a.opprettetTidspunkt)
                                )
                            )
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
                                        <td>{behandlingÅrsak[behandling.årsak]}</td>
                                        <td>
                                            {behandling.status !== BehandlingStatus.AVSLUTTET ? (
                                                <Lenke
                                                    href={`/fagsak/${fagsak.id}/${behandling.behandlingId}`}
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
                                                    : '-'
                                            }
                                        />
                                        <td>
                                            {behandling.status === BehandlingStatus.AVSLUTTET ? (
                                                <Lenke
                                                    href={`/fagsak/${fagsak.id}/${behandling.behandlingId}`}
                                                >
                                                    {behandling
                                                        ? behandlingsresultater[behandling.resultat]
                                                        : '-'}
                                                </Lenke>
                                            ) : behandling ? (
                                                behandlingsresultater[behandling.resultat]
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        {tilbakekrevingErToggletPå === true && (
                                            <td>
                                                {behandling.tilbakekreving ? (
                                                    <Lenke
                                                        href={`https://familie-tilbake-frontend.dev.intern.nav.no/fagsystem/BA/fagsak/${fagsak.id}/behandling/${behandling.tilbakekreving.tilbakekrevingsbehandlingId}`}
                                                    >
                                                        'Ja'
                                                    </Lenke>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                        )}
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
