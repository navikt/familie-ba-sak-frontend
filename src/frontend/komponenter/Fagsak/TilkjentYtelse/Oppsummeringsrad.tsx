import * as React from 'react';
import { IOppsummeringBeregning, ytelsetype } from '../../../typer/beregning';
import Chevron from 'nav-datovelger/lib/elementer/ChevronSvg';
import { datoformat, formaterBeløp, formaterIsoDato } from '../../../utils/formatter';
import BeregningDetalj from './BeregningDetalj';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import classNames from 'classnames';
import { kategorier } from '../../../typer/behandling';

interface IProps {
    beregning: IOppsummeringBeregning;
}

const Oppsummeringsrad: React.FunctionComponent<IProps> = ({ beregning }) => {
    const [åpentElement, setÅpentElement] = React.useState<boolean>(false);

    const oppdaterÅpentElement = () => {
        setÅpentElement(!åpentElement);
    };

    const kolonneClassnames = classNames('tilkjentytelse-kolonne', { åpen: åpentElement });
    const radClassnames = classNames('tilkjentytelse-rad', { åpen: åpentElement });
    const distinkteStønadstyper = [...new Set(beregning.stønadstype)];
    return (
        <div className={radClassnames} onClick={() => oppdaterÅpentElement()} role="button">
            <div className={kolonneClassnames}>
                <Chevron retning={åpentElement ? 'opp' : 'ned'} />
            </div>
            <div className={kolonneClassnames}>
                <Normaltekst>
                    {formaterIsoDato(beregning.periodeFom, datoformat.DATO_FORKORTTET)} -{' '}
                    {formaterIsoDato(beregning.periodeTom, datoformat.DATO_FORKORTTET)}
                </Normaltekst>
            </div>
            <div className={kolonneClassnames}>
                <Normaltekst>{kategorier[beregning.sakstype].navn}</Normaltekst>
            </div>
            <div className={kolonneClassnames}>
                <Normaltekst>
                    {distinkteStønadstyper.map(stønad => ytelsetype[stønad].navn).join(' + ')}
                </Normaltekst>
            </div>
            <div className={kolonneClassnames}>
                <Normaltekst>{beregning.antallBarn}</Normaltekst>
            </div>
            <div className={kolonneClassnames}>
                <Normaltekst>{formaterBeløp(beregning.utbetaltPerMnd)}</Normaltekst>
            </div>
            {åpentElement && <BeregningDetalj beregningDetaljer={beregning.beregningDetaljer} />}
        </div>
    );
};

const OppsummeringsradHeader: React.FunctionComponent = () => {
    return (
        <div className="tilkjentytelse-rad tilkjentytelse-header-rad">
            <div className="tilkjentytelse-kolonne" />
            <div className="tilkjentytelse-kolonne">
                <Element>Periode</Element>
            </div>
            <div className="tilkjentytelse-kolonne">
                <Element>Sakstype</Element>
            </div>
            <div className="tilkjentytelse-kolonne">
                <Element>Satser</Element>
            </div>
            <div className="tilkjentytelse-kolonne">
                <Element>Ant. barn</Element>
            </div>
            <div className="tilkjentytelse-kolonne">
                <Element>Utbet./md.</Element>
            </div>
        </div>
    );
};

export { Oppsummeringsrad, OppsummeringsradHeader };
