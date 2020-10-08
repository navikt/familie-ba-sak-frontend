import * as React from 'react';
import { IOppsummeringBeregning, ytelsetype } from '../../../typer/beregning';
import {
    datoformat,
    formaterBeløp,
    formaterIsoDato,
    formaterPersonIdent,
    hentAlderSomString,
    sorterFødselsdato,
} from '../../../utils/formatter';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { Xknapp } from 'nav-frontend-ikonknapper';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

interface IProps {
    perioder: IOppsummeringBeregning[];
    aktivEtikett: Skalaetikett;
}

const summerTotalbeløpForPeriode = (sum: number, periode: IOppsummeringBeregning) => {
    return sum + periode.utbetaltPerMnd;
};

const Oppsummeringsboks: React.FunctionComponent<IProps> = ({ perioder, aktivEtikett }) => {
    const { settAktivEtikett } = useTidslinje();

    const månedNavnOgÅr = () => {
        const navn = formaterIsoDato(aktivEtikett.dato.toDateString(), datoformat.MÅNED_NAVN);
        return navn[0].toUpperCase() + navn.substr(1);
    };

    return (
        <div className={'tilkjentytelse-informasjonsboks'}>
            <div className={'tilkjentytelse-informasjonsboks__header'}>
                <div className={'tilkjentytelse-informasjonsboks__header__info'}>
                    <Element>{månedNavnOgÅr()}</Element>

                    {perioder.length > 0 ? (
                        <Normaltekst>
                            Totalt utbetalt i mnd
                            <span
                                className={
                                    'tilkjentytelse-informasjonsboks__header__info__totalbeløp'
                                }
                            >
                                {`${perioder.reduce(summerTotalbeløpForPeriode, 0)} kr`}
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
                        {perioder.map(periode => {
                            return periode.beregningDetaljer
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
