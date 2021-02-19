import React from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useBehandling } from '../../../../context/BehandlingContext';
import { Behandlingstype } from '../../../../typer/behandling';
import { IUtbetalingsperiode, IUtbetalingsperiodeDetalj } from '../../../../typer/beregning';
import { periodeToString, TIDENES_MORGEN } from '../../../../typer/periode';
import { IRestPersonResultat } from '../../../../typer/vilkår';
import { formaterBeløp, formaterPersonIdent, isoStringToDayjs } from '../../../../utils/formatter';
import { sisteDagInneværendeMåned } from '../../../../utils/tid';
import Hjelpetekst44px from './Hjelpetekst44px';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';

interface IVedtakBegrunnelserTabell {
    utbetalingsperiode: IUtbetalingsperiode;
    personResultater: IRestPersonResultat[];
    behandlingsType: Behandlingstype;
}

const StyledEkspanderbartpanel = styled(Ekspanderbartpanel)`
    margin-bottom: 1.5rem;
    max-width: 49rem;

    .ekspanderbartPanel__hode {
        padding-top: 0;
        padding-bottom: 0;
    }
    .ekspanderbartPanel__innhold {
        padding: 1rem;
    }
`;

const UtbetalingsperiodepanelTittel = styled.p`
    display: flex;
    align-items: center;
    text-align: center;

    .typo-normal {
        margin-left: 1.5rem;
    }
`;

const UtbetalingsperiodepanelBody = styled.div`
    margin-left: 0.625rem;
    display: grid;
    grid-template-columns: 5fr 4fr;
`;

const UtbetalingsperiodeDetalj = styled.div`
    display: flex;
    flex-direction: row;

    .typo-normal {
        margin-right: 1.5rem;
    }
`;

const VedtakBegrunnelsePanel: React.FC<IVedtakBegrunnelserTabell> = ({
    utbetalingsperiode,
    personResultater,
    behandlingsType,
}) => {
    const { erLesevisning } = useBehandling();

    const slutterSenereEnnInneværendeMåned = (dato: string) =>
        isoStringToDayjs(dato, TIDENES_MORGEN).isAfter(sisteDagInneværendeMåned());

    return (
        <StyledEkspanderbartpanel
            key={utbetalingsperiode.periodeFom}
            apen={behandlingsType === Behandlingstype.FØRSTEGANGSBEHANDLING}
            tittel={
                <UtbetalingsperiodepanelTittel>
                    {/* TODO legge inn tekst for hjelpeteksten og legg til hjepleteksten */}
                    {/* eslint-disable-next-line no-constant-condition */}
                    {true ? (
                        <div style={{ marginLeft: '0.625rem' }} />
                    ) : (
                        <Hjelpetekst44px innhold={'Midlertidig tekst'} />
                    )}
                    <Element>
                        {periodeToString({
                            fom: utbetalingsperiode.periodeFom,
                            tom: slutterSenereEnnInneværendeMåned(utbetalingsperiode.periodeTom)
                                ? ''
                                : utbetalingsperiode.periodeTom,
                        })}
                    </Element>
                    <Normaltekst>Ordinær</Normaltekst>
                    <Normaltekst>{formaterBeløp(utbetalingsperiode.utbetaltPerMnd)}</Normaltekst>
                </UtbetalingsperiodepanelTittel>
            }
        >
            <UtbetalingsperiodepanelBody>
                <div>
                    <Element>Resultat</Element>

                    {utbetalingsperiode.utbetalingsperiodeDetaljer.map(
                        (detalj: IUtbetalingsperiodeDetalj) => (
                            <UtbetalingsperiodeDetalj key={detalj.person.personIdent}>
                                <Normaltekst title={detalj.person.navn}>
                                    {formaterPersonIdent(detalj.person.personIdent)}
                                </Normaltekst>

                                <Normaltekst>{formaterBeløp(detalj.utbetaltPerMnd)}</Normaltekst>
                            </UtbetalingsperiodeDetalj>
                        )
                    )}
                </div>
                <div>
                    <VedtakBegrunnelserMultiselect
                        erLesevisning={erLesevisning()}
                        personResultater={personResultater}
                        periode={{
                            fom: utbetalingsperiode.periodeFom,
                            tom: utbetalingsperiode.periodeTom,
                        }}
                    />
                </div>
            </UtbetalingsperiodepanelBody>
        </StyledEkspanderbartpanel>
    );
};

export default VedtakBegrunnelsePanel;
