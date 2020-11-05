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
import { periodeOverlapperMedValgtDato } from '../../../utils/tid';
import { useApp } from '../../../context/AppContext';
import { ToggleNavn } from '../../../typer/toggles';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import styled from 'styled-components';
import Lenke from 'nav-frontend-lenker';

interface IProps {
    fagsak: IFagsak;
}

const FlexSpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Saksoversikt: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { toggles } = useApp();
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
    const beregningOversiktInneværendeMåned = beregningOversikt.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, new Date())
    );
    const nesteMåned = moment(new Date()).add(1, 'month').startOf('month').toDate();
    const beregningOversiktNesteMåned = beregningOversikt.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, nesteMåned)
    );

    const lenkeTilBehandlingsresultat = () => {
        return aktivBehandling ? (
            <Lenke href={`/fagsak/${fagsak.id}/${aktivBehandling.behandlingId}/tilkjent-ytelse`}>
                Se behandlingsresultat for detaljer
            </Lenke>
        ) : null;
    };

    const løpendeMånedligUtbetaling = () => {
        if (beregningOversiktInneværendeMåned) {
            return beregningOversiktInneværendeMåned.utbetaltPerMnd < 1 &&
                gjeldendeBehandling?.kategori === BehandlingKategori.EØS ? (
                <AlertStripe className={'saksoversikt__alert'} type={'info'}>
                    Siste gjeldende vedtak er en EØS-sak uten månedlige utbetalinger fra NAV
                </AlertStripe>
            ) : (
                <>
                    {beregningOversiktNesteMåned &&
                        beregningOversiktNesteMåned !== beregningOversiktInneværendeMåned && (
                            <AlertStripe className={'saksoversikt__alert'} type={'info'}>
                                <FlexSpaceBetween>
                                    {`Utbetalingen endres fra og med ${formaterIsoDato(
                                        nesteMåned.toDateString(),
                                        datoformat.MÅNED_NAVN
                                    )}`}
                                    {lenkeTilBehandlingsresultat()}
                                </FlexSpaceBetween>
                            </AlertStripe>
                        )}
                    <Utbetalinger beregningOversikt={beregningOversiktInneværendeMåned} />
                </>
            );
        } else if (beregningOversiktNesteMåned) {
            return (
                <AlertStripe className={'saksoversikt__alert'} type={'info'}>
                    <FlexSpaceBetween>
                        {`Utbetalingen starter ${formaterIsoDato(
                            nesteMåned.toDateString(),
                            datoformat.MÅNED_NAVN
                        )}`}
                        {lenkeTilBehandlingsresultat()}
                    </FlexSpaceBetween>
                </AlertStripe>
            );
        } else {
            return (
                <AlertStripe className={'saksoversikt__alert'} type={'feil'}>
                    Noe gikk galt ved henting av utbetalinger. Prøv igjen eller kontakt brukerstøtte
                    hvis problemet vedvarer.
                </AlertStripe>
            );
        }
    };

    return (
        <div className={'saksoversikt'}>
            <Innholdstittel children={'Saksoversikt'} />

            <FagsakLenkepanel fagsak={fagsak} />

            {fagsak.status === FagsakStatus.LØPENDE && (
                <>
                    <Systemtittel>Løpende månedlig utbetaling</Systemtittel>
                    {løpendeMånedligUtbetaling()}
                    {toggles[ToggleNavn.visTekniskOpphør] && <Opphør fagsak={fagsak} />}
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
