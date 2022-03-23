import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import 'nav-frontend-tabell-style';

import navFarger from 'nav-frontend-core';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';

import { NavigeringsRetning } from '../../../context/TidslinjeContext';
import type { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import { datoformat, formaterBeløp, formaterIsoDato } from '../../../utils/formatter';
import { periodeToString, kalenderDato, erEtter } from '../../../utils/kalender';
import { hentPeriodelisteMedTommePerioder, hentÅrISimuleringen } from '../../../utils/simulering';
import TidslinjeNavigering from '../Behandlingsresultat/TidslinjeNavigering';

const Årsvelger = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTable = styled.table(
    (props: { bredde: number }) => `
    width: ${props.bredde}rem;
    border-collapse: collapse;
    table-layout: fixed;
`
);

const HøyresiltTd = styled.td`
    text-align: right !important;
`;

const HøyresiltTh = styled.th`
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

const Skillelinje = styled.td`
    position: relative;
    padding: 0.5rem !important;
    border: none !important;

    hr {
        border: none;
        border-right: 1px dashed ${navFarger.navGra60};
        height: ${(props: { erHeader?: boolean }) => (props.erHeader ? '3.875rem' : '3.25rem')};
        position: absolute;
        top: -0.375rem;
    }
`;

const SimuleringTabellOverskrift = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
`;

const ElementMedFarge = styled(Element)`
    color: ${(props: { farge?: string }) => (props.farge ? props.farge : navFarger.navMorkGra)};
`;

interface ISimuleringProps {
    simulering: ISimuleringDTO;
}

const SimuleringTabell: React.FunctionComponent<ISimuleringProps> = ({ simulering }) => {
    const {
        fomDatoNestePeriode,
        fom,
        perioder: perioderUtenTommeSimuleringer,
        tomDatoNestePeriode,
        tomSisteUtbetaling,
    } = simulering;
    const perioder = hentPeriodelisteMedTommePerioder(perioderUtenTommeSimuleringer);
    const årISimuleringen = hentÅrISimuleringen(perioder);
    const [indexFramvistÅr, settIndexFramistÅr] = useState(årISimuleringen.length - 1);
    const aktueltÅr = årISimuleringen[indexFramvistÅr];
    const erMerEnn12MånederISimulering = perioder.length > 12;

    const kapitaliserTekst = (tekst: string): string => {
        return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
    };

    const periodeErEtterNesteUtbetalingsPeriode = (periode: ISimuleringPeriode) =>
        fomDatoNestePeriode &&
        erEtter(kalenderDato(periode.fom), kalenderDato(fomDatoNestePeriode));

    const periodeSkalVisesITabell = (periode: ISimuleringPeriode) =>
        !periodeErEtterNesteUtbetalingsPeriode(periode) &&
        (!erMerEnn12MånederISimulering || kalenderDato(periode.fom).år === aktueltÅr);

    const formaterBeløpUtenValutakode = (beløp?: number) =>
        beløp ? formaterBeløp(beløp).slice(0, -3) : '-';

    const antallPerioderIFremvistÅr = perioder.filter(p => periodeSkalVisesITabell(p)).length;

    const erISisteÅrAvPerioden = indexFramvistÅr === hentÅrISimuleringen(perioder).length - 1;

    const tabellbredde =
        9.375 +
        (fomDatoNestePeriode && erISisteÅrAvPerioden ? 1.125 : 0) +
        4.6875 * antallPerioderIFremvistÅr;

    const erNestePeriode = (periode: ISimuleringPeriode) => periode.fom === fomDatoNestePeriode;

    const TabellSkillelinje = (props: { erHeader?: boolean }) => (
        <Skillelinje erHeader={props.erHeader}>
            <hr />
        </Skillelinje>
    );

    const tilOgFraDatoForSimulering = `${periodeToString({
        fom,
        tom: tomDatoNestePeriode ?? tomSisteUtbetaling,
    })}`;

    return (
        <>
            <SimuleringTabellOverskrift>
                <Element>
                    Simuleringsresultat for{' '}
                    {perioder.length === 1
                        ? `${formaterIsoDato(perioder[0].fom, datoformat.MÅNED_ÅR_NAVN)}`
                        : `perioden ${tilOgFraDatoForSimulering}`}
                </Element>
            </SimuleringTabellOverskrift>

            <StyledTable
                aria-label={`Simuleringsresultat for ${
                    erMerEnn12MånederISimulering
                        ? aktueltÅr
                        : `perioden ${tilOgFraDatoForSimulering}`
                }`}
                className="tabell"
                bredde={tabellbredde}
            >
                <colgroup>
                    <VenstreKolonne />
                    {perioder.map(
                        periode =>
                            periodeSkalVisesITabell(periode) &&
                            (fomDatoNestePeriode === periode.fom ? (
                                <React.Fragment key={'col - ' + periode.fom}>
                                    <SkillelinjeKolonne />
                                    <DataKolonne />
                                </React.Fragment>
                            ) : (
                                <DataKolonne key={'col - ' + periode.fom} />
                            ))
                    )}
                </colgroup>

                <thead>
                    <tr>
                        <td>
                            {erMerEnn12MånederISimulering && (
                                <Årsvelger>
                                    <TidslinjeNavigering
                                        naviger={retning =>
                                            retning === NavigeringsRetning.VENSTRE
                                                ? settIndexFramistÅr(indexFramvistÅr - 1)
                                                : settIndexFramistÅr(indexFramvistÅr + 1)
                                        }
                                        kanNavigereTilHøyre={!erISisteÅrAvPerioden}
                                        kanNavigereTilVenstre={!(indexFramvistÅr === 0)}
                                        navigerTilHyøyreTittel={`Vis simuleringsresultat for ${
                                            aktueltÅr + 1
                                        }`}
                                        navigerTilVenstreTittel={`Vis simuleringsresultat for ${
                                            aktueltÅr - 1
                                        }`}
                                    >
                                        <Undertekst>{årISimuleringen[indexFramvistÅr]}</Undertekst>
                                    </TidslinjeNavigering>
                                </Årsvelger>
                            )}
                        </td>
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <React.Fragment key={'måned - ' + periode.fom}>
                                        {erNestePeriode(periode) && <TabellSkillelinje erHeader />}
                                        <HøyresiltTh>
                                            <Element>
                                                {kapitaliserTekst(
                                                    formaterIsoDato(
                                                        periode.fom,
                                                        datoformat.MÅNED_NAVN
                                                    )
                                                )}
                                            </Element>
                                        </HøyresiltTh>
                                    </React.Fragment>
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
                                    <React.Fragment key={'nytt beløp - ' + periode.fom}>
                                        {erNestePeriode(periode) && <TabellSkillelinje />}
                                        <HøyresiltTd>
                                            <Normaltekst>
                                                {formaterBeløpUtenValutakode(periode.nyttBeløp)}
                                            </Normaltekst>
                                        </HøyresiltTd>
                                    </React.Fragment>
                                )
                        )}
                    </tr>
                    <tr>
                        <td>Tidligere utbetalt</td>
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <React.Fragment key={'tidligere utbetalt - ' + periode.fom}>
                                        {erNestePeriode(periode) && <TabellSkillelinje />}
                                        <HøyresiltTd>
                                            <Normaltekst>
                                                {formaterBeløpUtenValutakode(
                                                    periode.tidligereUtbetalt
                                                )}
                                            </Normaltekst>
                                        </HøyresiltTd>
                                    </React.Fragment>
                                )
                        )}
                    </tr>
                    <tr>
                        <td>Resultat</td>
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <React.Fragment key={'resultat - ' + periode.fom}>
                                        {erNestePeriode(periode) && <TabellSkillelinje />}
                                        <HøyresiltTd>
                                            {fomDatoNestePeriode === periode.fom ? (
                                                <ElementMedFarge
                                                    farge={
                                                        periode.resultat && periode.resultat < 0
                                                            ? navFarger.navRod
                                                            : navFarger.navGronnDarken40
                                                    }
                                                >
                                                    {formaterBeløpUtenValutakode(periode.resultat)}
                                                </ElementMedFarge>
                                            ) : (
                                                <NormaltekstMedFarge
                                                    farge={
                                                        periode.resultat && periode.resultat < 0
                                                            ? navFarger.navRod
                                                            : navFarger.navMorkGra
                                                    }
                                                >
                                                    {formaterBeløpUtenValutakode(periode.resultat)}
                                                </NormaltekstMedFarge>
                                            )}
                                        </HøyresiltTd>
                                    </React.Fragment>
                                )
                        )}
                    </tr>
                </tbody>
            </StyledTable>
        </>
    );
};
export default SimuleringTabell;
