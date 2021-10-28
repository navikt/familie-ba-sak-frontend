import React, { useState } from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import Tabs from 'nav-frontend-tabs';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import {
    BehandlingKategori,
    BehandlingResultat,
    BehandlingStatus,
    IBehandling,
    kategorier,
    underkategorier,
} from '../../../typer/behandling';
import { FagsakStatus, IMinimalFagsak } from '../../../typer/fagsak';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../utils/fagsak';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import {
    førsteDagIInneværendeMåned,
    kalenderDatoTilDate,
    kalenderDiff,
    KalenderEnhet,
    leggTil,
    periodeOverlapperMedValgtDato,
    serializeIso8601String,
} from '../../../utils/kalender';
import { Infotrygdtabeller } from '../../Infotrygd/Infotrygdtabeller';
import { useInfotrygdRequest } from '../../Infotrygd/useInfotrygd';
import Behandlinger from './Behandlinger';
import FagsakLenkepanel from './FagsakLenkepanel';
import Utbetalinger from './Utbetalinger';
import { VisningBehandling } from './visningBehandling';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

enum Tabvalg {
    BASAK,
    INFOTRYGD,
}

const basakTab = { label: 'BA-sak', tabnr: 0 };
const infotrygdTab = { label: 'Infotrygd', tabnr: 1 };

const FlexSpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledTabs = styled(Tabs)`
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const Saksoversikt: React.FunctionComponent<IProps> = ({ minimalFagsak }) => {
    const [tabvalg, settTabvalg] = useState<Tabvalg>(Tabvalg.BASAK);

    const { bestemÅpenBehandling } = useBehandling();

    React.useEffect(() => {
        bestemÅpenBehandling(undefined);
    }, [minimalFagsak.status]);

    const { hentInfotrygdsaker, infotrygdsakerRessurs } = useInfotrygdRequest();

    const iverksatteBehandlinger = minimalFagsak.behandlinger.filter(
        (behandling: VisningBehandling) =>
            behandling.status === BehandlingStatus.AVSLUTTET &&
            behandling.resultat !== BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET &&
            behandling.resultat !== BehandlingResultat.HENLAGT_SØKNAD_TRUKKET &&
            behandling.resultat !== BehandlingResultat.HENLAGT_AUTOMATISK_FØDSELSHENDELSE
    );

    let gjeldendeBehandling =
        iverksatteBehandlinger.length > 0
            ? iverksatteBehandlinger.sort((a, b) =>
                  kalenderDiff(new Date(b.opprettetTidspunkt), new Date(a.opprettetTidspunkt))
              )[0]
            : undefined;

    const aktivBehandling = hentAktivBehandlingPåMinimalFagsak(minimalFagsak);

    if (!gjeldendeBehandling) {
        gjeldendeBehandling = aktivBehandling;
    }

    const gjeldendeUtbetalingsperioder = minimalFagsak.gjeldendeUtbetalingsperioder;
    const utbetalingsperiodeInneværendeMåned = gjeldendeUtbetalingsperioder.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, new Date())
    );

    const nesteMåned = leggTil(førsteDagIInneværendeMåned(), 1, KalenderEnhet.MÅNED);
    const utbetalingsperiodeNesteMåned = gjeldendeUtbetalingsperioder.find(periode =>
        periodeOverlapperMedValgtDato(
            periode.periodeFom,
            periode.periodeTom,
            kalenderDatoTilDate(nesteMåned)
        )
    );

    const lenkeTilBehandlingsresultat = () => {
        return aktivBehandling ? (
            <Lenke
                href={`/fagsak/${minimalFagsak.id}/${aktivBehandling.behandlingId}/tilkjent-ytelse`}
            >
                Se behandlingsresultat for detaljer
            </Lenke>
        ) : null;
    };

    const løpendeMånedligUtbetaling = () => {
        if (
            utbetalingsperiodeInneværendeMåned &&
            utbetalingsperiodeInneværendeMåned.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING
        ) {
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
                                    {`Utbetalingen endres fra og med ${formaterIsoDato(
                                        serializeIso8601String(nesteMåned),
                                        datoformat.MÅNED_ÅR_NAVN
                                    )}`}
                                    {lenkeTilBehandlingsresultat()}
                                </FlexSpaceBetween>
                            </AlertStripe>
                        )}
                    <Utbetalinger vedtaksperiode={utbetalingsperiodeInneværendeMåned} />
                </>
            );
        } else if (utbetalingsperiodeNesteMåned) {
            return (
                <AlertStripe className={'saksoversikt__alert'} type={'info'}>
                    <FlexSpaceBetween>
                        {`Utbetalingen starter ${formaterIsoDato(
                            serializeIso8601String(nesteMåned),
                            datoformat.MÅNED_ÅR_NAVN
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

    const visTabell = () => {
        if (infotrygdsakerRessurs.status === RessursStatus.SUKSESS) {
            return <Infotrygdtabeller saker={infotrygdsakerRessurs.data.saker} />;
        } else if (
            infotrygdsakerRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
            infotrygdsakerRessurs.status === RessursStatus.FEILET
        ) {
            return (
                <AlertStripe children={infotrygdsakerRessurs.frontendFeilmelding} type={'feil'} />
            );
        }
    };

    return (
        <div className={'saksoversikt'}>
            <Innholdstittel children={'Saksoversikt'} />
            <StyledTabs
                tabs={[{ label: basakTab.label }, { label: infotrygdTab.label }]}
                onChange={(_, tabnr) => {
                    if (tabnr === basakTab.tabnr) {
                        settTabvalg(Tabvalg.BASAK);
                    } else {
                        settTabvalg(Tabvalg.INFOTRYGD);
                        hentInfotrygdsaker(minimalFagsak.søkerFødselsnummer);
                    }
                }}
            />
            {tabvalg === Tabvalg.BASAK ? (
                <>
                    <FagsakLenkepanel minimalFagsak={minimalFagsak} />
                    {minimalFagsak.status === FagsakStatus.LØPENDE && (
                        <>
                            <Systemtittel>Løpende månedlig utbetaling</Systemtittel>
                            {løpendeMånedligUtbetaling()}
                        </>
                    )}
                    <Behandlinger minimalFagsak={minimalFagsak} />
                </>
            ) : (
                visTabell()
            )}
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
