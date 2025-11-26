import * as React from 'react';
import { useEffect } from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { PencilIcon } from '@navikt/aksel-icons';
import { Alert, Button, ErrorMessage, ErrorSummary, Label } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import EndretUtbetalingAndelTabell from './EndretUtbetaling/EndretUtbetalingAndelTabell';
import KompetanseSkjema from './Eøs/Kompetanse/KompetanseSkjema';
import { kompetanseFeilmeldingId } from './Eøs/Kompetanse/useKompetansePeriodeSkjema';
import { useEøs } from './Eøs/useEøs';
import { utenlandskPeriodeBeløpFeilmeldingId } from './Eøs/UtbetaltAnnetLand/useUtenlandskPeriodeBeløpSkjema';
import UtbetaltAnnetLand from './Eøs/UtbetaltAnnetLand/UtbetaltAnnetLand';
import { useOppdaterValutakursOgSimuleringPåBeslutterSteg } from './Eøs/Valutakurs/useOppdaterValutakursOgSimuleringPåBeslutterSteg';
import { valutakursFeilmeldingId } from './Eøs/Valutakurs/useValutakursSkjema';
import Valutakurser from './Eøs/Valutakurs/Valutakurser';
import MigreringInfoboks from './MigreringInfoboks';
import { Oppsummeringsboks } from './Oppsummeringsboks';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';
import { useBehandlingsresultat } from './useBehandlingsresultat';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import { useTidslinjeContext } from '../../../../../komponenter/Tidslinje/TidslinjeContext';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingSteg, Behandlingstype } from '../../../../../typer/behandling';
import {
    type IRestKompetanse,
    type IRestUtenlandskPeriodeBeløp,
    type IRestValutakurs,
} from '../../../../../typer/eøsPerioder';
import type { Utbetalingsperiode } from '../../../../../typer/vedtaksperiode';
import { periodeOverlapperMedValgtDato } from '../../../../../utils/dato';
import { formaterIdent, slåSammenListeTilStreng } from '../../../../../utils/formatter';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';
import Skjemasteg from '../Skjemasteg';

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

const Behandlingsresultat: React.FunctionComponent<IBehandlingsresultatProps> = ({ åpenBehandling }) => {
    const navigate = useNavigate();
    const { fagsakId } = useSakOgBehandlingParams();
    const { fagsak } = useFagsakContext();

    const {
        opprettEndretUtbetaling,
        opprettEndretUtbetalingFeilmelding,
        visFeilmeldinger,
        settVisFeilmeldinger,
        hentPersonerMedUgyldigEtterbetalingsperiode,
        personerMedUgyldigEtterbetalingsperiode,
    } = useBehandlingsresultat(åpenBehandling);

    const { aktivEtikett, filterOgSorterAndelPersonerIGrunnlag, filterOgSorterGrunnlagPersonerMedAndeler } =
        useTidslinjeContext();

    useOppdaterValutakursOgSimuleringPåBeslutterSteg();

    const { vurderErLesevisning, behandlingresultatNesteOnClick, behandlingsstegSubmitressurs } =
        useBehandlingContext();

    const {
        erEøsInformasjonGyldig,
        kompetanser,
        hentKompetanserMedFeil,
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
        valutakurser,
        erValutakurserGyldige,
        hentValutakurserMedFeil,
    } = useEøs(åpenBehandling);

    const erLesevisning = vurderErLesevisning();

    useEffect(() => {
        hentPersonerMedUgyldigEtterbetalingsperiode();
    }, [åpenBehandling]);

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
            forrigeOnClick={() => navigate(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/vilkaarsvurdering`)}
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
            {erMigreringFraInfotrygd && <MigreringInfoboks behandlingId={åpenBehandling.behandlingId} />}

            <TilkjentYtelseTidslinje
                grunnlagPersoner={grunnlagPersoner}
                tidslinjePersoner={tidslinjePersoner}
                fagsakType={fagsak.fagsakType}
            />
            {!erLesevisning && (
                <EndretUtbetalingAndel>
                    <Button variant="tertiary" size="small" onClick={opprettEndretUtbetaling} icon={<StyledEditIkon />}>
                        <Label>Endre utbetalingsperiode</Label>
                    </Button>
                    {visFeilmeldinger && opprettEndretUtbetalingFeilmelding !== '' && (
                        <ErrorMessage>{opprettEndretUtbetalingFeilmelding}</ErrorMessage>
                    )}
                </EndretUtbetalingAndel>
            )}
            {aktivEtikett && (
                <Oppsummeringsboks
                    utbetalingsperiode={finnUtbetalingsperiodeForAktivEtikett(åpenBehandling.utbetalingsperioder)}
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
                    erUtbetaltAnnetLandBeløpGyldige={erUtbetaltAnnetLandBeløpGyldige}
                    visFeilmeldinger={visFeilmeldinger}
                    åpenBehandling={åpenBehandling}
                />
            )}
            {harValutakurser && (
                <Valutakurser
                    valutakurser={valutakurser}
                    erValutakurserGyldige={erValutakurserGyldige}
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
                                skjemaelementId: utenlandskPeriodeBeløpFeilmeldingId(utenlandskPeriodeBeløp),
                            })
                        ),
                        ...hentValutakurserMedFeil().map((valutakurs: IRestValutakurs) => ({
                            feilmelding: `Valutakurs barn: ${valutakurs.barnIdenter}, f.o.m.: ${valutakurs.fom} er ikke fullstendig.`,
                            skjemaelementId: valutakursFeilmeldingId(valutakurs),
                        })),
                    ].map(item => (
                        <ErrorSummary.Item href={`#${item.skjemaelementId}`}>{item.feilmelding}</ErrorSummary.Item>
                    ))}
                </StyledErrorSummary>
            )}
        </Skjemasteg>
    );
};

export default Behandlingsresultat;
