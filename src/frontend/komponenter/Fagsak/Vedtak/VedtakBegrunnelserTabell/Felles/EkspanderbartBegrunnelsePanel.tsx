import React from 'react';

import styled from 'styled-components';

import Hjelpetekst44px from './Hjelpetekst44px';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { periodeToString, TIDENES_MORGEN } from '../../../../../typer/periode';
import {
    hentVedtaksperiodeTittel,
    Vedtaksperiode,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import { formaterBeløp, isoStringToDayjs } from '../../../../../utils/formatter';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { sisteDagInneværendeMåned } from '../../../../../utils/tid';

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

const PanelTittel = styled.p`
    display: flex;
    align-items: center;
    text-align: center;

    .typo-normal {
        margin-left: 1.5rem;
    }
`;

interface IEkspanderbartBegrunnelsePanelProps {
    vedtaksperiode: Vedtaksperiode;
    åpen: boolean;
}

const slutterSenereEnnInneværendeMåned = (dato: string) =>
    isoStringToDayjs(dato, TIDENES_MORGEN).isAfter(sisteDagInneværendeMåned());

const EkspanderbartBegrunnelsePanel: React.FC<IEkspanderbartBegrunnelsePanelProps> = ({
    vedtaksperiode,
    åpen,
    children,
}) => (
    <StyledEkspanderbartpanel
        key={`${vedtaksperiode.vedtaksperiodetype}_${vedtaksperiode.periodeFom}_${vedtaksperiode.periodeTom}`}
        apen={åpen}
        tittel={
            <PanelTittel>
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
            </PanelTittel>
        }
    >
        {children}
    </StyledEkspanderbartpanel>
);

export default EkspanderbartBegrunnelsePanel;
