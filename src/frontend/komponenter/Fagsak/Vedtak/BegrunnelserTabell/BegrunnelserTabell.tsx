import { FamilieSelect } from '@navikt/familie-form-elements';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
import {
    BehandlingResultat,
    behandlingsresultater,
    IBehandling,
} from '../../../../typer/behandling';
import { IPar } from '../../../../typer/common';
import { periodeToString } from '../../../../typer/periode';
import { IRestUtbetalingBegrunnelse, VedtakBegrunnelse } from '../../../../typer/vedtak';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import moment from 'moment';
import { datoformat } from '../../../../utils/formatter';
import { RessursStatus } from '@navikt/familie-typer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

interface IBegrunnelserTabellProps {
    åpenBehandling: IBehandling;
}

const BegrunnelserTabell: React.FC<IBegrunnelserTabellProps> = ({ åpenBehandling }) => {
    const harAndeler = åpenBehandling.beregningOversikt.length > 0;
    const {
        leggTilUtbetalingBegrunnelse,
        utbetalingBegrunnelser,
        utbetalingBegrunnelseFeilmelding,
    } = useUtbetalingBegrunnelser();

    return (
        <div className={'begrunnelser-tabell'}>
            {harAndeler ? (
                <table className={'tabell'}>
                    <thead>
                        <tr>
                            <th>Periode</th>
                            <th>Behandlingsresultat</th>
                            <th>Begrunnelse(r)</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {åpenBehandling.beregningOversikt
                            .slice()
                            .sort((a, b) =>
                                moment(a.periodeFom, datoformat.ISO_DAG).diff(
                                    moment(b.periodeFom, datoformat.ISO_DAG),
                                    'day'
                                )
                            )
                            .map(beregning => {
                                const utbetalingBegrunnelseForPeriode = utbetalingBegrunnelser.filter(
                                    (utbetalingBegrunnelse: IRestUtbetalingBegrunnelse) => {
                                        return (
                                            utbetalingBegrunnelse.fom === beregning.periodeFom &&
                                            utbetalingBegrunnelse.tom === beregning.periodeTom
                                        );
                                    }
                                );

                                return (
                                    <tr key={beregning.periodeFom}>
                                        <td>
                                            {periodeToString({
                                                fom: beregning.periodeFom,
                                                tom: beregning.periodeTom,
                                            })}
                                        </td>
                                        <td>{`${beregning.utbetaltPerMnd} kr/mnd for ${beregning.antallBarn} barn`}</td>
                                        <td>
                                            {utbetalingBegrunnelseForPeriode.map(
                                                (
                                                    utbetalingBegrunnelse: IRestUtbetalingBegrunnelse
                                                ) => {
                                                    return utbetalingBegrunnelse.id ? (
                                                        <BegrunnelseInput
                                                            id={utbetalingBegrunnelse.id}
                                                            resultat={
                                                                utbetalingBegrunnelse.resultat
                                                            }
                                                            vedtakBegrunnelse={
                                                                utbetalingBegrunnelse.vedtakBegrunnelse
                                                            }
                                                        />
                                                    ) : (
                                                        <Feilmelding>
                                                            Begrunnelsen mangler id
                                                        </Feilmelding>
                                                    );
                                                }
                                            )}
                                            <IkonKnapp
                                                id={`legg-til-begrunnelse-${periodeToString({
                                                    fom: beregning.periodeFom,
                                                    tom: beregning.periodeTom,
                                                })}`}
                                                onClick={() => {
                                                    leggTilUtbetalingBegrunnelse({
                                                        fom: beregning.periodeFom,
                                                        tom: beregning.periodeTom,
                                                    });
                                                }}
                                                label={'Legg til'}
                                                ikon={<Pluss />}
                                                spinner={false}
                                            />
                                            {utbetalingBegrunnelseFeilmelding &&
                                                !utbetalingBegrunnelseFeilmelding.id && (
                                                    <Feilmelding>
                                                        {
                                                            utbetalingBegrunnelseFeilmelding.feilmelding
                                                        }
                                                    </Feilmelding>
                                                )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

interface IBegrunnelseInputProps {
    vedtakBegrunnelse?: VedtakBegrunnelse;
    id: number;
    resultat?: BehandlingResultat;
}

const BegrunnelseInput: React.FC<IBegrunnelseInputProps> = ({
    vedtakBegrunnelse,
    id,
    resultat,
}) => {
    const { erLesevisning } = useBehandling();
    const {
        endreUtbetalingBegrunnelse,
        vilkårBegrunnelser,
        slettUtbetalingBegrunnelse,
        utbetalingBegrunnelseFeilmelding,
    } = useUtbetalingBegrunnelser();

    const onChangeResultat = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        endreUtbetalingBegrunnelse(id, {
            resultat:
                value !== 'Velg behandlingsresultat' ? (value as BehandlingResultat) : undefined,
            vedtakBegrunnelse: value !== 'Velg behandlingsresultat' ? vedtakBegrunnelse : undefined,
        });
    };

    const onChangeBegrunnelse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        endreUtbetalingBegrunnelse(id, {
            resultat,
            vedtakBegrunnelse:
                value !== 'Velg begrunnelse' ? (value as VedtakBegrunnelse) : undefined,
        });
    };

    const begrunnelser =
        vilkårBegrunnelser?.status === RessursStatus.SUKSESS &&
        resultat &&
        vilkårBegrunnelser.data[resultat];

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }

    return (
        <div className={'begrunnelse-input'}>
            <div className={'begrunnelse-input__flex'}>
                <FamilieSelect
                    className="begrunnelse-input__select"
                    name="begrunnelse"
                    bredde={'l'}
                    erLesevisning={erLesevisning()}
                    onChange={onChangeResultat}
                    value={resultat}
                >
                    <option>Velg behandlingsresultat</option>
                    {vilkårBegrunnelser?.status === RessursStatus.SUKSESS &&
                        Object.keys(vilkårBegrunnelser?.data)
                            .filter((behandlingResultat: string) => {
                                return (
                                    vilkårBegrunnelser?.status === RessursStatus.SUKSESS &&
                                    vilkårBegrunnelser.data[
                                        behandlingResultat as BehandlingResultat
                                    ] &&
                                    vilkårBegrunnelser.data[
                                        behandlingResultat as BehandlingResultat
                                    ].length > 0
                                );
                            })
                            .map((behandlingResultat: string) => {
                                return behandlingsresultater[behandlingResultat] ? (
                                    <option
                                        key={behandlingsresultater[behandlingResultat].id}
                                        value={behandlingsresultater[behandlingResultat].id}
                                    >
                                        {behandlingsresultater[behandlingResultat].navn}
                                    </option>
                                ) : null;
                            })}
                </FamilieSelect>

                <FamilieSelect
                    name="begrunnelse"
                    bredde={'l'}
                    erLesevisning={erLesevisning()}
                    onChange={onChangeBegrunnelse}
                    value={vedtakBegrunnelse}
                >
                    <option>Velg begrunnelse</option>
                    {begrunnelser &&
                        begrunnelser.map((type: IPar) => {
                            return (
                                <option key={type.id} value={type.id}>
                                    {type.navn}
                                </option>
                            );
                        })}
                </FamilieSelect>

                <IkonKnapp
                    onClick={() => {
                        slettUtbetalingBegrunnelse(id);
                    }}
                    id={`slett-knapp-${id}`}
                    label={'Slett'}
                    ikon={<Slett />}
                />
            </div>
            {utbetalingBegrunnelseFeilmelding && utbetalingBegrunnelseFeilmelding.id === id && (
                <Feilmelding>{utbetalingBegrunnelseFeilmelding.feilmelding}</Feilmelding>
            )}
        </div>
    );
};

export default BegrunnelserTabell;
