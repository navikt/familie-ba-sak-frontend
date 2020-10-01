import React from 'react';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import DashedHr from '../../Felleskomponenter/DashedHr/DashedHr';
import { IBeregningDetalj, satsBeløp, ytelsetype, YtelseType } from '../../../typer/beregning';
import { Normaltekst } from 'nav-frontend-typografi';

interface IPersonUtbetalingProps {
    beregningDetaljer: IBeregningDetalj[];
}

const PersonUtbetaling: React.FC<IPersonUtbetalingProps> = ({ beregningDetaljer }) => {
    const genererTekstForOrdinær = (beløp: number) =>
        beløp === satsBeløp.ORDINÆR_UNDER_6_ÅR ? 'Ordinær (under 6 år)' : 'Ordinær (fra 6 år)';

    return (
        <li>
            <PersonInformasjon person={beregningDetaljer[0].person} />
            <div className={'saksoversikt__utbetalinger__ytelser'}>
                {beregningDetaljer.map((beregningDetaljer, index) => {
                    return (
                        <div key={index} className={'saksoversikt__utbetalinger__ytelselinje'}>
                            <Normaltekst>
                                {beregningDetaljer.ytelseType === YtelseType.ORDINÆR_BARNETRYGD
                                    ? genererTekstForOrdinær(beregningDetaljer.utbetaltPerMnd)
                                    : ytelsetype[beregningDetaljer.ytelseType].navn}
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
