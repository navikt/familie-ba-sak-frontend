import moment from 'moment';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import {
    BehandlingKategori,
    BehandlingStatus,
    IBehandling,
    kategorier,
    underkategorier,
} from '../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import Behandlinger from './Behandlinger';
import Utbetalinger from './Utbetalinger';
import FagsakLenkepanel from './FagsakLenkepanel';
import AlertStripe from 'nav-frontend-alertstriper';
import Opphør from './Opphør';

interface IProps {
    fagsak: IFagsak;
}

const Saksoversikt: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { bestemÅpenBehandling } = useBehandling();
    React.useEffect(() => {
        bestemÅpenBehandling(undefined);
    }, [fagsak.status]);

    const behandlingshistorikk = fagsak.behandlinger.filter(
        (behandling: IBehandling) => behandling.status === BehandlingStatus.AVSLUTTET
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

    const beregningOversikt = gjeldendeBehandling?.beregningOversikt ?? [];

    return (
        <div className={'saksoversikt'}>
            <Innholdstittel children={'Saksoversikt'} />

            <FagsakLenkepanel fagsak={fagsak} />

            {fagsak.status === FagsakStatus.LØPENDE && (
                <>
                    <Systemtittel>Løpende månedlig utbetaling</Systemtittel>
                    {beregningOversikt.length > 0 ? (
                        <>
                            <Utbetalinger beregningsOversikt={beregningOversikt} />
                            <Opphør fagsak={fagsak} />
                        </>
                    ) : gjeldendeBehandling?.kategori === BehandlingKategori.EØS ? (
                        <AlertStripe className={'saksoversikt__alert'} type={'info'}>
                            Siste gjeldende vedtak er en EØS-sak uten månedlige utbetalinger fra NAV
                        </AlertStripe>
                    ) : (
                        <AlertStripe className={'saksoversikt__alert'} type={'feil'}>
                            Noe gikk galt ved henting av utbetalinger. Prøv igjen eller kontakt
                            brukerstøtte hvis problemet vedvarer.
                        </AlertStripe>
                    )}
                </>
            )}
            <Behandlinger fagsak={fagsak} />
        </div>
    );
};

export const sakstype = (behandling?: IBehandling) => {
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
