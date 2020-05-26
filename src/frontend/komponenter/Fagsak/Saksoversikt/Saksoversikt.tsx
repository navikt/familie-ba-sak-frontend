import moment from 'moment';
import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import 'nav-frontend-tabell-style';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { useApp } from '../../../context/AppContext';
import {
    behandlingsresultater,
    behandlingsstatuser,
    BehandlingStatus,
    behandlingstyper,
    IBehandling,
    kategorier,
    underkategorier,
} from '../../../typer/behandling';
import { IPersonBeregning } from '../../../typer/beregning';
import { fagsakStatus, IFagsak } from '../../../typer/fagsak';
import { IVedtakForBehandling } from '../../../typer/vedtak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { useBehandling } from '../../../context/BehandlingContext';

interface IProps {
    fagsak: IFagsak;
}

const Saksoversikt: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
    const history = useHistory();
    const [opphørsdato, setOpphørsdato] = React.useState('');

    const { bestemÅpenBehandling } = useBehandling();
    React.useEffect(() => {
        bestemÅpenBehandling(undefined);
    }, [fagsak.status]);

    const behandlingshistorikk = fagsak.behandlinger.filter(
        (behandling: IBehandling) => behandling.status === BehandlingStatus.FERDIGSTILT
    );

    let gjeldendeBehandling =
        behandlingshistorikk.length > 0
            ? behandlingshistorikk.sort((a, b) =>
                  moment(b.opprettetTidspunkt).diff(a.opprettetTidspunkt)
              )[0]
            : undefined;

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    if (!gjeldendeBehandling) {
        gjeldendeBehandling = aktivBehandling;
    }

    const aktivVedtak = gjeldendeBehandling
        ? gjeldendeBehandling.vedtakForBehandling.find(
              (vedtak: IVedtakForBehandling) => vedtak.aktiv === true
          )
        : undefined;

    const onClickRow = () => {
        return true;
    };

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

            {aktivVedtak?.personBeregninger &&
                aktivVedtak?.personBeregninger.length > 0 &&
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
                                    {aktivVedtak?.personBeregninger
                                        .filter(
                                            (personBeregning: IPersonBeregning) =>
                                                personBeregning.ytelsePerioder.length > 0
                                        )
                                        .map((personBeregning: IPersonBeregning) => {
                                            return (
                                                <tr key={personBeregning.personIdent}>
                                                    <td
                                                        children={`${personBeregning.personIdent}`}
                                                    />
                                                    <td children={`${personBeregning.beløp}`} />
                                                    <td children={`${personBeregning.stønadFom}`} />
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                        <div className={'saksoversikt__opphør'}>
                            <Undertittel children={'Opphør utbetalinger for fagsak'} />
                            <Input
                                bredde={'S'}
                                label={'Fra og med-dato'}
                                placeholder={'MM.YY'}
                                value={opphørsdato}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setOpphørsdato(event.target.value)
                                }
                            />
                            <Knapp
                                mini={true}
                                onClick={() => {
                                    axiosRequest<void, { opphørsdato: string }>({
                                        method: 'POST',
                                        url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/opphoer-migrert-vedtak/v2`,
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
                                        <tr key={behandling.behandlingId} onClick={onClickRow}>
                                            <td
                                                children={`${
                                                    behandlingstyper[behandling.type].navn
                                                }`}
                                            />
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
