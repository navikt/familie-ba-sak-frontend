import * as React from 'react';
import { IBeregningDetalj, ytelsetype } from '../../../typer/beregning';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';
import { formaterBeløp, hentAlder } from '../../../utils/formatter';
import { Normaltekst } from 'nav-frontend-typografi';
import { PersonType } from '../../../typer/person';
import classNames from 'classnames';

interface IProps {
    beregningDetaljer: IBeregningDetalj[];
}

interface IDetaljRadProps {
    detalj: IBeregningDetalj;
    skalVisePersonalia: boolean;
    skalViseStipletLinje: boolean;
}

const BeregningDetalj: React.FunctionComponent<IProps> = ({ beregningDetaljer }) => {
    const detaljerForSøker = beregningDetaljer
        .filter(detalj => detalj.person.type === PersonType.SØKER)
        .map((detalj, index, alle) => {
            return (
                <DetaljRad
                    detalj={detalj}
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
                            detalj={detalj}
                            skalVisePersonalia={true}
                            skalViseStipletLinje={false}
                            key={index}
                        />
                    );
                })}
        </>
    );
};

const DetaljRad: React.FunctionComponent<IDetaljRadProps> = ({
    detalj,
    skalVisePersonalia,
    skalViseStipletLinje,
}) => {
    const alder = hentAlder(detalj.person.fødselsdato);
    const kolonneClassnames = classNames('tilkjentytelse-detaljer-kolonne', {
        'familierelasjon-separator': skalViseStipletLinje,
    });
    return (
        <div className="tilkjentytelse-detaljer-rad">
            <div className="tilkjentytelse-detaljer-kolonne" />
            <div className={kolonneClassnames}>
                {skalVisePersonalia && (
                    <div className="detaljer-personalia">
                        <FamilieIkonVelger
                            className="familie-ikon"
                            alder={alder}
                            kjønn={detalj.person.kjønn}
                        />
                        <Normaltekst>
                            {detalj.person.navn} ({alder} år) | {detalj.person.personIdent} |{' '}
                            {detalj.person.type}
                        </Normaltekst>
                    </div>
                )}
            </div>
            <div className={kolonneClassnames}>
                <Normaltekst>{ytelsetype[detalj.stønadstype].navn}</Normaltekst>
            </div>
            <div className={kolonneClassnames}>
                <Normaltekst>{formaterBeløp(detalj.utbetaltPerMnd)}</Normaltekst>
            </div>
        </div>
    );
};

export default BeregningDetalj;
