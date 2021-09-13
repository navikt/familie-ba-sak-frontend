import React, { useEffect } from 'react';

import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';
import { Tidslinje } from '@navikt/helse-frontend-tidslinje';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { formaterIdent, sorterFødselsdato } from '../../../utils/formatter';
import { kalenderDatoFraDate, kalenderDatoTilDate, sisteDagIMåned } from '../../../utils/kalender';
import TidslinjeEtikett from './TidslinjeEtikett';
import TidslinjeNavigering from './TidslinjeNavigering';
import Vinduvelger from './VinduVelger';
import { useApp } from '../../../context/AppContext';
import { ToggleNavn } from '../../../typer/toggles';
import { useEndreUtbetalingAndelSkjema } from './EndreUtbetalingAndel/useEndeUtbetalingAndelSkjema';
import { IPersonMedAndelerTilkjentYtelse } from '../../../typer/beregning';

interface IProps {
    tidslinjePersoner: IPersonMedAndelerTilkjentYtelse[];
}

const TilkjentYtelseTidslinje: React.FunctionComponent<IProps> = ({ tidslinjePersoner }) => {
    const { toggles } = useApp();
    const { åpenBehandling } = useBehandling();
    const { fagsak } = useFagsakRessurser();
    const {
        genererFormatertÅrstall,
        genererRader,
        aktivEtikett,
        aktivtTidslinjeVindu,
        mapPersonerMedAndelerTilkjentYtelseTilPersoner,
        naviger,
    } = useTidslinje();
    useEffect(() => {
        if (toggles[ToggleNavn.brukErDeltBosted]) {
            genererRader(tidslinjePersoner);
        }
    }, [fagsak]);

    if (åpenBehandling.status !== RessursStatus.SUKSESS) {
        return null;
    }

    const personer = åpenBehandling.data.personer;
    const personerFraAndelerTilkjentYtelseSortert = mapPersonerMedAndelerTilkjentYtelseTilPersoner(
        personer,
        åpenBehandling.data.personerMedAndelerTilkjentYtelse
    ).sort((personA, personB) => sorterFødselsdato(personA.fødselsdato, personB.fødselsdato));

    const { åpneSkjema } = useEndreUtbetalingAndelSkjema(tidslinjePersoner);

    const tidslinjeRader = genererRader(tidslinjePersoner);

    return (
        <>
            <div className={'tidslinje-header'}>
                <Undertittel>{genererFormatertÅrstall()}</Undertittel>
                <div className={'tidslinje-header__controls'}>
                    <Vinduvelger />
                    <TidslinjeNavigering naviger={naviger} />
                </div>
            </div>
            <div className={'tidslinje-container'}>
                <div className={'tidslinje-container__labels'}>
                    {personerFraAndelerTilkjentYtelseSortert.map((person, index) => {
                        return (
                            <Normaltekst key={index} title={person.navn}>
                                {formaterIdent(person.personIdent)}
                            </Normaltekst>
                        );
                    })}
                </div>
                <Tidslinje
                    rader={tidslinjeRader}
                    direction={'right'}
                    etikettRender={(etikett: Skalaetikett) => (
                        <TidslinjeEtikett etikett={etikett} />
                    )}
                    onSelectPeriode={åpneSkjema}
                    startDato={kalenderDatoTilDate(aktivtTidslinjeVindu.startDato, 23, 0)}
                    sluttDato={kalenderDatoTilDate(aktivtTidslinjeVindu.sluttDato)}
                    aktivtUtsnitt={
                        aktivEtikett && {
                            fom: aktivEtikett.dato,
                            tom: kalenderDatoTilDate(
                                sisteDagIMåned(kalenderDatoFraDate(aktivEtikett.dato))
                            ),
                        }
                    }
                />
            </div>
        </>
    );
};

export default TilkjentYtelseTidslinje;
