import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import { YtelseType, ytelsetype } from '../../../typer/beregning';
import type { IUtbetalingsperiodeDetalj } from '../../../typer/vedtaksperiode';
import { formaterBeløp, hentAlder } from '../../../utils/formatter';
import DashedHr from '../../Felleskomponenter/DashedHr/DashedHr';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';

interface IPersonUtbetalingProps {
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}

const PersonUtbetaling: React.FC<IPersonUtbetalingProps> = ({ utbetalingsperiodeDetaljer }) => {
    const genererTekstForOrdinær = (fødselsdato: string) =>
        hentAlder(fødselsdato) < 6 ? 'Ordinær (under 6 år)' : 'Ordinær (fra 6 år)';

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
                                          utbetalingsperiodeDetalj.person.fødselsdato
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
