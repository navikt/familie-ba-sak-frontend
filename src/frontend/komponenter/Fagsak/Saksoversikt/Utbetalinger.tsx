import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { IBeregningDetalj, IOppsummeringBeregning } from '../../../typer/beregning';
import PersonUtbetaling from './PersonUtbetaling';
import { sorterFødselsdato } from '../../../utils/formatter';

interface IUtbetalingerProps {
    beregningOversikt?: IOppsummeringBeregning;
}

const Utbetalinger: React.FC<IUtbetalingerProps> = ({ beregningOversikt }) => {
    const beregningDetaljerGruppertPåPerson =
        beregningOversikt?.beregningDetaljer
            .sort((detaljA, detaljB) =>
                sorterFødselsdato(detaljA.person.fødselsdato, detaljB.person.fødselsdato)
            )
            .reduce((acc: { [key: string]: IBeregningDetalj[] }, beregningDetalj) => {
                const beregningDetaljerForPerson = acc[beregningDetalj.person.personIdent] ?? [];
                return {
                    ...acc,
                    [beregningDetalj.person.personIdent]: [
                        ...beregningDetaljerForPerson,
                        beregningDetalj,
                    ],
                };
            }, {}) ?? {};

    return (
        <div className={'saksoversikt__utbetalinger'}>
            <ul>
                {Object.values(beregningDetaljerGruppertPåPerson).map(
                    (beregningDetaljerForPerson, index) => {
                        return (
                            <PersonUtbetaling
                                key={index}
                                beregningDetaljer={beregningDetaljerForPerson}
                            />
                        );
                    }
                )}
                <li className={'saksoversikt__utbetalinger__totallinje'}>
                    <Normaltekst>Totalt utbetalt/mnd</Normaltekst>
                    <Normaltekst>{`${beregningOversikt?.utbetaltPerMnd ?? '-'} kr`}</Normaltekst>
                </li>
                <hr />
            </ul>
        </div>
    );
};

export default Utbetalinger;
