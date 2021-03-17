import React, { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useBehandling } from '../../../../context/BehandlingContext';
import { Behandlingstype } from '../../../../typer/behandling';
import { periodeToString, TIDENES_MORGEN } from '../../../../typer/periode';
import {
    hentVedtaksperiodeTittel,
    IUtbetalingsperiodeDetalj,
    Vedtaksperiode,
    Vedtaksperiodetype,
} from '../../../../typer/vedtaksperiode';
import { IRestPersonResultat, Resultat } from '../../../../typer/vilkår';
import { formaterBeløp, formaterPersonIdent, isoStringToDayjs } from '../../../../utils/formatter';
import { sisteDagInneværendeMåned } from '../../../../utils/tid';
import FritekstVedtakbegrunnelser from './FritekstVedtakbegrunnelser';
import Hjelpetekst44px from './Hjelpetekst44px';
import useFritekstVedtakBegrunnelser from './useFritekstVedtakBegrunnelser';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';

interface IVedtakBegrunnelserTabell {
    vedtaksperiode: Vedtaksperiode;
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
    
    .is
    
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
    grid-template-columns: 1fr;
    row-gap: 40px;
`;

const UtbetalingsperiodeDetalj = styled.div`
    display: flex;
    flex-direction: row;

    .typo-normal {
        margin-right: 1.5rem;
    }
`;

const VedtakBegrunnelsePanel: React.FC<IVedtakBegrunnelserTabell> = ({
    vedtaksperiode,
    personResultater,
    behandlingsType,
}) => {
    const { erLesevisning } = useBehandling();
    const [erAvbrytt, settErAvbrytt] = useState(false);
    const { persiterteFritekster, fritekster } = useFritekstVedtakBegrunnelser(vedtaksperiode);

    const sjekkAtEndringerErPersistert = () => {
        if (deepEqual(fritekster, persiterteFritekster)) {
            settErAvbrytt(false);
        } else {
            alert('Fritekst har endringer som ikke er lagret!');
        }
    };

    const avbryt = () => {
        settErAvbrytt(true);
    };

    const key = `${vedtaksperiode.periodeFom}_${erAvbrytt}`;

    const slutterSenereEnnInneværendeMåned = (dato: string) =>
        isoStringToDayjs(dato, TIDENES_MORGEN).isAfter(sisteDagInneværendeMåned());
    return (
        <StyledEkspanderbartpanel
            key={key}
            apen={behandlingsType === Behandlingstype.FØRSTEGANGSBEHANDLING && !erAvbrytt}
            onClick={() => sjekkAtEndringerErPersistert()}
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
                            fom: vedtaksperiode.periodeFom,
                            tom: slutterSenereEnnInneværendeMåned(vedtaksperiode.periodeTom)
                                ? ''
                                : vedtaksperiode.periodeTom,
                        })}
                    </Element>
                    <Normaltekst>{hentVedtaksperiodeTittel(vedtaksperiode)}</Normaltekst>
                    {vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING && (
                        <Normaltekst>{formaterBeløp(vedtaksperiode.utbetaltPerMnd)}</Normaltekst>
                    )}
                </UtbetalingsperiodepanelTittel>
            }
        >
            <UtbetalingsperiodepanelBody>
                {vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING && (
                    <div>
                        <Element>Resultat</Element>

                        {vedtaksperiode.utbetalingsperiodeDetaljer.map(
                            (detalj: IUtbetalingsperiodeDetalj) => (
                                <UtbetalingsperiodeDetalj key={detalj.person.personIdent}>
                                    <Normaltekst title={detalj.person.navn}>
                                        {formaterPersonIdent(detalj.person.personIdent)}
                                    </Normaltekst>

                                    <Normaltekst>
                                        {formaterBeløp(detalj.utbetaltPerMnd)}
                                    </Normaltekst>
                                </UtbetalingsperiodeDetalj>
                            )
                        )}
                    </div>
                )}
                <div>
                    <VedtakBegrunnelserMultiselect
                        erLesevisning={erLesevisning()}
                        personResultater={personResultater}
                        vedtaksperiode={vedtaksperiode}
                    />
                </div>

                {vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.OPPHØR && (
                    <div>
                        <FritekstVedtakbegrunnelser
                            vedtaksperiode={vedtaksperiode}
                            toggleForm={avbryt}
                        />
                    </div>
                )}
            </UtbetalingsperiodepanelBody>
        </StyledEkspanderbartpanel>
    );
};

export default VedtakBegrunnelsePanel;
