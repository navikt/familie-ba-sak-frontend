import * as React from 'react';

import { Xknapp } from 'nav-frontend-ikonknapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { useTidslinje } from '../../../context/TidslinjeContext';
import { ytelsetype } from '../../../typer/beregning';
import {
    Utbetalingsperiode,
    Vedtaksperiode,
    Vedtaksperiodetype,
} from '../../../typer/vedtaksperiode';
import {
    datoformat,
    formaterBeløp,
    formaterIsoDato,
    formaterIdent,
    hentAlderSomString,
    sorterPersonTypeOgFødselsdato,
} from '../../../utils/formatter';
import { kalenderDatoFraDate, serializeIso8601String } from '../../../utils/kalender';

interface IProps {
    utbetalingsperioder: Utbetalingsperiode[];
    aktivEtikett: Skalaetikett;
}

const summerTotalbeløpForPeriode = (sum: number, vedtaksperiode: Vedtaksperiode) => {
    if (vedtaksperiode.vedtaksperiodetype !== Vedtaksperiodetype.UTBETALING) return sum;

    return sum + vedtaksperiode.utbetaltPerMnd;
};

const Oppsummeringsboks: React.FunctionComponent<IProps> = ({
    utbetalingsperioder,
    aktivEtikett,
}) => {
    const { settAktivEtikett } = useTidslinje();

    const månedNavnOgÅr = () => {
        const navn = formaterIsoDato(
            serializeIso8601String(kalenderDatoFraDate(aktivEtikett.dato)),
            datoformat.MÅNED_ÅR_NAVN
        );
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
                                {formaterBeløp(
                                    utbetalingsperioder.reduce(summerTotalbeløpForPeriode, 0)
                                )}
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
            {utbetalingsperioder.length > 0 && (
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
                        {utbetalingsperioder.map((utbetalingsperiode: Utbetalingsperiode) => {
                            if (
                                utbetalingsperiode.vedtaksperiodetype !==
                                Vedtaksperiodetype.UTBETALING
                            )
                                return null;

                            return utbetalingsperiode.utbetalingsperiodeDetaljer
                                .sort((detaljA, detaljB) =>
                                    sorterPersonTypeOgFødselsdato(detaljA.person, detaljB.person)
                                )
                                .map((detalj, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Normaltekst>{`${
                                                    detalj.person.navn
                                                } (${hentAlderSomString(
                                                    detalj.person.fødselsdato
                                                )}) | ${formaterIdent(
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
