import * as React from 'react';

import { Xknapp } from 'nav-frontend-ikonknapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { useTidslinje } from '../../../context/TidslinjeContext';
import { IUtbetalingsperiode, ytelsetype } from '../../../typer/beregning';
import familieDayjs from '../../../utils/familieDayjs';
import {
    datoformat,
    formaterBeløp,
    formaterDato,
    formaterPersonIdent,
    hentAlderSomString,
    sorterFødselsdato,
} from '../../../utils/formatter';

interface IProps {
    utbetalingsperioder: IUtbetalingsperiode[];
    aktivEtikett: Skalaetikett;
}

const summerTotalbeløpForPeriode = (sum: number, periode: IUtbetalingsperiode) => {
    return sum + periode.utbetaltPerMnd;
};

const Oppsummeringsboks: React.FunctionComponent<IProps> = ({
    utbetalingsperioder,
    aktivEtikett,
}) => {
    const { settAktivEtikett } = useTidslinje();

    const månedNavnOgÅr = () => {
        const navn = formaterDato(familieDayjs(aktivEtikett.dato), datoformat.MÅNED_NAVN);
        return navn[0].toUpperCase() + navn.substr(1);
    };

    return (
        <div className={'tilkjentytelse-informasjonsboks'}>
            <div className={'tilkjentytelse-informasjonsboks__header'}>
                <div className={'tilkjentytelse-informasjonsboks__header__info'}>
                    <Element>{månedNavnOgÅr()}</Element>

                    {utbetalingsperioder.length > 0 ? (
                        <Normaltekst>
                            Totalt utbetalt i mnd
                            <span
                                className={
                                    'tilkjentytelse-informasjonsboks__header__info__totalbeløp'
                                }
                            >
                                {`${utbetalingsperioder.reduce(summerTotalbeløpForPeriode, 0)} kr`}
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
            {utbetalingsperioder.length !== 0 && (
                <table>
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
                        {utbetalingsperioder.map((utbetalingsperiode: IUtbetalingsperiode) => {
                            return utbetalingsperiode.utbetalingsperiodeDetaljer
                                .sort((detaljA, detaljB) =>
                                    sorterFødselsdato(
                                        detaljA.person.fødselsdato,
                                        detaljB.person.fødselsdato
                                    )
                                )
                                .map((detalj, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Normaltekst>{`${
                                                    detalj.person.navn
                                                } (${hentAlderSomString(
                                                    detalj.person.fødselsdato
                                                )}) | ${formaterPersonIdent(
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
export { Oppsummeringsboks };
