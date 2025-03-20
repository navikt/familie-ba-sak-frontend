import React from 'react';

import { addMonths, differenceInMilliseconds, format } from 'date-fns';
import styled from 'styled-components';

import { HouseIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Alert, Heading, Link, Tabs, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import Behandlinger from './Behandlinger';
import FagsakLenkepanel, { SaksoversiktPanelBredde } from './FagsakLenkepanel';
import { GjennomførValutajusteringKnapp } from './GjennomførValutajusteringKnapp';
import Utbetalinger from './Utbetalinger';
import type { VisningBehandling } from './visningBehandling';
import { useApp } from '../../../context/AppContext';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingStatus, erBehandlingHenlagt } from '../../../typer/behandling';
import {
    behandlingKategori,
    BehandlingKategori,
    behandlingUnderkategori,
} from '../../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakStatus } from '../../../typer/fagsak';
import { ToggleNavn } from '../../../typer/toggles';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { Datoformat, isoStringTilDate, periodeOverlapperMedValgtDato } from '../../../utils/dato';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../utils/fagsak';
import { Infotrygdtabeller } from '../../infotrygd/Infotrygdtabeller';
import { useInfotrygdRequest } from '../../infotrygd/useInfotrygd';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

const basakTab = { label: 'Saksoversikt', key: 'basak' };
const infotrygdTab = { label: 'Infotrygd', key: 'infotrygd' };

const SaksoversiktWrapper = styled.div`
    max-width: 70rem;
    margin: 2.5rem 4rem;
`;

const StyledHeading = styled(Heading)`
    margin-top: 3.75rem;
`;

const StyledAlert = styled(Alert)`
    width: ${SaksoversiktPanelBredde};
`;

const Saksoversikt: React.FunctionComponent<IProps> = ({ minimalFagsak }) => {
    const { hentInfotrygdsaker, infotrygdsakerRessurs } = useInfotrygdRequest();
    const { toggles } = useApp();

    const iverksatteBehandlinger = minimalFagsak.behandlinger.filter(
        (behandling: VisningBehandling) =>
            behandling.status === BehandlingStatus.AVSLUTTET &&
            !erBehandlingHenlagt(behandling.resultat)
    );

    let gjeldendeBehandling =
        iverksatteBehandlinger.length > 0
            ? iverksatteBehandlinger.sort((a, b) =>
                  differenceInMilliseconds(
                      isoStringTilDate(b.opprettetTidspunkt),
                      isoStringTilDate(a.opprettetTidspunkt)
                  )
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
        return (
            aktivBehandling && (
                <Link
                    href={`/fagsak/${minimalFagsak.id}/${aktivBehandling.behandlingId}/tilkjent-ytelse`}
                >
                    Se detaljer
                </Link>
            )
        );
    };

    const løpendeMånedligUtbetaling = () => {
        if (
            utbetalingsperiodeInneværendeMåned &&
            utbetalingsperiodeInneværendeMåned.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING
        ) {
            return utbetalingsperiodeInneværendeMåned.utbetaltPerMnd < 1 &&
                gjeldendeBehandling?.kategori === BehandlingKategori.EØS ? (
                <StyledAlert variant="info">
                    Siste gjeldende vedtak er en EØS-sak uten månedlige utbetalinger fra NAV
                </StyledAlert>
            ) : (
                <>
                    {utbetalingsperiodeNesteMåned &&
                        utbetalingsperiodeNesteMåned !== utbetalingsperiodeInneværendeMåned && (
                            <StyledAlert variant="info">
                                <VStack>
                                    {`Utbetalingen endres fra og med ${format(
                                        nesteMåned,
                                        Datoformat.MÅNED_ÅR_NAVN
                                    )}.`}
                                    {lenkeTilBehandlingsresultat()}
                                </VStack>
                            </StyledAlert>
                        )}
                    <Utbetalinger vedtaksperiode={utbetalingsperiodeInneværendeMåned} />
                </>
            );
        } else if (utbetalingsperiodeNesteMåned) {
            return (
                <StyledAlert variant="info">
                    <VStack>
                        {`Utbetalingen starter ${format(nesteMåned, Datoformat.MÅNED_ÅR_NAVN)}.`}
                        {lenkeTilBehandlingsresultat()}
                    </VStack>
                </StyledAlert>
            );
        } else {
            return (
                <StyledAlert variant="error">
                    Noe gikk galt ved henting av utbetalinger. Prøv igjen eller kontakt brukerstøtte
                    hvis problemet vedvarer.
                </StyledAlert>
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

                    {toggles[ToggleNavn.kanKjøreAutomatiskValutajusteringBehandlingForEnkeltSak] &&
                        minimalFagsak.løpendeKategori === BehandlingKategori.EØS && (
                            <GjennomførValutajusteringKnapp fagsakId={minimalFagsak.id} />
                        )}

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
