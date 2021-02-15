import React, { useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useBehandling } from '../../../../context/BehandlingContext';
import { Behandlingstype } from '../../../../typer/behandling';
import { IUtbetalingsperiode, IUtbetalingsperiodeDetalj } from '../../../../typer/beregning';
import { periodeToString, TIDENES_MORGEN } from '../../../../typer/periode';
import { IRestPersonResultat } from '../../../../typer/vilkår';
import { formaterBeløp, formaterPersonIdent, isoStringToDayjs } from '../../../../utils/formatter';
import { sisteDagInneværendeMåned } from '../../../../utils/tid';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';

interface IVedtakBegrunnelserTabell {
    utbetalingsperiode: IUtbetalingsperiode;
    personResultater: IRestPersonResultat[];
    behandlingsType: Behandlingstype;
}

const StyledEkspanderbartpanel = styled(Ekspanderbartpanel)`
    margin-bottom: 1.5rem;
    width: 49rem;

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

const StyledNormaltekst = styled(Normaltekst)`
    padding: 1rem;
`;

const HjelpetekstWrapper = styled.button`
    padding: 0.625rem;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    margin-right: 0.625rem;

    &:hover {
        background-color: ${navFarger.navLysGra};
        .hjelpetekst {
            .hjelpetekst__apneknapp {
                outline: 0;
                color: white;
                background: ${navFarger.navBla};

                .hjelpetekst__ikon {
                    fill: white;
                }
                box-shadow: 0 0 0 2px ${navFarger.navBla};
            }
        }
    }
`;

const VedtakBegrunnelsePanel: React.FC<IVedtakBegrunnelserTabell> = ({
    utbetalingsperiode,
    personResultater,
    behandlingsType,
}) => {
    const [hjelpetekstRef, settHjelpetekstRef] = useState<Hjelpetekst | null>(null);

    const { erLesevisning } = useBehandling();
    const [fødselsnummerAnker, settFødselsnummerAnker] = useState<
        | {
              fødselsnummer: string;
              element: HTMLElement;
          }
        | undefined
    >(undefined);

    const slutterSenereEnnInneværendeMåned = (dato: string) =>
        isoStringToDayjs(dato, TIDENES_MORGEN).isAfter(sisteDagInneværendeMåned());

    const overrideHjelpetekstOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (hjelpetekstRef) {
            hjelpetekstRef.togglePopover(e);
        }
        e.stopPropagation();
    };

    return (
        <StyledEkspanderbartpanel
            key={utbetalingsperiode.periodeFom}
            apen={behandlingsType === Behandlingstype.FØRSTEGANGSBEHANDLING}
            tittel={
                <UtbetalingsperiodepanelTittel>
                    <HjelpetekstWrapper tabIndex={-1} onClick={overrideHjelpetekstOnClick}>
                        <Hjelpetekst ref={element => settHjelpetekstRef(element)}>
                            Dette er en hjelpetekst (tekst kommer senere)
                        </Hjelpetekst>
                    </HjelpetekstWrapper>
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
                                <Normaltekst
                                    onMouseEnter={event =>
                                        settFødselsnummerAnker({
                                            fødselsnummer: detalj.person.personIdent,
                                            element: event.currentTarget,
                                        })
                                    }
                                    onMouseLeave={() => settFødselsnummerAnker(undefined)}
                                >
                                    {formaterPersonIdent(detalj.person.personIdent)}
                                </Normaltekst>

                                <Popover
                                    ankerEl={
                                        fødselsnummerAnker?.fødselsnummer ===
                                        detalj.person.personIdent
                                            ? fødselsnummerAnker.element
                                            : undefined
                                    }
                                    orientering={PopoverOrientering.Under}
                                    autoFokus={false}
                                    tabIndex={-1}
                                >
                                    <StyledNormaltekst>{detalj.person.navn}</StyledNormaltekst>
                                </Popover>

                                <Normaltekst>{detalj.utbetaltPerMnd} kr</Normaltekst>
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
