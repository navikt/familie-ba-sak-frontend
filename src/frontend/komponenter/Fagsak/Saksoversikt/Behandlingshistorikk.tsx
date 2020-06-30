import React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import moment from 'moment';
import { IBehandling, behandlingstyper, behandlingsresultater } from '../../../typer/behandling';
import { IVedtakForBehandling } from '../../../typer/vedtak';
import Lenke from 'nav-frontend-lenker';
import { formaterIsoDato, datoformat } from '../../../utils/formatter';
import { IFagsak } from '../../../typer/fagsak';

interface IBehandlingshistorikkProps {
    fagsak: IFagsak;
    behandlingshistorikk: IBehandling[];
}

const Behandlingshistorikk: React.FC<IBehandlingshistorikkProps> = ({
    behandlingshistorikk,
    fagsak,
}) => {
    return (
        <div className={'saksoversikt__behandlingshistorikk'}>
            <Undertittel children={'Behandlingshistorikk'} />
            {behandlingshistorikk.length > 0 ? (
                <table className="tabell">
                    <thead>
                        <tr>
                            <th children={'Behandlingstype'} />
                            <th children={'Resultat'} />
                            <th children={'Opprettet'} />
                            <th children={'Vedtaksdato'} />
                            <th children={'Virkningstidspunkt'} />
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
                                        {/* TODO: hente reel virkningstidspunkt */}
                                        <td
                                            children={
                                                aktivVedtakForBehandling &&
                                                aktivVedtakForBehandling.personBeregninger[0]
                                                    ? formaterIsoDato(
                                                          aktivVedtakForBehandling
                                                              .personBeregninger[0].stønadFom,
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

export default Behandlingshistorikk;
