import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import 'nav-frontend-tabell-style';

import navFarger from 'nav-frontend-core';

import { BodyShort, Label } from '@navikt/ds-react';

import type { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import { erEtter, kalenderDato, periodeToString } from '../../../utils/kalender';
import { hentPeriodelisteMedTommePerioder, hentÅrISimuleringen } from '../../../utils/simulering';
import { formaterBeløpUtenValutakode, kapitaliserTekst } from './simuleringUtil';
import { Årsvelger } from './Årsvelger';

const StyledTable = styled.table(
    (props: { bredde: number }) => `
    width: ${props.bredde}rem;
    border-collapse: collapse;
    table-layout: fixed;
`
);

const HøyrestiltTd = styled.td`
    text-align: right !important;
`;

const HøyrestiltTh = styled.th`
    text-align: right !important;
`;

const BodyshortMedFarge = styled(BodyShort)`
    color: ${(props: { farge?: string }) => (props.farge ? props.farge : navFarger.navMorkGra)};
`;

const VenstreKolonne = styled.col`
    width: 9.5rem;
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

const LabelMedFarge = styled(Label)`
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
    const [indexFramvistÅr, settIndexFramvistÅr] = useState(årISimuleringen.length - 1);
    const aktueltÅr = årISimuleringen[indexFramvistÅr];
    const erMerEnn12MånederISimulering = perioder.length > 12;

    const periodeErEtterNesteUtbetalingsPeriode = (periode: ISimuleringPeriode) =>
        fomDatoNestePeriode &&
        erEtter(kalenderDato(periode.fom), kalenderDato(fomDatoNestePeriode));

    const periodeSkalVisesITabell = (periode: ISimuleringPeriode) =>
        !periodeErEtterNesteUtbetalingsPeriode(periode) &&
        (!erMerEnn12MånederISimulering || kalenderDato(periode.fom).år === aktueltÅr);

    const antallPerioderIFremvistÅr = perioder.filter(p => periodeSkalVisesITabell(p)).length;

    const erISisteÅrAvPerioden = indexFramvistÅr === hentÅrISimuleringen(perioder).length - 1;

    const tabellbredde =
        9.375 +
        (fomDatoNestePeriode && erISisteÅrAvPerioden ? 1.125 : 0) +
        4.6875 * antallPerioderIFremvistÅr;

    const erNestePeriode = (periode: ISimuleringPeriode) => periode.fom === fomDatoNestePeriode;

    const erManuellPosteringIBehandling = perioder.some(
        periode => periode.manuellPostering && periode.manuellPostering !== 0
    );

    const erPeriodeMedKorrigertResultat = perioder.some(periode => {
        return (periode.resultat ?? 0) !== (periode.korrigertResultat ?? 0);
    });

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
                <Label>
                    Simuleringsresultat for{' '}
                    {perioder.length === 1
                        ? `${formaterIsoDato(perioder[0].fom, datoformat.MÅNED_ÅR_NAVN)}`
                        : `perioden ${tilOgFraDatoForSimulering}`}
                </Label>
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
                                <Årsvelger
                                    settIndexFramvistÅr={settIndexFramvistÅr}
                                    indexFramvistÅr={indexFramvistÅr}
                                    erISisteÅrAvPerioden={erISisteÅrAvPerioden}
                                    aktueltÅr={aktueltÅr}
                                    årISimuleringen={årISimuleringen}
                                />
                            )}
                        </td>
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <React.Fragment key={'måned - ' + periode.fom}>
                                        {erNestePeriode(periode) && <TabellSkillelinje erHeader />}
                                        <HøyrestiltTh>
                                            <Label>
                                                {kapitaliserTekst(
                                                    formaterIsoDato(
                                                        periode.fom,
                                                        datoformat.MÅNED_NAVN
                                                    )
                                                )}
                                            </Label>
                                        </HøyrestiltTh>
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
                                        <HøyrestiltTd>
                                            <BodyShort>
                                                {formaterBeløpUtenValutakode(periode.nyttBeløp)}
                                            </BodyShort>
                                        </HøyrestiltTd>
                                    </React.Fragment>
                                )
                        )}
                    </tr>
                    {erManuellPosteringIBehandling && (
                        <tr>
                            <td>Manuell postering</td>
                            {perioder.map(
                                periode =>
                                    periodeSkalVisesITabell(periode) && (
                                        <React.Fragment key={'manuell postering - ' + periode.fom}>
                                            {erNestePeriode(periode) && <TabellSkillelinje />}
                                            <HøyrestiltTd>
                                                <BodyShort>
                                                    <LabelMedFarge
                                                        farge={
                                                            periode.manuellPostering &&
                                                            periode.manuellPostering < 0
                                                                ? navFarger.navRod
                                                                : navFarger.navGronnDarken40
                                                        }
                                                    >
                                                        {formaterBeløpUtenValutakode(
                                                            periode.manuellPostering
                                                        )}
                                                    </LabelMedFarge>
                                                </BodyShort>
                                            </HøyrestiltTd>
                                        </React.Fragment>
                                    )
                            )}
                        </tr>
                    )}
                    <tr>
                        <td>Tidligere utbetalt</td>
                        {perioder.map(
                            periode =>
                                periodeSkalVisesITabell(periode) && (
                                    <React.Fragment key={'tidligere utbetalt - ' + periode.fom}>
                                        {erNestePeriode(periode) && <TabellSkillelinje />}
                                        <HøyrestiltTd>
                                            <BodyShort>
                                                {formaterBeløpUtenValutakode(
                                                    periode.tidligereUtbetalt
                                                )}
                                            </BodyShort>
                                        </HøyrestiltTd>
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
                                        <HøyrestiltTd>
                                            {fomDatoNestePeriode === periode.fom ? (
                                                <LabelMedFarge
                                                    farge={
                                                        periode.resultat && periode.resultat < 0
                                                            ? navFarger.navRod
                                                            : navFarger.navGronnDarken40
                                                    }
                                                >
                                                    {formaterBeløpUtenValutakode(periode.resultat)}
                                                </LabelMedFarge>
                                            ) : (
                                                <BodyshortMedFarge
                                                    farge={
                                                        periode.resultat && periode.resultat < 0
                                                            ? navFarger.navRod
                                                            : navFarger.navMorkGra
                                                    }
                                                >
                                                    {formaterBeløpUtenValutakode(periode.resultat)}
                                                </BodyshortMedFarge>
                                            )}
                                        </HøyrestiltTd>
                                    </React.Fragment>
                                )
                        )}
                    </tr>
                    {erPeriodeMedKorrigertResultat && (
                        <tr>
                            <td>Korrigert resultat</td>
                            {perioder.map(
                                periode =>
                                    periodeSkalVisesITabell(periode) && (
                                        <React.Fragment key={'korrigert resultat - ' + periode.fom}>
                                            {erNestePeriode(periode) && <TabellSkillelinje />}
                                            <HøyrestiltTd>
                                                {fomDatoNestePeriode === periode.fom ? (
                                                    <LabelMedFarge
                                                        farge={
                                                            periode.korrigertResultat &&
                                                            periode.korrigertResultat < 0
                                                                ? navFarger.navRod
                                                                : navFarger.navGronnDarken40
                                                        }
                                                    >
                                                        {formaterBeløpUtenValutakode(
                                                            periode.resultat
                                                        )}
                                                    </LabelMedFarge>
                                                ) : (
                                                    <BodyshortMedFarge
                                                        farge={
                                                            periode.korrigertResultat &&
                                                            periode.korrigertResultat < 0
                                                                ? navFarger.navRod
                                                                : navFarger.navMorkGra
                                                        }
                                                    >
                                                        {formaterBeløpUtenValutakode(
                                                            periode.korrigertResultat
                                                        )}
                                                    </BodyshortMedFarge>
                                                )}
                                            </HøyrestiltTd>
                                        </React.Fragment>
                                    )
                            )}
                        </tr>
                    )}
                </tbody>
            </StyledTable>
        </>
    );
};
export default SimuleringTabell;
