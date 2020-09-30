import React from 'react';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import DashedHr from '../../Felleskomponenter/DashedHr/DashedHr';
import { IBeregningDetalj, ytelsetype } from '../../../typer/beregning';
import { Normaltekst } from 'nav-frontend-typografi';

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
                            <Normaltekst>
                                {ytelsetype[beregningDetaljer.ytelseType].navn}
                            </Normaltekst>
                            <Normaltekst>{`${beregningDetaljer.utbetaltPerMnd} kr`}</Normaltekst>
                        </div>
                    );
                })}
                <DashedHr />
            </div>
        </li>
    );
};

export default PersonUtbetaling;
