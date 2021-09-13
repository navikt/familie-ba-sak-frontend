import * as React from 'react';

import { useHistory } from 'react-router';

import { useTidslinje } from '../../../context/TidslinjeContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { Vedtaksperiode } from '../../../typer/vedtaksperiode';
import { periodeOverlapperMedValgtDato } from '../../../utils/kalender';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { Oppsummeringsboks } from './Oppsummeringsboks';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';
import EndreUtbetalingAndelSkjema from './EndreUtbetalingAndel/EndreUtbetalingAndelSkjema';
import { useApp } from '../../../context/AppContext';
import { ToggleNavn } from '../../../typer/toggles';
import { sorterFødselsdato } from '../../../utils/formatter';

interface ITilkjentYtelseProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const TilkjentYtelse: React.FunctionComponent<ITilkjentYtelseProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const { toggles } = useApp();
    const history = useHistory();
    const {
        aktivEtikett,
        mapPersonerMedAndelerTilkjentYtelseTilPersoner,
        mapPersonerTilPersonerMedAndelerTilkjentYtelse,
    } = useTidslinje();
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

    const tidslinjePersonerSortert = mapPersonerTilPersonerMedAndelerTilkjentYtelse(
        mapPersonerMedAndelerTilkjentYtelseTilPersoner(
            åpenBehandling.personer,
            åpenBehandling.personerMedAndelerTilkjentYtelse
        ).sort((personA, personB) => sorterFødselsdato(personA.fødselsdato, personB.fødselsdato)),
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
            <TilkjentYtelseTidslinje tidslinjePersoner={tidslinjePersonerSortert} />
            {aktivEtikett && (
                <Oppsummeringsboks
                    vedtaksperioder={filtrerPerioderForAktivEtikett(
                        åpenBehandling.utbetalingsperioder
                    )}
                    aktivEtikett={aktivEtikett}
                />
            )}
            {toggles[ToggleNavn.brukErDeltBosted] && (
                <EndreUtbetalingAndelSkjema tidslinjePerioder={tidslinjePersonerSortert} />
            )}
        </Skjemasteg>
    );
};

export default TilkjentYtelse;
