import React from 'react';

import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';
import { Tidslinje } from '@navikt/helse-frontend-tidslinje';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { formaterIdent, sorterFødselsdato } from '../../../utils/formatter';
import { kalenderDatoFraDate, kalenderDatoTilDate, sisteDagIMåned } from '../../../utils/kalender';
import TidslinjeEtikett from './TidslinjeEtikett';
import TidslinjeNavigering from './TidslinjeNavigering';
import Vinduvelger from './VinduVelger';

const TilkjentYtelseTidslinje: React.FC = () => {
    const { åpenBehandling } = useBehandling();
    const {
        genererFormatertÅrstall,
        genererRader,
        aktivEtikett,
        aktivtTidslinjeVindu,
        mapPersonerMedAndelerTilkjentYtelseTilPersoner,
        mapPersonerTilPersonerMedAndelerTilkjentYtelse,
        naviger,
    } = useTidslinje();

    if (åpenBehandling.status !== RessursStatus.SUKSESS) {
        return null;
    }

    const personer = åpenBehandling.data.personer;
    const personerFraAndelerTilkjentYtelseSortert = mapPersonerMedAndelerTilkjentYtelseTilPersoner(
        personer,
        åpenBehandling.data.personerMedAndelerTilkjentYtelse
    ).sort((personA, personB) => sorterFødselsdato(personA.fødselsdato, personB.fødselsdato));

    const personerMedAndelerTilkjentYtelseSortert = mapPersonerTilPersonerMedAndelerTilkjentYtelse(
        personerFraAndelerTilkjentYtelseSortert,
        åpenBehandling.data.personerMedAndelerTilkjentYtelse
    );

    const tidslinjeRader = genererRader(personerMedAndelerTilkjentYtelseSortert);

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
