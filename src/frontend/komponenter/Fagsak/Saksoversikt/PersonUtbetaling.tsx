import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import {
    IUtbetalingsperiodeDetalj,
    satsBeløp,
    YtelseType,
    ytelsetype,
} from '../../../typer/beregning';
import { formaterBeløp } from '../../../utils/formatter';
import DashedHr from '../../Felleskomponenter/DashedHr/DashedHr';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';

interface IPersonUtbetalingProps {
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}

const PersonUtbetaling: React.FC<IPersonUtbetalingProps> = ({ utbetalingsperiodeDetaljer }) => {
    const genererTekstForOrdinær = (beløp: number) =>
        beløp === satsBeløp.ORDINÆR_UNDER_6_ÅR ? 'Ordinær (under 6 år)' : 'Ordinær (fra 6 år)';

    return (
        <li>
            <PersonInformasjon person={utbetalingsperiodeDetaljer[0].person} />
            <div className={'saksoversikt__utbetalinger__ytelser'}>
                {utbetalingsperiodeDetaljer.map((utbetalingsperiodeDetalj, index) => {
                    return (
                        <div key={index} className={'saksoversikt__utbetalinger__ytelselinje'}>
                            <Normaltekst>
                                {utbetalingsperiodeDetalj.ytelseType ===
                                YtelseType.ORDINÆR_BARNETRYGD
                                    ? genererTekstForOrdinær(
                                          utbetalingsperiodeDetalj.utbetaltPerMnd
                                      )
                                    : ytelsetype[utbetalingsperiodeDetalj.ytelseType].navn}
                            </Normaltekst>
                            <Normaltekst>
                                {formaterBeløp(utbetalingsperiodeDetalj.utbetaltPerMnd)}
                            </Normaltekst>
                        </div>
                    );
                })}
                <DashedHr />
            </div>
        </li>
    );
};

export default PersonUtbetaling;
