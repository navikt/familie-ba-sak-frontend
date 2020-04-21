import * as React from 'react';
import { IOppsummeringBeregning, ytelsetype } from '../../../typer/beregning';
import Chevron from 'nav-datovelger/lib/elementer/ChevronSvg';
import { datoformat, formaterBeløp } from '../../../utils/formatter';
import BeregningDetalj from './BeregningDetalj';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import classNames from 'classnames';
import { kategorier } from '../../../typer/behandling';
import { nyPeriode, periodeToString } from '../../../typer/periode';

interface IProps {
    beregning: IOppsummeringBeregning;
}

const Oppsummeringsrad: React.FunctionComponent<IProps> = ({ beregning }) => {
    const [åpentElement, setÅpentElement] = React.useState<boolean>(false);

    const oppdaterÅpentElement = (): void => {
        setÅpentElement(!åpentElement);
    };

    const kolonneClassnames = classNames('tilkjentytelse-kolonne', { åpen: åpentElement });
    const radClassnames = classNames('tilkjentytelse-rad', { åpen: åpentElement });
    const distinkteStønadstyper = [...new Set(beregning.stønadstype)];

    return (
        <div
            className={radClassnames}
            onClick={() => oppdaterÅpentElement()}
            role="row"
            aria-expanded={åpentElement}
        >
            <Kolonne classes={kolonneClassnames}>
                <Chevron retning={åpentElement ? 'opp' : 'ned'} />
            </Kolonne>
            <Kolonne classes={kolonneClassnames}>
                {periodeToString(
                    nyPeriode(beregning.periodeFom, beregning.periodeTom),
                    datoformat.DATO_FORKORTTET
                )}
            </Kolonne>
            <Kolonne classes={kolonneClassnames}>{kategorier[beregning.sakstype].navn}</Kolonne>
            <Kolonne classes={kolonneClassnames}>
                {distinkteStønadstyper.map(stønad => ytelsetype[stønad].navn).join(' + ')}
            </Kolonne>
            <Kolonne classes={kolonneClassnames}>{beregning.antallBarn}</Kolonne>
            <Kolonne classes={kolonneClassnames}>{formaterBeløp(beregning.utbetaltPerMnd)}</Kolonne>
            {åpentElement && <BeregningDetalj beregningDetaljer={beregning.beregningDetaljer} />}
        </div>
    );
};

const OppsummeringsradHeader: React.FunctionComponent = () => {
    return (
        <div className="tilkjentytelse-rad tilkjentytelse-header-rad" role="row">
            <KolonneHeader />
            <KolonneHeader>Periode</KolonneHeader>
            <KolonneHeader>Sakstype</KolonneHeader>
            <KolonneHeader>Satser</KolonneHeader>
            <KolonneHeader>Ant. barn</KolonneHeader>
            <KolonneHeader>Utbet./md.</KolonneHeader>
        </div>
    );
};

interface IKolonneProps {
    classes: string;
}

const Kolonne: React.FunctionComponent<IKolonneProps> = ({ classes, children }) => {
    return (
        <div className={classes} role="cell">
            <Normaltekst>{children}</Normaltekst>
        </div>
    );
};

const KolonneHeader: React.FunctionComponent = ({ children }) => {
    return (
        <div className="tilkjentytelse-kolonne" role="columnheader">
            {children && <Element>{children}</Element>}
        </div>
    );
};

export { Oppsummeringsrad, OppsummeringsradHeader };
