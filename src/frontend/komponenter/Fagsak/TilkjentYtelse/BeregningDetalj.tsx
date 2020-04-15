import * as React from 'react';
import { IBeregningDetalj, ytelsetype } from '../../../typer/beregning';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';
import { formaterBeløp, hentAlder } from '../../../utils/formatter';
import { Normaltekst } from 'nav-frontend-typografi';

interface IProps {
    beregningDetaljer: IBeregningDetalj[];
}

const BeregningDetalj: React.FunctionComponent<IProps> = ({ beregningDetaljer }) => {
    return (
        <>
            {beregningDetaljer.map((detalj, index) => {
                const alder = hentAlder(detalj.person.fødselsdato);
                return (
                    <div className="tilkjentytelse-detaljer-rad" key={index}>
                        <div className="tilkjentytelse-detaljer-kolonne" />
                        <div className="tilkjentytelse-detaljer-kolonne">
                            <div className="detaljer-personalia">
                                <FamilieIkonVelger
                                    className="familie-ikon"
                                    alder={alder}
                                    kjønn={detalj.person.kjønn}
                                />
                                <Normaltekst>
                                    {detalj.person.navn} ({alder} år) | {detalj.person.personIdent}{' '}
                                    | {detalj.person.type}
                                </Normaltekst>
                            </div>
                        </div>
                        <div className="tilkjentytelse-detaljer-kolonne">
                            <Normaltekst>{ytelsetype[detalj.stønadstype].navn}</Normaltekst>
                        </div>
                        <div className="tilkjentytelse-detaljer-kolonne">
                            <Normaltekst>{formaterBeløp(detalj.utbetaltPerMnd)}</Normaltekst>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default BeregningDetalj;
