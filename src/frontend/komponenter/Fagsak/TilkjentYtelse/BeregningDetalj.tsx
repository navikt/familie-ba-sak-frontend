import * as React from 'react';
import { IBeregningDetalj, ytelsetype } from '../../../typer/beregning';
import { formaterBeløp } from '../../../utils/formatter';
import { Normaltekst } from 'nav-frontend-typografi';
import { PersonType } from '../../../typer/person';
import classNames from 'classnames';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';

interface IProps {
    beregningDetaljer: IBeregningDetalj[];
}

const BeregningDetalj: React.FunctionComponent<IProps> = ({ beregningDetaljer }) => {
    const detaljerForSøker = beregningDetaljer
        .filter(detalj => detalj.person.type === PersonType.SØKER)
        .map((detalj, index, alle) => {
            return (
                <DetaljRad
                    beregningDetalj={detalj}
                    skalVisePersonalia={index === 0}
                    skalViseStipletLinje={index === alle.length - 1}
                    key={index}
                />
            );
        });
    return (
        <>
            {detaljerForSøker}
            {beregningDetaljer
                .filter(detalj => detalj.person.type !== PersonType.SØKER)
                .map((detalj, index) => {
                    return (
                        <DetaljRad
                            beregningDetalj={detalj}
                            skalVisePersonalia={true}
                            skalViseStipletLinje={false}
                            key={index}
                        />
                    );
                })}
        </>
    );
};

interface IDetaljRadProps {
    beregningDetalj: IBeregningDetalj;
    skalVisePersonalia: boolean;
    skalViseStipletLinje: boolean;
}

const DetaljRad: React.FunctionComponent<IDetaljRadProps> = ({
    beregningDetalj,
    skalVisePersonalia,
    skalViseStipletLinje,
}) => {
    const kolonneClassnames = classNames('tilkjentytelse-detaljer-kolonne', {
        'familierelasjon-separator': skalViseStipletLinje,
    });
    return (
        <div className="tilkjentytelse-detaljer-rad" role="row">
            <div className="tilkjentytelse-detaljer-kolonne" role="cell" />
            <div className={kolonneClassnames} role="cell">
                {skalVisePersonalia && <PersonInformasjon person={beregningDetalj.person} />}
            </div>
            <div className={kolonneClassnames} role="cell">
                <Normaltekst>{ytelsetype[beregningDetalj.stønadstype].navn}</Normaltekst>
            </div>
            <div className={kolonneClassnames} role="cell">
                <Normaltekst>{formaterBeløp(beregningDetalj.utbetaltPerMnd)}</Normaltekst>
            </div>
        </div>
    );
};

export default BeregningDetalj;
