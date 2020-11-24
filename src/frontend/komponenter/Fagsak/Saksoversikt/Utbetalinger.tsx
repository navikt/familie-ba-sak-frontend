import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { IUtbetalingsperiodeDetalj, IUtbetalingsperiode } from '../../../typer/beregning';
import PersonUtbetaling from './PersonUtbetaling';
import { sorterFødselsdato } from '../../../utils/formatter';

interface IUtbetalingerProps {
    utbetalingsperiode?: IUtbetalingsperiode;
}

const Utbetalinger: React.FC<IUtbetalingerProps> = ({ utbetalingsperiode }) => {
    const utbetalingsperiodeDetaljerGruppertPåPerson =
        utbetalingsperiode?.utbetalingsperiodeDetaljer
            .sort((detaljA, detaljB) =>
                sorterFødselsdato(detaljA.person.fødselsdato, detaljB.person.fødselsdato)
            )
            .reduce(
                (acc: { [key: string]: IUtbetalingsperiodeDetalj[] }, utbetalingsperiodeDetalj) => {
                    const utbetalingsperiodeDetaljerForPerson =
                        acc[utbetalingsperiodeDetalj.person.personIdent] ?? [];

                    return {
                        ...acc,
                        [utbetalingsperiodeDetalj.person.personIdent]: [
                            ...utbetalingsperiodeDetaljerForPerson,
                            utbetalingsperiodeDetalj,
                        ],
                    };
                },
                {}
            ) ?? {};

    return (
        <div className={'saksoversikt__utbetalinger'}>
            <ul>
                {Object.values(utbetalingsperiodeDetaljerGruppertPåPerson).map(
                    (utbetalingsperiodeDetaljerForPerson, index) => {
                        return (
                            <PersonUtbetaling
                                key={index}
                                utbetalingsperiodeDetaljer={utbetalingsperiodeDetaljerForPerson}
                            />
                        );
                    }
                )}
                <li className={'saksoversikt__utbetalinger__totallinje'}>
                    <Normaltekst>Totalt utbetalt/mnd</Normaltekst>
                    <Normaltekst>{`${utbetalingsperiode?.utbetaltPerMnd ?? '-'} kr`}</Normaltekst>
                </li>
                <hr />
            </ul>
        </div>
    );
};

export default Utbetalinger;
