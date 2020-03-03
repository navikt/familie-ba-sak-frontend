import { Input } from 'nav-frontend-skjema';
import { Systemtittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IFagsak, fagsakStatus } from '../../../typer/fagsak';
import { IBarnBeregning } from '../../../typer/behandle';
import 'nav-frontend-tabell-style';
import { formaterIsoDato, datoformat } from '../../../utils/formatter';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router';
import moment from 'moment';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { axiosRequest } from '../../../api/axios';
import {
    Behandlingstype,
    IBehandling,
    behandlingsresultater,
    behandlingsstatuser,
    behandlingstyper,
    kategorier,
    underkategorier,
    BehandlingStatus,
} from '../../../typer/behandling';
import { IVedtakForBehandling } from '../../../typer/vedtak';

interface IProps {
    fagsak: IFagsak;
}

const Saksoversikt: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const history = useHistory();
    const [opphørsdato, setOpphørsdato] = React.useState('');

    const behandlingshistorikk = fagsak.behandlinger.filter(
        (behandling: IBehandling) => !behandling.aktiv
    );

    const ferdigstilteBehandlinger = fagsak.behandlinger.filter(
        (behandling: IBehandling) => behandling.status === BehandlingStatus.FERDIGSTILT
    );

    let gjeldendeBehandling =
        ferdigstilteBehandlinger.length > 0
            ? ferdigstilteBehandlinger.sort((a, b) =>
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
            {aktivBehandling && aktivBehandling?.status !== BehandlingStatus.FERDIGSTILT ? (
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
            ) : (
                <Knapp
                    mini={true}
                    onClick={() => {
                        history.push(`/fagsak/${fagsak.id}/ny-behandling`);
                    }}
                    children={'Opprett behandling'}
                />
            )}

            {aktivVedtak?.barnasBeregning &&
                aktivVedtak?.barnasBeregning.length > 0 &&
                gjeldendeBehandling?.status === BehandlingStatus.FERDIGSTILT && (
                    <div>
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
                        {gjeldendeBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD && (
                            <div className={'saksoversikt__opphør'}>
                                <Undertittel children={'Opphør utbetalinger for migrert fagsak'} />
                                <Input
                                    bredde={'S'}
                                    label={'Fra og med-dato'}
                                    placeholder={'MM.YY'}
                                    value={opphørsdato}
                                    onChange={(event: any) => setOpphørsdato(event.target.value)}
                                />
                                <Knapp
                                    mini={true}
                                    onClick={() => {
                                        axiosRequest({
                                            method: 'POST',
                                            url: `/familie-ba-sak/api/fagsak/${fagsak.id}/opphoer-migrert-vedtak/v2`,
                                            data: {
                                                opphørsdato: moment(
                                                    opphørsdato,
                                                    datoformat.MÅNED,
                                                    true
                                                ).format('YYYY-MM-DD'),
                                            },
                                        });
                                    }}
                                    children={'Opphør utbetaling'}
                                />
                            </div>
                        )}
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
                                                    behandling
                                                        ? behandlingsresultater[behandling.resultat]
                                                              .navn
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
    if (!behandling) {
        return 'Ikke satt';
    }

    return `${
        behandling?.kategori ? kategorier[behandling?.kategori].navn : behandling?.kategori
    }, ${
        behandling?.underkategori
            ? underkategorier[behandling?.underkategori].navn
            : behandling?.underkategori
    }`;
};

export default Saksoversikt;
