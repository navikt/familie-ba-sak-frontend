import dayjs from 'dayjs';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import Pluss from '../../../../ikoner/Pluss';
import { IBehandling } from '../../../../typer/behandling';
import {
    periodeToString,
    sisteDagInneværendeMåned,
    stringToMoment,
    TIDENES_MORGEN,
} from '../../../../typer/periode';
import { IRestUtbetalingBegrunnelse } from '../../../../typer/vedtak';
import { datoformat } from '../../../../utils/formatter';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import UtbetalingBegrunnelseInput from './UtbetalingBegrunnelseInput';
import { useBehandling } from '../../../../context/BehandlingContext';
import { IOppsummeringBeregning } from '../../../../typer/beregning';

interface IUtbetalingBegrunnelseTabell {
    åpenBehandling: IBehandling;
}

const UtbetalingBegrunnelseTabell: React.FC<IUtbetalingBegrunnelseTabell> = ({
    åpenBehandling,
}) => {
    const { erLesevisning } = useBehandling();
    const {
        leggTilUtbetalingBegrunnelse,
        utbetalingBegrunnelser,
        utbetalingBegrunnelseFeilmelding,
    } = useUtbetalingBegrunnelser();

    const harAndeler = åpenBehandling.beregningOversikt.length > 0;
    const beregningerMedBegrunnelseBehov = åpenBehandling.beregningOversikt
        .slice()
        .sort((a, b) =>
            dayjs(a.periodeFom, datoformat.ISO_DAG).diff(
                dayjs(b.periodeFom, datoformat.ISO_DAG),
                'day'
            )
        )
        .filter((beregningRad: IOppsummeringBeregning) => beregningRad.endring.trengerBegrunnelse);

    const slutterSenereEnnInneværendeMåned = (dato: string) =>
        stringToMoment(dato, TIDENES_MORGEN).isAfter(sisteDagInneværendeMåned());

    return harAndeler ? (
        <table className={'tabell'}>
            <thead>
                <tr>
                    <th>Periode</th>
                    <th>Behandlingsresultat</th>
                    <th>Begrunnelse(r)</th>
                </tr>
            </thead>
            <tbody>
                {beregningerMedBegrunnelseBehov.map(beregningRad => {
                    const utbetalingBegrunnelseForPeriode = utbetalingBegrunnelser.filter(
                        (utbetalingBegrunnelse: IRestUtbetalingBegrunnelse) => {
                            return (
                                utbetalingBegrunnelse.fom === beregningRad.periodeFom &&
                                utbetalingBegrunnelse.tom === beregningRad.periodeTom
                            );
                        }
                    );

                    return (
                        <tr key={beregningRad.periodeFom}>
                            <td>
                                {periodeToString({
                                    fom: beregningRad.periodeFom,
                                    tom: slutterSenereEnnInneværendeMåned(beregningRad.periodeTom)
                                        ? ''
                                        : beregningRad.periodeTom,
                                })}
                            </td>
                            <td>{`${beregningRad.utbetaltPerMnd} kr/mnd for ${beregningRad.antallBarn} barn`}</td>
                            <td>
                                {utbetalingBegrunnelseForPeriode.map(
                                    (
                                        utbetalingBegrunnelse: IRestUtbetalingBegrunnelse,
                                        index: number
                                    ) => {
                                        return utbetalingBegrunnelse.id ? (
                                            <UtbetalingBegrunnelseInput
                                                key={index}
                                                id={utbetalingBegrunnelse.id}
                                                begrunnelseType={
                                                    utbetalingBegrunnelse.begrunnelseType
                                                }
                                                vedtakBegrunnelse={
                                                    utbetalingBegrunnelse.vedtakBegrunnelse
                                                }
                                                erLesevisning={erLesevisning()}
                                            />
                                        ) : (
                                            <Feilmelding key={index}>
                                                Begrunnelsen mangler id
                                            </Feilmelding>
                                        );
                                    }
                                )}
                                <IkonKnapp
                                    erLesevisning={erLesevisning()}
                                    id={`legg-til-begrunnelse-${periodeToString({
                                        fom: beregningRad.periodeFom,
                                        tom: beregningRad.periodeTom,
                                    })}`}
                                    onClick={() => {
                                        leggTilUtbetalingBegrunnelse({
                                            fom: beregningRad.periodeFom,
                                            tom: beregningRad.periodeTom,
                                        });
                                    }}
                                    knappPosisjon={'venstre'}
                                    mini={true}
                                    label={'Legg til'}
                                    ikon={<Pluss />}
                                    spinner={false}
                                />
                                {!utbetalingBegrunnelseFeilmelding.id && (
                                    <Feilmelding>
                                        {utbetalingBegrunnelseFeilmelding.feilmelding}
                                    </Feilmelding>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    ) : null;
};

export default UtbetalingBegrunnelseTabell;
