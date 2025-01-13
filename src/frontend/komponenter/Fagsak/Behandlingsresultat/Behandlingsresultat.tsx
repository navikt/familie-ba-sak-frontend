import * as React from 'react';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { PencilIcon } from '@navikt/aksel-icons';
import { Alert, Button, ErrorMessage, ErrorSummary, Label } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import EndretUtbetalingAndelTabell from './EndretUtbetalingAndelTabell';
import KompetanseSkjema from './Kompetanse/KompetanseSkjema';
import MigreringInfoboks from './MigreringInfoboks';
import { Oppsummeringsboks } from './Oppsummeringsboks';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';
import UtbetaltAnnetLand from './UtbetaltAnnetLand/UtbetaltAnnetLand';
import { useOppdaterValutakursOgSimuleringPåBeslutterSteg } from './Valutakurs/useOppdaterValutakursOgSimuleringPåBeslutterSteg';
import Valutakurser from './Valutakurs/Valutakurser';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useEøs } from '../../../context/Eøs/EøsContext';
import { useFagsakContext } from '../../../context/Fagsak/FagsakContext';
import { kompetanseFeilmeldingId } from '../../../context/Kompetanse/KompetanseSkjemaContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { utenlandskPeriodeBeløpFeilmeldingId } from '../../../context/UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpSkjemaContext';
import { valutakursFeilmeldingId } from '../../../context/Valutakurs/ValutakursSkjemaContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingSteg, Behandlingstype } from '../../../typer/behandling';
import type {
    IRestKompetanse,
    IRestUtenlandskPeriodeBeløp,
    IRestValutakurs,
} from '../../../typer/eøsPerioder';
import type { IRestEndretUtbetalingAndel } from '../../../typer/utbetalingAndel';
import type { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import { periodeOverlapperMedValgtDato } from '../../../utils/dato';
import { formaterIdent, slåSammenListeTilStreng } from '../../../utils/formatter';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

const EndretUtbetalingAndel = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`;

const StyledEditIkon = styled(PencilIcon)`
    font-size: 1.5rem;
`;

const StyledAlert = styled(Alert)`
    margin-bottom: 1rem;
`;

const StyledErrorSummary = styled(ErrorSummary)`
    margin-top: 5rem;
`;

interface IBehandlingsresultatProps {
    åpenBehandling: IBehandling;
}

const Behandlingsresultat: React.FunctionComponent<IBehandlingsresultatProps> = ({
    åpenBehandling,
}) => {
    const navigate = useNavigate();
    const { fagsakId } = useSakOgBehandlingParams();
    const { minimalFagsak: minimalFagsakRessurs } = useFagsakContext();

    const minimalFagsak = hentDataFraRessurs(minimalFagsakRessurs);

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const [personerMedUgyldigEtterbetalingsperiode, settPersonerMedUgyldigEtterbetalingsperiode] =
        useState<string[]>([]);

    const {
        aktivEtikett,
        filterOgSorterAndelPersonerIGrunnlag,
        filterOgSorterGrunnlagPersonerMedAndeler,
    } = useTidslinje();

    useOppdaterValutakursOgSimuleringPåBeslutterSteg();

    const { request } = useHttp();

    const hentPersonerMedUgyldigEtterbetalingsperiode = () => {
        request<void, string[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/personer-med-ugyldig-etterbetalingsperiode`,
        }).then((erGyldigEtterbetalingsperiode: Ressurs<string[]>) => {
            if (erGyldigEtterbetalingsperiode.status === RessursStatus.SUKSESS) {
                settPersonerMedUgyldigEtterbetalingsperiode(erGyldigEtterbetalingsperiode.data);
            }
        });
    };

    const {
        vurderErLesevisning,
        behandlingresultatNesteOnClick,
        behandlingsstegSubmitressurs,
        settÅpenBehandling,
    } = useBehandling();
    const {
        erEøsInformasjonGyldig,
        kompetanser,
        hentKompetanserMedFeil,
        utbetaltAnnetLandBeløp,
        hentUtbetaltAnnetLandBeløpMedFeil,
        valutakurser,
        hentValutakurserMedFeil,
    } = useEøs();

    const erLesevisning = vurderErLesevisning();

    useEffect(() => {
        hentPersonerMedUgyldigEtterbetalingsperiode();
    }, [åpenBehandling]);

    const forrigeOnClick = () => {
        navigate(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/vilkaarsvurdering`);
    };

    const finnUtbetalingsperiodeForAktivEtikett = (
        utbetalingsperioder: Utbetalingsperiode[]
    ): Utbetalingsperiode | undefined => {
        return aktivEtikett
            ? utbetalingsperioder.find((utbetalingsperiode: Utbetalingsperiode) =>
                  periodeOverlapperMedValgtDato(
                      utbetalingsperiode.periodeFom,
                      utbetalingsperiode.periodeTom,
                      aktivEtikett.date
                  )
              )
            : undefined;
    };

    const grunnlagPersoner = filterOgSorterGrunnlagPersonerMedAndeler(
        åpenBehandling.personer,
        åpenBehandling.personerMedAndelerTilkjentYtelse
    );

    const tidslinjePersoner = filterOgSorterAndelPersonerIGrunnlag(
        grunnlagPersoner,
        åpenBehandling.personerMedAndelerTilkjentYtelse
    );

    const opprettEndretUtbetaling = () => {
        request<IRestEndretUtbetalingAndel, IBehandling>({
            method: 'POST',
            url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}`,
            påvirkerSystemLaster: true,
            data: {},
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settVisFeilmeldinger(false);
                settÅpenBehandling(response);
            } else if (
                response.status === RessursStatus.FUNKSJONELL_FEIL ||
                response.status === RessursStatus.FEILET
            ) {
                settVisFeilmeldinger(true);
                settOpprettelseFeilmelding(response.frontendFeilmelding);
            }
        });
    };
    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const harKompetanser = åpenBehandling.kompetanser?.length > 0;
    const harUtenlandskeBeløper = åpenBehandling.utenlandskePeriodebeløp?.length > 0;
    const harValutakurser = åpenBehandling.utenlandskePeriodebeløp?.length > 0;

    const harEøs = harKompetanser || harUtenlandskeBeløper || harValutakurser;

    return (
        <Skjemasteg
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            tittel="Behandlingsresultat"
            className="behandlingsresultat"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={() => {
                if (erLesevisning) {
                    navigate(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/simulering`);
                } else if (harEøs && !erEøsInformasjonGyldig()) {
                    settVisFeilmeldinger(true);
                } else {
                    behandlingresultatNesteOnClick();
                }
            }}
            maxWidthStyle={'80rem'}
            feilmelding={hentFrontendFeilmelding(behandlingsstegSubmitressurs)}
            steg={BehandlingSteg.BEHANDLINGSRESULTAT}
        >
            {personerMedUgyldigEtterbetalingsperiode.length > 0 && (
                <StyledAlert variant={'warning'}>
                    Du har perioder som kan føre til etterbetaling utover tre måneder for person{' '}
                    {slåSammenListeTilStreng(
                        personerMedUgyldigEtterbetalingsperiode.map(ident => formaterIdent(ident))
                    )}
                    .
                </StyledAlert>
            )}
            {erMigreringFraInfotrygd && (
                <MigreringInfoboks behandlingId={åpenBehandling.behandlingId} />
            )}

            <TilkjentYtelseTidslinje
                grunnlagPersoner={grunnlagPersoner}
                tidslinjePersoner={tidslinjePersoner}
                fagsakType={minimalFagsak?.fagsakType}
            />
            {!erLesevisning && (
                <EndretUtbetalingAndel>
                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={() => opprettEndretUtbetaling()}
                        icon={<StyledEditIkon />}
                    >
                        <Label>Endre utbetalingsperiode</Label>
                    </Button>
                    {visFeilmeldinger && opprettelseFeilmelding !== '' && (
                        <ErrorMessage>{opprettelseFeilmelding}</ErrorMessage>
                    )}
                </EndretUtbetalingAndel>
            )}
            {aktivEtikett && (
                <Oppsummeringsboks
                    utbetalingsperiode={finnUtbetalingsperiodeForAktivEtikett(
                        åpenBehandling.utbetalingsperioder
                    )}
                    aktivEtikett={aktivEtikett}
                    kompetanser={kompetanser}
                    utbetaltAnnetLandBeløp={utbetaltAnnetLandBeløp}
                    valutakurser={valutakurser}
                />
            )}
            {åpenBehandling.endretUtbetalingAndeler.length > 0 && (
                <EndretUtbetalingAndelTabell åpenBehandling={åpenBehandling} />
            )}
            {harKompetanser && (
                <KompetanseSkjema
                    kompetanser={kompetanser}
                    visFeilmeldinger={visFeilmeldinger}
                    åpenBehandling={åpenBehandling}
                />
            )}
            {harUtenlandskeBeløper && (
                <UtbetaltAnnetLand
                    utbetaltAnnetLandBeløp={utbetaltAnnetLandBeløp}
                    visFeilmeldinger={visFeilmeldinger}
                    åpenBehandling={åpenBehandling}
                />
            )}
            {harValutakurser && (
                <Valutakurser
                    valutakurser={valutakurser}
                    visFeilmeldinger={visFeilmeldinger}
                    åpenBehandling={åpenBehandling}
                />
            )}
            {visFeilmeldinger && !erEøsInformasjonGyldig() && (
                <StyledErrorSummary heading={'For å gå videre må du rette opp følgende:'}>
                    {[
                        ...hentKompetanserMedFeil().map((kompetanse: IRestKompetanse) => ({
                            feilmelding: `Kompetanse barn: ${kompetanse.barnIdenter}, f.o.m.: ${kompetanse.fom} er ikke fullstendig.`,
                            skjemaelementId: kompetanseFeilmeldingId(kompetanse),
                        })),
                        ...hentUtbetaltAnnetLandBeløpMedFeil().map(
                            (utenlandskPeriodeBeløp: IRestUtenlandskPeriodeBeløp) => ({
                                feilmelding: `Utenlandsk beløp barn: ${utenlandskPeriodeBeløp.barnIdenter}, f.o.m.: ${utenlandskPeriodeBeløp.fom} er ikke fullstendig.`,
                                skjemaelementId:
                                    utenlandskPeriodeBeløpFeilmeldingId(utenlandskPeriodeBeløp),
                            })
                        ),
                        ...hentValutakurserMedFeil().map((valutakurs: IRestValutakurs) => ({
                            feilmelding: `Valutakurs barn: ${valutakurs.barnIdenter}, f.o.m.: ${valutakurs.fom} er ikke fullstendig.`,
                            skjemaelementId: valutakursFeilmeldingId(valutakurs),
                        })),
                    ].map(item => (
                        <ErrorSummary.Item href={`#${item.skjemaelementId}`}>
                            {item.feilmelding}
                        </ErrorSummary.Item>
                    ))}
                </StyledErrorSummary>
            )}
        </Skjemasteg>
    );
};

export default Behandlingsresultat;
