import React from 'react';

import { addMonths, format } from 'date-fns';
import styled from 'styled-components';

import { HouseIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Alert, Heading, Link, Tabs } from '@navikt/ds-react';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import Behandlinger from './Behandlinger';
import FagsakLenkepanel from './FagsakLenkepanel';
import Utbetalinger from './Utbetalinger';
import type { VisningBehandling } from './visningBehandling';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingStatus, erBehandlingHenlagt } from '../../../typer/behandling';
import {
    behandlingKategori,
    BehandlingKategori,
    behandlingUnderkategori,
} from '../../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakStatus } from '../../../typer/fagsak';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../utils/fagsak';
import { datoformat } from '../../../utils/formatter';
import { kalenderDiff, periodeOverlapperMedValgtDato } from '../../../utils/kalender';
import { Infotrygdtabeller } from '../../Infotrygd/Infotrygdtabeller';
import { useInfotrygdRequest } from '../../Infotrygd/useInfotrygd';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

const basakTab = { label: 'Saksoversikt', key: 'basak' };
const infotrygdTab = { label: 'Infotrygd', key: 'infotrygd' };

const FlexSpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SaksoversiktWrapper = styled.div`
    max-width: 70rem;
    margin: 2.5rem 4rem;
`;

const StyledHeading = styled(Heading)`
    margin-top: 3.75rem;
`;

const StyledAlert = styled(Alert)`
    .navds-alert__wrapper {
        flex: 1;
    }
`;

const Saksoversikt: React.FunctionComponent<IProps> = ({ minimalFagsak }) => {
    const { settÅpenBehandling } = useBehandling();

    React.useEffect(() => {
        settÅpenBehandling(byggTomRessurs(), false);
    }, [minimalFagsak.status]);

    const { hentInfotrygdsaker, infotrygdsakerRessurs } = useInfotrygdRequest();

    const iverksatteBehandlinger = minimalFagsak.behandlinger.filter(
        (behandling: VisningBehandling) =>
            behandling.status === BehandlingStatus.AVSLUTTET &&
            !erBehandlingHenlagt(behandling.resultat)
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

    const nesteMåned = addMonths(new Date(), 1);

    const utbetalingsperiodeNesteMåned = gjeldendeUtbetalingsperioder.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, nesteMåned)
    );

    const lenkeTilBehandlingsresultat = () => {
        return aktivBehandling ? (
            <Link
                href={`/fagsak/${minimalFagsak.id}/${aktivBehandling.behandlingId}/tilkjent-ytelse`}
            >
                Se detaljer
            </Link>
        ) : null;
    };

    const løpendeMånedligUtbetaling = () => {
        if (
            utbetalingsperiodeInneværendeMåned &&
            utbetalingsperiodeInneværendeMåned.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING
        ) {
            return utbetalingsperiodeInneværendeMåned.utbetaltPerMnd < 1 &&
                gjeldendeBehandling?.kategori === BehandlingKategori.EØS ? (
                <Alert className={'saksoversikt__alert'} variant="info">
                    Siste gjeldende vedtak er en EØS-sak uten månedlige utbetalinger fra NAV
                </Alert>
            ) : (
                <>
                    {utbetalingsperiodeNesteMåned &&
                        utbetalingsperiodeNesteMåned !== utbetalingsperiodeInneværendeMåned && (
                            <StyledAlert className={'saksoversikt__alert'} variant="info">
                                <FlexSpaceBetween>
                                    {`Utbetalingen endres fra og med ${format(
                                        nesteMåned,
                                        datoformat.MÅNED_ÅR_NAVN
                                    )}`}
                                    {lenkeTilBehandlingsresultat()}
                                </FlexSpaceBetween>
                            </StyledAlert>
                        )}
                    <Utbetalinger vedtaksperiode={utbetalingsperiodeInneværendeMåned} />
                </>
            );
        } else if (utbetalingsperiodeNesteMåned) {
            return (
                <StyledAlert className={'saksoversikt__alert'} variant="info">
                    <FlexSpaceBetween>
                        {`Utbetalingen starter ${format(nesteMåned, datoformat.MÅNED_ÅR_NAVN)}`}
                        {lenkeTilBehandlingsresultat()}
                    </FlexSpaceBetween>
                </StyledAlert>
            );
        } else {
            return (
                <Alert className={'saksoversikt__alert'} variant="error">
                    Noe gikk galt ved henting av utbetalinger. Prøv igjen eller kontakt brukerstøtte
                    hvis problemet vedvarer.
                </Alert>
            );
        }
    };

    const visTabell = () => {
        if (infotrygdsakerRessurs.status === RessursStatus.SUKSESS) {
            return (
                <Infotrygdtabeller
                    ident={minimalFagsak.søkerFødselsnummer}
                    saker={infotrygdsakerRessurs.data.saker}
                    minimalFagsak={minimalFagsak}
                />
            );
        } else if (
            infotrygdsakerRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
            infotrygdsakerRessurs.status === RessursStatus.FEILET
        ) {
            return <Alert children={infotrygdsakerRessurs.frontendFeilmelding} variant="error" />;
        }
    };

    return (
        <Tabs
            defaultValue={basakTab.key}
            onChange={value => {
                if (value === infotrygdTab.key) {
                    hentInfotrygdsaker(minimalFagsak.søkerFødselsnummer);
                }
            }}
        >
            <Tabs.List>
                <Tabs.Tab value={basakTab.key} label={basakTab.label} icon={<HouseIcon />} />
                <Tabs.Tab
                    value={infotrygdTab.key}
                    label={infotrygdTab.label}
                    icon={<MagnifyingGlassIcon />}
                />
            </Tabs.List>
            <Tabs.Panel value={basakTab.key}>
                <SaksoversiktWrapper>
                    <Heading size={'large'} level={'1'} children={'Saksoversikt'} />

                    <FagsakLenkepanel minimalFagsak={minimalFagsak} />
                    {minimalFagsak.status === FagsakStatus.LØPENDE && (
                        <>
                            <StyledHeading size={'medium'} level={'2'} spacing>
                                Løpende månedlig utbetaling
                            </StyledHeading>
                            {løpendeMånedligUtbetaling()}
                        </>
                    )}
                    <Behandlinger minimalFagsak={minimalFagsak} />
                </SaksoversiktWrapper>{' '}
            </Tabs.Panel>
            <Tabs.Panel value={infotrygdTab.key}>
                <SaksoversiktWrapper>
                    <Heading size={'large'} level={'1'} children={'Infotrygd'} />
                    {visTabell()}
                </SaksoversiktWrapper>
            </Tabs.Panel>
        </Tabs>
    );
};

export const sakstype = (behandling?: IBehandling) => {
    if (!behandling) {
        return 'Ikke satt';
    }

    return `${
        behandling?.kategori ? behandlingKategori[behandling?.kategori] : behandling?.kategori
    }, ${
        behandling?.underkategori
            ? behandlingUnderkategori[behandling?.underkategori]
            : behandling?.underkategori
    }`;
};

export default Saksoversikt;
