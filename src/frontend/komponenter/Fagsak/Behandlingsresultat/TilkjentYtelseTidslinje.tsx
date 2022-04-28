import React from 'react';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { Tidslinje, type Etikett } from '@navikt/familie-tidslinje';

import { useTidslinje } from '../../../context/TidslinjeContext';
import type { IPersonMedAndelerTilkjentYtelse } from '../../../typer/beregning';
import type { IGrunnlagPerson } from '../../../typer/person';
import { formaterIdent } from '../../../utils/formatter';
import { kalenderDatoFraDate, kalenderDatoTilDate, sisteDagIMåned } from '../../../utils/kalender';
import TidslinjeEtikett from './TidslinjeEtikett';
import TidslinjeNavigering from './TidslinjeNavigering';
import Vinduvelger from './VinduVelger';

interface IProps {
    grunnlagPersoner: IGrunnlagPerson[];
    tidslinjePersoner: IPersonMedAndelerTilkjentYtelse[];
}

const TilkjentYtelseTidslinje: React.FC<IProps> = ({ grunnlagPersoner, tidslinjePersoner }) => {
    const { genererFormatertÅrstall, genererRader, aktivEtikett, aktivtTidslinjeVindu, naviger } =
        useTidslinje();
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
                    {grunnlagPersoner.map((person, index) => {
                        return (
                            <Normaltekst key={index} title={person.navn}>
                                {formaterIdent(person.personIdent)}
                            </Normaltekst>
                        );
                    })}
                </div>
                <Tidslinje
                    rader={tidslinjeRader}
                    etikettRender={(etikett: Etikett) => <TidslinjeEtikett etikett={etikett} />}
                    startDato={kalenderDatoTilDate(aktivtTidslinjeVindu.startDato, 23, 0)}
                    sluttDato={kalenderDatoTilDate(aktivtTidslinjeVindu.sluttDato)}
                    aktivtUtsnitt={
                        aktivEtikett && {
                            fom: aktivEtikett.date,
                            tom: kalenderDatoTilDate(
                                sisteDagIMåned(kalenderDatoFraDate(aktivEtikett.date))
                            ),
                        }
                    }
                />
            </div>
        </>
    );
};

export default TilkjentYtelseTidslinje;
