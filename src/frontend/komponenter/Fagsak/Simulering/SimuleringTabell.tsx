import * as React from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';
import 'nav-frontend-tabell-style';

import navFarger from 'nav-frontend-core';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import familieDayjs from '../../../utils/familieDayjs';
import { formaterBeløp } from '../../../utils/formatter';

const StyledTable = styled.table`
    width: auto;
    border-collapse: collapse;
    table-layout: fixed;
    border-color: red;
`;

const HøyresiltTd = styled.td`
    text-align: right !important;
`;

const NormaltekstMedFarge = styled(Normaltekst)`
    color: ${(props: { farge?: string }) => (props.farge ? props.farge : navFarger.navMorkGra)};
`;

const VenstreKolonne = styled.col`
    width: 9.375rem;
`;

const DataKolonne = styled.col`
    width: 4.6875rem;
`;

const SkillelinjeKolonne = styled.col`
    width: 1.125rem;
`;

const Skillelinje = styled.div`
    position: relative;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    div {
        border-right: 1px dashed ${navFarger.navGra60};
        height: 3.25rem;
        position: absolute;
        top: 0.125rem;
    }
`;

const SimuleringTabellOverskrift = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
`;

interface ISimuleringProps {
    simulering: ISimuleringDTO;
}

const SimuleringTabell: React.FunctionComponent<ISimuleringProps> = ({
    simulering: { fomDatoNestePeriode, fom, perioder, tomDatoNestePeriode },
}) => {
    const kapitaliserTekst = (tekst: string): string => {
        return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
    };

    const formaterBeløpUtenPostfiks = (beløp: number) => formaterBeløp(beløp).slice(0, -3);

    const periodeSkalVisesITabell = (periode: ISimuleringPeriode) =>
        !fomDatoNestePeriode || !dayjs(periode.fom).isAfter(dayjs(fomDatoNestePeriode));

    const TabellSkillelinje = (props: { fomDatoPeriode: string }) => (
        <>
            {fomDatoNestePeriode === props.fomDatoPeriode && (
                <Skillelinje>
                    <div />
                </Skillelinje>
            )}
        </>
    );

    return (
        <>
            <SimuleringTabellOverskrift>
                <Element>
                    Simuleringsresultat for perioden {familieDayjs(fom).format('DD.MM.YYYY')} -{' '}
                    {familieDayjs(tomDatoNestePeriode).format('DD.MM.YYYY')}
                </Element>
            </SimuleringTabellOverskrift>

            <StyledTable className="tabell">
                <colgroup>
                    <VenstreKolonne />
                    {perioder.map(
                        periode =>
                            periodeSkalVisesITabell(periode) &&
                            (fomDatoNestePeriode === periode.fom ? (
                                <>
                                    <SkillelinjeKolonne />
                                    <DataKolonne />
                                </>
                            ) : (
                                <DataKolonne />
                            ))
                    )}
                    )
                </colgroup>

                <thead>
                    <tr>
                        <td />
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <>
                                        <TabellSkillelinje fomDatoPeriode={periode.fom} />
                                        <th>
                                            <Element>
                                                {kapitaliserTekst(
                                                    familieDayjs(periode.fom).format('MMM')
                                                )}
                                            </Element>
                                        </th>
                                    </>
                                )
                        )}
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Nytt beløp</td>
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <>
                                        <TabellSkillelinje fomDatoPeriode={periode.fom} />
                                        <HøyresiltTd>
                                            <Normaltekst>
                                                {formaterBeløpUtenPostfiks(periode.nyttBeløp)}
                                            </Normaltekst>
                                        </HøyresiltTd>
                                    </>
                                )
                        )}
                    </tr>
                    <tr>
                        <td>Tidligere utbetalt</td>
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <>
                                        <TabellSkillelinje fomDatoPeriode={periode.fom} />
                                        <HøyresiltTd>
                                            <Normaltekst>
                                                {formaterBeløpUtenPostfiks(
                                                    periode.tidligereUtbetalt
                                                )}
                                            </Normaltekst>
                                        </HøyresiltTd>
                                    </>
                                )
                        )}
                    </tr>
                    <tr>
                        <td>Resultat</td>
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <>
                                        <TabellSkillelinje fomDatoPeriode={periode.fom} />
                                        <HøyresiltTd>
                                            <NormaltekstMedFarge
                                                farge={
                                                    periode.resultat < 0
                                                        ? navFarger.navRod
                                                        : navFarger.navMorkGra
                                                }
                                            >
                                                {formaterBeløpUtenPostfiks(periode.resultat)}
                                            </NormaltekstMedFarge>
                                        </HøyresiltTd>
                                    </>
                                )
                        )}
                    </tr>
                </tbody>
            </StyledTable>
        </>
    );
};
export default SimuleringTabell;
