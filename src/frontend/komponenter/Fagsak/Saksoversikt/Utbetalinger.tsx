import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import type { IUtbetalingsperiodeDetalj, Vedtaksperiode } from '../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { formaterBeløp, sorterUtbetaling } from '../../../utils/formatter';
import PersonUtbetaling from './PersonUtbetaling';

interface IUtbetalingerProps {
    vedtaksperiode?: Vedtaksperiode;
}

const Utbetalinger: React.FC<IUtbetalingerProps> = ({ vedtaksperiode }) => {
    if (vedtaksperiode?.vedtaksperiodetype !== Vedtaksperiodetype.UTBETALING) return null;

    const utbetalingsperiodeDetaljerGruppertPåPerson =
        vedtaksperiode?.utbetalingsperiodeDetaljer
            .sort(sorterUtbetaling)
            .reduce(
                (acc: { [key: string]: IUtbetalingsperiodeDetalj[] }, utbetalingsperiodeDetalj) => {
                    const utbetalingsperiodeDetaljerForPerson =
                        acc[utbetalingsperiodeDetalj.person.personIdent] ?? [];

                    return {
                        ...acc,
                        [utbetalingsperiodeDetalj.person.personIdent]: [
                            ...utbetalingsperiodeDetaljerForPerson,
                            utbetalingsperiodeDetalj,
                        ],
                    };
                },
                {}
            ) ?? {};

    return (
        <div className={'saksoversikt__utbetalinger'}>
            <ul>
                {Object.values(utbetalingsperiodeDetaljerGruppertPåPerson).map(
                    (utbetalingsperiodeDetaljerForPerson, index) => {
                        return (
                            <PersonUtbetaling
                                key={index}
                                utbetalingsperiodeDetaljer={utbetalingsperiodeDetaljerForPerson}
                            />
                        );
                    }
                )}
                <li className={'saksoversikt__utbetalinger__totallinje'}>
                    <Normaltekst>Totalt utbetalt/mnd</Normaltekst>
                    <Normaltekst>
                        {vedtaksperiode ? formaterBeløp(vedtaksperiode.utbetaltPerMnd) : '-'}
                    </Normaltekst>
                </li>
                <hr />
            </ul>
        </div>
    );
};

export default Utbetalinger;
