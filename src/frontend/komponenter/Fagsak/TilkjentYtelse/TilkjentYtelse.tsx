import * as React from 'react';
import { useState } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';
import { Element, Feilmelding } from 'nav-frontend-typografi';

import { Edit } from '@navikt/ds-icons';
import { useHttp } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { ToggleNavn } from '../../../typer/toggles';
import { IRestEndretUtbetalingAndel } from '../../../typer/utbetalingAndel';
import { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import { periodeOverlapperMedValgtDato } from '../../../utils/kalender';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
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
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const TilkjentYtelse: React.FunctionComponent<ITilkjentYtelseProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const history = useHistory();
    const {
        aktivEtikett,
        filterOgSorterAndelPersonerIGrunnlag,
        filterOgSorterGrunnlagPersonerMedAndeler,
    } = useTidslinje();

    const { request } = useHttp();

    const { erLesevisning } = useBehandling();
    const { settFagsak } = useFagsakRessurser();
    const { toggles } = useApp();
    const [feilmelding, settFeilmelding] = useState('');
    const { behandlingresultatNesteOnClick, senderInn } = useFagsakApi(_ => '', settFeilmelding);

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`);
    };

    const filtrerPerioderForAktivEtikett = (
        utbetalingsperioder: Utbetalingsperiode[]
    ): Utbetalingsperiode[] => {
        return aktivEtikett
            ? utbetalingsperioder.filter((utbetalingsperiode: Utbetalingsperiode) =>
                  periodeOverlapperMedValgtDato(
                      utbetalingsperiode.periodeFom,
                      utbetalingsperiode.periodeTom,
                      aktivEtikett.dato
                  )
              )
            : [];
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
        request<IRestEndretUtbetalingAndel, IFagsak>({
            method: 'POST',
            url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}`,
            påvirkerSystemLaster: true,
            data: {},
        }).then((response: Ressurs<IFagsak>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settVisFeilmeldinger(false);
                settFagsak(response);
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
            senderInn={senderInn}
            tittel="Behandlingsresultat"
            className="tilkjentytelse"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    history.push(`/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/simulering`);
                } else {
                    behandlingresultatNesteOnClick(fagsak);
                }
            }}
            maxWidthStyle={'80rem'}
            feilmelding={feilmelding}
        >
            <TilkjentYtelseTidslinje
                grunnlagPersoner={grunnlagPersoner}
                tidslinjePersoner={tidslinjePersoner}
            />
            {toggles[ToggleNavn.kanEndretUtbetalingAndel] && !erLesevisning() && (
                <EndretUtbetalingAndel>
                    <Flatknapp mini onClick={() => opprettEndretUtbetaling()}>
                        <StyledEditIkon />
                        <Element>Endre utbetalingsperiode</Element>
                    </Flatknapp>
                </EndretUtbetalingAndel>
            )}
            {aktivEtikett && (
                <Oppsummeringsboks
                    utbetalingsperioder={filtrerPerioderForAktivEtikett(
                        åpenBehandling.utbetalingsperioder
                    )}
                    aktivEtikett={aktivEtikett}
                />
            )}
            {åpenBehandling.endretUtbetalingAndeler.length > 0 && (
                <EndretUtbetalingAndelTabell
                    åpenBehandling={åpenBehandling}
                    settVisFeilmeldinger={settVisFeilmeldinger}
                    settFeilmelding={settOpprettelseFeilmelding}
                />
            )}
            {visFeilmeldinger && opprettelseFeilmelding !== '' && (
                <Feilmelding>{opprettelseFeilmelding}</Feilmelding>
            )}
        </Skjemasteg>
    );
};

export default TilkjentYtelse;
