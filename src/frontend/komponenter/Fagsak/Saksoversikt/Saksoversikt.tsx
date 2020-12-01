import * as React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';

import { useBehandling } from '../../../context/BehandlingContext';
import {
    BehandlingKategori,
    BehandlingResultat,
    BehandlingStatus,
    IBehandling,
    kategorier,
    underkategorier,
} from '../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import familieDayjs from '../../../utils/familieDayjs';
import { datoformat, formaterDato } from '../../../utils/formatter';
import { periodeOverlapperMedValgtDato } from '../../../utils/tid';
import Behandlinger from './Behandlinger';
import FagsakLenkepanel from './FagsakLenkepanel';
import Utbetalinger from './Utbetalinger';

interface IProps {
    fagsak: IFagsak;
}

const FlexSpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Saksoversikt: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { bestemÅpenBehandling } = useBehandling();
    React.useEffect(() => {
        bestemÅpenBehandling(undefined);
    }, [fagsak.status]);

    const iverksatteBehandlinger = fagsak.behandlinger.filter(
        (behandling: IBehandling) =>
            behandling.status === BehandlingStatus.AVSLUTTET &&
            behandling.samletResultat !== BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET &&
            behandling.samletResultat !== BehandlingResultat.HENLAGT_SØKNAD_TRUKKET
    );

    let gjeldendeBehandling =
        iverksatteBehandlinger.length > 0
            ? iverksatteBehandlinger.sort((a, b) =>
                  familieDayjs(b.opprettetTidspunkt).diff(a.opprettetTidspunkt)
              )[0]
            : undefined;

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    if (!gjeldendeBehandling) {
        gjeldendeBehandling = aktivBehandling;
    }

    const utbetalingsperioder = gjeldendeBehandling?.utbetalingsperioder ?? [];
    const utbetalingsperiodeInneværendeMåned = utbetalingsperioder.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, new Date())
    );

    const nesteMåned = familieDayjs().add(1, 'month').startOf('month');
    const utbetalingsperiodeNesteMåned = utbetalingsperioder.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, nesteMåned.toDate())
    );

    const lenkeTilBehandlingsresultat = () => {
        return aktivBehandling ? (
            <Lenke href={`/fagsak/${fagsak.id}/${aktivBehandling.behandlingId}/tilkjent-ytelse`}>
                Se behandlingsresultat for detaljer
            </Lenke>
        ) : null;
    };

    const løpendeMånedligUtbetaling = () => {
        if (utbetalingsperiodeInneværendeMåned) {
            return utbetalingsperiodeInneværendeMåned.utbetaltPerMnd < 1 &&
                gjeldendeBehandling?.kategori === BehandlingKategori.EØS ? (
                <AlertStripe className={'saksoversikt__alert'} type={'info'}>
                    Siste gjeldende vedtak er en EØS-sak uten månedlige utbetalinger fra NAV
                </AlertStripe>
            ) : (
                <>
                    {utbetalingsperiodeNesteMåned &&
                        utbetalingsperiodeNesteMåned !== utbetalingsperiodeInneværendeMåned && (
                            <AlertStripe className={'saksoversikt__alert'} type={'info'}>
                                <FlexSpaceBetween>
                                    {`Utbetalingen endres fra og med ${formaterDato(
                                        nesteMåned,
                                        datoformat.MÅNED_NAVN
                                    )}`}
                                    {lenkeTilBehandlingsresultat()}
                                </FlexSpaceBetween>
                            </AlertStripe>
                        )}
                    <Utbetalinger utbetalingsperiode={utbetalingsperiodeInneværendeMåned} />
                </>
            );
        } else if (utbetalingsperiodeNesteMåned) {
            return (
                <AlertStripe className={'saksoversikt__alert'} type={'info'}>
                    <FlexSpaceBetween>
                        {`Utbetalingen starter ${formaterDato(nesteMåned, datoformat.MÅNED_NAVN)}`}
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
