import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { ISimulering, useSimulering } from '../../../context/SimuleringContext';
import familieDayjs from '../../../utils/familieDayjs';
import { formaterBeløp } from '../../../utils/formatter';

const StyledTable = styled.table`
    width: 100%;
`;

const HøyresiltTd = styled.td`
    text-align: right;
`;
const NormaltekstMedFarge = styled(Normaltekst)`
    color: ${(props: { farge?: string }) => (props.farge ? props.farge : navFarger.navMorkGra)};
`;

const Skillelinje = styled.div`
    border-right: 1px dashed ${navFarger.navGra60};
    margin: 0 0.5rem;
`;

const StyledHjelpetekst = styled(Hjelpetekst)`
    margin-left: 0.875rem;
    margin-bottom: 0.125rem;
`;

const SimuleringTabellOverskrift = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
`;

interface ISimuleringProps {
    simulering: ISimulering;
}

const SimuleringTabell: React.FunctionComponent<ISimuleringProps> = ({ simulering }) => {
    const {
        hentSumPositiveYtelserIPeriode,
        hentSumNegativeYtelserIPeriode,
        hentSumYtelserIPeriode,
    } = useSimulering();

    const kapitaliserTekst = (tekst: string): string => {
        return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
    };

    const formaterBeløpUtenPostfiks = (beløp: number) => formaterBeløp(beløp).slice(0, -3);

    const periodeStartdatoer = Object.keys(simulering.periodeDictionary);

    return (
        <>
            <SimuleringTabellOverskrift>
                <Element>
                    Simuleringsresultat for perioden{' '}
                    {familieDayjs(simulering.fom).format('DD.MM.YYYY')} -{' '}
                    {familieDayjs(simulering.tom).format('DD.MM.YYYY')}
                </Element>
                <StyledHjelpetekst type={PopoverOrientering.Hoyre}>
                    Her vises nye og tidligere beløp fra oppdragssystemet. <br />
                    Neste utbetaling vises som siste celle under resultat.
                </StyledHjelpetekst>
            </SimuleringTabellOverskrift>

            <StyledTable className="tabell">
                <thead>
                    <tr>
                        <td />
                        {periodeStartdatoer.map(fomDato => (
                            <>
                                {simulering.nesteUtbetaling.dato === fomDato && (
                                    <th>
                                        <Skillelinje />
                                    </th>
                                )}

                                <th>
                                    <Element>
                                        {kapitaliserTekst(familieDayjs(fomDato).format('MMM'))}
                                    </Element>
                                </th>
                            </>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Nytt beløp</td>
                        {periodeStartdatoer.map(fomDato => (
                            <>
                                {simulering.nesteUtbetaling.dato === fomDato && (
                                    <td>
                                        <Skillelinje />
                                    </td>
                                )}

                                <HøyresiltTd>
                                    <Normaltekst>
                                        {formaterBeløpUtenPostfiks(
                                            hentSumPositiveYtelserIPeriode(
                                                simulering.periodeDictionary[fomDato]
                                            )
                                        )}
                                    </Normaltekst>
                                </HøyresiltTd>
                            </>
                        ))}
                    </tr>
                    <tr>
                        <td>Tidligere utbetalt</td>
                        {periodeStartdatoer.map(fomDato => (
                            <>
                                {simulering.nesteUtbetaling.dato === fomDato && (
                                    <td>
                                        <Skillelinje />
                                    </td>
                                )}

                                <HøyresiltTd>
                                    <Normaltekst>
                                        {formaterBeløpUtenPostfiks(
                                            Math.abs(
                                                hentSumNegativeYtelserIPeriode(
                                                    simulering.periodeDictionary[fomDato]
                                                )
                                            )
                                        )}
                                    </Normaltekst>
                                </HøyresiltTd>
                            </>
                        ))}
                    </tr>
                    <tr>
                        <td>Resultat</td>
                        {periodeStartdatoer.map(fomDato => (
                            <>
                                {simulering.nesteUtbetaling.dato === fomDato && (
                                    <td>
                                        <Skillelinje />
                                    </td>
                                )}

                                <HøyresiltTd>
                                    <NormaltekstMedFarge
                                        farge={
                                            hentSumYtelserIPeriode(
                                                simulering.periodeDictionary[fomDato]
                                            ) < 0
                                                ? navFarger.navRod
                                                : navFarger.navMorkGra
                                        }
                                    >
                                        {formaterBeløpUtenPostfiks(
                                            hentSumYtelserIPeriode(
                                                simulering.periodeDictionary[fomDato]
                                            )
                                        )}
                                    </NormaltekstMedFarge>
                                </HøyresiltTd>
                            </>
                        ))}
                    </tr>
                </tbody>
            </StyledTable>
        </>
    );
};
export default SimuleringTabell;
