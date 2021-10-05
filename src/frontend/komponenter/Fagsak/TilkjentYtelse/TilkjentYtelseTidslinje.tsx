import React from 'react';

import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { Tidslinje } from '@navikt/helse-frontend-tidslinje';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { useTidslinje } from '../../../context/TidslinjeContext';
import { IPersonMedAndelerTilkjentYtelse } from '../../../typer/beregning';
import { IGrunnlagPerson } from '../../../typer/person';
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

    console.log(tidslinjeRader);
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
