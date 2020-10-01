import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { IBeregningDetalj, IOppsummeringBeregning } from '../../../typer/beregning';
import PersonUtbetaling from './PersonUtbetaling';
import { periodeOverlapperMedValgtDato } from '../../../utils/tid';

interface IUtbetalingerProps {
    beregningsOversikt: IOppsummeringBeregning[];
}

const Utbetalinger: React.FC<IUtbetalingerProps> = ({ beregningsOversikt }) => {
    const inneværendeBeregningsOversiktMåned = beregningsOversikt.find(periode =>
        periodeOverlapperMedValgtDato(periode.periodeFom, periode.periodeTom, new Date())
    );

    const beregningDetaljerGruppertPåPerson =
        inneværendeBeregningsOversiktMåned?.beregningDetaljer.reduce(
            (acc: { [key: string]: IBeregningDetalj[] }, beregningDetalj) => {
                const beregningDetaljerForPerson = acc[beregningDetalj.person.personIdent] ?? [];
                return {
                    ...acc,
                    [beregningDetalj.person.personIdent]: [
                        ...beregningDetaljerForPerson,
                        beregningDetalj,
                    ],
                };
            },
            {}
        ) ?? {};

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
                    <Normaltekst>{`${
                        inneværendeBeregningsOversiktMåned?.utbetaltPerMnd ?? '-'
                    } kr`}</Normaltekst>
                </li>
                <hr />
            </ul>
        </div>
    );
};

export default Utbetalinger;
