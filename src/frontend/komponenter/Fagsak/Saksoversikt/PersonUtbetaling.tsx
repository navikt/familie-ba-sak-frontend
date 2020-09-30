import React from 'react';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import DashedHr from '../../Felleskomponenter/DashedHr/DashedHr';
import { IBeregningDetalj, ytelsetype } from '../../../typer/beregning';
import { Element } from 'nav-frontend-typografi';

interface IPersonUtbetalingProps {
    beregningDetaljer: IBeregningDetalj[];
}

const PersonUtbetaling: React.FC<IPersonUtbetalingProps> = ({ beregningDetaljer }) => {
    return (
        <li>
            <PersonInformasjon person={beregningDetaljer[0].person} />
            <div className={'saksoversikt__utbetalinger__ytelser'}>
                {beregningDetaljer.map(beregningDetaljer => {
                    return (
                        <div className={'saksoversikt__utbetalinger__ytelselinje'}>
                            <Element>{ytelsetype[beregningDetaljer.ytelseType].navn}</Element>
                            <Element>{`${beregningDetaljer.utbetaltPerMnd} kr`}</Element>
                        </div>
                    );
                })}
            </div>
            <DashedHr />
        </li>
    );
};

export default PersonUtbetaling;
