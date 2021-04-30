import * as React from 'react';
import { useState } from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';
import 'nav-frontend-tabell-style';

import navFarger from 'nav-frontend-core';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { useSimulering } from '../../../context/SimuleringContext';
import { NavigeringsRetning } from '../../../context/TidslinjeContext';
import { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import familieDayjs from '../../../utils/familieDayjs';
import { formaterBeløp } from '../../../utils/formatter';
import { hentPeriodelisteMedTommePerioder } from '../../../utils/simulering';
import TidslinjeNavigering from '../TilkjentYtelse/TidslinjeNavigering';

const Årsvelger = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
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
        height: 3.25rem;
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
    } = simulering;
    const { hentÅrISimuleringen } = useSimulering();
    const årISimuleringen = hentÅrISimuleringen(perioderUtenTommeSimuleringer);
    const perioder = hentPeriodelisteMedTommePerioder(perioderUtenTommeSimuleringer);
    const [indexFramvistÅr, settIndexFramistÅr] = useState(årISimuleringen.length - 1);
    const aktueltÅr = årISimuleringen[indexFramvistÅr];

    const kapitaliserTekst = (tekst: string): string => {
        return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
    };

    const periodeErEtterNesteUtbetalingsPeriode = (periode: ISimuleringPeriode) =>
        fomDatoNestePeriode && dayjs(periode.fom).isAfter(dayjs(fomDatoNestePeriode));

    const periodeSkalVisesITabell = (periode: ISimuleringPeriode) =>
        !periodeErEtterNesteUtbetalingsPeriode(periode) && dayjs(periode.fom).year() === aktueltÅr;

    const formaterBeløpUtenValutakode = (beløp?: number) =>
        beløp ? formaterBeløp(beløp).slice(0, -3) : '-';

    const antallPeriodetIFremvistÅr = perioderUtenTommeSimuleringer.filter(p =>
        periodeSkalVisesITabell(p)
    ).length;

    const erISisteÅrAvPerioden =
        indexFramvistÅr === hentÅrISimuleringen(perioderUtenTommeSimuleringer).length - 1;

    const tabellbredde =
        9.375 +
        (fomDatoNestePeriode && erISisteÅrAvPerioden ? 1.125 : 0) +
        4.6875 * antallPeriodetIFremvistÅr;

    const TabellSkillelinje = (props: { fomDatoPeriode: string }) => (
        <>
            {fomDatoNestePeriode === props.fomDatoPeriode && (
                <Skillelinje>
                    <hr />
                </Skillelinje>
            )}
        </>
    );

    return (
        <>
            <SimuleringTabellOverskrift>
                <Element>
                    Simuleringsresultat{' '}
                    {perioder.length > 1 &&
                        `for perioden ${familieDayjs(fom).format('DD.MM.YYYY')} - ${familieDayjs(
                            tomDatoNestePeriode
                        ).format('DD.MM.YYYY')}`}
                </Element>
            </SimuleringTabellOverskrift>

            {årISimuleringen.length > 1 && (
                <Årsvelger>
                    <Undertittel>{årISimuleringen[indexFramvistÅr]}</Undertittel>
                    <TidslinjeNavigering
                        naviger={retning =>
                            retning === NavigeringsRetning.VENSTRE
                                ? settIndexFramistÅr(indexFramvistÅr - 1)
                                : settIndexFramistÅr(indexFramvistÅr + 1)
                        }
                        kanNavigereTilHøyre={!erISisteÅrAvPerioden}
                        kanNavigereTilVenstre={!(indexFramvistÅr === 0)}
                    />
                </Årsvelger>
            )}

            <StyledTable className="tabell" bredde={tabellbredde}>
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
                        <td />
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <React.Fragment key={'måned - ' + periode.fom}>
                                        <TabellSkillelinje fomDatoPeriode={periode.fom} />
                                        <th>
                                            <Element>
                                                {kapitaliserTekst(
                                                    familieDayjs(periode.fom).format('MMM')
                                                )}
                                            </Element>
                                        </th>
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
                                        <TabellSkillelinje fomDatoPeriode={periode.fom} />
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
                                        <TabellSkillelinje fomDatoPeriode={periode.fom} />
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
                                        <TabellSkillelinje fomDatoPeriode={periode.fom} />
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
