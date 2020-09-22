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

                    {perioder.length > 0 ? (
                        <Normaltekst>
                            {' '}
                            Totalt utbetalt i mnd{' '}
                            <span
                                className={
                                    'tilkjentytelse-informasjonsboks__header__info__totalbeløp'
                                }
                            >
                                {`${perioder.reduce(summerTotalBeløpForPeriode, 0)} kr`}
                            </span>
                        </Normaltekst>
                    ) : (
                        <Normaltekst>Ingen utbetalinger</Normaltekst>
                    )}
                </div>
                <Xknapp
                    onClick={() => {
                        settAktivEtikett(undefined);
                    }}
                />
            </div>
            {perioder.length !== 0 && (
                <table className={'tilkjentytelse-oppsummeringsboks'}>
                    <thead>
                        <tr>
                            <th>
                                <Normaltekst>Person</Normaltekst>
                            </th>
                            <th>
                                <Normaltekst>Sats</Normaltekst>
                            </th>
                            <th>
                                <Normaltekst>Beløp</Normaltekst>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {perioder.map(periode => {
                            return periode.beregningDetaljer.map((detalj, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Normaltekst>{`${
                                                detalj.person.navn
                                            } | ${formaterPersonIdent(
                                                detalj.person.personIdent
                                            )}`}</Normaltekst>
                                        </td>
                                        <td>
                                            <Normaltekst>
                                                {ytelsetype[detalj.ytelseType].navn}
                                            </Normaltekst>
                                        </td>
                                        <td>
                                            <Normaltekst>
                                                {formaterBeløp(detalj.utbetaltPerMnd)}
                                            </Normaltekst>
                                        </td>
                                    </tr>
                                );
                            });
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export { OppsummeringsBoks };
