import { RessursStatus } from '@navikt/familie-typer';
import { useState } from 'react';
import { useUtbetalingBegrunnelser } from '../../../../context/UtbetalingBegrunnelseContext';
import { IPeriode, TIDENES_ENDE, TIDENES_MORGEN } from '../../../../typer/periode';
import {
    IRestUtbetalingBegrunnelse,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
} from '../../../../typer/vedtak';
import {
    IRestPersonResultat,
    IRestVilkårResultat,
    Resultat,
    VilkårType,
} from '../../../../typer/vilkår';
import familieDayjs from '../../../../utils/familieDayjs';
import { isoStringToDayjs } from '../../../../utils/formatter';

const useUtbetalingBegrunnelse = (
    id: number,
    personResultater: IRestPersonResultat[],
    periode: IPeriode,
    utbetalingBegrunnelse: IRestUtbetalingBegrunnelse
) => {
    const { endreUtbetalingBegrunnelse, vilkårBegrunnelser } = useUtbetalingBegrunnelser();

    const [mutableVedtakBegrunnelse, settMutableVedtakBegrunnelse] = useState<
        VedtakBegrunnelse | undefined
    >(utbetalingBegrunnelse.vedtakBegrunnelse);
    const [mutableVedtakBegrunnelseType, settMutableVedtakBegrunnelseType] = useState<
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

    const hentUtgjørendeVilkår = (): VilkårType[] => {
        return personResultater
            .flatMap(personResultat => personResultat.vilkårResultater)
            .filter((vilkårResultat: IRestVilkårResultat) => {
                if (utbetalingBegrunnelse.begrunnelseType === VedtakBegrunnelseType.INNVILGELSE) {
                    return (
                        isoStringToDayjs(vilkårResultat.periodeFom, TIDENES_MORGEN).diff(
                            familieDayjs(periode.fom).subtract(1, 'month'),
                            'month'
                        ) === 0 && vilkårResultat.resultat === Resultat.OPPFYLT
                    );
                } else if (
                    utbetalingBegrunnelse.begrunnelseType === VedtakBegrunnelseType.REDUKSJON
                ) {
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
    };

    const begrunnelser =
        vilkårBegrunnelser?.status === RessursStatus.SUKSESS && vilkårBegrunnelser.data;

    return {
        begrunnelser,
        defaultVelgBehandlingsresultat,
        hentUtgjørendeVilkår,
        mutableVedtakBegrunnelse,
        mutableVedtakBegrunnelseType,
        onChangeBegrunnelse,
        onChangeType,
    };
};

export default useUtbetalingBegrunnelse;
