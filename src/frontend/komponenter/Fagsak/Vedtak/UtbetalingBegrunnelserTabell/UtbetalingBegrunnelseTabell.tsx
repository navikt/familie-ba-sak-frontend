import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import Pluss from '../../../../ikoner/Pluss';
import { IBehandling } from '../../../../typer/behandling';
import { periodeToString, TIDENES_MORGEN } from '../../../../typer/periode';
import { IRestUtbetalingBegrunnelse } from '../../../../typer/vedtak';
import { datoformat, isoStringToDayjs } from '../../../../utils/formatter';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import UtbetalingBegrunnelseInput from './UtbetalingBegrunnelseInput';
import { useBehandling } from '../../../../context/BehandlingContext';
import familieDayjs from '../../../../utils/familieDayjs';
import { sisteDagInneværendeMåned } from '../../../../utils/tid';
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
            familieDayjs(a.periodeFom, datoformat.ISO_DAG).diff(
                familieDayjs(b.periodeFom, datoformat.ISO_DAG)
            )
        )
        .filter((utbetalingsperiode: IUtbetalingsperiode) => {
            // Fjern perioder hvor fom er mer enn 2 måneder frem i tid
            return dayjs(utbetalingsperiode.periodeFom).diff(dayjs(), 'month') < 2;
        });

    const slutterSenereEnnInneværendeMåned = (dato: string) =>
        isoStringToDayjs(dato, TIDENES_MORGEN).isAfter(sisteDagInneværendeMåned());

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
