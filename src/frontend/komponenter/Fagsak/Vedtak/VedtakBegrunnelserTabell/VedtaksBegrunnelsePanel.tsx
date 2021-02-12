import React, { useState } from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useBehandling } from '../../../../context/BehandlingContext';
import { Behandlingstype } from '../../../../typer/behandling';
import { IUtbetalingsperiode, IUtbetalingsperiodeDetalj } from '../../../../typer/beregning';
import { periodeToString, TIDENES_MORGEN } from '../../../../typer/periode';
import { IRestPersonResultat } from '../../../../typer/vilkår';
import { isoStringToDayjs } from '../../../../utils/formatter';
import { sisteDagInneværendeMåned } from '../../../../utils/tid';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';

interface IVedtakBegrunnelserTabell {
    utbetalingsperiode: IUtbetalingsperiode;
    personResultater: IRestPersonResultat[];
    behandlingsType: Behandlingstype;
}

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

    const displayFødselsnummer = (fødselsnummer: string) =>
        `${fødselsnummer.substring(0, 6)} ${fødselsnummer.substring(6)}`;

    const overrideHjelpetekstOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (hjelpetekstRef) {
            if (e && !hjelpetekstRef.state.ankerEl) {
                hjelpetekstRef.setState({ ankerEl: e.currentTarget });
            } else {
                hjelpetekstRef.setState({ ankerEl: undefined });
            }
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
                    <span className="typo-element">
                        {periodeToString({
                            fom: utbetalingsperiode.periodeFom,
                            tom: slutterSenereEnnInneværendeMåned(utbetalingsperiode.periodeTom)
                                ? ''
                                : utbetalingsperiode.periodeTom,
                        })}
                    </span>
                    <span className="typo-normal">Ordinær</span>
                    <span className="typo-normal">{utbetalingsperiode.utbetaltPerMnd} kr</span>
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
                                    {displayFødselsnummer(detalj.person.personIdent)}
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
                    <Element>Begrunnelse(r) i brev</Element>
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

const StyledEkspanderbartpanel = styled(Ekspanderbartpanel)`
    margin-bottom: 24px;
    width: 49rem;
`;

const UtbetalingsperiodepanelTittel = styled.p`
    display: flex;
    align-items: center;
    text-align: center;

    .typo-normal {
        margin-left: 24px;
    }
`;

const UtbetalingsperiodepanelBody = styled.div`
    margin-left: 10px;
    display: grid;
    grid-template-columns: 5fr 4fr;
`;

const UtbetalingsperiodeDetalj = styled.div`
    display: flex;
    flex-direction: row;

    .typo-normal {
        margin-right: 24px;
    }
`;

const StyledNormaltekst = styled(Normaltekst)`
    padding: 16px;
`;

const HjelpetekstWrapper = styled.button`
    padding: 10px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 10px;

    &:hover {
        background-color: #e7e9e9;
        .hjelpetekst {
            .hjelpetekst__apneknapp {
                outline: 0;
                color: white;
                background: #0067c5;

                .hjelpetekst__ikon {
                    fill: white;
                }
                box-shadow: 0 0 0 2px #0067c5;
            }
        }
    }
`;

export default VedtakBegrunnelsePanel;
