import * as React from 'react';
import { useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Element, Feilmelding } from 'nav-frontend-typografi';

import { Edit } from '@navikt/ds-icons';
import { Alert } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useEøs } from '../../../context/Eøs/EøsContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { utenlandskPeriodeBeløpFeilmeldingId } from '../../../context/UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpSkjemaContext';
import { valutakursFeilmeldingId } from '../../../context/Valutakurs/ValutakursSkjemaContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingSteg, Behandlingstype } from '../../../typer/behandling';
import type {
    IKompetanse,
    IRestUtenlandskPeriodeBeløp,
    IRestValutakurs,
} from '../../../typer/eøsPerioder';
import { ToggleNavn } from '../../../typer/toggles';
import type { IRestEndretUtbetalingAndel } from '../../../typer/utbetalingAndel';
import type { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import { formaterIdent, slåSammenListeTilStreng } from '../../../utils/formatter';
import { periodeOverlapperMedValgtDato } from '../../../utils/kalender';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import EndretUtbetalingAndelTabell from './EndretUtbetalingAndelTabell';
import KompetanseSkjema, { kompetanseFeilmeldingId } from './Kompetanse/KompetanseSkjema';
import MigreringInfoboks from './MigreringInfoboks';
import { Oppsummeringsboks } from './Oppsummeringsboks';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';
import UtbetaltAnnetLand from './UtbetaltAnnetLand/UtbetaltAnnetLand';
import Valutakurser from './Valutakurs/Valutakurser';

const EndretUtbetalingAndel = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
`;

const StyledEditIkon = styled(Edit)`
    margin-right: 0.5rem;
`;

const StyledAlert = styled(Alert)`
    margin-bottom: 1rem;
`;

const StyledFeiloppsummering = styled(Feiloppsummering)`
    margin-top: 5rem;
`;

interface IBehandlingsresultatProps {
    åpenBehandling: IBehandling;
}

const Behandlingsresultat: React.FunctionComponent<IBehandlingsresultatProps> = ({
    åpenBehandling,
}) => {
    const history = useHistory();
    const { fagsakId } = useSakOgBehandlingParams();
    const { toggles } = useApp();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const [personerMedUgyldigEtterbetalingsperiode, settPersonerMedUgyldigEtterbetalingsperiode] =
        useState<string[]>([]);

    const {
        aktivEtikett,
        filterOgSorterAndelPersonerIGrunnlag,
        filterOgSorterGrunnlagPersonerMedAndeler,
    } = useTidslinje();

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
        erLesevisning,
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

    useEffect(() => {
        hentPersonerMedUgyldigEtterbetalingsperiode();
    }, [åpenBehandling]);

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/vilkaarsvurdering`);
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

    const harKompetanser = toggles[ToggleNavn.brukEøs] && åpenBehandling.kompetanser?.length > 0;
    const harUtenlandskeBeløper =
        toggles[ToggleNavn.brukEøs] && åpenBehandling.utenlandskePeriodebeløp?.length > 0;
    const harValutakurser =
        toggles[ToggleNavn.brukEøs] && åpenBehandling.utenlandskePeriodebeløp?.length > 0;

    const harEøs = harKompetanser || harUtenlandskeBeløper || harValutakurser;

    return (
        <Skjemasteg
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            tittel="Behandlingsresultat"
            className="behandlingsresultat"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    history.push(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/simulering`);
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
                    Du har perioder som kan føre til etterbetaling utover 3 år for person{' '}
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
            />
            {!erLesevisning() && (
                <EndretUtbetalingAndel>
                    <Flatknapp mini onClick={() => opprettEndretUtbetaling()}>
                        <StyledEditIkon />
                        <Element>Endre utbetalingsperiode</Element>
                    </Flatknapp>
                    {visFeilmeldinger && opprettelseFeilmelding !== '' && (
                        <Feilmelding>{opprettelseFeilmelding}</Feilmelding>
                    )}
                </EndretUtbetalingAndel>
            )}
            {aktivEtikett && (
                <Oppsummeringsboks
                    utbetalingsperiode={finnUtbetalingsperiodeForAktivEtikett(
                        åpenBehandling.utbetalingsperioder
                    )}
                    aktivEtikett={aktivEtikett}
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
            {visFeilmeldinger && toggles[ToggleNavn.brukEøs] && (
                <StyledFeiloppsummering
                    tittel={'For å gå videre må du rette opp følgende:'}
                    feil={[
                        ...hentKompetanserMedFeil().map((kompetanse: FeltState<IKompetanse>) => ({
                            feilmelding: `Kompetanse barn: ${kompetanse.verdi.barnIdenter.verdi}, f.o.m.: ${kompetanse.verdi.periode.verdi.fom} er ikke fullstendig.`,
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
                    ]}
                />
            )}
        </Skjemasteg>
    );
};

export default Behandlingsresultat;
