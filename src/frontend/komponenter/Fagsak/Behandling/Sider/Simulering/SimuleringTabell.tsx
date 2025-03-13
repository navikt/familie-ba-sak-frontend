import * as React from 'react';
import { useState } from 'react';

import { isAfter } from 'date-fns';
import styled from 'styled-components';

import { Alert, Heading, Switch, Table } from '@navikt/ds-react';
import {
    AFontWeightBold,
    AFontWeightRegular,
    AGreen700,
    ASpacing18,
    ASurfaceSubtle,
    ATextDanger,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';

import { formaterBeløpUtenValutakode, kapitaliserTekst } from './simuleringUtil';
import { Årsvelger } from './Årsvelger';
import type { ISimuleringDTO, ISimuleringPeriode } from '../../../../../typer/simulering';
import {
    Datoformat,
    isoDatoPeriodeTilFormatertString,
    isoStringTilDate,
    isoStringTilFormatertString,
} from '../../../../../utils/dato';
import {
    hentPeriodelisteMedTommePerioder,
    hentÅrISimuleringen,
} from '../../../../../utils/simulering';

const IkkeFullBreddeTabell = styled(Table)`
    width: unset;
`;

const StyledAlert = styled(Alert)`
    margin-bottom: 1rem;
`;

const ManuellPosteringRad = styled(Table.Row)`
    background-color: ${ASurfaceSubtle};
`;

const HeaderCelle = styled(Table.HeaderCell)<{ $skalViseStipletLinje: boolean }>`
    border-left: ${props => props.$skalViseStipletLinje && '1px dashed'};
`;

const DataCelle = styled(Table.DataCell)<{ $skalViseStipletLinje: boolean }>`
    width: ${ASpacing18};
    border-left: ${props => props.$skalViseStipletLinje && '1px dashed'};
`;

const DataCellMedFarge = styled(DataCelle)<{
    $erNegativtBeløp: boolean;
    $erNesteUtbetalingsperiode: boolean;
    $skalViseStipletLinje: boolean; // Sendes videre til DataCelle
}>`
    color: ${props => {
        if (props.$erNegativtBeløp) return ATextDanger;
        else if (props.$erNesteUtbetalingsperiode) {
            return AGreen700;
        }
        return ATextDefault;
    }};
    font-weight: ${props =>
        props.$erNesteUtbetalingsperiode ? AFontWeightBold : AFontWeightRegular};
`;

const StyledSwitch = styled(Switch)`
    width: fit-content;
`;

const FørsteKolonne = styled(Table.HeaderCell)`
    width: 10rem;
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

    const erISisteÅrAvPerioden = indexFramvistÅr === hentÅrISimuleringen(perioder).length - 1;

    const tilOgFraDatoForSimulering = `${isoDatoPeriodeTilFormatertString({
        fom,
        tom: tomDatoNestePeriode ?? tomSisteUtbetaling,
    })}`;

    const erNesteUtbetalingsperiode = (periode: ISimuleringPeriode): boolean =>
        fomDatoNestePeriode === periode.fom;

    return (
        <>
            {erManuellPosteringSamtidigSomResultatIkkeErNull && (
                <StyledAlert variant={'warning'}>
                    Det finnes manuelle posteringer på den forrige behandlingen. Du må mest
                    sannsynlig sende en oppgave til NØS og be dem gjøre manuelle posteringer
                    tilsvarende de manuelle posteringene i tabellen.
                </StyledAlert>
            )}
            <Heading size={'small'} level={'2'} spacing>
                Simuleringsresultat for{' '}
                {perioder.length === 1
                    ? `${isoStringTilFormatertString({
                          isoString: perioder[0].fom,
                          tilFormat: Datoformat.MÅNED_ÅR_NAVN,
                      })}`
                    : `perioden ${tilOgFraDatoForSimulering}`}
            </Heading>

            {finnesManuellePosteringer && (
                <StyledSwitch
                    checked={visManuellePosteringer}
                    onChange={() => setVisManuellePosteringer(!visManuellePosteringer)}
                    size="small"
                >
                    Vis manuelle posteringer
                </StyledSwitch>
            )}
            <IkkeFullBreddeTabell
                aria-label={`Simuleringsresultat for ${
                    erMerEnn12MånederISimulering
                        ? aktueltÅr
                        : `perioden ${tilOgFraDatoForSimulering}`
                }`}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.DataCell>
                            {erMerEnn12MånederISimulering && (
                                <Årsvelger
                                    settIndexFramvistÅr={settIndexFramvistÅr}
                                    indexFramvistÅr={indexFramvistÅr}
                                    erISisteÅrAvPerioden={erISisteÅrAvPerioden}
                                    aktueltÅr={aktueltÅr}
                                    årISimuleringen={årISimuleringen}
                                />
                            )}
                        </Table.DataCell>
                        {perioderSomSkalVisesITabellen.map(periode => (
                            <HeaderCelle
                                key={'måned - ' + periode.fom}
                                align={'right'}
                                $skalViseStipletLinje={erNesteUtbetalingsperiode(periode)}
                            >
                                {kapitaliserTekst(
                                    isoStringTilFormatertString({
                                        isoString: periode.fom,
                                        tilFormat: Datoformat.MÅNED_NAVN,
                                    })
                                )}
                            </HeaderCelle>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <FørsteKolonne>Nytt beløp</FørsteKolonne>
                        {perioderSomSkalVisesITabellen.map(periode => (
                            <DataCelle
                                key={'nytt beløp - ' + periode.fom}
                                align={'right'}
                                $skalViseStipletLinje={erNesteUtbetalingsperiode(periode)}
                            >
                                {formaterBeløpUtenValutakode(periode.nyttBeløp)}
                            </DataCelle>
                        ))}
                    </Table.Row>
                    <Table.Row>
                        <FørsteKolonne>Tidligere utbetalt</FørsteKolonne>
                        {perioderSomSkalVisesITabellen.map(periode => {
                            return (
                                <DataCelle
                                    key={'tidligere utbetalt - ' + periode.fom}
                                    align={'right'}
                                    $skalViseStipletLinje={erNesteUtbetalingsperiode(periode)}
                                >
                                    {formaterBeløpUtenValutakode(periode.tidligereUtbetalt)}
                                </DataCelle>
                            );
                        })}
                    </Table.Row>
                    <Table.Row>
                        <FørsteKolonne>Resultat</FørsteKolonne>
                        {perioderSomSkalVisesITabellen.map(periode => (
                            <DataCellMedFarge
                                key={'resultat - ' + periode.fom}
                                align={'right'}
                                $erNegativtBeløp={!!periode.resultat && periode.resultat < 0}
                                $erNesteUtbetalingsperiode={erNesteUtbetalingsperiode(periode)}
                                $skalViseStipletLinje={erNesteUtbetalingsperiode(periode)}
                            >
                                {formaterBeløpUtenValutakode(periode.resultat)}
                            </DataCellMedFarge>
                        ))}
                    </Table.Row>
                    {visManuellePosteringer && (
                        <ManuellPosteringRad>
                            <FørsteKolonne>Manuell postering</FørsteKolonne>
                            {perioderSomSkalVisesITabellen.map(periode => (
                                <DataCelle
                                    key={'manuell postering - ' + periode.fom}
                                    align={'right'}
                                    $skalViseStipletLinje={erNesteUtbetalingsperiode(periode)}
                                >
                                    {formaterBeløpUtenValutakode(periode.manuellPostering)}
                                </DataCelle>
                            ))}
                        </ManuellPosteringRad>
                    )}
                </Table.Body>
            </IkkeFullBreddeTabell>
        </>
    );
};
export default SimuleringTabell;
