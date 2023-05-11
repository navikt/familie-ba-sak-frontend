import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Label, Switch } from '@navikt/ds-react';
import {
    ABorderDefault,
    AGreen700,
    ASurfaceSubtle,
    ATextDanger,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';

import { useApp } from '../../../context/AppContext';
import type { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import { ToggleNavn } from '../../../typer/toggles';
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

const StyledAlert = styled(Alert)`
    margin-bottom: 1rem;
`;

const HøyrestiltTd = styled.td`
    text-align: right !important;
`;

const HøyrestiltTh = styled.th`
    text-align: right !important;
`;

const BodyshortMedFarge = styled(BodyShort)`
    color: ${(props: { farge?: string }) => (props.farge ? props.farge : ATextDefault)};
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
        border-right: 1px dashed ${ABorderDefault};
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

const ManuellPosteringRad = styled.tr`
    background-color: ${ASurfaceSubtle};
`;

const LabelMedFarge = styled(Label)`
    color: ${(props: { farge?: string }) => (props.farge ? props.farge : ATextDefault)};
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
    const { toggles } = useApp();
    const erManuelPosteringTogglePå = toggles[ToggleNavn.manuellPostering];

    const periodeErEtterNesteUtbetalingsPeriode = (periode: ISimuleringPeriode) =>
        fomDatoNestePeriode &&
        erEtter(kalenderDato(periode.fom), kalenderDato(fomDatoNestePeriode));

    const perioderSomSkalVisesITabellen = perioder.filter(
        periode =>
            !periodeErEtterNesteUtbetalingsPeriode(periode) &&
            (!erMerEnn12MånederISimulering || kalenderDato(periode.fom).år === aktueltÅr)
    );

    const antallPerioderIFremvistÅr = perioderSomSkalVisesITabellen.length;

    const erISisteÅrAvPerioden = indexFramvistÅr === hentÅrISimuleringen(perioder).length - 1;

    const tabellbredde =
        9.375 +
        (fomDatoNestePeriode && erISisteÅrAvPerioden ? 1.125 : 0) +
        4.6875 * antallPerioderIFremvistÅr;

    const erNestePeriode = (periode: ISimuleringPeriode) => periode.fom === fomDatoNestePeriode;

    const tilOgFraDatoForSimulering = `${periodeToString({
        fom,
        tom: tomDatoNestePeriode ?? tomSisteUtbetaling,
    })}`;

    return (
        <>
            {erManuelPosteringTogglePå && erManuellPosteringSamtidigSomResultatIkkeErNull && (
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
                        ? `${formaterIsoDato(perioder[0].fom, datoformat.MÅNED_ÅR_NAVN)}`
                        : `perioden ${tilOgFraDatoForSimulering}`}
                </Label>
            </SimuleringTabellOverskrift>

            <StyledSwitch
                checked={visManuellePosteringer}
                onChange={() => setVisManuellePosteringer(!visManuellePosteringer)}
                position="right"
                size="small"
            >
                Vis manuelle posteringer
            </StyledSwitch>
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
                                            formaterIsoDato(periode.fom, datoformat.MÅNED_NAVN)
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
                    {erManuelPosteringTogglePå && visManuellePosteringer && (
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
