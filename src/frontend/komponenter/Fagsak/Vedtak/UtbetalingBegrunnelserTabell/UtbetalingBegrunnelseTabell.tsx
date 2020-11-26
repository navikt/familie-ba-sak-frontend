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
import { IOppsummeringBeregning } from '../../../../typer/beregning';
import familieDayjs from '../../../../utils/familieDayjs';
import { sisteDagInneværendeMåned } from '../../../../utils/tid';

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
            familieDayjs(a.periodeFom, datoformat.ISO_DAG).diff(
                familieDayjs(b.periodeFom, datoformat.ISO_DAG)
            )
        )
        .filter((beregningRad: IOppsummeringBeregning) => beregningRad.endring.trengerBegrunnelse);

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
