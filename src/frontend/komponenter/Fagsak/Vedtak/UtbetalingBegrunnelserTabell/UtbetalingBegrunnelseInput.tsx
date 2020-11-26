import { FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { IRestVilkårResultat } from '../../../../../../node_dist/frontend/typer/vilkår';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import Slett from '../../../../ikoner/Slett';
import { IPeriode, TIDENES_ENDE, TIDENES_MORGEN } from '../../../../typer/periode';
import {
    VedtakBegrunnelse,
    IRestVedtakBegrunnelse,
    VedtakBegrunnelseType,
    begrunnelsetyper,
    IRestUtbetalingBegrunnelse,
} from '../../../../typer/vedtak';
import { IRestPersonResultat, Resultat, VilkårType } from '../../../../typer/vilkår';
import familieDayjs from '../../../../utils/familieDayjs';
import { isoStringToDayjs } from '../../../../utils/formatter';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IUtbetalingsBegrunnelseInput {
    utbetalingBegrunnelse: IRestUtbetalingBegrunnelse;
    erLesevisning: boolean;
    id: number;
    periode: IPeriode;
    personResultater: IRestPersonResultat[];
}

const UtbetalingBegrunnelseInput: React.FC<IUtbetalingsBegrunnelseInput> = ({
    erLesevisning,
    id,
    periode,
    personResultater,
    utbetalingBegrunnelse,
}) => {
    const {
        endreUtbetalingBegrunnelse,
        vilkårBegrunnelser,
        slettUtbetalingBegrunnelse,
        utbetalingBegrunnelseFeilmelding,
    } = useUtbetalingBegrunnelser();

    const utgjørendeVilkårForPeriode: VilkårType[] = personResultater
        .flatMap(personResultat => personResultat.vilkårResultater)
        .filter((vilkårResultat: IRestVilkårResultat) => {
            if (utbetalingBegrunnelse.begrunnelseType === VedtakBegrunnelseType.INNVILGELSE) {
                return (
                    isoStringToDayjs(vilkårResultat.periodeFom, TIDENES_MORGEN).diff(
                        familieDayjs(periode.fom).subtract(1, 'month'),
                        'month'
                    ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                );
            } else if (utbetalingBegrunnelse.begrunnelseType === VedtakBegrunnelseType.REDUKSJON) {
                return (
                    isoStringToDayjs(vilkårResultat.periodeTom, TIDENES_ENDE).diff(
                        familieDayjs(periode.tom).subtract(1, 'month'),
                        'month'
                    ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                );
            } else {
                return true;
            }
        })
        .map((vilkårResultat: IRestVilkårResultat) => vilkårResultat.vilkårType);

    const [mutableVedtakBegrunnelse, settMutableVedtakBegrunnelse] = React.useState<
        VedtakBegrunnelse | undefined
    >(utbetalingBegrunnelse.vedtakBegrunnelse);
    const [mutableVedtakBegrunnelseType, settMutableVedtakBegrunnelseType] = React.useState<
        VedtakBegrunnelseType | undefined
    >(utbetalingBegrunnelse.begrunnelseType);
    const defaultVelgBehandlingsresultat = 'Velg behandlingsresultat';

    const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        settMutableVedtakBegrunnelseType(value as VedtakBegrunnelseType);
        settMutableVedtakBegrunnelse(undefined);
        endreUtbetalingBegrunnelse(id, {
            vedtakBegrunnelseType:
                value !== defaultVelgBehandlingsresultat
                    ? (value as VedtakBegrunnelseType)
                    : undefined,
            vedtakBegrunnelse: undefined,
        });
    };

    const onChangeBegrunnelse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        settMutableVedtakBegrunnelse(value as VedtakBegrunnelse);
        endreUtbetalingBegrunnelse(id, {
            vedtakBegrunnelseType: mutableVedtakBegrunnelseType,
            vedtakBegrunnelse:
                value !== 'Velg begrunnelse' ? (value as VedtakBegrunnelse) : undefined,
        });
    };

    const begrunnelser =
        vilkårBegrunnelser?.status === RessursStatus.SUKSESS && vilkårBegrunnelser.data;

    if (vilkårBegrunnelser.status === RessursStatus.FEILET) {
        return <AlertStripeFeil>Klarte ikke å hente inn begrunnelser for vilkår.</AlertStripeFeil>;
    }

    return (
        <div className={'begrunnelse-input'}>
            <div className={'begrunnelse-input__flex'}>
                <FamilieSelect
                    bredde={'m'}
                    className="begrunnelse-input__select"
                    erLesevisning={erLesevisning}
                    lesevisningVerdi={
                        mutableVedtakBegrunnelseType
                            ? begrunnelsetyper[mutableVedtakBegrunnelseType]?.navn
                            : ''
                    }
                    name="begrunnelse"
                    onChange={onChangeType}
                    value={
                        mutableVedtakBegrunnelseType === null
                            ? undefined
                            : mutableVedtakBegrunnelseType
                    }
                >
                    <option>{defaultVelgBehandlingsresultat}</option>
                    {vilkårBegrunnelser?.status === RessursStatus.SUKSESS &&
                        Object.keys(vilkårBegrunnelser?.data)
                            .filter((begrunnelsetype: string) => {
                                return (
                                    vilkårBegrunnelser?.status === RessursStatus.SUKSESS &&
                                    vilkårBegrunnelser.data[
                                        begrunnelsetype as VedtakBegrunnelseType
                                    ] &&
                                    vilkårBegrunnelser.data[
                                        begrunnelsetype as VedtakBegrunnelseType
                                    ].length > 0
                                );
                            })
                            .map((begrunnelsetype: string) => {
                                return begrunnelsetyper[begrunnelsetype] ? (
                                    <option
                                        key={begrunnelsetyper[begrunnelsetype].id}
                                        value={begrunnelsetyper[begrunnelsetype].id}
                                    >
                                        {begrunnelsetyper[begrunnelsetype].navn}
                                    </option>
                                ) : null;
                            })}
                </FamilieSelect>

                <FamilieSelect
                    bredde={'l'}
                    erLesevisning={erLesevisning}
                    lesevisningVerdi={
                        mutableVedtakBegrunnelse && begrunnelser
                            ? Object.values(begrunnelser)
                                  .flat()
                                  .find(
                                      (restVedtakBegrunnelse: IRestVedtakBegrunnelse) =>
                                          restVedtakBegrunnelse.id === mutableVedtakBegrunnelse
                                  )?.navn
                            : ''
                    }
                    name="begrunnelse"
                    onChange={onChangeBegrunnelse}
                    value={mutableVedtakBegrunnelse === null ? undefined : mutableVedtakBegrunnelse}
                >
                    <option>Velg begrunnelse</option>
                    {begrunnelser &&
                        mutableVedtakBegrunnelseType &&
                        begrunnelser[mutableVedtakBegrunnelseType]
                            .filter((restVedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                                return restVedtakBegrunnelse.vilkår
                                    ? utgjørendeVilkårForPeriode.includes(
                                          restVedtakBegrunnelse.vilkår
                                      )
                                    : true;
                            })
                            .map((restVedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                                return (
                                    <option
                                        key={restVedtakBegrunnelse.id}
                                        value={restVedtakBegrunnelse.id}
                                    >
                                        {restVedtakBegrunnelse.navn}
                                    </option>
                                );
                            })}
                </FamilieSelect>

                <IkonKnapp
                    erLesevisning={erLesevisning}
                    onClick={() => {
                        slettUtbetalingBegrunnelse(id);
                    }}
                    id={`slett-knapp-${id}`}
                    label={'Slett'}
                    ikon={<Slett />}
                    knappPosisjon={'venstre'}
                />
            </div>
            {utbetalingBegrunnelseFeilmelding.feilmelding !== '' &&
                utbetalingBegrunnelseFeilmelding.id === id && (
                    <Feilmelding>{utbetalingBegrunnelseFeilmelding.feilmelding}</Feilmelding>
                )}
        </div>
    );
};

export default UtbetalingBegrunnelseInput;
