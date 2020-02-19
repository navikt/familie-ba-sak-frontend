import * as React from 'react';
import {
    IFagsak,
    fagsakStatus,
    IBehandling,
    IVedtakForBehandling,
    BehandlingStatus,
    kategorier,
    underkategorier,
    behandlingstyper,
    behandlingsstatuser,
    vedtaksresultater,
} from '../../../typer/fagsak';
import { Systemtittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { IBarnBeregning } from '../../../typer/behandle';
import 'nav-frontend-tabell-style';
import { formaterIsoDato, datoformat } from '../../../utils/formatter';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router';
import moment = require('moment');
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';

interface IProps {
    fagsak: IFagsak;
}

const Saksoversikt: React.StatelessComponent<IProps> = ({ fagsak }) => {
    const history = useHistory();

    const behandlingshistorikk = fagsak.behandlinger.filter(
        (behandling: IBehandling) => !behandling.aktiv
    );

    const iverksatteBehandlinger = fagsak.behandlinger.filter(
        (behandling: IBehandling) => behandling.status === BehandlingStatus.IVERKSATT
    );

    let gjeldendeBehandling =
        iverksatteBehandlinger.length > 0
            ? iverksatteBehandlinger.sort((a, b) =>
                  moment(b.opprettetTidspunkt).diff(a.opprettetTidspunkt)
              )[0]
            : undefined;

    const aktivBehandling = fagsak.behandlinger.find(
        (behandling: IBehandling) => behandling.aktiv === true
    );

    if (!gjeldendeBehandling) {
        gjeldendeBehandling = aktivBehandling;
    }

    const aktivVedtak = gjeldendeBehandling
        ? gjeldendeBehandling.vedtakForBehandling.find(
              (vedtak: IVedtakForBehandling) => vedtak.aktiv === true
          )
        : undefined;

    return (
        <div className={'saksoversikt'}>
            <Systemtittel children={'Saksoversikt'} />

            <Informasjonsbolk
                informasjon={[
                    { label: `Status på sak`, tekst: fagsakStatus[fagsak.status].navn },
                    { label: `Vedtaksdato`, tekst: aktivVedtak?.vedtaksdato ?? 'Ikke satt' },
                    { label: `Sakstype`, tekst: sakstype(gjeldendeBehandling) },
                ]}
            />

            {aktivVedtak?.barnasBeregning &&
                aktivVedtak?.barnasBeregning.length > 0 &&
                gjeldendeBehandling?.status === BehandlingStatus.IVERKSATT && (
                    <div className={'saksoversikt__utbetalinger'}>
                        <Undertittel children={'Utbetalinger'} />
                        <table className="tabell">
                            <thead>
                                <tr>
                                    <th children={'Person'} />
                                    <th children={'Beløp'} />
                                    <th children={'Periode'} />
                                </tr>
                            </thead>
                            <tbody>
                                {aktivVedtak?.barnasBeregning.map(
                                    (barnBeregning: IBarnBeregning) => {
                                        return (
                                            <tr key={barnBeregning.barn}>
                                                <td children={`${barnBeregning.barn}`} />
                                                <td children={`${barnBeregning.beløp}`} />
                                                <td children={`${barnBeregning.stønadFom}`} />
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

            {aktivBehandling?.status !== BehandlingStatus.IVERKSATT && (
                <div className={'saksoversikt__aktivbehandling'}>
                    <Undertittel children={'Aktiv behandling'} />
                    <Informasjonsbolk
                        informasjon={[
                            { label: `Behandlingstype`, tekst: sakstype(aktivBehandling) },
                            {
                                label: `Behandlingsstatus`,
                                tekst: aktivBehandling
                                    ? behandlingsstatuser[aktivBehandling?.status].navn
                                    : 'Ukjent',
                            },
                        ]}
                    />

                    <Knapp
                        mini={true}
                        onClick={() => {
                            history.push(`/fagsak/${fagsak.id}/vilkår`);
                        }}
                        children={'Gå til behandling'}
                    />
                </div>
            )}

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
                                .sort((a, b) =>
                                    moment(b.opprettetTidspunkt).diff(a.opprettetTidspunkt)
                                )
                                .map((behandling: IBehandling) => {
                                    const aktivVedtakForBehandling = behandling.vedtakForBehandling.find(
                                        (vedtak: IVedtakForBehandling) => vedtak.aktiv
                                    );

                                    return (
                                        <tr key={behandling.behandlingId}>
                                            <td
                                                children={`${
                                                    behandlingstyper[behandling.type].navn
                                                }`}
                                            />
                                            <td
                                                children={`${
                                                    aktivVedtakForBehandling
                                                        ? vedtaksresultater[
                                                              aktivVedtakForBehandling?.resultat
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
                                                    aktivVedtakForBehandling.barnasBeregning[0]
                                                        ? formaterIsoDato(
                                                              aktivVedtakForBehandling
                                                                  .barnasBeregning[0].stønadFom,
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
        </div>
    );
};

const sakstype = (behandling?: IBehandling) => {
    return `${
        behandling?.kategori ? kategorier[behandling?.kategori].navn : behandling?.kategori
    }, ${
        behandling?.underkategori
            ? underkategorier[behandling?.underkategori].navn
            : behandling?.underkategori
    }`;
};

export default Saksoversikt;
