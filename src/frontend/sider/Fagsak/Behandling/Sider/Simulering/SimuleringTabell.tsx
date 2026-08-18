import { Box, Heading, LocalAlert, Switch, Table } from '@navikt/ds-react';

import type { ISimuleringDTO, ISimuleringPeriode } from '@typer/simulering';
import {
    Datoformat,
    isoDatoPeriodeTilFormatertString,
    isoStringTilDate,
    isoStringTilFormatertString,
} from '@utils/dato';
import { hentPeriodelisteMedTommePerioder, hentÅrISimuleringen } from '@utils/simulering';
import classNames from 'classnames';
import { isAfter } from 'date-fns';
import { useState } from 'react';

import styles from './SimuleringTabell.module.css';
import { formaterBeløpUtenValutakode, kapitaliserTekst } from './simuleringUtil';
import { Årsvelger } from './Årsvelger';

interface ISimuleringProps {
    simulering: ISimuleringDTO;
}

const SimuleringTabell = ({ simulering }: ISimuleringProps) => {
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
            periode.manuellPostering && periode.manuellPostering !== 0 && periode.resultat && periode.resultat !== 0
    );
    const [visManuellePosteringer, setVisManuellePosteringer] = useState(
        erManuellPosteringSamtidigSomResultatIkkeErNull
    );

    const aktueltÅr = årISimuleringen[indexFramvistÅr];
    const erMerEnn12MånederISimulering = perioder.length > 12;

    const periodeErEtterNesteUtbetalingsPeriode = (periode: ISimuleringPeriode) =>
        fomDatoNestePeriode && isAfter(isoStringTilDate(periode.fom), isoStringTilDate(fomDatoNestePeriode));

    const perioderSomSkalVisesITabellen = perioder.filter(
        periode =>
            !periodeErEtterNesteUtbetalingsPeriode(periode) &&
            (!erMerEnn12MånederISimulering || isoStringTilDate(periode.fom).getFullYear() === aktueltÅr)
    );

    const erISisteÅrAvPerioden = indexFramvistÅr === hentÅrISimuleringen(perioder).length - 1;

    const tilOgFraDatoForSimulering = `${isoDatoPeriodeTilFormatertString({
        fom,
        tom: tomDatoNestePeriode ?? tomSisteUtbetaling,
    })}`;

    const erNesteUtbetalingsperiode = (periode: ISimuleringPeriode): boolean => fomDatoNestePeriode === periode.fom;

    return (
        <>
            {erManuellPosteringSamtidigSomResultatIkkeErNull && (
                <Box marginBlock={'space-0 space-16'}>
                    <LocalAlert status="warning">
                        <LocalAlert.Header>
                            <LocalAlert.Title>Ingen manuelle posteringer</LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>
                            Det finnes manuelle posteringer på den forrige behandlingen. Du må mest sannsynlig sende en
                            oppgave til NØS og be dem gjøre manuelle posteringer tilsvarende de manuelle posteringene i
                            tabellen.
                        </LocalAlert.Content>
                    </LocalAlert>
                </Box>
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
                <Switch
                    className={styles.switch}
                    checked={visManuellePosteringer}
                    onChange={() => setVisManuellePosteringer(!visManuellePosteringer)}
                    size="small"
                >
                    Vis manuelle posteringer
                </Switch>
            )}
            <Table
                className={styles.table}
                aria-label={`Simuleringsresultat for ${
                    erMerEnn12MånederISimulering ? aktueltÅr : `perioden ${tilOgFraDatoForSimulering}`
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
                            <Table.HeaderCell
                                key={'måned - ' + periode.fom}
                                align={'right'}
                                className={classNames({ [styles.nestePeriode]: erNesteUtbetalingsperiode(periode) })}
                            >
                                {kapitaliserTekst(
                                    isoStringTilFormatertString({
                                        isoString: periode.fom,
                                        tilFormat: Datoformat.MÅNED_NAVN,
                                    })
                                )}
                            </Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.HeaderCell>Nytt beløp</Table.HeaderCell>
                        {perioderSomSkalVisesITabellen.map(periode => (
                            <Table.DataCell
                                className={classNames(styles.dataCell, {
                                    [styles.nestePeriode]: erNesteUtbetalingsperiode(periode),
                                })}
                                key={'nytt beløp - ' + periode.fom}
                                align={'right'}
                            >
                                {formaterBeløpUtenValutakode(periode.nyttBeløp)}
                            </Table.DataCell>
                        ))}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Tidligere utbetalt</Table.HeaderCell>
                        {perioderSomSkalVisesITabellen.map(periode => {
                            return (
                                <Table.DataCell
                                    className={classNames(styles.dataCell, {
                                        [styles.nestePeriode]: erNesteUtbetalingsperiode(periode),
                                    })}
                                    key={'tidligere utbetalt - ' + periode.fom}
                                    align={'right'}
                                >
                                    {formaterBeløpUtenValutakode(periode.tidligereUtbetalt)}
                                </Table.DataCell>
                            );
                        })}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Resultat</Table.HeaderCell>
                        {perioderSomSkalVisesITabellen.map(periode => (
                            <Table.DataCell
                                className={classNames(styles.dataCell, {
                                    [styles.nestePeriode]: erNesteUtbetalingsperiode(periode),
                                    [styles.nesteUtbetaling]: erNesteUtbetalingsperiode(periode),
                                    [styles.negativ]: !!periode.resultat && periode.resultat < 0,
                                })}
                                key={'resultat - ' + periode.fom}
                                align={'right'}
                            >
                                {formaterBeløpUtenValutakode(periode.resultat)}
                            </Table.DataCell>
                        ))}
                    </Table.Row>
                    {visManuellePosteringer && (
                        <Table.Row className={styles.manuellPosteringRad}>
                            <Table.HeaderCell>Manuell postering</Table.HeaderCell>
                            {perioderSomSkalVisesITabellen.map(periode => (
                                <Table.DataCell
                                    className={classNames(styles.dataCell, {
                                        [styles.nestePeriode]: erNesteUtbetalingsperiode(periode),
                                    })}
                                    key={'manuell postering - ' + periode.fom}
                                    align={'right'}
                                >
                                    {formaterBeløpUtenValutakode(periode.manuellPostering)}
                                </Table.DataCell>
                            ))}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </>
    );
};
export default SimuleringTabell;
