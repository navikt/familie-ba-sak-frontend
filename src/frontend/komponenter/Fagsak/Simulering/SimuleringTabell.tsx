import * as React from 'react';
import { useState } from 'react';

import { isAfter } from 'date-fns';
import styled from 'styled-components';

import { Alert, BodyShort, Label, Switch } from '@navikt/ds-react';
import {
    ABorderDefault,
    AGreen700,
    ASurfaceSubtle,
    ATextDanger,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';

import { formaterBeløpUtenValutakode, kapitaliserTekst } from './simuleringUtil';
import { Årsvelger } from './Årsvelger';
import type { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import {
    Datoformat,
    isoDatoPeriodeTilFormatertString,
    isoStringTilDate,
    isoStringTilFormatertString,
} from '../../../utils/dato';
import { hentPeriodelisteMedTommePerioder, hentÅrISimuleringen } from '../../../utils/simulering';

const StyledTable = styled.table<{ bredde: number }>`
    width: ${props => props.bredde}rem;
    border-collapse: collapse;
    table-layout: fixed;
`;

const StyledAlert = styled(Alert)`
    margin-bottom: 1rem;
`;

const HøyrestiltTd = styled.td`
    text-align: right !important;
`;

const HøyrestiltTh = styled.th`
    text-align: right !important;
`;

const BodyshortMedFarge = styled(BodyShort)<{ farge?: string }>`
    color: ${props => (props.farge ? props.farge : ATextDefault)};
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

const Skillelinje = styled.td<{ erHeader?: boolean }>`
    position: relative;
    padding: 0.5rem !important;
    border: none !important;

    hr {
        border: none;
        border-right: 1px dashed ${ABorderDefault};
        height: ${props => (props.erHeader ? '3.875rem' : '3.25rem')};
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

const ManuellPosteringRad = styled.tr`
    background-color: ${ASurfaceSubtle};
`;

const LabelMedFarge = styled(Label)<{ farge?: string }>`
    color: ${props => (props.farge ? props.farge : ATextDefault)};
`;

const StyledSwitch = styled(Switch)`
    width: fit-content;
`;

interface ISimuleringProps {
    simulering: ISimuleringDTO;
}

const TabellSkillelinje = (props: { erHeader?: boolean }) => (
    <Skillelinje erHeader={props.erHeader}>
        <hr />
    </Skillelinje>
);

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

    const finnesManuellePosteringer = perioder.some(
        periode => periode.manuellPostering && periode.manuellPostering !== 0
    );

    const erManuellPosteringSamtidigSomResultatIkkeErNull = perioder.some(
        periode =>
            periode.manuellPostering &&
            periode.manuellPostering !== 0 &&
            periode.resultat &&
            periode.resultat !== 0
    );
    const [visManuellePosteringer, setVisManuellePosteringer] = useState(
        erManuellPosteringSamtidigSomResultatIkkeErNull
    );

    const aktueltÅr = årISimuleringen[indexFramvistÅr];
    const erMerEnn12MånederISimulering = perioder.length > 12;

    const periodeErEtterNesteUtbetalingsPeriode = (periode: ISimuleringPeriode) =>
        fomDatoNestePeriode &&
        isAfter(isoStringTilDate(periode.fom), isoStringTilDate(fomDatoNestePeriode));

    const perioderSomSkalVisesITabellen = perioder.filter(
        periode =>
            !periodeErEtterNesteUtbetalingsPeriode(periode) &&
            (!erMerEnn12MånederISimulering ||
                isoStringTilDate(periode.fom).getFullYear() === aktueltÅr)
    );

    const antallPerioderIFremvistÅr = perioderSomSkalVisesITabellen.length;

    const erISisteÅrAvPerioden = indexFramvistÅr === hentÅrISimuleringen(perioder).length - 1;

    const tabellbredde =
        9.375 +
        (fomDatoNestePeriode && erISisteÅrAvPerioden ? 1.125 : 0) +
        4.6875 * antallPerioderIFremvistÅr;

    const erNestePeriode = (periode: ISimuleringPeriode) => periode.fom === fomDatoNestePeriode;

    const tilOgFraDatoForSimulering = `${isoDatoPeriodeTilFormatertString({
        fom,
        tom: tomDatoNestePeriode ?? tomSisteUtbetaling,
    })}`;

    return (
        <>
            {erManuellPosteringSamtidigSomResultatIkkeErNull && (
                <StyledAlert variant={'warning'}>
                    Det finnes manuelle posteringer på den forrige behandlingen. Du må mest
                    sannsynlig sende en oppgave til NØS og be dem gjøre manuelle posteringer
                    tilsvarende de manuelle posteringene i tabellen.
                </StyledAlert>
            )}
            <SimuleringTabellOverskrift>
                <Label>
                    Simuleringsresultat for{' '}
                    {perioder.length === 1
                        ? `${isoStringTilFormatertString({
                              isoString: perioder[0].fom,
                              tilFormat: Datoformat.MÅNED_ÅR_NAVN,
                          })}`
                        : `perioden ${tilOgFraDatoForSimulering}`}
                </Label>
            </SimuleringTabellOverskrift>

            {finnesManuellePosteringer && (
                <StyledSwitch
                    checked={visManuellePosteringer}
                    onChange={() => setVisManuellePosteringer(!visManuellePosteringer)}
                    position="right"
                    size="small"
                >
                    Vis manuelle posteringer
                </StyledSwitch>
            )}
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
                    {perioderSomSkalVisesITabellen.map(periode =>
                        fomDatoNestePeriode === periode.fom ? (
                            <React.Fragment key={'col - ' + periode.fom}>
                                <SkillelinjeKolonne />
                                <DataKolonne />
                            </React.Fragment>
                        ) : (
                            <DataKolonne key={'col - ' + periode.fom} />
                        )
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
                        {perioderSomSkalVisesITabellen.map(periode => (
                            <React.Fragment key={'måned - ' + periode.fom}>
                                {erNestePeriode(periode) && <TabellSkillelinje erHeader />}
                                <HøyrestiltTh>
                                    <Label>
                                        {kapitaliserTekst(
                                            isoStringTilFormatertString({
                                                isoString: periode.fom,
                                                tilFormat: Datoformat.MÅNED_NAVN,
                                            })
                                        )}
                                    </Label>
                                </HøyrestiltTh>
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Nytt beløp</td>
                        {perioderSomSkalVisesITabellen.map(periode => (
                            <React.Fragment key={'nytt beløp - ' + periode.fom}>
                                {erNestePeriode(periode) && <TabellSkillelinje />}
                                <HøyrestiltTd>
                                    <BodyShort>
                                        {formaterBeløpUtenValutakode(periode.nyttBeløp)}
                                    </BodyShort>
                                </HøyrestiltTd>
                            </React.Fragment>
                        ))}
                    </tr>
                    <tr>
                        <td>Tidligere utbetalt</td>
                        {perioderSomSkalVisesITabellen.map(periode => {
                            return (
                                <React.Fragment key={'tidligere utbetalt - ' + periode.fom}>
                                    {erNestePeriode(periode) && <TabellSkillelinje />}
                                    <HøyrestiltTd>
                                        <BodyShort>
                                            {formaterBeløpUtenValutakode(periode.tidligereUtbetalt)}
                                        </BodyShort>
                                    </HøyrestiltTd>
                                </React.Fragment>
                            );
                        })}
                    </tr>
                    <tr>
                        <td>Resultat</td>
                        {perioderSomSkalVisesITabellen.map(periode => (
                            <React.Fragment key={'resultat - ' + periode.fom}>
                                {erNestePeriode(periode) && <TabellSkillelinje />}
                                <HøyrestiltTd>
                                    {fomDatoNestePeriode === periode.fom ? (
                                        <LabelMedFarge
                                            farge={
                                                periode.resultat && periode.resultat < 0
                                                    ? ATextDanger
                                                    : AGreen700
                                            }
                                        >
                                            {formaterBeløpUtenValutakode(periode.resultat)}
                                        </LabelMedFarge>
                                    ) : (
                                        <BodyshortMedFarge
                                            farge={
                                                periode.resultat && periode.resultat < 0
                                                    ? ATextDanger
                                                    : ATextDefault
                                            }
                                        >
                                            {formaterBeløpUtenValutakode(periode.resultat)}
                                        </BodyshortMedFarge>
                                    )}
                                </HøyrestiltTd>
                            </React.Fragment>
                        ))}
                    </tr>
                    {visManuellePosteringer && (
                        <ManuellPosteringRad>
                            <td>Manuell postering</td>
                            {perioderSomSkalVisesITabellen.map(periode => (
                                <React.Fragment key={'manuell postering - ' + periode.fom}>
                                    {erNestePeriode(periode) && <TabellSkillelinje />}
                                    <HøyrestiltTd>
                                        <BodyShort>
                                            {formaterBeløpUtenValutakode(periode.manuellPostering)}
                                        </BodyShort>
                                    </HøyrestiltTd>
                                </React.Fragment>
                            ))}
                        </ManuellPosteringRad>
                    )}
                </tbody>
            </StyledTable>
        </>
    );
};
export default SimuleringTabell;
