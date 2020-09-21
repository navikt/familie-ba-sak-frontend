import * as React from 'react';
import { IOppsummeringBeregning, ytelsetype } from '../../../typer/beregning';
import {
    formaterBeløp,
    formaterMånedTilString,
    formaterPersonIdent,
} from '../../../utils/formatter';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/components/types.internal';
import { Xknapp } from 'nav-frontend-ikonknapper';

interface IProps {
    perioder: IOppsummeringBeregning[];
    aktivEtikett: Skalaetikett;
}

const summerTotalBeløpForPeriode = (sum: number, periode: IOppsummeringBeregning) => {
    return sum + periode.utbetaltPerMnd;
};

const OppsummeringsBoks: React.FunctionComponent<IProps> = ({ perioder, aktivEtikett }) => {
    const { settAktivEtikett } = useTidslinje();

    return (
        <div className={'tilkjentytelse-informasjonsboks'}>
            <div className={'tilkjentytelse-informasjonsboks__header'}>
                <div className={'tilkjentytelse-informasjonsboks__header__info'}>
                    <Element>
                        {`${formaterMånedTilString(
                            aktivEtikett.dato.getMonth() + 1
                        )} ${aktivEtikett.dato.getFullYear()}`}
                    </Element>
                    <Normaltekst>
                        Totalt utbetalt i mnd
                        <span
                            className={'tilkjentytelse-informasjonsboks__header__info__totalbeløp'}
                        >
                            {`${perioder.reduce(summerTotalBeløpForPeriode, 0)} kr`}
                        </span>
                    </Normaltekst>
                </div>
                <Xknapp
                    onClick={() => {
                        settAktivEtikett(undefined);
                    }}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Sats</th>
                        <th>Beløp</th>
                    </tr>
                </thead>
                <tbody>
                    {perioder.map(periode => {
                        return periode.beregningDetaljer.map((detalj, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {`${detalj.person.navn} | ${formaterPersonIdent(
                                            detalj.person.personIdent
                                        )}`}
                                    </td>
                                    <td>{ytelsetype[detalj.ytelseType].navn}</td>
                                    <td>{formaterBeløp(detalj.utbetaltPerMnd)}</td>
                                </tr>
                            );
                        });
                    })}
                </tbody>
            </table>
        </div>
    );
};
export { OppsummeringsBoks };
