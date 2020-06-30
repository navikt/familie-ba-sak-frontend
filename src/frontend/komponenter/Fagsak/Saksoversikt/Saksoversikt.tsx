import moment from 'moment';
import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import 'nav-frontend-tabell-style';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/BehandlingContext';
import {
    BehandlingStatus,
    IBehandling,
    kategorier,
    underkategorier,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IVedtakForBehandling } from '../../../typer/vedtak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { datoformat } from '../../../utils/formatter';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import Behandlinger from './Behandlinger';
import Utbetalinger from './Utbetalinger';

interface IProps {
    fagsak: IFagsak;
}

const Saksoversikt: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
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

    return (
        <div className={'saksoversikt'}>
            <Systemtittel className={'tittel'} children={'Saksoversikt'} />

            <Informasjonsbolk
                informasjon={[
                    {
                        label: `Vedtaksdato`,
                        tekst:
                            moment(aktivVedtak?.vedtaksdato).format(datoformat.DATO) ?? 'Ikke satt',
                    },
                    { label: `Sakstype`, tekst: sakstype(gjeldendeBehandling) },
                ]}
            />

            {aktivVedtak?.personBeregninger &&
                aktivVedtak?.personBeregninger.length > 0 &&
                gjeldendeBehandling?.status === BehandlingStatus.FERDIGSTILT && (
                    <div>
                        <Utbetalinger personbergninger={aktivVedtak.personBeregninger} />
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
            <Behandlinger fagsak={fagsak} behandlingshistorikk={behandlingshistorikk} />
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
