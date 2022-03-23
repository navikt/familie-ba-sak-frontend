import * as React from 'react';

import { Xknapp } from 'nav-frontend-ikonknapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import type { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { useTidslinje } from '../../../context/TidslinjeContext';
import { ytelsetype } from '../../../typer/beregning';
import type { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import {
    datoformat,
    formaterBeløp,
    formaterIsoDato,
    formaterIdent,
    hentAlderSomString,
    sorterUtbetaling,
} from '../../../utils/formatter';
import { kalenderDatoFraDate, serializeIso8601String } from '../../../utils/kalender';

interface IProps {
    utbetalingsperiode: Utbetalingsperiode | undefined;
    aktivEtikett: Skalaetikett;
}

const Oppsummeringsboks: React.FunctionComponent<IProps> = ({
    utbetalingsperiode,
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
        <div className={'behandlingsresultat-informasjonsboks'}>
            <div className={'behandlingsresultat-informasjonsboks__header'}>
                <div className={'behandlingsresultat-informasjonsboks__header__info'}>
                    <Element>{månedNavnOgÅr()}</Element>

                    {utbetalingsperiode !== undefined ? (
                        <Normaltekst>
                            Totalt utbetalt i mnd
                            <span
                                className={
                                    'behandlingsresultat-informasjonsboks__header__info__totalbeløp'
                                }
                            >
                                {formaterBeløp(utbetalingsperiode.utbetaltPerMnd)}
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
            {utbetalingsperiode !== undefined && (
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
                        {utbetalingsperiode.utbetalingsperiodeDetaljer
                            .sort(sorterUtbetaling)
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
                            })}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export { Oppsummeringsboks };
