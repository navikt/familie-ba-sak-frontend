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
import { IUtbetalingsperiode } from '../../../../typer/beregning';

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

    const harAndeler = åpenBehandling.utbetalingsperioder.length > 0;
    const utbetalingsperioderMedBegrunnelseBehov = åpenBehandling.utbetalingsperioder
        .slice()
        .sort((a, b) =>
            dayjs(a.periodeFom, datoformat.ISO_DAG).diff(
                dayjs(b.periodeFom, datoformat.ISO_DAG),
                'day'
            )
        );

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
                {utbetalingsperioderMedBegrunnelseBehov.map(
                    (utbetalingsperiode: IUtbetalingsperiode) => {
                        const utbetalingBegrunnelseForPeriode = utbetalingBegrunnelser.filter(
                            (utbetalingBegrunnelse: IRestUtbetalingBegrunnelse) => {
                                return (
                                    utbetalingBegrunnelse.fom === utbetalingsperiode.periodeFom &&
                                    utbetalingBegrunnelse.tom === utbetalingsperiode.periodeTom
                                );
                            }
                        );

                        return (
                            <tr key={utbetalingsperiode.periodeFom}>
                                <td>
                                    {periodeToString({
                                        fom: utbetalingsperiode.periodeFom,
                                        tom: slutterSenereEnnInneværendeMåned(
                                            utbetalingsperiode.periodeTom
                                        )
                                            ? ''
                                            : utbetalingsperiode.periodeTom,
                                    })}
                                </td>
                                <td>{`${utbetalingsperiode.utbetaltPerMnd} kr/mnd for ${utbetalingsperiode.antallBarn} barn`}</td>
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
                                            fom: utbetalingsperiode.periodeFom,
                                            tom: utbetalingsperiode.periodeTom,
                                        })}`}
                                        onClick={() => {
                                            leggTilUtbetalingBegrunnelse({
                                                fom: utbetalingsperiode.periodeFom,
                                                tom: utbetalingsperiode.periodeTom,
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
                    }
                )}
            </tbody>
        </table>
    ) : null;
};

export default UtbetalingBegrunnelseTabell;
