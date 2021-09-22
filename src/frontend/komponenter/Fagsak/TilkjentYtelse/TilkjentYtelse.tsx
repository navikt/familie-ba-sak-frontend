import * as React from 'react';
import { useState } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';

import { Edit } from '@navikt/ds-icons';

import { useApp } from '../../../context/AppContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { ToggleNavn } from '../../../typer/toggles';
import { Vedtaksperiode } from '../../../typer/vedtaksperiode';
import { periodeOverlapperMedValgtDato } from '../../../utils/kalender';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import EndretUtbetalingAndelSkjema from './EndretUtbetalingAndelSkjema';
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
    const history = useHistory();
    const {
        aktivEtikett,
        filterOgSorterAndelPersonerIGrunnlag,
        filterOgSorterGrunnlagPersonerMedAndeler,
    } = useTidslinje();
    const { toggles } = useApp();

    const [leggTilUtbetalingsendring, settLeggTilUtbetalingsendring] = useState<boolean>(false);

    const nesteOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/simulering`);
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`);
    };

    const filtrerPerioderForAktivEtikett = (
        utbetalingsperioder: Vedtaksperiode[]
    ): Vedtaksperiode[] => {
        return aktivEtikett
            ? utbetalingsperioder.filter((utbetalingsperiode: Vedtaksperiode) =>
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

    return (
        <Skjemasteg
            senderInn={false}
            tittel="Behandlingsresultat"
            className="tilkjentytelse"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            <TilkjentYtelseTidslinje
                grunnlagPersoner={grunnlagPersoner}
                tidslinjePersoner={tidslinjePersoner}
            />

            {toggles[ToggleNavn.kanEndreUtbetalingsperiode] && (
                <EndretUtbetalingAndel>
                    <Flatknapp mini onClick={() => settLeggTilUtbetalingsendring(true)}>
                        <StyledEditIkon />
                        <Element>Endre utbetalingsandel</Element>
                    </Flatknapp>
                </EndretUtbetalingAndel>
            )}

            {aktivEtikett && (
                <Oppsummeringsboks
                    vedtaksperioder={filtrerPerioderForAktivEtikett(
                        åpenBehandling.utbetalingsperioder
                    )}
                    aktivEtikett={aktivEtikett}
                />
            )}
            {leggTilUtbetalingsendring && (
                <EndretUtbetalingAndelSkjema
                    åpenBehandling={åpenBehandling}
                    avbrytEndringAvUtbetalingsperiode={() => settLeggTilUtbetalingsendring(false)}
                />
            )}
        </Skjemasteg>
    );
};

export default TilkjentYtelse;
