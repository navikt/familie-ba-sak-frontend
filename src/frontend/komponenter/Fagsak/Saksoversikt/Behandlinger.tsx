import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import {
    behandlingsresultater,
    behandlingstyper,
    IBehandling,
    behandlingsstatuser,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IVedtakForBehandling } from '../../../typer/vedtak';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';

interface IBehandlingshistorikkProps {
    fagsak: IFagsak;
}

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ fagsak }) => {
    return (
        <div className={'saksoversikt__behandlingshistorikk'}>
            <Undertittel children={'Behandlinger'} />
            {fagsak.behandlinger.length > 0 ? (
                <table className="tabell">
                    <thead>
                        <tr>
                            <th children={'Type'} />
                            <th children={'Status'} />
                            <th children={'Resultat'} />
                            <th children={'Opprettet'} />
                            <th children={'Vedtaksdato'} />
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
                                        <td>
                                            <Lenke
                                                href={`/fagsak/${fagsak.id}/${behandling.behandlingId}/registrer-soknad`}
                                            >
                                                {behandlingstyper[behandling.type].navn}
                                            </Lenke>
                                        </td>
                                        <td>{behandlingsstatuser[behandling.status]}</td>
                                        <td
                                            children={`${
                                                behandling
                                                    ? behandlingsresultater[
                                                          behandling.samletResultat
                                                      ].navn
                                                    : 'Ukjent'
                                            }`}
                                        />
                                        <td
                                            children={`${formaterIsoDato(
                                                behandling.opprettetTidspunkt,
                                                datoformat.DATO
                                            )}`}
                                        />
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
