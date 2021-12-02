import * as React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';
import { Element, Feilmelding } from 'nav-frontend-typografi';

import { Edit } from '@navikt/ds-icons';
import { useHttp } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import { IBehandling } from '../../../typer/behandling';
import { IRestEndretUtbetalingAndel } from '../../../typer/utbetalingAndel';
import { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import { periodeOverlapperMedValgtDato } from '../../../utils/kalender';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import EndretUtbetalingAndelTabell from './EndretUtbetalingAndelTabell';
import { Oppsummeringsboks } from './Oppsummeringsboks';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';

const EndretUtbetalingAndel = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
`;

const StyledEditIkon = styled(Edit)`
    margin-right: 0.5rem;
`;

interface ITilkjentYtelseProps {
    åpenBehandling: IBehandling;
}

const TilkjentYtelse: React.FunctionComponent<ITilkjentYtelseProps> = ({ åpenBehandling }) => {
    const history = useHistory();
    const { fagsakId } = useSakOgBehandlingParams();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const {
        aktivEtikett,
        filterOgSorterAndelPersonerIGrunnlag,
        filterOgSorterGrunnlagPersonerMedAndeler,
    } = useTidslinje();

    const { request } = useHttp();

    const {
        erLesevisning,
        behandlingresultatNesteOnClick,
        behandlingsstegSubmitressurs,
        settÅpenBehandling,
    } = useBehandling();

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
                      aktivEtikett.dato
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

    return (
        <Skjemasteg
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            tittel="Behandlingsresultat"
            className="tilkjentytelse"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    history.push(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/simulering`);
                } else {
                    behandlingresultatNesteOnClick();
                }
            }}
            maxWidthStyle={'80rem'}
            feilmelding={hentFrontendFeilmelding(behandlingsstegSubmitressurs)}
        >
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
        </Skjemasteg>
    );
};

export default TilkjentYtelse;
